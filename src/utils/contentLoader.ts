import path from 'path';

/**
 * Utility functions to load series content from markdown files
 */

export interface SeriesEntry {
    id: string;
    title: string | { [key: string]: string };
    titleTr?: string;
    part: number;
    date: string;
    excerpt: string | { [key: string]: string };
    excerptTr?: string;
    coverImage?: string;
    content?: {
        [key: string]: string;
    };
    languages?: string[];
    defaultLanguage?: string;
    author?: string;
}

/**
 * Helper function to get localized content based on language
 */
export function getLocalizedContent(content: string | { [key: string]: string }, language: string = 'en', defaultLanguage: string = 'en'): string {
    if (typeof content === 'string') {
        return content;
    }

    // If the content is an object with language keys
    return content[language] || content[defaultLanguage] || '';
}

/**
 * Loads series index data
 */
export async function loadSeriesIndex(): Promise<SeriesEntry[]> {
    try {
        const response = await fetch('/content/series/index.json');
        if (!response.ok) {
            throw new Error(`Failed to load series index: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading series index:', error);
        return [];
    }
}

/**
 * Loads markdown content for a specific series post
 */
export async function loadSeriesContent(seriesId: string, language: string = 'en'): Promise<string> {
    try {
        const response = await fetch(`/content/series/${seriesId}/index.${language}.md`);
        if (!response.ok) {
            throw new Error(`Failed to load series content: ${response.status}`);
        }
        return await response.text();
    } catch (error) {
        console.error(`Error loading series content for ${seriesId} in ${language}:`, error);
        return '';
    }
}

/**
 * Parse frontmatter from markdown content
 */
export function parseFrontmatter(markdown: string): { frontmatter: Record<string, any>, content: string } {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = markdown.match(frontmatterRegex);

    if (!match) {
        return { frontmatter: {}, content: markdown };
    }

    const frontmatterStr = match[1];
    const content = match[2];

    // Parse frontmatter
    const frontmatter: Record<string, any> = {};
    const lines = frontmatterStr.split('\n');
    for (const line of lines) {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length) {
            const value = valueParts.join(':').trim();
            // Remove quotes if present
            frontmatter[key.trim()] = value.replace(/^"(.*)"$/, '$1');
        }
    }

    return { frontmatter, content };
}

/**
 * Convert markdown to HTML
 */
export function convertMarkdownToHTML(markdown: string) {
    if (!markdown) return '';

    // Split content into blocks (separated by double newlines)
    const blocks = markdown.split(/\n\n+/);

    const processedBlocks = blocks.map(block => {
        const trimmedBlock = block.trim();
        if (!trimmedBlock) return '';

        // Code blocks
        if (trimmedBlock.startsWith('```') && trimmedBlock.endsWith('```')) {
            const codeContent = trimmedBlock.slice(3, -3).trim();
            const lines = codeContent.split('\n');
            const language = lines[0].trim();
            const code = lines.slice(1).join('\n');
            return `<pre class="bg-muted/30 p-4 rounded-md overflow-x-auto my-4"><code>${code || codeContent}</code></pre>`;
        }

        // Headers
        if (trimmedBlock.startsWith('# ')) {
            return `<h1 class="text-3xl font-bold mt-8 mb-4">${trimmedBlock.slice(2)}</h1>`;
        }
        if (trimmedBlock.startsWith('## ')) {
            return `<h2 class="text-2xl font-semibold mt-6 mb-3">${trimmedBlock.slice(3)}</h2>`;
        }
        if (trimmedBlock.startsWith('### ')) {
            return `<h3 class="text-xl font-medium mt-5 mb-2">${trimmedBlock.slice(4)}</h3>`;
        }

        // Horizontal rule
        if (trimmedBlock === '---') {
            return '<hr class="my-8 border-t border-border/30" />';
        }

        // Lists
        if (trimmedBlock.includes('\n- ') || trimmedBlock.startsWith('- ')) {
            const listItems = trimmedBlock.split('\n').filter(line => line.startsWith('- '));
            const processedItems = listItems.map(item => {
                const content = item.slice(2).trim();
                const processed = processInlineFormatting(content);
                return `<li class="ml-4 mb-1">${processed}</li>`;
            });
            return `<ul class="my-4">${processedItems.join('')}</ul>`;
        }

        // Blockquotes
        if (trimmedBlock.startsWith('> ')) {
            const content = trimmedBlock.slice(2);
            return `<blockquote class="border-l-4 border-primary/30 pl-4 py-1 my-4 text-muted-foreground italic">${content}</blockquote>`;
        }

        // Regular paragraph - combine all lines into one, separated by spaces
        const paragraphContent = trimmedBlock.replace(/\n/g, ' ');
        const processed = processInlineFormatting(paragraphContent);
        return `<p class="my-4">${processed}</p>`;
    });

    function processInlineFormatting(text: string): string {
        return text
            // Images
            .replace(/!\[(.*?)\]\((.*?)\)/g, '<div class="my-8"><img src="$2" alt="$1" class="rounded-lg shadow-md mx-auto max-w-full" /></div>')
            // Bold and italic
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            // Inline code
            .replace(/`([^`]+)`/g, '<code class="bg-muted/30 px-1 py-0.5 rounded text-sm">$1</code>');
    }

    const html = processedBlocks.filter(block => block).join('\n');
    return `<div class="prose-content">${html}</div>`;
} 