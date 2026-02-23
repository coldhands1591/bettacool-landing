'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import { Heart, HandshakeIcon, Anchor, Award } from 'lucide-react';

const icons = [Heart, HandshakeIcon, Anchor, Award];

export default function BrandStory() {
    const { t } = useLanguage();

    return (
        <section className="py-20 md:py-28 px-6 bg-bg-surface relative overflow-hidden" id="brand">
            <div className="max-w-[1200px] mx-auto">
                {/* Quote */}
                <div className="text-center mb-16">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold italic leading-snug mb-4">
                        <span className="text-accent opacity-60 not-italic">&ldquo;</span>
                        {t.brand.quote}
                        <span className="text-accent opacity-60 not-italic">&rdquo;</span>
                    </p>
                    <p className="text-accent font-semibold text-lg">— {t.brand.author} —</p>
                </div>

                {/* Values */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {t.brand.values.map((value: { title: string; desc: string }, i: number) => {
                        const Icon = icons[i];
                        return (
                            <div
                                key={i}
                                className="glass-card rounded-2xl p-7 text-center animate-fade-in-up"
                                style={{ animationDelay: `${(i + 1) * 0.1}s` }}
                            >
                                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                                    <Icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-base font-bold mb-2">{value.title}</h3>
                                <p className="text-text-secondary text-sm leading-snug">{value.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
