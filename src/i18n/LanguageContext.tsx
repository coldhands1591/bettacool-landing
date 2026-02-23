'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import th from './th.json';
import en from './en.json';

type Lang = 'th' | 'en';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface LanguageContextValue {
    lang: Lang;
    t: any;
    toggleLang: () => void;
}

const translations = { th, en };
const LanguageContext = createContext<LanguageContextValue | null>(null);

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) throw new Error('useLanguage must be used within LanguageProvider');
    return context;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
    // Always start with 'th' on both server and client to avoid hydration mismatch
    const [lang, setLang] = useState<Lang>('th');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('bettacool-lang') as Lang | null;
        if (saved && (saved === 'th' || saved === 'en')) {
            setLang(saved);
        }
        setMounted(true);
    }, []);

    const toggleLang = () => {
        const next = lang === 'th' ? 'en' : 'th';
        setLang(next);
        localStorage.setItem('bettacool-lang', next);
    };

    // Prevent hydration mismatch by not rendering until mounted
    if (!mounted) {
        return (
            <LanguageContext.Provider value={{ lang: 'th', t: translations['th'], toggleLang }}>
                {children}
            </LanguageContext.Provider>
        );
    }

    return (
        <LanguageContext.Provider value={{ lang, t: translations[lang], toggleLang }}>
            {children}
        </LanguageContext.Provider>
    );
}
