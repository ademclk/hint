import React from 'react';
import { useLocation } from 'react-router-dom';
import { sdk } from '@farcaster/frame-sdk';

interface FarcasterFrameProps {
    title: string;
    splashImageUrl?: string;
}

export function FarcasterFrame({
    title,
    splashImageUrl = "/logo.svg",
}: FarcasterFrameProps) {
    const location = useLocation();

    const contentUrl = typeof window !== 'undefined'
        ? `${window.location.origin}${location.pathname}${location.search}/`
        : '';

    const handleShareClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
        try {
            const isMiniApp = await sdk.isInMiniApp();
            if (isMiniApp) {
                event.preventDefault();
                await sdk.actions.composeCast({
                    text: title,
                    embeds: [contentUrl],
                });
            }
        } catch (error) {
            console.error('Error composing cast:', error);
            // Fallback to default browser behavior if SDK fails
        }
    };

    return (
        <div className="relative w-full p-4 mt-8 mb-6 rounded-xl border border-primary/10 dark:border-primary/20 bg-primary/5 dark:bg-primary/10">
            <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex-1">
                    <h3 className="text-lg font-medium mb-2">Share this article on Farcaster</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        This page is Farcaster Frame-enabled. Cast the URL to share it with the Farcaster community.
                    </p>
                    <div className="flex justify-center">
                        <a
                            href={`https://farcaster.xyz/~/compose?text=${encodeURIComponent(title)}&embeds[]=${encodeURIComponent(contentUrl)}`}
                            className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleShareClick}
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
    );
} 