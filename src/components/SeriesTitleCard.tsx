import { useState, useEffect } from 'react';

interface SeriesTitleCardProps {
    episodeNumber: number;
    title: string;
    titleTr?: string;
    currentLanguage: string;
}

export function SeriesTitleCard({ episodeNumber, title, titleTr, currentLanguage }: SeriesTitleCardProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Get title in current language or fall back to English
    const displayTitle = currentLanguage === 'tr' && titleTr ? titleTr : title;

    // Generate episode text based on language
    const episodeText = currentLanguage === 'tr' ? 'Bölüm' : 'Episode';

    return (
        <div className="w-full relative my-10 overflow-hidden rounded-2xl">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent dark:from-primary/30 dark:via-primary/10 dark:to-[#131313]"></div>

            {/* Animated dots/particles */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className={`absolute w-4 h-4 rounded-full bg-primary/30 blur-sm ${mounted ? 'animate-ping' : ''}`}
                    style={{ top: '10%', left: '10%', animationDuration: '3s', animationDelay: '0.5s' }}></div>
                <div className={`absolute w-3 h-3 rounded-full bg-primary/20 blur-sm ${mounted ? 'animate-ping' : ''}`}
                    style={{ top: '30%', left: '80%', animationDuration: '4s', animationDelay: '1s' }}></div>
                <div className={`absolute w-5 h-5 rounded-full bg-primary/25 blur-sm ${mounted ? 'animate-ping' : ''}`}
                    style={{ top: '70%', left: '20%', animationDuration: '5s', animationDelay: '1.5s' }}></div>
            </div>

            {/* Orbit circles */}
            <div className="absolute top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative w-40 h-40 opacity-60">
                    <div className={`absolute inset-0 rounded-full border border-primary/30 ${mounted ? 'animate-spin' : ''}`}
                        style={{ animationDuration: '15s' }}></div>
                    <div className={`absolute inset-4 rounded-full border border-primary/20 ${mounted ? 'animate-spin' : ''}`}
                        style={{ animationDuration: '10s', animationDirection: 'reverse' }}></div>
                    <div className={`absolute inset-8 rounded-full border border-primary/10 ${mounted ? 'animate-spin' : ''}`}
                        style={{ animationDuration: '20s' }}></div>
                </div>
            </div>

            {/* Content */}
            <div className="relative p-10 md:p-16 z-10">
                <div className="flex flex-col">
                    <div className="mb-3 flex items-center">
                        <div className="bg-primary/20 dark:bg-primary/30 px-3 py-1 rounded-full">
                            <span className="text-sm text-primary/90 dark:text-primary/95 font-medium">
                                {episodeText} {episodeNumber}
                            </span>
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground/90 max-w-2xl">
                        {displayTitle}
                    </h1>

                    <div className="w-16 h-1 bg-primary/50 rounded-full mb-6"></div>
                </div>
            </div>

            {/* Diagonal lines decoration */}
            <div className="absolute bottom-0 right-0 w-1/3 h-1/3 opacity-20">
                <div className="w-full h-px bg-primary/50 rotate-45 absolute bottom-1/4"></div>
                <div className="w-full h-px bg-primary/50 rotate-45 absolute bottom-2/4"></div>
                <div className="w-full h-px bg-primary/50 rotate-45 absolute bottom-3/4"></div>
            </div>
        </div>
    );
} 