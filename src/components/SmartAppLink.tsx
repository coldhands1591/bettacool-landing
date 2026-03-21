"use client";

import { useCallback } from "react";

interface SmartAppLinkProps {
    deepLink: string;
    appStoreUrl: string;
    playStoreUrl: string;
    className?: string;
    children: React.ReactNode;
}

/**
 * Smart deep link button:
 * 1. Tries to open the native app via custom URL scheme
 * 2. If the app isn't installed (timeout), redirects to the appropriate store
 */
export default function SmartAppLink({
    deepLink,
    appStoreUrl,
    playStoreUrl,
    className,
    children,
}: SmartAppLinkProps) {
    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();

            const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
            const isAndroid = /Android/i.test(navigator.userAgent);

            // Record the current time to detect if the app opened
            const start = Date.now();

            // Try the deep link
            window.location.href = deepLink;

            // After a delay, check if the app was opened
            // If the page is still visible (app didn't open), redirect to store
            setTimeout(() => {
                // If more than 2s passed, user probably switched to app and came back
                if (Date.now() - start > 2000) return;

                if (isIOS) {
                    window.location.href = appStoreUrl;
                } else if (isAndroid) {
                    window.location.href = playStoreUrl;
                } else {
                    // Desktop or unknown - show both store options
                    window.location.href = appStoreUrl;
                }
            }, 1500);
        },
        [deepLink, appStoreUrl, playStoreUrl]
    );

    return (
        <a
            href={deepLink}
            onClick={handleClick}
            className={className}
        >
            {children}
        </a>
    );
}
