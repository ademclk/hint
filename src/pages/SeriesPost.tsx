import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SeriesTitleCard } from '@/components/SeriesTitleCard';
import { FarcasterFrame } from '@/components/FarcasterFrame';
import { SeriesEntry, loadSeriesIndex, loadSeriesContent, parseFrontmatter, getLocalizedContent } from '@/utils/contentLoader';
import { FARCASTER_APP_ID, FARCASTER_APP_SLUG } from '@/utils/farcasterConfig';
import MathRenderer from '@/components/MathRenderer';

interface Language {
    code: string;
    name: string;
    flag: string;
}

// Available languages
const LANGUAGES: Language[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' }
];

// User language preferences key for localStorage
const USER_LANGUAGE_PREF = 'hint_user_language_preference';

export default function SeriesPost() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<SeriesEntry | null>(null);
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentLanguage, setCurrentLanguage] = useState<string>('en');
    const [availableLanguages, setAvailableLanguages] = useState<Language[]>([]);
    const [seriesData, setSeriesData] = useState<SeriesEntry[]>([]);

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

        // Load series index data for navigation
        async function loadIndex() {
            try {
                const data = await loadSeriesIndex();
                setSeriesData(data);
            } catch (error) {
                console.error('Failed to load series index', error);
            }
        }

        loadIndex();
    }, []);

    // Load post data when ID or language changes
    useEffect(() => {
        async function fetchData() {
            if (!id) return;

            setLoading(true);
            setError(null);

            try {
                // Find the post metadata from the index
                const indexData = await loadSeriesIndex();
                const postData = indexData.find(post => post.id === id);

                if (!postData) {
                    setError("Episode not found");
                    setLoading(false);
                    return;
                }

                // Set post metadata
                setPost(postData);

                // Determine available languages for this post
                if (postData.languages && postData.languages.length > 0) {
                    setAvailableLanguages(
                        LANGUAGES.filter(lang =>
                            postData.languages?.includes(lang.code)
                        )
                    );

                    // Check if current language is available for this post
                    if (!postData.languages.includes(currentLanguage)) {
                        // If not available, set to post's default language
                        setCurrentLanguage(postData.defaultLanguage || postData.languages[0]);
                    }
                } else {
                    setAvailableLanguages([LANGUAGES.find(lang => lang.code === 'en')!]);
                }

                // Load the actual content file
                const markdownContent = await loadSeriesContent(id, currentLanguage);

                if (!markdownContent) {
                    setError("Content not available");
                    setLoading(false);
                    return;
                }

                // Parse the markdown content
                const { content } = parseFrontmatter(markdownContent);
                setContent(content);

            } catch (error) {
                console.error('Error loading post data:', error);
                setError("Failed to load content");
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [id, currentLanguage]);

    // Load content when language changes
    useEffect(() => {
        async function loadContentForLanguage() {
            try {
                const markdownContent = await loadSeriesContent(id, currentLanguage);

                if (!markdownContent) {
                    setError('Content not found');
                    setLoading(false);
                    return;
                }

                // Parse the markdown content - just get the raw content without HTML conversion
                const { content } = parseFrontmatter(markdownContent);
                setContent(content);

            } catch (error) {
                console.error('Error loading content:', error);
                setError('Failed to load content');
            } finally {
                setLoading(false);
            }
        }

        loadContentForLanguage();
    }, [currentLanguage, id, loading]);

    // Get title based on current language
    const getTitle = () => {
        if (!post) return '';
        return getLocalizedContent(post.title, currentLanguage, post.defaultLanguage || 'en');
    };

    // Navigation between episodes
    const navigateToEpisode = (episodeId: string) => {
        navigate(`/series/${episodeId}`);
    };

    // Helper functions for navigation
    function getSeriesLength() {
        return seriesData.length;
    }

    function getPrevEpisodeId(currentId: string) {
        const currentIndex = seriesData.findIndex(post => post.id === currentId);
        if (currentIndex > 0) {
            return seriesData[currentIndex - 1].id;
        }
        return currentId;
    }

    function getNextEpisodeId(currentId: string) {
        const currentIndex = seriesData.findIndex(post => post.id === currentId);
        if (currentIndex < seriesData.length - 1) {
            return seriesData[currentIndex + 1].id;
        }
        return currentId;
    }

    function getPrevEpisodeTitle(currentId: string) {
        const currentIndex = seriesData.findIndex(post => post.id === currentId);
        if (currentIndex > 0) {
            const prevPost = seriesData[currentIndex - 1];
            return getLocalizedContent(prevPost.title, currentLanguage, prevPost.defaultLanguage || 'en');
        }
        return "";
    }

    function getNextEpisodeTitle(currentId: string) {
        const currentIndex = seriesData.findIndex(post => post.id === currentId);
        if (currentIndex < seriesData.length - 1) {
            const nextPost = seriesData[currentIndex + 1];
            return getLocalizedContent(nextPost.title, currentLanguage, nextPost.defaultLanguage || 'en');
        }
        return "";
    }

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
                        defaultLanguage={post.defaultLanguage}
                    />

                    {/* Markdown content with improved formatting */}
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <MathRenderer content={content} />
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
                        appId={FARCASTER_APP_ID}
                        appSlug={FARCASTER_APP_SLUG}
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