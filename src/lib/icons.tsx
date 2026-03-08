// Shared SVG icon components for store download buttons

export const AppleIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 384 512" fill="currentColor" className={className}>
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-27.1-46.7-42.4-83.2-46.1-34.9-3.5-73.6 20.5-87.5 20.5-14.6 0-49.2-19.3-73.9-19.3C68 139.5 0 183 0 270.2c0 26.8 4.9 54.5 14.8 83.2 13.1 37.6 60.3 129.8 109.3 128.2 25.5-.6 43.6-18.2 73.3-18.2 28.8 0 45.5 18.2 73.9 18.2 49.5-.8 92.2-84.7 104.7-122.4-67.5-31.7-101.3-94.5-57.3-90.5zM239 59.4C265.3 28.9 263.4 1.1 262.5 0c-24.3 1.5-52.5 16.8-69 36.2-17.7 20.6-29 46-26.6 74 26.3 2 53.3-12 73.1-50.8z" />
    </svg>
);

export const PlayStoreIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 512 512" fill="currentColor" className={className}>
        <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
    </svg>
);

export const UserIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
);

export const HeartIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
);

export const CommentIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" />
    </svg>
);
