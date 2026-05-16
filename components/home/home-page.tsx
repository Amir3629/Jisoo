'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/home/hero-section'
import { PartnersSection } from '@/components/home/partners-section'
import { CategoriesSection } from '@/components/home/categories-section'
import { FeaturedProducts } from '@/components/home/featured-products'
import { RitualSection } from '@/components/home/ritual-section'
import { AiAssistantTeaser } from '@/components/home/ai-assistant-teaser'
import { ConcernsSection } from '@/components/home/concerns-section'
import { CareCtaSection } from '@/components/home/care-cta-section'
import { TestimonialsSection } from '@/components/home/testimonials-section'
import { SocialSection } from '@/components/home/social-section'
import { InstagramShowcase } from '@/components/home/instagram-showcase'
import { FloatingAssistant } from '@/components/ai/floating-assistant'
import { LuxuryIntroSplash } from '@/components/home/luxury-intro-splash'

function ScrollReveal({ children, direction = 'up', snapLabel }: { children: React.ReactNode; direction?: 'up' | 'left' | 'right'; snapLabel?: string }) {
  const offset = direction === 'left' ? { x: -38, y: 0 } : direction === 'right' ? { x: 38, y: 0 } : { x: 0, y: 38 }

  return (
    <motion.div
      className="snap-section scroll-reveal"
      data-snap-label={snapLabel}
      initial={{ opacity: 0, ...offset, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.18, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function BackgroundBreathSlide() {
  return null
}

export function HomePageShell() {
  return (
    <LuxuryIntroSplash>
      <main className="home-continuous-surface snap-page-flow min-h-screen relative">
        <Header transparentOnTop />
        <HeroSection />
        <ScrollReveal><CategoriesSection /></ScrollReveal>
        <ScrollReveal direction="right"><FeaturedProducts /></ScrollReveal>
        <section className="relative isolate" data-snap-free-scroll="true" data-snap-label="JISOO dynamic care story">
          <div className="pointer-events-none sticky top-0 h-screen overflow-hidden">
            <div
              className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat md:block"
              style={{ backgroundImage: "url('/assets/hero/dynamic-surface.png?v=20260509-1')" }}
            />
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
              style={{ backgroundImage: "url('/assets/hero/dynamic-surface%20mobile.png?v=20260509-1')" }}
            />
            <div className="absolute inset-0 bg-warm-ivory/80" />
          </div>
          <div className="relative z-10 -mt-[100vh]">
            <ScrollReveal snapLabel="The Ritual of Korean Beauty"><RitualSection /></ScrollReveal>
            <ScrollReveal direction="left" snapLabel="The Concierge Beauty Advisor"><AiAssistantTeaser /></ScrollReveal>
            <ScrollReveal direction="right"><ConcernsSection /></ScrollReveal>
            <ScrollReveal snapLabel="Start with what your skin actually needs"><CareCtaSection /></ScrollReveal>
            <ScrollReveal direction="left"><TestimonialsSection /></ScrollReveal>
            <BackgroundBreathSlide />
          </div>
        </section>
        <ScrollReveal><PartnersSection /></ScrollReveal>
        <ScrollReveal direction="right"><SocialSection /></ScrollReveal>
        <ScrollReveal><InstagramShowcase /></ScrollReveal>
        <Footer />
        <FloatingAssistant />
      </main>
    </LuxuryIntroSplash>
  )
}
