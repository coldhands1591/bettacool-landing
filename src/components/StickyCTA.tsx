'use client';

import { useState, useEffect } from 'react';
import { StoreBadgePair } from './StoreBadge';

export default function StickyCTA() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const downloadSection = document.getElementById('download');
            if (downloadSection) {
                const rect = downloadSection.getBoundingClientRect();
                const isPastHero = window.scrollY > 600;
                const isDownloadVisible = rect.top < window.innerHeight && rect.bottom > 0;
                setVisible(isPastHero && !isDownloadVisible);
            } else {
                setVisible(window.scrollY > 600);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-all duration-300 ${visible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-full opacity-0 pointer-events-none'
                }`}
        >
            <div className="bg-bg-primary/95 backdrop-blur-xl border-t border-border-subtle px-4 py-3 safe-area-bottom">
                <StoreBadgePair justify="center" />
            </div>
        </div>
    );
}
