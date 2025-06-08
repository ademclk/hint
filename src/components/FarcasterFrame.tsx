import React from 'react';
import { useLocation } from 'react-router-dom';
import {
    FARCASTER_APP_ID,
    FARCASTER_APP_SLUG,
    createFarcasterFrameMetadata
} from '@/utils/farcasterConfig';

interface FarcasterFrameProps {
    title: string;
    imageUrl: string;
    buttonTitle?: string;
    splashImageUrl?: string;
    splashBackgroundColor?: string;
    customUrl?: string;
    appId?: string;
    appSlug?: string;
}

export function FarcasterFrame({
    title,
    imageUrl,
    buttonTitle = "🚩 Start",
    splashImageUrl = "/logo.svg",
    splashBackgroundColor = "#131313",
    customUrl,
    appId = FARCASTER_APP_ID,
    appSlug = FARCASTER_APP_SLUG
}: FarcasterFrameProps) {
    const location = useLocation();

    const contentUrl = typeof window !== 'undefined'
        ? `${window.location.origin}${location.pathname}${location.search}`
        : '';

    const frameMetadata = createFarcasterFrameMetadata({
        imageUrl: imageUrl,
        buttonTitle: buttonTitle,
        targetUrl: contentUrl,
        appName: "HINT",
        splashImageUrl: splashImageUrl,
        splashBackgroundColor: splashBackgroundColor
    });

    const frameMetadataString = JSON.stringify(frameMetadata);

    return (
        <>
            <meta name="fc:frame" content={frameMetadataString} />
            <meta property="og:title" content={title} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:url" content={contentUrl} />
            <meta property="og:type" content="article" />
            <meta name="twitter:card" content="summary_large_image" />

            <div className="relative w-full p-4 mt-8 mb-6 rounded-xl border border-primary/10 dark:border-primary/20 bg-primary/5 dark:bg-primary/10">
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="flex-1">
                        <h3 className="text-lg font-medium mb-2">Share this article on Farcaster</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            This page is Farcaster Frame-enabled. Cast the URL to share it with the Farcaster community.
                        </p>
                        <div className="flex justify-center">
                            <a
                                href={`https://warpcast.com/~/compose?text=${encodeURIComponent(title)}&embeds[]=${encodeURIComponent(contentUrl)}`}
                                className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Share on Farcaster
                            </a>
                        </div>
                    </div>
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-card flex-shrink-0">
                        <img
                            src={splashImageUrl}
                            alt="Frame preview"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </>
    );
} 