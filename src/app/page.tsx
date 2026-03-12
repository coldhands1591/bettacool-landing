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
      <Navbar />
      <main>
        <Hero />
        <PainPoints />
        <Solution />
        <Features />
        <Comparison />
        <DownloadSection />
        <BrandStory />
        <LineGroup />
        <ContactForm />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
