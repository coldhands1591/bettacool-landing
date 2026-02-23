'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import { Newspaper, DollarSign, Gavel, Users, MessageCircle, Bell } from 'lucide-react';

const icons = [Newspaper, DollarSign, Gavel, Users, MessageCircle, Bell];
const colors = [
    'text-blue-400 bg-blue-400/10',
    'text-emerald-400 bg-emerald-400/10',
    'text-amber-400 bg-amber-400/10',
    'text-violet-400 bg-violet-400/10',
    'text-cyan-400 bg-cyan-400/10',
    'text-rose-400 bg-rose-400/10',
];

export default function Features() {
    const { t } = useLanguage();

    return (
        <section className="py-20 md:py-28 px-6 bg-bg-primary" id="features">
            <div className="max-w-[1200px] mx-auto">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-3 tracking-tight">
                    {t.features.title}
                </h2>
                <p className="text-base sm:text-lg text-text-secondary text-center mb-14 max-w-[600px] mx-auto">
                    {t.features.subtitle}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {t.features.items.map((item: { title: string; desc: string }, i: number) => {
                        const Icon = icons[i];
                        const color = colors[i];
                        return (
                            <div
                                key={i}
                                className="glass-card rounded-2xl p-7 sm:p-8 text-left animate-fade-in-up"
                                style={{ animationDelay: `${(i + 1) * 0.1}s` }}
                            >
                                <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-5`}>
                                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-base font-bold mb-2.5">{item.title}</h3>
                                <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
