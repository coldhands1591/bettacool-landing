'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PhoneScreen {
    title: string;
    image: string;
}

const screens: PhoneScreen[] = [
    { title: 'ฟีดชุมชน', image: '/images/preview/bettacool3.png' },
    { title: 'รายละเอียดโพสต์', image: '/images/preview/bettacool4.png' },
    { title: 'ค้นหา & เทรนด์', image: '/images/preview/bettacool5.png' },
    { title: 'กลุ่มชุมชน', image: '/images/preview/bettacool6.png' },
    { title: 'โปรไฟล์', image: '/images/preview/bettacool7.png' },
    { title: 'การแจ้งเตือน', image: '/images/preview/bettacool8.png' },
    { title: 'แชทส่วนตัว', image: '/images/preview/bettacool9.png' },
];

export default function PhoneCarousel() {
    const [current, setCurrent] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const goTo = useCallback((index: number) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrent(index);
            setTimeout(() => setIsTransitioning(false), 50);
        }, 200);
    }, [isTransitioning]);

    const next = useCallback(() => {
        goTo((current + 1) % screens.length);
    }, [current, goTo]);

    const prev = useCallback(() => {
        goTo((current - 1 + screens.length) % screens.length);
    }, [current, goTo]);

    // Auto-slide
    useEffect(() => {
        const timer = setInterval(next, 4000);
        return () => clearInterval(timer);
    }, [next]);

    const screen = screens[current];

    return (
        <div className="flex flex-col items-center gap-5">
            {/* Phone + arrows row */}
            <div className="flex items-center gap-3 sm:gap-5">
                {/* Left arrow — outside the phone */}
                <button
                    onClick={prev}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-bg-surface/80 backdrop-blur-sm border border-border-subtle text-text-primary flex items-center justify-center cursor-pointer hover:bg-accent/20 hover:border-accent/40 transition-all shrink-0"
                    aria-label="Previous screen"
                >
                    <ChevronLeft className="w-5 h-5" strokeWidth={2} />
                </button>

                {/* Phone frame */}
                <div
                    className="relative w-[240px] h-[520px] sm:w-[270px] sm:h-[585px] rounded-[36px] border-[3px] border-[#2a2d3a] overflow-hidden shadow-2xl animate-float"
                    style={{
                        boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 80px rgba(67, 97, 238, 0.2)',
                    }}
                >
                    {/* Screen image — fill entire frame */}
                    <div className={`absolute inset-0 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                        <Image
                            src={screen.image}
                            alt={screen.title}
                            fill
                            className="object-cover"
                            sizes="270px"
                            priority={current === 0}
                        />
                    </div>
                </div>

                {/* Right arrow — outside the phone */}
                <button
                    onClick={next}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-bg-surface/80 backdrop-blur-sm border border-border-subtle text-text-primary flex items-center justify-center cursor-pointer hover:bg-accent/20 hover:border-accent/40 transition-all shrink-0"
                    aria-label="Next screen"
                >
                    <ChevronRight className="w-5 h-5" strokeWidth={2} />
                </button>
            </div>

            {/* Screen title */}
            <p className="text-text-secondary text-sm font-medium">{screen.title}</p>

            {/* Dots indicator */}
            <div className="flex gap-1.5">
                {screens.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        className={`h-2 rounded-full border-none cursor-pointer transition-all duration-300 ${i === current
                                ? 'bg-accent w-6'
                                : 'bg-text-muted/30 w-2 hover:bg-text-muted/60'
                            }`}
                        aria-label={`Go to screen ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
