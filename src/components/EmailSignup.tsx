'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import { Download, MessageCircle } from 'lucide-react';
import { APP_STORE_URL, PLAY_STORE_URL } from '@/lib/config';

const LINE_GROUP_URL = 'https://line.me/ti/g/49hGDc9A9j';

const AppleIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
);

const PlayStoreIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M3.61 1.814L13.793 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.61-.92zm10.89 9.48l2.706-2.706-11.46-6.406 8.754 9.112zm2.706 1.412L14.5 15.412l-8.754 9.112 11.46-6.406-2.706-2.706zM21.243 11.09l-3.13-1.751-2.983 2.983 2.984 2.984 3.13-1.752a1.07 1.07 0 000-1.906v-.558z" />
    </svg>
);

export default function DownloadSection() {
    const { t } = useLanguage();

    return (
        <section className="py-20 md:py-28 px-6 bg-bg-primary relative overflow-hidden" id="download">
            <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-accent rounded-full blur-[80px] opacity-15 pointer-events-none" />

            <div className="max-w-[600px] mx-auto text-center relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                    <Download className="w-8 h-8 text-accent" strokeWidth={1.5} />
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 tracking-tight">
                    <span className="gradient-text">{t.download.title}</span>
                </h2>
                <p className="text-base sm:text-lg text-text-secondary mb-10 max-w-[500px] mx-auto">
                    {t.download.subtitle}
                </p>

                <div className="flex flex-col gap-4 mb-8 animate-fade-in-up">
                    {/* App Store Button */}
                    <a
                        href={APP_STORE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl text-white font-bold text-base no-underline transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(67,97,238,0.3)]"
                        style={{ background: 'linear-gradient(90deg, #3a0ca3 0%, #4361ee 50%, #4cc9f0 100%)' }}
                    >
                        <AppleIcon className="w-6 h-6" />
                        {t.download.iosButton}
                    </a>
                    <div className="flex items-center justify-center gap-2 text-sm">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                        <span className="text-green-400 font-medium">{t.download.iosAvailable}</span>
                        <span className="text-text-muted">·</span>
                        <span className="text-text-muted">{t.download.freeApp}</span>
                    </div>

                    {/* Play Store Button */}
                    <a
                        href={PLAY_STORE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl text-text-secondary font-bold text-base no-underline border-2 border-border-subtle bg-bg-surface/60 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:bg-accent/5 opacity-60 cursor-not-allowed pointer-events-none"
                    >
                        <PlayStoreIcon className="w-5 h-5" />
                        {t.download.androidButton}
                    </a>
                    <span className="text-text-muted text-xs">{t.download.androidComingSoon}</span>
                </div>

                {/* LINE Group CTA */}
                <div className="glass-card rounded-2xl p-8 sm:p-10" style={{ transform: 'none' }}>
                    <a
                        href={LINE_GROUP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl text-white font-bold text-base no-underline transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(6,199,85,0.3)] mb-3"
                        style={{ background: 'linear-gradient(135deg, #06C755 0%, #04B34C 100%)' }}
                    >
                        <MessageCircle className="w-5 h-5" strokeWidth={2} />
                        {t.download.lineGroup}
                    </a>
                    <p className="text-text-secondary text-sm mb-0">{t.download.lineGroupDesc}</p>
                </div>
            </div>
        </section>
    );
}
