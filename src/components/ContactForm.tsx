'use client';

import { useState, FormEvent } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { MessageCircle, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactForm() {
    const { t } = useLanguage();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !isValidEmail(email) || !message.trim()) {
            setStatus('error');
            return;
        }

        setStatus('loading');

        // Send via mailto fallback (opens email client with pre-filled content)
        const subject = encodeURIComponent(`[bettacool Contact] จาก ${name}`);
        const body = encodeURIComponent(`ชื่อ: ${name}\nEmail: ${email}\n\nข้อความ:\n${message}`);
        window.open(`mailto:support@bettacool.com?subject=${subject}&body=${body}`, '_blank');

        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
        setTimeout(() => setStatus('idle'), 5000);
    };

    return (
        <section className="py-20 md:py-28 px-6 bg-bg-surface relative overflow-hidden" id="contact">
            <div className="max-w-[600px] mx-auto text-center relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                    <MessageCircle className="w-8 h-8 text-accent" strokeWidth={1.5} />
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 tracking-tight">
                    <span className="gradient-text">{t.contact.title}</span>
                </h2>
                <p className="text-base sm:text-lg text-text-secondary mb-10 max-w-[500px] mx-auto">
                    {t.contact.subtitle}
                </p>

                {status === 'success' && (
                    <div className="flex items-center justify-center gap-2 bg-success/10 text-success border border-success/20 rounded-xl px-5 py-3 text-sm mb-4">
                        <CheckCircle2 className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                        {t.contact.success}
                    </div>
                )}
                {status === 'error' && (
                    <div className="flex items-center justify-center gap-2 bg-danger/10 text-danger border border-danger/20 rounded-xl px-5 py-3 text-sm mb-4">
                        <AlertCircle className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                        {t.contact.error}
                    </div>
                )}

                <form className="flex flex-col gap-3 text-left" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                            type="text"
                            className="px-5 py-4 bg-bg-primary border border-border-subtle rounded-2xl text-text-primary text-base font-[inherit] outline-none transition-all focus:border-accent focus:shadow-[0_0_0_3px_rgba(67,97,238,0.3)] placeholder:text-text-muted"
                            placeholder={t.contact.namePlaceholder}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={status === 'loading'}
                        />
                        <input
                            type="email"
                            className="px-5 py-4 bg-bg-primary border border-border-subtle rounded-2xl text-text-primary text-base font-[inherit] outline-none transition-all focus:border-accent focus:shadow-[0_0_0_3px_rgba(67,97,238,0.3)] placeholder:text-text-muted"
                            placeholder={t.contact.emailPlaceholder}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={status === 'loading'}
                        />
                    </div>
                    <textarea
                        className="px-5 py-4 bg-bg-primary border border-border-subtle rounded-2xl text-text-primary text-base font-[inherit] outline-none transition-all focus:border-accent focus:shadow-[0_0_0_3px_rgba(67,97,238,0.3)] placeholder:text-text-muted resize-none h-[140px]"
                        placeholder={t.contact.messagePlaceholder}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        disabled={status === 'loading'}
                    />
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="inline-flex items-center justify-center gap-2 px-7 py-4 text-white border-none rounded-2xl text-base font-bold cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(67,97,238,0.3)] font-[inherit] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                        style={{ background: 'linear-gradient(90deg, #3a0ca3 0%, #4361ee 50%, #4cc9f0 100%)' }}
                    >
                        <Send className="w-4 h-4" strokeWidth={1.5} />
                        {t.contact.button}
                    </button>
                </form>
            </div>
        </section>
    );
}
