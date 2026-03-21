'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import { MessageCircle } from 'lucide-react';
import { StoreBadgePair } from './StoreBadge';

const LINE_GROUP_URL = 'https://line.me/ti/g/49hGDc9A9j';

export default function DownloadSection() {
    const { t } = useLanguage();

    return (
        <section className="py-20 md:py-28 px-6 bg-bg-primary relative overflow-hidden" id="download">
            <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-accent rounded-full blur-[80px] opacity-15 pointer-events-none" />

            <div className="max-w-[600px] mx-auto text-center relative z-10">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 tracking-tight">
                    <span className="gradient-text">{t.download.title}</span>
                </h2>
                <p className="text-base sm:text-lg text-text-secondary mb-4 max-w-[500px] mx-auto">
                    {t.download.subtitle}
                </p>

                {/* Availability badge */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    <span className="text-green-400 text-sm font-medium">{t.download.iosAvailable}</span>
                    <span className="text-text-muted text-sm">·</span>
                    <span className="text-text-muted text-sm">{t.download.freeApp}</span>
                </div>

                {/* Official Store Badges */}
                <div className="mb-10 animate-fade-in-up">
                    <StoreBadgePair size="large" justify="center" />
                </div>

                {/* LINE Group CTA */}
                {/* <div className="glass-card rounded-2xl p-8 sm:p-10" style={{ transform: 'none' }}>
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
                </div> */}
            </div>
        </section>
    );
}
