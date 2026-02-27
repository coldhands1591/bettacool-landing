'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import Image from 'next/image';
import PhoneCarousel from './PhoneCarousel';
import { Mail } from 'lucide-react';

export default function Hero() {
    const { t } = useLanguage();

    const scrollToSignup = () => {
        document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' });
    };

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

                    <div className="flex flex-col gap-4 items-center lg:items-start animate-fade-in-up delay-400">
                        <button
                            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-white font-bold text-lg border-none cursor-pointer transition-all hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(67,97,238,0.3)] animate-pulse-glow"
                            style={{ background: 'linear-gradient(90deg, #3a0ca3 0%, #4361ee 50%, #4cc9f0 100%)' }}
                            onClick={scrollToSignup}
                        >
                            <Mail className="w-5 h-5" strokeWidth={1.5} />
                            {t.hero.cta}
                        </button>
                        <span className="text-text-muted text-sm">
                            {t.hero.comingSoon}
                        </span>
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
