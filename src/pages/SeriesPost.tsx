import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import seriesData from '../seriesData.json';
import { SeriesTitleCard } from '@/components/SeriesTitleCard';
import { FarcasterFrame } from '@/components/FarcasterFrame';

interface Language {
    code: string;
    name: string;
    flag: string;
}

interface SeriesEntry {
    id: string;
    title: string;
    titleTr?: string;
    part: number;
    date: string;
    excerpt: string;
    excerptTr?: string;
    coverImage?: string;
    content: string | {
        [key: string]: string;
    };
    languages?: string[];
    defaultLanguage?: string;
}

// Available languages
const LANGUAGES: Language[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' }
];

// User language preferences key for localStorage
const USER_LANGUAGE_PREF = 'hint_user_language_preference';

// Format the dates from ISO strings
const formattedSeriesData: SeriesEntry[] = seriesData.map(entry => ({
    ...entry,
    date: new Date(entry.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }),
}));

// Improved markdown to HTML converter
function convertMarkdownToHTML(markdown: string) {
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

export default function SeriesPost() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<SeriesEntry | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentLanguage, setCurrentLanguage] = useState<string>('en');
    const [availableLanguages, setAvailableLanguages] = useState<Language[]>([]);

    // Handle back navigation
    const handleBackClick = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/series');
    };

    // Get and save the language preference
    const setLanguageWithPersistence = (lang: string) => {
        setCurrentLanguage(lang);
        try {
            localStorage.setItem(USER_LANGUAGE_PREF, lang);
        } catch (e) {
            console.error("Could not save language preference to localStorage", e);
        }
    };

    // Detect browser language or load saved preference on initial load
    useEffect(() => {
        const loadLanguagePreference = () => {
            try {
                const savedLang = localStorage.getItem(USER_LANGUAGE_PREF);
                if (savedLang && LANGUAGES.some(lang => lang.code === savedLang)) {
                    return savedLang;
                }
            } catch (e) {
                console.error("Could not access localStorage", e);
            }

            // Fallback to browser language
            const browserLang = navigator.language.split('-')[0];
            return LANGUAGES.some(lang => lang.code === browserLang) ? browserLang : 'en';
        };

        setCurrentLanguage(loadLanguagePreference());
    }, []);

    useEffect(() => {
        // Simulate fetching data
        const fetchData = () => {
            setLoading(true);
            setTimeout(() => {
                const foundPost = formattedSeriesData.find(p => p.id === id);
                if (foundPost) {
                    setPost(foundPost);

                    // Determine available languages for this post
                    if (foundPost.languages && foundPost.languages.length > 0) {
                        setAvailableLanguages(
                            LANGUAGES.filter(lang =>
                                foundPost.languages?.includes(lang.code)
                            )
                        );

                        // Check if current language is available for this post
                        if (foundPost.languages && !foundPost.languages.includes(currentLanguage)) {
                            // If not available, set to post's default language but don't persist this forced change
                            setCurrentLanguage(foundPost.defaultLanguage || foundPost.languages[0]);
                        }
                    } else {
                        setAvailableLanguages([LANGUAGES.find(lang => lang.code === 'en')!]);
                    }

                    setError(null);
                } else {
                    setError("Episode not found");
                }
                setLoading(false);
            }, 300);
        };

        fetchData();
    }, [id, currentLanguage]);

    // Get content based on current language
    const getContent = () => {
        if (!post) return '';

        if (typeof post.content === 'string') {
            return post.content;
        }

        // Return content in current language or fall back to default language
        return post.content[currentLanguage] ||
            post.content[post.defaultLanguage || 'en'] ||
            '';
    };

    // Get title based on current language
    const getTitle = () => {
        if (currentLanguage === 'tr' && post?.titleTr) {
            return post.titleTr;
        }
        return post?.title || '';
    };

    // Navigation between episodes
    const navigateToEpisode = (episodeId: string) => {
        navigate(`/series/${episodeId}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse">
                    <svg className="w-8 h-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">Episode Not Found</h1>
                <p className="text-muted-foreground mb-6">The episode you're looking for doesn't exist or has been moved.</p>
                <Link to="/series" className="inline-flex items-center text-primary hover:underline">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to Series
                </Link>
            </div>
        );
    }

    if (!post) {
        return null;
    }

    return (
        <div className="min-h-screen pb-24">
            {/* Header with backdrop blur */}
            <div className="relative overflow-hidden pt-16 pb-8">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent"></div>
                <div className="absolute inset-x-0 top-0 h-40 backdrop-blur-xl bg-background/30"></div>
                <div className="container mx-auto px-6 max-w-3xl relative z-10">
                    <Link
                        to="/series"
                        onClick={handleBackClick}
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        {currentLanguage === 'tr' ? 'Kuantum Serisi' : 'Quantum Series'}
                    </Link>

                    {/* Language selector - moved to the top right for better visibility */}
                    {availableLanguages.length > 1 && (
                        <div className="absolute top-0 right-6 pt-8 flex items-center space-x-2">
                            {availableLanguages.map(lang => (
                                <button
                                    key={lang.code}
                                    onClick={() => setLanguageWithPersistence(lang.code)}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${currentLanguage === lang.code
                                        ? 'bg-primary/20 text-primary'
                                        : 'bg-transparent text-muted-foreground hover:bg-primary/10'
                                        }`}
                                    title={lang.name}
                                >
                                    <span>{lang.flag}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Main content */}
            <div className="container mx-auto px-6 py-8">
                <div className="max-w-2xl mx-auto">
                    {/* Title Card */}
                    <SeriesTitleCard
                        episodeNumber={post.part}
                        title={post.title}
                        titleTr={post.titleTr}
                        currentLanguage={currentLanguage}
                    />

                    {/* Markdown content with improved formatting */}
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <div
                            dangerouslySetInnerHTML={{ __html: convertMarkdownToHTML(getContent()) }}
                            className="markdown-content space-y-4"
                        />
                    </div>

                    {/* Farcaster Frame */}
                    <FarcasterFrame
                        title={getTitle()}
                        imageUrl={typeof window !== 'undefined'
                            ? `${window.location.origin}/images/quantum-card.svg`
                            : 'https://hint.quantum.ademclk.com/images/quantum-card.svg'
                        }
                        buttonTitle="Read Full Post"
                        splashImageUrl={typeof window !== 'undefined'
                            ? `${window.location.origin}/logo.svg`
                            : 'https://hint.quantum.ademclk.com/logo.svg'
                        }
                        customUrl={typeof window !== 'undefined'
                            ? window.location.href
                            : undefined
                        }
                    />

                    {/* Navigation between episodes */}
                    <div className="mt-16 pt-8 border-t border-border/30 grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {post.part > 1 && (
                            <div
                                onClick={() => navigateToEpisode(getPrevEpisodeId(post.id))}
                                className="group cursor-pointer"
                            >
                                <div className="flex flex-col">
                                    <span className="text-xs text-muted-foreground mb-1">
                                        {currentLanguage === 'tr' ? 'Önceki Bölüm' : 'Previous Episode'}
                                    </span>
                                    <span className="text-base font-medium group-hover:text-primary transition-colors flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                        </svg>
                                        {getPrevEpisodeTitle(post.id)}
                                    </span>
                                </div>
                            </div>
                        )}

                        {post.part < getSeriesLength() && (
                            <div
                                onClick={() => navigateToEpisode(getNextEpisodeId(post.id))}
                                className="group ml-auto text-right cursor-pointer"
                            >
                                <div className="flex flex-col">
                                    <span className="text-xs text-muted-foreground mb-1">
                                        {currentLanguage === 'tr' ? 'Sonraki Bölüm' : 'Next Episode'}
                                    </span>
                                    <span className="text-base font-medium group-hover:text-primary transition-colors flex items-center justify-end">
                                        {getNextEpisodeTitle(post.id)}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Subscribe CTA with backdrop blur */}
            <div className="container mx-auto px-6 mt-4">
                <div className="relative backdrop-blur-xl max-w-md mx-auto rounded-xl overflow-hidden">
                    <div className="absolute inset-0 bg-card/20 pointer-events-none"></div>
                    <div className="relative p-6 text-center">
                        <p className="text-muted-foreground text-sm mb-4">
                            {currentLanguage === 'tr' ? 'bu kuantum yolculuğunu seviyor musunuz?' : 'enjoying this quantum journey?'}
                        </p>

                        <a
                            href="https://farcaster.xyz/ademclk"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-6 py-2 bg-primary/90 text-primary-foreground font-medium text-sm rounded-full hover:bg-primary transition-all duration-200"
                        >
                            {currentLanguage === 'tr' ? 'takip et' : 'follow'} @ademclk
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper functions
function getSeriesLength() {
    return formattedSeriesData.length;
}

function getPrevEpisodeId(currentId: string) {
    const currentIndex = formattedSeriesData.findIndex(post => post.id === currentId);
    if (currentIndex > 0) {
        return formattedSeriesData[currentIndex - 1].id;
    }
    return currentId;
}

function getNextEpisodeId(currentId: string) {
    const currentIndex = formattedSeriesData.findIndex(post => post.id === currentId);
    if (currentIndex < formattedSeriesData.length - 1) {
        return formattedSeriesData[currentIndex + 1].id;
    }
    return currentId;
}

function getPrevEpisodeTitle(currentId: string) {
    const currentIndex = formattedSeriesData.findIndex(post => post.id === currentId);
    if (currentIndex > 0) {
        return formattedSeriesData[currentIndex - 1].title;
    }
    return "";
}

function getNextEpisodeTitle(currentId: string) {
    const currentIndex = formattedSeriesData.findIndex(post => post.id === currentId);
    if (currentIndex < formattedSeriesData.length - 1) {
        return formattedSeriesData[currentIndex + 1].title;
    }
    return "";
} 