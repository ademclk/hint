import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { loadSeriesIndex, SeriesEntry, getLocalizedContent } from '@/utils/contentLoader';
import { ModeToggle } from '@/components/mode-toggle';

export default function Series() {
    const [loading, setLoading] = useState(true);
    const [seriesPosts, setSeriesPosts] = useState<(SeriesEntry & { formattedDate: string })[]>([]);
    const [currentLanguage, setCurrentLanguage] = useState<string>('en');

    useEffect(() => {
        // Try to get the preferred language from localStorage
        const savedLang = localStorage.getItem('hint_user_language_preference');
        if (savedLang) {
            setCurrentLanguage(savedLang);
        } else {
            // Fallback to browser language or 'en'
            const browserLang = navigator.language.split('-')[0];
            setCurrentLanguage(['en', 'tr'].includes(browserLang) ? browserLang : 'en');
        }

        async function fetchSeriesData() {
            setLoading(true);
            try {
                const indexData = await loadSeriesIndex();
                // Format dates for display
                const formattedData = indexData.map(post => ({
                    ...post,
                    formattedDate: new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })
                }));
                setSeriesPosts(formattedData);
            } catch (error) {
                console.error('Error loading series data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchSeriesData();
    }, []);

    // Function to get localized content
    const getLocalizedTitle = (post: SeriesEntry) => {
        return getLocalizedContent(post.title, currentLanguage, post.defaultLanguage || 'en');
    };

    const getLocalizedExcerpt = (post: SeriesEntry) => {
        return getLocalizedContent(post.excerpt, currentLanguage, post.defaultLanguage || 'en');
    };

    return (
        <div className="min-h-[calc(100vh-3rem)] flex flex-col relative overflow-hidden">
            {/* Animated background circles similar to home page */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 mix-blend-multiply dark:mix-blend-soft-light blur-3xl animate-pulse"></div>
            <div className="absolute top-1/2 right-1/3 w-80 h-80 rounded-full bg-primary/5 mix-blend-multiply dark:mix-blend-soft-light blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-primary/10 mix-blend-multiply dark:mix-blend-soft-light blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>

            {/* Content */}
            <div className="container mx-auto px-4 py-16 relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight mb-4">
                            Quantum Series
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Explore quantum computing concepts through this series of articles
                        </p>
                    </div>

                    {/* Loading state */}
                    {loading && (
                        <div className="flex justify-center py-20">
                            <div className="animate-pulse">
                                <svg className="w-8 h-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                        </div>
                    )}

                    {/* Episodes List */}
                    {!loading && (
                        <div className="space-y-8">
                            {seriesPosts.map((post) => (
                                <Link
                                    key={post.id}
                                    to={`/series/${post.id}`}
                                    className="block group"
                                >
                                    <div className="flex flex-col md:flex-row gap-6 p-6 rounded-xl border border-border/50 dark:border-border/30 bg-card/50 dark:bg-card/20 hover:bg-card/80 dark:hover:bg-card/40 transition-all duration-200">
                                        {/* Episode number and date */}
                                        <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-2 md:w-32 flex-shrink-0">
                                            <div className="bg-primary/10 dark:bg-primary/20 px-3 py-1 rounded-full">
                                                <span className="text-xs text-primary/80 dark:text-primary/90">Episode {post.part}</span>
                                            </div>
                                            <time className="text-xs text-muted-foreground">
                                                {post.formattedDate}
                                            </time>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <h2 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">
                                                {getLocalizedTitle(post)}
                                            </h2>
                                            <p className="text-muted-foreground text-sm mb-4">
                                                {getLocalizedExcerpt(post)}
                                            </p>
                                            <div className="flex items-center text-sm text-primary dark:text-primary/90 group-hover:translate-x-0.5 transition-transform">
                                                <span>Read this episode</span>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-0.5"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* No content state */}
                    {!loading && seriesPosts.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">No series posts found.</p>
                        </div>
                    )}

                    {/* Footer link */}
                    <div className="mt-16 text-center text-xs text-muted-foreground">
                        <span className="block mb-2 opacity-70">find me on</span>
                        <a
                            href="https://farcaster.xyz/ademclk"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors"
                        >
                            @ademclk
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
} 