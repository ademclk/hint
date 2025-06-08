import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface FarcasterFrameProps {
    title: string;
    imageUrl: string;
    buttonTitle?: string;
    splashImageUrl?: string;
    splashBackgroundColor?: string;
    customUrl?: string;
}

export function FarcasterFrame({
    title,
    imageUrl,
    buttonTitle = "🚩 Start",
    splashImageUrl = "/logo.svg",
    splashBackgroundColor = "#131313",
    customUrl
}: FarcasterFrameProps) {
    const location = useLocation();
    const currentUrl = typeof window !== 'undefined'
        ? customUrl || `${window.location.origin}${location.pathname}`
        : '';

    // Create the frame metadata exactly as specified in the documentation
    const frameMetadata = {
        version: "next",
        imageUrl: imageUrl,
        button: {
            title: buttonTitle,
            action: {
                type: "launch_frame",
                url: currentUrl,
                name: "HINT",
                splashImageUrl: splashImageUrl,
                splashBackgroundColor: splashBackgroundColor
            }
        }
    };

    // Stringify the metadata for the meta tag
    const frameMetadataString = JSON.stringify(frameMetadata);

    useEffect(() => {
        if (typeof document === 'undefined') return;

        // Create or update the fc:frame meta tag
        let metaTag = document.querySelector('meta[name="fc:frame"]');
        if (!metaTag) {
            metaTag = document.createElement('meta');
            metaTag.setAttribute('name', 'fc:frame');
            document.head.appendChild(metaTag);
        }
        metaTag.setAttribute('content', frameMetadataString);

        // Also add Open Graph tags for better compatibility
        const ogTags = [
            { name: 'og:title', content: title },
            { name: 'og:image', content: imageUrl },
            { name: 'og:url', content: currentUrl },
            { name: 'og:type', content: 'article' },
            { name: 'twitter:card', content: 'summary_large_image' }
        ];

        ogTags.forEach(tag => {
            let metaElement = document.querySelector(`meta[property="${tag.name}"]`);
            if (!metaElement) {
                metaElement = document.createElement('meta');
                metaElement.setAttribute('property', tag.name);
                document.head.appendChild(metaElement);
            }
            metaElement.setAttribute('content', tag.content);
        });

        // Cleanup function
        return () => {
            if (typeof document === 'undefined') return;
            const frameMeta = document.querySelector('meta[name="fc:frame"]');
            if (frameMeta) frameMeta.remove();
        };
    }, [title, imageUrl, currentUrl, frameMetadataString]);

    return (
        <div className="relative w-full p-4 mt-8 mb-6 rounded-xl border border-primary/10 dark:border-primary/20 bg-primary/5 dark:bg-primary/10">
            <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex-1">
                    <h3 className="text-lg font-medium mb-2">Share this article on Farcaster</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        This page is Farcaster Frame-enabled. Cast the URL to share it with the Farcaster community.
                    </p>
                    <div className="flex space-x-2">
                        <a
                            href={`https://warpcast.com/~/compose?text=Check out this article: ${title}&embeds[]=${encodeURIComponent(currentUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                        >
                            Cast to Farcaster
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
    );
} 