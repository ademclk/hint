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

    // Process markdown into HTML with proper handling of all elements
    let html = markdown
        // Images - process these first to not interfere with other formatting
        .replace(/!\[(.*?)\]\((.*?)\)/g, '<div class="my-8"><img src="$2" alt="$1" class="rounded-lg shadow-md mx-auto max-w-full" /></div>')

        // Headers
        .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
        .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold mt-6 mb-3">$1</h2>')
        .replace(/^### (.*$)/gm, '<h3 class="text-xl font-medium mt-5 mb-2">$1</h3>')

        // Bold and italic
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')

        // Lists
        .replace(/^\- (.*$)/gm, '<li class="ml-4 mb-1">$1</li>')
        .replace(/<\/li>\n<li/g, '</li>\n<li')
        .replace(/(<li.*<\/li>)/s, '<ul class="my-4">$1</ul>')

        // Blockquotes
        .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-primary/30 pl-4 py-1 my-4 text-muted-foreground italic">$1</blockquote>')

        // Code blocks
        .replace(/```([\s\S]*?)```/g, '<pre class="bg-muted/30 p-4 rounded-md overflow-x-auto my-4"><code>$1</code></pre>')

        // Inline code
        .replace(/`([^`]+)`/g, '<code class="bg-muted/30 px-1 py-0.5 rounded text-sm">$1</code>')

        // Line breaks
        .replace(/\n\n/g, '</p><p class="my-4">')

        // Initial paragraph wrap
        .replace(/^([^<].*)/gm, function (match) {
            // Only wrap in <p> if it's not already wrapped in another HTML tag
            if (!match.startsWith('<')) {
                return '<p class="my-4">' + match;
            }
            return match;
        });

    // Final cleanup for any unwrapped paragraphs or stray tags
    html = '<div class="prose-content">' + html + '</div>';
    return html;
} 