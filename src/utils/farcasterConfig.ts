/**
 * Farcaster Configuration Utility
 * This file provides constants and utility functions for Farcaster integration
 */

// App ID from farcaster.json (fid)
export const FARCASTER_APP_ID = "388569";

// App slug for the Farcaster mini app URL
export const FARCASTER_APP_SLUG = "hint";

// Base URL for Farcaster mini app URLs
export const FARCASTER_MINIAPP_BASE_URL = "https://farcaster.xyz/miniapps";

/**
 * Builds a Farcaster mini app URL with the proper format
 * Format: https://farcaster.xyz/miniapps/<app-id>/<app-slug>(/<sub-path>)(?<query-params>)
 */
export function buildFarcasterMiniAppUrl(
    subPath: string = "",
    queryParams: string = "",
    appId: string = FARCASTER_APP_ID,
    appSlug: string = FARCASTER_APP_SLUG
): string {
    // Ensure subPath starts with a slash if it's not empty
    if (subPath && !subPath.startsWith("/")) {
        subPath = `/${subPath}`;
    }

    // Ensure queryParams starts with a question mark if it's not empty
    if (queryParams && !queryParams.startsWith("?")) {
        queryParams = `?${queryParams}`;
    }

    return `${FARCASTER_MINIAPP_BASE_URL}/${appId}/${appSlug}${subPath}${queryParams}`;
}

/**
 * Creates a properly formatted Farcaster Frame Embed object according to the spec
 * This ensures the frame will be opened within the Farcaster client rather than a new tab
 */
export function createFarcasterFrameMetadata({
    imageUrl,
    buttonTitle = "🚩 Start",
    targetUrl,
    appName = "HINT",
    splashImageUrl = "/logo.svg",
    splashBackgroundColor = "#131313"
}: {
    imageUrl: string;
    buttonTitle?: string;
    targetUrl: string;
    appName?: string;
    splashImageUrl?: string;
    splashBackgroundColor?: string;
}) {
    return {
        version: "next",
        imageUrl: imageUrl,
        button: {
            title: buttonTitle,
            action: {
                type: "launch_frame",
                url: targetUrl,
                name: appName,
                splashImageUrl: splashImageUrl,
                splashBackgroundColor: splashBackgroundColor
            }
        }
    };
}

/**
 * Parses the current window location and returns a Farcaster mini app URL
 */
export function getCurrentAsFarcasterUrl(): string | null {
    if (typeof window === "undefined") return null;

    const { pathname, search } = window.location;
    return buildFarcasterMiniAppUrl(pathname, search);
} 