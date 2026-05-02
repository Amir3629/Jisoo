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
import { useLocale } from '@/components/providers/locale-provider'

function TrustpilotRatingStrip() {
  const { locale } = useLocale()
  const copy = {
    excellent: locale === 'ar' ? 'ممتاز' : locale === 'fr' ? 'Excellent' : locale === 'de' ? 'Ausgezeichnet' : locale === 'ko' ? '훌륭함' : locale === 'tr' ? 'Mükemmel' : 'Excellent',
    reviewsOn: locale === 'ar' ? 'تقييم على' : locale === 'fr' ? 'avis sur' : locale === 'de' ? 'Bewertungen auf' : locale === 'ko' ? '개의 리뷰' : locale === 'tr' ? 'yorum' : 'reviews on',
  }
  return (
    <a
      href="https://www.trustpilot.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Trustpilot reviews"
      className="group relative z-10 mx-auto flex min-h-[78px] max-w-7xl flex-col items-center justify-center gap-2.5 px-4 text-center text-charcoal transition hover:opacity-90 sm:min-h-[86px] lg:flex-row lg:gap-4"
    >
      <span className="text-lg font-semibold sm:text-xl">{copy.excellent}</span>

      <span className="flex items-center gap-1" aria-label="4.4 out of 5 star rating on Trustpilot">
        {[0, 1, 2, 3, 4].map((star) => (
          <span key={star} className="relative grid h-6 w-6 place-items-center sm:h-7 sm:w-7">
            {star === 4 && <span className="absolute inset-y-0 right-0 w-[34%] bg-[#dcdce6]" />}
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-[#00B67A] sm:h-[18px] sm:w-[18px]">
              <path d="M12 2.75 14.18 9.45h7.05l-5.7 4.14 2.18 6.7L12 16.15l-5.71 4.14 2.18-6.7-5.7-4.14h7.05L12 2.75z" />
            </svg>
          </span>
        ))}
      </span>

      <span className="flex flex-wrap items-center justify-center gap-1.5 text-sm text-charcoal/86 sm:text-base">
        <strong className="font-semibold text-charcoal">2,737</strong>
        <span>{copy.reviewsOn}</span>
        <span className="inline-flex items-center gap-1.5 font-semibold text-charcoal">
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px] text-[#00B67A] sm:h-5 sm:w-5">
            <path d="M12 1.5 14.54 9.32H23l-6.84 4.97 2.61 8.03L12 17.36l-6.77 4.96 2.61-8.03L1 9.32h8.46L12 1.5z" />
          </svg>
          Trustpilot
        </span>
      </span>
    </a>
  )
}

export function HomePageShell() {
  return (
    <LuxuryIntroSplash>
      <main className="home-continuous-surface min-h-screen relative">
        <HomeAtmosphereCanvas />
        <div className="pointer-events-none fixed inset-y-0 left-6 hidden xl:block w-px bg-gradient-to-b from-transparent via-rose-mauve/25 to-transparent -z-[5]" />
        <div className="pointer-events-none fixed inset-y-0 right-6 hidden xl:block w-px bg-gradient-to-b from-transparent via-champagne-gold/25 to-transparent -z-[5]" />
        <Header />
        <HeroSection />
        <div className="relative overflow-hidden">
          <div className="transition-veil pointer-events-none absolute inset-x-0 top-0" />
          <TrustpilotRatingStrip />
        </div>
        <PartnersSection />
        <CategoriesSection />
        <FeaturedProducts />
        <section className="relative isolate">
          <div className="pointer-events-none sticky top-0 h-screen overflow-hidden">
            <div className="absolute inset-0 bg-[url('/background/Dynamic.png')] bg-cover bg-center bg-no-repeat" />
            <div className="absolute inset-0 bg-warm-ivory/80" />
          </div>
          <div className="relative z-10 -mt-[100vh]">
            <RitualSection />
            <AiAssistantTeaser />
            <ConcernsSection />
            <TestimonialsSection />
          </div>
        </section>
        <SocialSection />
        <InstagramShowcase />
        <Footer />
        <FloatingAssistant />
      </main>
    </LuxuryIntroSplash>
  )
}
