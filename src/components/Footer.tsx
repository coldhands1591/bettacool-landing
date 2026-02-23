'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import Image from 'next/image';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-bg-primary border-t border-border-subtle pt-14 pb-8 px-6" id="footer">
            <div className="max-w-[1200px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10 mb-10 text-center md:text-left">
                    {/* Brand */}
                    <div className="flex flex-col gap-3 items-center md:items-start">
                        <div className="flex items-center gap-2.5">
                            <Image src="/images/icon.png" alt="bettacool" width={28} height={28} className="rounded-md" />
                            <span className="text-xl font-extrabold tracking-wide brand-gradient">
                                bettacool
                            </span>
                        </div>
                        <p className="text-text-secondary text-sm max-w-[300px] leading-relaxed">
                            {t.footer.description}
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold text-sm mb-4 text-text-primary">{t.footer.links}</h4>
                        <ul className="flex flex-col gap-2.5 list-none">
                            <li><a href="#features" className="text-text-secondary text-sm hover:text-accent transition-colors no-underline">{t.nav.features}</a></li>
                            <li><a href="#comparison" className="text-text-secondary text-sm hover:text-accent transition-colors no-underline">{t.nav.why}</a></li>
                            <li><a href="#signup" className="text-text-secondary text-sm hover:text-accent transition-colors no-underline">{t.nav.signup}</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-bold text-sm mb-4 text-text-primary">{t.footer.legal}</h4>
                        <ul className="flex flex-col gap-2.5 list-none">
                            <li><a href="https://coldhands1591.github.io/bettacool-legal/privacy-policy.html" target="_blank" rel="noopener noreferrer" className="text-text-secondary text-sm hover:text-accent transition-colors no-underline">{t.footer.privacy}</a></li>
                            <li><a href="https://coldhands1591.github.io/bettacool-legal/terms-of-service.html" target="_blank" rel="noopener noreferrer" className="text-text-secondary text-sm hover:text-accent transition-colors no-underline">{t.footer.terms}</a></li>
                            <li><a href="#contact" className="text-text-secondary text-sm hover:text-accent transition-colors no-underline">{t.footer.contact}</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border-subtle pt-6 text-center text-text-muted text-xs">
                    {t.footer.rights}
                </div>
            </div>
        </footer>
    );
}
