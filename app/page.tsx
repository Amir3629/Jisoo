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

export default function HomePage() {
  return (
    <main className="min-h-screen bg-warm-ivory">
      <Header />
      <HeroSection />
      <PartnersSection />
      <CategoriesSection />
      <FeaturedProducts />
      <RitualSection />
      <AiAssistantTeaser />
      <ConcernsSection />
      <TestimonialsSection />
      <SocialSection />
      <Footer />
    </main>
  )
}
