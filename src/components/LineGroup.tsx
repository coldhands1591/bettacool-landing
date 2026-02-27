'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import { MessageCircle, ExternalLink } from 'lucide-react';

const LINE_GROUP_URL = 'https://line.me/ti/g/49hGDc9A9j';

export default function LineGroup() {
    const { t } = useLanguage();

    return (
        <section className="py-16 md:py-20 px-6 bg-bg-primary relative overflow-hidden" id="line">
            <div className="absolute top-[30%] left-[-10%] w-[300px] h-[300px] bg-[#06C755] rounded-full blur-[80px] opacity-10 pointer-events-none" />

            <div className="max-w-[600px] mx-auto text-center relative z-10">
                {/* LINE icon */}
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'linear-gradient(135deg, #06C755 0%, #04B34C 100%)' }}>
                    <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="currentColor">
                        <path d="M12 2C6.48 2 2 5.82 2 10.5c0 4.21 3.74 7.74 8.78 8.4.34.07.8.23.92.52.1.27.07.68.03.95l-.15.9c-.04.27-.21 1.05.92.57 1.13-.48 6.1-3.59 8.33-6.15C22.78 13.44 22 11.87 22 10.5 22 5.82 17.52 2 12 2zm-3.5 11h-2a.75.75 0 01-.75-.75v-3.5a.75.75 0 011.5 0V11.5h1.25a.75.75 0 010 1.5zm2.25-.75a.75.75 0 01-1.5 0v-3.5a.75.75 0 011.5 0v3.5zm4 0a.75.75 0 01-1.35.45L11.9 10.5v1.75a.75.75 0 01-1.5 0v-3.5a.75.75 0 011.35-.45l1.5 2.2V8.75a.75.75 0 011.5 0v3.5zm3.25.75h-2a.75.75 0 01-.75-.75v-3.5a.75.75 0 01.75-.75h2a.75.75 0 010 1.5H16.5v.5h1.25a.75.75 0 010 1.5H16.5v.5h1.5a.75.75 0 010 1.5z" />
                    </svg>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-3 tracking-tight">
                    <span style={{ color: '#06C755' }}>{t.line.title}</span>
                </h2>
                <p className="text-base text-text-secondary mb-8 max-w-[450px] mx-auto leading-relaxed">
                    {t.line.description}
                </p>

                {/* Benefits */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {t.line.benefits.map((benefit: string, i: number) => (
                        <span
                            key={i}
                            className="inline-flex items-center gap-1.5 bg-[#06C755]/10 border border-[#06C755]/20 text-[#06C755] px-4 py-2 rounded-full text-sm font-medium"
                        >
                            {benefit}
                        </span>
                    ))}
                </div>

                {/* CTA Button */}
                <a
                    href={LINE_GROUP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-bold text-lg no-underline transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(6,199,85,0.3)]"
                    style={{ background: 'linear-gradient(135deg, #06C755 0%, #04B34C 100%)' }}
                >
                    <MessageCircle className="w-5 h-5" strokeWidth={2} />
                    {t.line.cta}
                    <ExternalLink className="w-4 h-4 opacity-60" strokeWidth={2} />
                </a>
            </div>
        </section>
    );
}
