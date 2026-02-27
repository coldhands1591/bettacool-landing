'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PainPoints from '@/components/PainPoints';
import Solution from '@/components/Solution';
import Features from '@/components/Features';
import Comparison from '@/components/Comparison';
import EmailSignup from '@/components/EmailSignup';
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
        <EmailSignup />
        <BrandStory />
        <LineGroup />
        <ContactForm />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
