'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import { ShieldCheck, Home, Heart } from 'lucide-react';

const icons = [ShieldCheck, Home, Heart];

export default function Solution() {
    const { t } = useLanguage();

    return (
        <section className="py-20 md:py-28 px-6 bg-bg-surface relative overflow-hidden" id="solution">
            <div className="absolute top-[20%] right-[-15%] w-[400px] h-[400px] bg-accent rounded-full blur-[80px] opacity-15 pointer-events-none" />

            <div className="max-w-[1200px] mx-auto relative z-10">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-3 tracking-tight">
                    <span className="gradient-text">{t.solution.title}</span>
                </h2>
                <p className="text-base sm:text-lg text-text-secondary text-center mb-14 max-w-[600px] mx-auto">
                    {t.solution.subtitle}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[500px] md:max-w-none mx-auto">
                    {t.solution.items.map((item: { title: string; desc: string }, i: number) => {
                        const Icon = icons[i];
                        return (
                            <div
                                key={i}
                                className="glass-card rounded-2xl p-8 sm:p-10 text-center bg-accent/5 border border-accent/15 hover:bg-accent/10 hover:border-accent/40 animate-fade-in-up"
                                style={{ animationDelay: `${(i + 1) * 0.1}s` }}
                            >
                                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-5">
                                    <Icon className="w-7 h-7 text-accent" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                                <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
