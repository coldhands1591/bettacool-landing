'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import PhoneCarousel from './PhoneCarousel';
import { StoreBadgePair } from './StoreBadge';

export default function Hero() {
    const { t } = useLanguage();

    return (
        <section
            className="min-h-screen flex items-center justify-center relative overflow-hidden pt-28 pb-20 px-6"
            style={{ background: 'linear-gradient(135deg, #0a0f1e 0%, #111827 50%, #0d1a3a 100%)' }}
            id="hero"
        >
            {/* Background orbs */}
            <div className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] bg-accent rounded-full blur-[80px] opacity-20 pointer-events-none" />
            <div className="absolute bottom-[20%] left-[-10%] w-[300px] h-[300px] bg-purple-600 rounded-full blur-[80px] opacity-20 pointer-events-none" />

            <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
                {/* Content — shows first on mobile */}
                <div className="z-10 text-center lg:text-left">
                    <span className="inline-block bg-accent/10 text-accent px-5 py-2 rounded-full text-sm font-semibold border border-accent/20 mb-6 animate-fade-in-up">
                        {t.hero.badge}
                    </span>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] mb-4 tracking-tight animate-fade-in-up delay-100">
                        <span className="gradient-text">{t.hero.title}</span>
                    </h1>

                    <p className="text-lg sm:text-xl text-text-secondary font-medium mb-3 animate-fade-in-up delay-200">
                        {t.hero.subtitle}
                    </p>

                    <p className="text-base text-text-muted mb-8 max-w-[500px] leading-relaxed mx-auto lg:mx-0 animate-fade-in-up delay-300">
                        {t.hero.description}
                    </p>

                    <div className="animate-fade-in-up delay-400">
                        <StoreBadgePair size="large" />

                        {/* Availability indicator */}
                        <div className="flex items-center gap-2 mt-3 justify-center lg:justify-start">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                            <span className="text-green-400 text-sm font-medium">{t.download.iosAvailable}</span>
                            <span className="text-text-muted text-sm">·</span>
                            <span className="text-text-muted text-sm">{t.download.freeApp}</span>
                        </div>
                    </div>
                </div>

                {/* Phone with carousel — shows after content on mobile */}
                <div className="flex justify-center items-center z-10 animate-fade-in-up delay-300">
                    <PhoneCarousel />
                </div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-primary to-transparent pointer-events-none" />
        </section>
    );
}
