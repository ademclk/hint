import 'katex/dist/katex.min.css';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';

interface MathRendererProps {
    content: string;
}

export default function MathRenderer({ content }: MathRendererProps) {
    if (!content) {
        return <div className="markdown-content">No content available</div>;
    }

    // Clean up the content to ensure proper markdown parsing
    const cleanContent = content
        .replace(/\r\n/g, '\n')  // Normalize line endings
        .replace(/\n{3,}/g, '\n\n')  // Remove excessive line breaks
        .trim();

    return (
        <div className="markdown-content">
            <style jsx global>{`
                /* KaTeX display math centering */
                .katex-display {
                    margin: 2rem 0 !important;
                    text-align: center !important;
                }
                
                .katex-display > .katex {
                    font-size: 1.2em !important;
                    display: inline-block !important;
                }
                
                /* Inline math */
                .katex {
                    font-size: 1.1em;
                }
                
                /* Better spacing around math */
                .katex-display + p,
                .katex-display + h1,
                .katex-display + h2,
                .katex-display + h3,
                .katex-display + h4 {
                    margin-top: 2rem !important;
                }
                
                p + .katex-display,
                h1 + .katex-display,
                h2 + .katex-display,
                h3 + .katex-display,
                h4 + .katex-display {
                    margin-top: 2rem !important;
                }

                /* Dark mode fixes */
                .dark .katex {
                    color: oklch(0.985 0 0) !important;
                }
                
                .dark .katex .base {
                    color: oklch(0.985 0 0) !important;
                }
            `}</style>

            <div className="prose prose-lg dark:prose-invert max-w-none">
                <ReactMarkdown
                    remarkPlugins={[remarkMath, remarkGfm]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                        h1: ({ children, ...props }) => (
                            <h1 className="text-4xl font-bold mt-12 mb-6 text-foreground" {...props}>
                                {children}
                            </h1>
                        ),
                        h2: ({ children, ...props }) => (
                            <h2 className="text-3xl font-semibold mt-10 mb-5 text-foreground border-b border-border pb-2" {...props}>
                                {children}
                            </h2>
                        ),
                        h3: ({ children, ...props }) => (
                            <h3 className="text-2xl font-medium mt-8 mb-4 text-foreground" {...props}>
                                {children}
                            </h3>
                        ),
                        h4: ({ children, ...props }) => (
                            <h4 className="text-xl font-medium mt-6 mb-3 text-foreground" {...props}>
                                {children}
                            </h4>
                        ),
                        p: ({ children, ...props }) => (
                            <p className="mb-4 leading-7 text-foreground" {...props}>
                                {children}
                            </p>
                        ),
                        ul: ({ children, ...props }) => (
                            <ul className="my-6 ml-6 list-disc space-y-2" {...props}>
                                {children}
                            </ul>
                        ),
                        ol: ({ children, ...props }) => (
                            <ol className="my-6 ml-6 list-decimal space-y-2" {...props}>
                                {children}
                            </ol>
                        ),
                        li: ({ children, ...props }) => (
                            <li className="leading-7" {...props}>
                                {children}
                            </li>
                        ),
                        blockquote: ({ children, ...props }) => (
                            <blockquote className="border-l-4 border-primary/50 pl-6 py-2 my-6 text-muted-foreground italic bg-muted/20 rounded-r" {...props}>
                                {children}
                            </blockquote>
                        ),
                        code: ({ inline, children, className, ...props }) => {
                            if (inline) {
                                return (
                                    <code className="bg-muted px-2 py-1 rounded text-sm font-mono text-foreground border" {...props}>
                                        {children}
                                    </code>
                                );
                            }
                            return (
                                <div className="my-6">
                                    <pre className="bg-muted p-6 rounded-lg overflow-x-auto border">
                                        <code className={`${className} text-sm font-mono`} {...props}>
                                            {children}
                                        </code>
                                    </pre>
                                </div>
                            );
                        },
                        hr: (props) => (
                            <hr className="my-12 border-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" {...props} />
                        ),
                        strong: ({ children, ...props }) => (
                            <strong className="font-semibold text-foreground" {...props}>
                                {children}
                            </strong>
                        ),
                        em: ({ children, ...props }) => (
                            <em className="italic text-foreground" {...props}>
                                {children}
                            </em>
                        ),
                    }}
                >
                    {cleanContent}
                </ReactMarkdown>
            </div>
        </div>
    );
} 