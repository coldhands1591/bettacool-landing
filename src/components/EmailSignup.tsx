'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Mail, Send, CheckCircle2, AlertCircle, Users, Smartphone, MessageCircle, ArrowRight } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
const LINE_GROUP_URL = 'https://line.me/ti/g/49hGDc9A9j';

const AppleIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
);

const PlayStoreIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M3.61 1.814L13.793 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.61-.92zm10.89 9.48l2.706-2.706-11.46-6.406 8.754 9.112zm2.706 1.412L14.5 15.412l-8.754 9.112 11.46-6.406-2.706-2.706zM21.243 11.09l-3.13-1.751-2.983 2.983 2.984 2.984 3.13-1.752a1.07 1.07 0 000-1.906v-.558z" />
    </svg>
);

const BothIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="5" y="2" width="14" height="20" rx="3" />
        <line x1="12" y1="18" x2="12" y2="18.01" strokeWidth="2" />
    </svg>
);

type Platform = 'ios' | 'android' | 'both';
type FlowState = 'selecting' | 'filling' | 'success';

export default function EmailSignup() {
    const { t } = useLanguage();
    const [platform, setPlatform] = useState<Platform | null>(null);
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'duplicate'>('idle');
    const [flowState, setFlowState] = useState<FlowState>('selecting');
    const [waitlistCount, setWaitlistCount] = useState(0);

    // Fetch real count from API
    useEffect(() => {
        const fetchCount = async () => {
            try {
                const res = await fetch(`${API_URL}/api/Waitlist/Count`);
                if (res.ok) {
                    const data = await res.json();
                    setWaitlistCount(data.data?.count || 0);
                }
            } catch {
                // Fallback: don't show count if API is unreachable
            }
        };
        fetchCount();
    }, [flowState]);

    const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const getPlatformHint = () => {
        if (!platform) return '';
        const hints: Record<Platform, string> = {
            ios: t.email.platformHintIos,
            android: t.email.platformHintAndroid,
            both: t.email.platformHintBoth,
        };
        return hints[platform];
    };

    const handleSelectPlatform = (p: Platform) => {
        setPlatform(p);
        setFlowState('filling');
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!isValidEmail(email) || !platform) {
            setStatus('error');
            return;
        }

        setStatus('loading');

        try {
            const res = await fetch(`${API_URL}/api/Waitlist/Register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, platform }),
            });

            if (res.ok) {
                const data = await res.json();
                if (data.data?.message === 'Email already registered') {
                    setStatus('duplicate');
                    setTimeout(() => {
                        setStatus('idle');
                        setFlowState('success');
                    }, 2000);
                } else {
                    setFlowState('success');
                    setStatus('idle');
                }
                setEmail('');
            } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 3000);
            }
        } catch {
            // Fallback to localStorage if API is down
            const existing = JSON.parse(localStorage.getItem('bettacool-waitlist') || '[]');
            if (!existing.includes(email)) {
                existing.push(email);
                localStorage.setItem('bettacool-waitlist', JSON.stringify(existing));
            }
            setFlowState('success');
            setStatus('idle');
            setEmail('');
        }
    };

    const handleRegisterAnother = () => {
        setPlatform(null);
        setEmail('');
        setStatus('idle');
        setFlowState('selecting');
    };

    const platformButtons: { key: Platform; icon: string; label: string }[] = [
        { key: 'ios', icon: '', label: t.email.ios },
        { key: 'android', icon: '', label: t.email.android },
        { key: 'both', icon: '', label: t.email.both },
    ];

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
                <p className="text-base sm:text-lg text-text-secondary mb-10 max-w-[500px] mx-auto">
                    {t.email.subtitle}
                </p>

                {/* ===== Step 1: Platform Selection ===== */}
                {flowState === 'selecting' && (
                    <div className="animate-fade-in-up">
                        <p className="text-text-primary font-semibold text-base mb-5 flex items-center justify-center gap-2">
                            <Smartphone className="w-5 h-5 text-accent" strokeWidth={1.5} />
                            {t.email.platformLabel}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            {platformButtons.map((btn) => (
                                <button
                                    key={btn.key}
                                    onClick={() => handleSelectPlatform(btn.key)}
                                    className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl border-2 border-border-subtle bg-bg-surface/60 backdrop-blur-sm text-text-primary font-semibold text-base cursor-pointer transition-all hover:border-accent/50 hover:bg-accent/5 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(67,97,238,0.15)] font-[inherit]"
                                >
                                    {btn.key === 'ios' && <AppleIcon className="w-5 h-5" />}
                                    {btn.key === 'android' && <PlayStoreIcon className="w-5 h-5" />}
                                    {btn.key === 'both' && <BothIcon className="w-5 h-5" />}
                                    {btn.label}
                                </button>
                            ))}
                        </div>

                        {/* Social proof */}
                        {waitlistCount > 0 && (
                            <div className="inline-flex items-center gap-2 bg-accent/5 border border-accent/15 rounded-full px-5 py-2.5 text-sm text-accent mt-8 animate-fade-in-up delay-200">
                                <Users className="w-4 h-4" strokeWidth={1.5} />
                                <span className="font-semibold">{waitlistCount.toLocaleString()}</span>
                                <span className="text-text-secondary">{t.email.socialProof}</span>
                            </div>
                        )}
                    </div>
                )}

                {/* ===== Step 2: Email Input ===== */}
                {flowState === 'filling' && (
                    <div className="animate-fade-in-up">
                        {/* Selected platform badge */}
                        <div className="flex items-center justify-center gap-2 mb-5">
                            <button
                                onClick={() => setFlowState('selecting')}
                                className="inline-flex items-center gap-2 bg-accent/10 text-accent border border-accent/30 px-4 py-2 rounded-full font-semibold text-sm cursor-pointer transition-all hover:bg-accent/20 font-[inherit]"
                            >
                                {platform === 'ios' && <AppleIcon className="w-4 h-4" />}
                                {platform === 'android' && <PlayStoreIcon className="w-4 h-4" />}
                                {platform === 'both' && <BothIcon className="w-4 h-4" />}
                                {platform === 'ios' && t.email.ios}
                                {platform === 'android' && t.email.android}
                                {platform === 'both' && t.email.both}
                                <span className="text-xs opacity-60">✎</span>
                            </button>
                        </div>

                        {/* Platform hint */}
                        <div className="flex items-center justify-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3 text-sm text-amber-400 mb-5">
                            <Smartphone className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                            <span>{getPlatformHint()}</span>
                        </div>

                        {status === 'duplicate' && (
                            <div className="flex items-center justify-center gap-2 bg-accent/10 text-accent border border-accent/20 rounded-xl px-5 py-3 text-sm mb-4">
                                <CheckCircle2 className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                                {t.email.duplicate}
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
                                disabled={status === 'loading'}
                                id="email-input"
                                autoFocus
                            />
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="inline-flex items-center justify-center gap-2 px-7 py-4 text-white border-none rounded-2xl text-base font-bold cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(67,97,238,0.3)] whitespace-nowrap font-[inherit] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                                style={{ background: 'linear-gradient(90deg, #3a0ca3 0%, #4361ee 50%, #4cc9f0 100%)' }}
                                id="email-submit"
                            >
                                <Send className={`w-4 h-4 ${status === 'loading' ? 'animate-pulse' : ''}`} strokeWidth={1.5} />
                                {status === 'loading' ? t.email.loading : t.email.button}
                            </button>
                        </form>

                        <p className="text-text-muted text-xs">{t.email.privacy}</p>
                    </div>
                )}

                {/* ===== Step 3: Success + LINE Group ===== */}
                {flowState === 'success' && (
                    <div className="animate-fade-in-up">
                        {/* Success badge */}
                        <div className="glass-card rounded-2xl p-8 sm:p-10 mb-6" style={{ transform: 'none' }}>
                            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-5">
                                <CheckCircle2 className="w-8 h-8 text-success" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">{t.email.success}</h3>
                            <p className="text-text-secondary text-sm mb-8">{t.email.successDesc}</p>

                            {/* LINE Group CTA */}
                            <a
                                href={LINE_GROUP_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl text-white font-bold text-base no-underline transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(6,199,85,0.3)] mb-3"
                                style={{ background: 'linear-gradient(135deg, #06C755 0%, #04B34C 100%)' }}
                            >
                                <MessageCircle className="w-5 h-5" strokeWidth={2} />
                                {t.email.lineGroup}
                            </a>
                            <p className="text-text-secondary text-sm mb-0">{t.email.lineGroupDesc}</p>
                        </div>

                        {/* Register another */}
                        <button
                            onClick={handleRegisterAnother}
                            className="inline-flex items-center gap-2 text-accent text-sm font-semibold bg-transparent border-none cursor-pointer transition-all hover:gap-3 font-[inherit]"
                        >
                            {t.email.registerAnother}
                            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
