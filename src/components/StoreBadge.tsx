'use client';

import { APP_STORE_URL, PLAY_STORE_URL } from '@/lib/config';

/* ──────────────────────────────────────────────
   Official-style App Store & Google Play badges
   ────────────────────────────────────────────── */

const AppleLogo = () => (
    <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0">
        <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
);

const GooglePlayLogo = () => (
    <svg viewBox="0 0 505 505.5" className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0">
        <g>
            <path fill="#00C1FF" d="M18.9 1.4C6.5 7.8 0 20.1 0 36.6v432.3c0 16.5 6.5 28.8 18.9 35.2l1.1.5L256.6 268v-4.7L19.9.9l-1 .5z" />
            <path fill="#FFDA00" d="M335.4 347l-78.8-78.8v-4.7l78.9-78.9.8.5L431 232c27.3 15.5 27.3 40.9 0 56.4l-94.8 58.1-.8.5z" />
            <path fill="#F33B4B" d="M336.2 346.5L256.6 266.5 19.9 504.1c9 9.5 23.8 10.7 40.5 1.2l275.8-158.8" />
            <path fill="#00EE76" d="M336.2 159l-275.8-158.7C43.7-8.7 28.9-7.5 19.9 2l236.7 264.5 79.6-107.5z" />
        </g>
    </svg>
);

interface StoreBadgeProps {
    store: 'apple' | 'google';
    size?: 'default' | 'large';
    className?: string;
}

export function StoreBadge({ store, size = 'default', className = '' }: StoreBadgeProps) {
    const isApple = store === 'apple';
    const href = isApple ? APP_STORE_URL : PLAY_STORE_URL;
    const isLarge = size === 'large';

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`
                inline-flex items-center gap-2.5 rounded-[10px] bg-black border border-white/20
                text-white no-underline transition-all duration-200
                hover:bg-[#1a1a1a] hover:border-white/40 hover:scale-[1.03]
                active:scale-[0.98]
                ${isLarge
                    ? 'px-4 py-2 sm:px-5 sm:py-2.5'
                    : 'px-3.5 py-1.5 sm:px-4 sm:py-2'
                }
                ${className}
            `}
        >
            {isApple ? <AppleLogo /> : <GooglePlayLogo />}
            <div className="flex flex-col leading-none min-w-0">
                <span className={`font-normal text-white/70 ${isLarge ? 'text-[8px] sm:text-[10px]' : 'text-[7px] sm:text-[9px]'}`}>
                    {isApple ? 'Download on the' : 'GET IT ON'}
                </span>
                <span className={`font-semibold tracking-[-0.01em] ${isLarge ? 'text-[15px] sm:text-lg' : 'text-sm sm:text-base'}`}>
                    {isApple ? 'App Store' : 'Google Play'}
                </span>
            </div>
        </a>
    );
}

/* Pair of badges side by side */
export function StoreBadgePair({
    size = 'default',
    className = '',
    justify = 'start',
}: {
    size?: 'default' | 'large';
    className?: string;
    justify?: 'start' | 'center';
}) {
    return (
        <div className={`flex flex-row gap-3 ${justify === 'center' ? 'justify-center' : 'justify-center lg:justify-start'} ${className}`}>
            <StoreBadge store="apple" size={size} />
            <StoreBadge store="google" size={size} />
        </div>
    );
}
