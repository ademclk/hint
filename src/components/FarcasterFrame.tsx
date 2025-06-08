import React, { useEffect, useState } from 'react';
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
    const [showDebug, setShowDebug] = useState(false);

    // Generate the frame metadata following Farcaster Frame spec
    const frameMetadata = {
        version: "next",
        imageUrl,
        button: {
            title: buttonTitle,
            action: {
                type: "launch_frame",
                name: "HINT",
                url: currentUrl,
                splashImageUrl,
                splashBackgroundColor
            }
        }
    };

    // Stringify the metadata for the meta tag
    const frameMetadataString = JSON.stringify(frameMetadata);

    useEffect(() => {
        // Add the meta tag to the document head
        const addMetaTag = () => {
            if (typeof document === 'undefined') return;

            // Create the meta tag or get existing
            let metaTag = document.querySelector('meta[name="fc:frame"]');
            if (!metaTag) {
                metaTag = document.createElement('meta');
                metaTag.setAttribute('name', 'fc:frame');
                document.head.appendChild(metaTag);
            }

            // Set content attribute
            metaTag.setAttribute('content', frameMetadataString);

            // Add Open Graph tags for better sharing
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
        };

        // Call function to add meta tags
        addMetaTag();

        // Cleanup function to remove meta tags on unmount
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
                        <button
                            onClick={() => setShowDebug(!showDebug)}
                            className="text-xs text-muted-foreground hover:text-primary transition-colors"
                        >
                            {showDebug ? 'Hide Debug' : 'Show Debug'}
                        </button>
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

            {/* Debug information - conditionally displayed */}
            {showDebug && (
                <div className="mt-4 p-3 bg-muted/30 rounded-md text-xs text-muted-foreground">
                    <p className="font-mono mb-1">Frame Metadata:</p>
                    <pre className="overflow-auto">{frameMetadataString}</pre>
                </div>
            )}
        </div>
    );
} 