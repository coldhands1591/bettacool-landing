'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PainPoints from '@/components/PainPoints';
import Solution from '@/components/Solution';
import Features from '@/components/Features';
import Comparison from '@/components/Comparison';
import DownloadSection from '@/components/EmailSignup';
import BrandStory from '@/components/BrandStory';
import ContactForm from '@/components/ContactForm';
import LineGroup from '@/components/LineGroup';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';

export default function Home() {
  return (
    <>
      {/* Floating bubbles — full page background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
        <div className="bubble" style={{ left: '10%', width: 80, height: 80, animationDuration: '12s', animationDelay: '0s' }} />
        <div className="bubble" style={{ left: '70%', width: 40, height: 40, animationDuration: '15s', animationDelay: '2s' }} />
        <div className="bubble" style={{ left: '30%', width: 60, height: 60, animationDuration: '18s', animationDelay: '4s' }} />
        <div className="bubble" style={{ left: '85%', width: 100, height: 100, animationDuration: '20s', animationDelay: '1s' }} />
        <div className="bubble" style={{ left: '50%', width: 30, height: 30, animationDuration: '10s', animationDelay: '5s' }} />
        <div className="bubble" style={{ left: '20%', width: 50, height: 50, animationDuration: '16s', animationDelay: '3s' }} />
        <div className="bubble" style={{ left: '60%', width: 70, height: 70, animationDuration: '14s', animationDelay: '6s' }} />
        <div className="bubble" style={{ left: '90%', width: 25, height: 25, animationDuration: '11s', animationDelay: '7s' }} />
      </div>

      <Navbar />
      <main>
        <Hero />
        <PainPoints />
        <Solution />
        <Features />
        <Comparison />
        <DownloadSection />
        <BrandStory />
        {/* <LineGroup /> */}
        <ContactForm />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
