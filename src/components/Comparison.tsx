'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import { ShieldCheck, ShieldX } from 'lucide-react';

export default function Comparison() {
    const { t } = useLanguage();

    return (
        <section className="py-20 md:py-28 px-6 bg-bg-surface" id="comparison">
            <div className="max-w-[1200px] mx-auto">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-3 tracking-tight">
                    {t.comparison.title}
                </h2>
                <p className="text-base sm:text-lg text-text-secondary text-center mb-14 max-w-[600px] mx-auto">
                    {t.comparison.subtitle}
                </p>

                <div className="overflow-x-auto rounded-2xl border border-border-subtle">
                    <table className="w-full border-collapse min-w-[600px]">
                        <thead>
                            <tr>
                                {t.comparison.headers.map((header: string, i: number) => (
                                    <th
                                        key={i}
                                        className={`px-6 py-5 text-left font-bold text-sm bg-bg-elevated border-b border-border-subtle ${i === 2 ? 'text-accent' : 'text-text-primary'
                                            }`}
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {t.comparison.rows.map((row: string[], i: number) => (
                                <tr key={i} className="hover:bg-accent/[0.03] transition-colors">
                                    {row.map((cell: string, j: number) => (
                                        <td
                                            key={j}
                                            className={`px-6 py-4 border-b border-border-subtle text-sm ${j === 0
                                                    ? 'font-semibold text-text-primary'
                                                    : j === 2
                                                        ? 'text-success'
                                                        : 'text-text-secondary'
                                                }`}
                                        >
                                            <span className="flex items-center gap-2">
                                                {j === 1 && <ShieldX className="w-4 h-4 text-danger shrink-0" strokeWidth={1.5} />}
                                                {j === 2 && <ShieldCheck className="w-4 h-4 text-success shrink-0" strokeWidth={1.5} />}
                                                {cell.replace(/🚫\s?/, '').replace(/✅\s?/, '')}
                                            </span>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
