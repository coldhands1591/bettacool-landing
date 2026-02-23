'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Mail } from 'lucide-react';

export default function StickyCTA() {
    const { t } = useLanguage();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling past 600px and hide when signup section is visible
            const signupSection = document.getElementById('signup');
            if (signupSection) {
                const rect = signupSection.getBoundingClientRect();
                const isPastHero = window.scrollY > 600;
                const isSignupVisible = rect.top < window.innerHeight && rect.bottom > 0;
                setVisible(isPastHero && !isSignupVisible);
            } else {
                setVisible(window.scrollY > 600);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSignup = () => {
        document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-all duration-300 ${visible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-full opacity-0 pointer-events-none'
                }`}
        >
            <div className="bg-bg-primary/95 backdrop-blur-xl border-t border-border-subtle px-4 py-3 safe-area-bottom">
                <button
                    onClick={scrollToSignup}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white font-bold text-base border-none cursor-pointer transition-all active:scale-[0.98] font-[inherit]"
                    style={{ background: 'linear-gradient(90deg, #3a0ca3 0%, #4361ee 50%, #4cc9f0 100%)' }}
                >
                    <Mail className="w-5 h-5" strokeWidth={1.5} />
                    {t.hero.cta}
                </button>
            </div>
        </div>
    );
}
