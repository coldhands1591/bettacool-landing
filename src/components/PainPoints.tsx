'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import { Ban, HeartCrack, Users } from 'lucide-react';

const icons = [Ban, HeartCrack, Users];

export default function PainPoints() {
    const { t } = useLanguage();

    return (
        <section className="py-20 md:py-28 px-6 bg-bg-primary" id="pain">
            <div className="max-w-[1200px] mx-auto">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-3 tracking-tight">
                    {t.pain.title}
                </h2>
                <p className="text-base sm:text-lg text-text-secondary text-center mb-14 max-w-[600px] mx-auto">
                    {t.pain.subtitle}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[500px] md:max-w-none mx-auto">
                    {t.pain.items.map((item: { title: string; desc: string }, i: number) => {
                        const Icon = icons[i];
                        return (
                            <div
                                key={i}
                                className="glass-card rounded-2xl p-8 sm:p-10 text-center animate-fade-in-up"
                                style={{ animationDelay: `${(i + 1) * 0.1}s` }}
                            >
                                <div className="w-14 h-14 rounded-2xl bg-danger/10 flex items-center justify-center mx-auto mb-5">
                                    <Icon className="w-7 h-7 text-danger" strokeWidth={1.5} />
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
