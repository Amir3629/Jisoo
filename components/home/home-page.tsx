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
import { TestimonialsSection } from '@/components/home/testimonials-section'
import { SocialSection } from '@/components/home/social-section'
import { InstagramShowcase } from '@/components/home/instagram-showcase'
import { HomeAtmosphereCanvas } from '@/components/layout/home-atmosphere-canvas'
import { FloatingAssistant } from '@/components/ai/floating-assistant'
import { LuxuryIntroSplash } from '@/components/home/luxury-intro-splash'

export function HomePageShell() {
  return (
    <LuxuryIntroSplash>
      <main className="min-h-screen relative">
        <HomeAtmosphereCanvas />
        <div className="pointer-events-none fixed inset-y-0 left-6 hidden xl:block w-px bg-gradient-to-b from-transparent via-rose-mauve/25 to-transparent -z-[5]" />
        <div className="pointer-events-none fixed inset-y-0 right-6 hidden xl:block w-px bg-gradient-to-b from-transparent via-champagne-gold/25 to-transparent -z-[5]" />
        <Header />
        <HeroSection />
        <div className="transition-veil" />
        <PartnersSection />
        <CategoriesSection />
        <FeaturedProducts />
        <div className="transition-veil" />
        <RitualSection />
        <AiAssistantTeaser />
        <ConcernsSection />
        <TestimonialsSection />
        <SocialSection />
        <InstagramShowcase />
        <Footer />
        <FloatingAssistant />
      </main>
    </LuxuryIntroSplash>
  )
}
