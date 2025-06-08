import { ModeToggle } from "@/components/mode-toggle";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadSeriesIndex, SeriesEntry, getLocalizedContent } from "@/utils/contentLoader";

export function Home() {
    const [featuredPost, setFeaturedPost] = useState<(SeriesEntry & { formattedDate: string }) | null>(null);
    const [loading, setLoading] = useState(true);
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

        async function loadFeaturedPost() {
            setLoading(true);
            try {
                const indexData = await loadSeriesIndex();

                // Get the first series post for featuring
                if (indexData.length > 0) {
                    const post = indexData[0];
                    setFeaturedPost({
                        ...post,
                        formattedDate: new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })
                    });
                }
            } catch (error) {
                console.error('Error loading featured post:', error);
            } finally {
                setLoading(false);
            }
        }

        loadFeaturedPost();
    }, []);

    // Function to get localized content
    const getLocalizedTitle = (post: SeriesEntry | null) => {
        if (!post) return '';
        return getLocalizedContent(post.title, currentLanguage, post.defaultLanguage || 'en');
    };

    const getLocalizedExcerpt = (post: SeriesEntry | null) => {
        if (!post) return '';
        return getLocalizedContent(post.excerpt, currentLanguage, post.defaultLanguage || 'en');
    };

    return (
        <div className="min-h-[calc(100vh-3rem)] flex flex-col relative overflow-hidden">
            {/* Animated background circles */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 mix-blend-multiply dark:mix-blend-soft-light blur-3xl animate-pulse"></div>
            <div className="absolute top-1/2 right-1/3 w-80 h-80 rounded-full bg-primary/5 mix-blend-multiply dark:mix-blend-soft-light blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-primary/10 mix-blend-multiply dark:mix-blend-soft-light blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>

            {/* Hero section with backdrop blur */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 md:py-24 relative z-10">
                <div className="mb-8 relative">
                    <div className="absolute -inset-8 rounded-full blur-3xl bg-primary/20 animate-pulse"></div>
                    <h1 className="text-6xl sm:text-7xl md:text-8xl font-medium tracking-tight mb-2 text-center relative">
                        HINT
                    </h1>
                    <p className="text-base text-center text-muted-foreground relative">
                        Human In The Loop
                    </p>
                </div>

                <p className="text-2xl sm:text-3xl md:text-4xl text-foreground/90 max-w-3xl mx-auto mb-10 text-center font-bold leading-relaxed">
                    quantum computing<br />explained clearly
                </p>

                <div className="relative w-full max-w-xl mx-auto mb-12">
                    <p className="text-muted-foreground mb-6 text-base md:text-lg text-center">
                        I believe quantum concepts are straightforward natural laws. My goal is to present quantum theory in clear, intuitive terms that anyone can grasp.
                    </p>
                    <div className="flex justify-center">
                        <Link
                            to={featuredPost ? `/series/${featuredPost.id}` : "/series"}
                            className="inline-flex items-center justify-center px-8 py-3 bg-primary/90 text-primary-foreground font-medium text-sm rounded-full hover:bg-primary transition-all duration-200 backdrop-blur-sm hover:backdrop-blur-md"
                        >
                            read current series
                        </Link>
                    </div>
                </div>

                {/* Featured Series Post - Two-sided Card */}
                {featuredPost && (
                    <div className="w-full max-w-4xl mx-auto my-16">
                        <Link to={`/series/${featuredPost.id}`} className="block group">
                            <div className="flex flex-col md:flex-row items-center bg-gradient-to-br from-primary/5 to-transparent backdrop-blur-sm border border-primary/10 dark:border-primary/20 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 dark:bg-[#131313]/80 dark:from-primary/10 dark:to-[#131313]">
                                {/* Left side - Content */}
                                <div className="w-full md:w-1/2 p-8">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="bg-primary/10 dark:bg-primary/20 px-3 py-1 rounded-full">
                                            <span className="text-xs text-primary/80 dark:text-primary/90">Episode {featuredPost.part}</span>
                                        </div>
                                        <time className="text-xs text-muted-foreground dark:text-muted-foreground/90">
                                            {featuredPost.formattedDate}
                                        </time>
                                    </div>

                                    <h2 className="text-2xl font-medium mb-4 group-hover:text-primary transition-colors">
                                        {getLocalizedTitle(featuredPost)}
                                    </h2>

                                    <p className="text-muted-foreground dark:text-muted-foreground/90 text-sm mb-5">
                                        {getLocalizedExcerpt(featuredPost)}
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

                                {/* Right side - Animation */}
                                <div className="w-full md:w-1/2 h-full min-h-[200px] md:min-h-[300px] relative overflow-hidden dark:bg-[#0f0f0f]">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent dark:from-primary/15 dark:via-primary/10 dark:to-transparent"></div>

                                    {/* Animated quantum sphere */}
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        <div className="relative w-32 h-32 md:w-48 md:h-48">
                                            {/* Orbit rings */}
                                            <div className="absolute inset-0 rounded-full border border-primary/20 dark:border-primary/30 animate-spin" style={{ animationDuration: "15s" }}></div>
                                            <div className="absolute inset-2 rounded-full border border-primary/15 dark:border-primary/25 animate-spin" style={{ animationDuration: "10s", animationDirection: "reverse" }}></div>
                                            <div className="absolute inset-4 rounded-full border border-primary/10 dark:border-primary/20 animate-spin" style={{ animationDuration: "20s" }}></div>

                                            {/* Center sphere */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-primary/30 dark:bg-primary/40 blur-sm animate-pulse"></div>
                                            </div>

                                            {/* Orbiting particles */}
                                            <div className="absolute top-1/2 left-0 w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary/50 dark:bg-primary/60 animate-ping" style={{ animationDuration: "3s" }}></div>
                                            <div className="absolute top-0 left-1/2 w-2 h-2 md:w-3 md:h-3 rounded-full bg-primary/40 dark:bg-primary/50 animate-ping" style={{ animationDuration: "2s", animationDelay: "1s" }}></div>
                                            <div className="absolute bottom-0 right-1/3 w-2 h-2 md:w-3 md:h-3 rounded-full bg-primary/60 dark:bg-primary/70 animate-ping" style={{ animationDuration: "4s", animationDelay: "0.5s" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}

                {/* Loading state for featured post */}
                {loading && (
                    <div className="w-full max-w-4xl mx-auto my-16 flex justify-center">
                        <div className="animate-pulse">
                            <svg className="w-8 h-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                    </div>
                )}

                {/* Spacer */}
                <div className="border-t border-border/10 w-full max-w-md mx-auto my-16"></div>

                {/* $HINT Token Section */}
                <div className="w-full max-w-5xl mx-auto mb-16 px-4 relative">
                    <div className="text-center mb-16 relative">
                        <h2 className="text-5xl md:text-6xl font-medium tracking-tight mb-6">
                            $HINT
                        </h2>
                        <p className="text-xl md:text-2xl text-foreground/80 dark:text-foreground/90 max-w-3xl mx-auto font-light">
                            Everything will be decided together with the community
                        </p>
                    </div>
                </div>

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
    );
}