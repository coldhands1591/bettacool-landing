'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import Image from 'next/image';

export default function Navbar() {
    const { t, toggleLang } = useLanguage();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setMobileOpen(false);
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-bg-primary/90 backdrop-blur-xl border-b border-border-subtle py-3'
                : 'bg-transparent py-4'
                }`}
        >
            <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <a href="#hero" className="flex items-center gap-2.5 no-underline">
                    <Image src="/images/icon.png" alt="bettacool" width={36} height={36} className="rounded-lg" />
                    <span className="text-xl font-extrabold tracking-wide brand-gradient">
                        bettacool
                    </span>
                </a>

                {/* Mobile toggle */}
                <button
                    className="md:hidden bg-transparent border-none text-text-primary text-2xl cursor-pointer p-2"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? '✕' : '☰'}
                </button>

                {/* Links */}
                <ul
                    className={`list-none items-center gap-8 ${mobileOpen
                        ? 'flex flex-col absolute top-full left-0 right-0 bg-bg-primary/98 backdrop-blur-xl p-6 gap-5 border-b border-border-subtle'
                        : 'hidden md:flex'
                        }`}
                >
                    <li
                        className="text-text-secondary font-medium text-sm cursor-pointer hover:text-text-primary transition-colors"
                        onClick={() => scrollTo('features')}
                    >
                        {t.nav.features}
                    </li>
                    <li
                        className="text-text-secondary font-medium text-sm cursor-pointer hover:text-text-primary transition-colors"
                        onClick={() => scrollTo('comparison')}
                    >
                        {t.nav.why}
                    </li>
                    <li
                        className="text-text-secondary font-medium text-sm cursor-pointer hover:text-text-primary transition-colors"
                        onClick={() => scrollTo('download')}
                    >
                        {t.nav.signup}
                    </li>
                    {/* <li
                        className="text-text-secondary font-medium text-sm cursor-pointer hover:text-[#06C755] transition-colors"
                        onClick={() => scrollTo('line')}
                    >
                        {t.nav.line}
                    </li> */}
                    <li
                        className="text-text-secondary font-medium text-sm cursor-pointer hover:text-text-primary transition-colors"
                        onClick={() => scrollTo('contact')}
                    >
                        {t.nav.contact}
                    </li>
                    <li>
                        <button
                            className="bg-accent/10 text-accent border border-accent/30 px-4 py-2 rounded-full font-semibold text-xs cursor-pointer transition-all hover:bg-accent hover:text-white font-[inherit]"
                            onClick={toggleLang}
                        >
                            {t.nav.lang}
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
