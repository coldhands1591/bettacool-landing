'use client';

import { useState, FormEvent } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { MessageCircle, Send, CheckCircle2, AlertCircle, ChevronDown, Mail, HelpCircle } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export default function ContactForm() {
    const { t } = useLanguage();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !isValidEmail(email) || !message.trim()) {
            setStatus('error');
            return;
        }

        setStatus('loading');

        try {
            const res = await fetch(`${API_URL}/api/Contact/Send`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message }),
            });

            if (res.ok) {
                setStatus('success');
                setName('');
                setEmail('');
                setMessage('');
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 3000);
            }
        } catch {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    const faqItems = (t.contact as Record<string, unknown>).faq as Array<{ q: string; a: string }> | undefined;

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

                {/* Support Email */}
                <div className="mt-6 flex items-center justify-center gap-2 text-text-secondary text-sm">
                    <Mail className="w-4 h-4" strokeWidth={1.5} />
                    <span>{(t.contact as Record<string, unknown>).supportEmailLabel as string}</span>
                    <a
                        href={`mailto:${(t.contact as Record<string, unknown>).supportEmail as string}`}
                        className="text-accent hover:underline font-medium"
                    >
                        {(t.contact as Record<string, unknown>).supportEmail as string}
                    </a>
                </div>
            </div>

            {/* FAQ Section */}
            {faqItems && faqItems.length > 0 && (
                <div className="max-w-[600px] mx-auto mt-16 relative z-10">
                    <div className="flex items-center justify-center gap-2 mb-8">
                        <HelpCircle className="w-6 h-6 text-accent" strokeWidth={1.5} />
                        <h3 className="text-2xl sm:text-3xl font-bold text-text-primary">
                            {(t.contact as Record<string, unknown>).faqTitle as string}
                        </h3>
                    </div>

                    <div className="flex flex-col gap-3">
                        {faqItems.map((item, index) => (
                            <div
                                key={index}
                                className="bg-bg-primary border border-border-subtle rounded-2xl overflow-hidden transition-all"
                            >
                                <button
                                    className="w-full flex items-center justify-between px-5 py-4 text-left text-text-primary font-medium text-base cursor-pointer bg-transparent border-none font-[inherit] hover:bg-accent/5 transition-colors"
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                >
                                    <span>{item.q}</span>
                                    <ChevronDown
                                        className={`w-5 h-5 text-text-muted shrink-0 transition-transform duration-200 ${openFaq === index ? 'rotate-180' : ''}`}
                                        strokeWidth={1.5}
                                    />
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-200 ${openFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <p className="px-5 pb-4 text-text-secondary text-sm leading-relaxed">
                                        {item.a}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}

