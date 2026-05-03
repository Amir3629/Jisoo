'use client'

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

export function HomePageShell() {
  return (
    <LuxuryIntroSplash>
      <main className="home-continuous-surface snap-page-flow min-h-screen relative">
        <Header transparentOnTop />
        <HeroSection />
        <CategoriesSection />
        <FeaturedProducts />
        <section className="relative isolate">
          <div className="pointer-events-none sticky top-0 h-screen overflow-hidden">
            <div className="absolute inset-0 bg-[url('/assets/hero/dynamic-surface.png')] bg-cover bg-center bg-no-repeat" />
            <div className="absolute inset-0 bg-warm-ivory/80" />
          </div>
          <div className="relative z-10 -mt-[100vh]">
            <RitualSection />
            <AiAssistantTeaser />
            <ConcernsSection />
            <CareCtaSection />
            <TestimonialsSection />
          </div>
        </section>
        <PartnersSection />
        <SocialSection />
        <InstagramShowcase />
        <Footer />
        <FloatingAssistant />
      </main>
    </LuxuryIntroSplash>
  )
}
