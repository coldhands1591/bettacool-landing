'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { APP_STORE_URL } from '@/lib/config';

const AppleIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
);

export default function StickyCTA() {
    const { t } = useLanguage();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling past 600px and hide when download section is visible
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
                <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white font-bold text-base border-none cursor-pointer transition-all active:scale-[0.98] font-[inherit] no-underline"
                    style={{ background: 'linear-gradient(90deg, #3a0ca3 0%, #4361ee 50%, #4cc9f0 100%)' }}
                >
                    <AppleIcon className="w-5 h-5" />
                    {t.hero.cta}
                </a>
            </div>
        </div>
    );
}
