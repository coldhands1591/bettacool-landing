'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Mail, Send, CheckCircle2, AlertCircle, Users } from 'lucide-react';

export default function EmailSignup() {
    const { t } = useLanguage();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [waitlistCount, setWaitlistCount] = useState(0);

    // Social proof: base count + real localStorage entries
    const BASE_COUNT = 247;
    useEffect(() => {
        const existing = JSON.parse(localStorage.getItem('bettacool-waitlist') || '[]');
        setWaitlistCount(BASE_COUNT + existing.length);
    }, [status]);

    const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!isValidEmail(email)) {
            setStatus('error');
            return;
        }
        const existing = JSON.parse(localStorage.getItem('bettacool-waitlist') || '[]');
        if (!existing.includes(email)) {
            existing.push(email);
            localStorage.setItem('bettacool-waitlist', JSON.stringify(existing));
        }
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 5000);
    };

    return (
        <section className="py-20 md:py-28 px-6 bg-bg-primary relative overflow-hidden" id="signup">
            <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-accent rounded-full blur-[80px] opacity-15 pointer-events-none" />

            <div className="max-w-[600px] mx-auto text-center relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                    <Mail className="w-8 h-8 text-accent" strokeWidth={1.5} />
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 tracking-tight">
                    <span className="gradient-text">{t.email.title}</span>
                </h2>
                <p className="text-base sm:text-lg text-text-secondary mb-14 max-w-[500px] mx-auto">
                    {t.email.subtitle}
                </p>

                {status === 'success' && (
                    <div className="flex items-center justify-center gap-2 bg-success/10 text-success border border-success/20 rounded-xl px-5 py-3 text-sm mb-4">
                        <CheckCircle2 className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                        {t.email.success}
                    </div>
                )}
                {status === 'error' && (
                    <div className="flex items-center justify-center gap-2 bg-danger/10 text-danger border border-danger/20 rounded-xl px-5 py-3 text-sm mb-4">
                        <AlertCircle className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                        {t.email.error}
                    </div>
                )}

                <form className="flex flex-col sm:flex-row gap-3 mb-4" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className="flex-1 px-5 py-4 bg-bg-surface border border-border-subtle rounded-2xl text-text-primary text-base font-[inherit] outline-none transition-all focus:border-accent focus:shadow-[0_0_0_3px_rgba(67,97,238,0.3)] placeholder:text-text-muted"
                        placeholder={t.email.placeholder}
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (status === 'error') setStatus('idle');
                        }}
                        id="email-input"
                    />
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 px-7 py-4 text-white border-none rounded-2xl text-base font-bold cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(67,97,238,0.3)] whitespace-nowrap font-[inherit]"
                        style={{ background: 'linear-gradient(90deg, #3a0ca3 0%, #4361ee 50%, #4cc9f0 100%)' }}
                        id="email-submit"
                    >
                        <Send className="w-4 h-4" strokeWidth={1.5} />
                        {t.email.button}
                    </button>
                </form>

                <p className="text-text-muted text-xs mb-4">{t.email.privacy}</p>

                {/* Social proof */}
                {waitlistCount > 0 && (
                    <div className="inline-flex items-center gap-2 bg-accent/5 border border-accent/15 rounded-full px-5 py-2.5 text-sm text-accent animate-fade-in-up">
                        <Users className="w-4 h-4" strokeWidth={1.5} />
                        <span className="font-semibold">{waitlistCount.toLocaleString()}</span>
                        <span className="text-text-secondary">{t.email.socialProof}</span>
                    </div>
                )}
            </div>
        </section>
    );
}
