'use client'

import { useEffect, useRef } from 'react'
import { Star, Quote } from 'lucide-react'
import { testimonials } from '@/lib/data'
import { cn } from '@/lib/utils'
import { ChapterHeading } from '@/components/ui/chapter-heading'
import { AtmosphereSection } from '@/components/ui/atmosphere-section'
import { useLocale } from '@/components/providers/locale-provider'

export function TestimonialsSection() {
  const { locale, dictionary } = useLocale()
  const t = dictionary.home
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const copy = {
    description: locale === 'ar' ? 'انضمي إلى آلاف العملاء الذين اكتشفوا قوة الجمال الكوري.' : locale === 'fr' ? 'Rejoignez des milliers de clientes qui ont adopté la K-beauty.' : locale === 'de' ? 'Schließe dich Tausenden zufriedener Beauty-Fans an.' : locale === 'ko' ? 'K-뷰티의 변화를 경험한 고객들과 함께하세요.' : locale === 'tr' ? 'K-beauty etkisini keşfeden binlerce müşteriye katılın.' : 'Join thousands of satisfied customers who have discovered the transformative power of K-beauty.',
    stats: locale === 'ar'
      ? ['عملاء سعداء', 'متوسط التقييم', 'يوصون بنا', 'تقييم']
      : locale === 'fr'
        ? ['Clientes heureuses', 'Note moyenne', 'Recommandent', 'Avis']
        : locale === 'de'
          ? ['Glückliche Kunden', 'Durchschnitt', 'Empfehlen uns', 'Bewertungen']
          : locale === 'ko'
            ? ['만족 고객', '평균 평점', '추천 의향', '리뷰']
            : locale === 'tr'
              ? ['Mutlu müşteri', 'Ortalama puan', 'Tavsiye eder', 'Yorum']
              : ['Happy Customers', 'Average Rating', 'Would Recommend', 'Reviews'],
  }
  const marqueeTestimonials = [...testimonials, ...testimonials, ...testimonials]

  useEffect(() => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    let frame = 0
    let offset = 0
    const baseSpeed = 0.26
    let speed = baseSpeed
    let targetSpeed = baseSpeed
    let lastScrollY = window.scrollY
    let lastInteraction = 0

    const getLoopWidth = () => track.scrollWidth / 3

    const animate = () => {
      const loopWidth = getLoopWidth()
      const shouldPause = container.matches(':hover') || document.hidden
      const desiredSpeed = shouldPause ? 0 : targetSpeed

      speed += (desiredSpeed - speed) * 0.12
      offset += speed

      if (loopWidth > 0) {
        while (offset >= loopWidth) offset -= loopWidth
        while (offset < 0) offset += loopWidth
      }

      track.style.transform = `translate3d(${-offset}px, 0, 0)`

      if (performance.now() - lastInteraction > 680) {
        targetSpeed += (baseSpeed - targetSpeed) * 0.09
      }

      frame = window.requestAnimationFrame(animate)
    }

    const onScroll = () => {
      const delta = window.scrollY - lastScrollY
      lastScrollY = window.scrollY
      if (Math.abs(delta) < 1) return

      targetSpeed = delta > 0 ? 1.55 : -1.15
      lastInteraction = performance.now()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    frame = window.requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <AtmosphereSection atmosphere="ivory" withAtmosphereOverlay={false} className="relative overflow-hidden py-24 lg:py-32">
      <div className="relative max-w-7xl mx-auto px-4 lg:px-6">
        <ChapterHeading
          kicker={t.customerStories}
          title={t.lovedBy}
          description={copy.description}
          align="center"
          className="mb-12 lg:mb-16 max-w-4xl mx-auto"
        />

        {/* Testimonials Carousel */}
        <div
          ref={containerRef}
          className="testimonial-marquee overflow-hidden pb-4 -mx-4 px-4"
        >
          <div ref={trackRef} className="testimonial-marquee-track flex w-max gap-6 will-change-transform">
            {marqueeTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="flex-shrink-0 w-[85vw] max-w-[400px] sm:w-[400px]"
              >
                <div
                  className={cn(
                    'h-full p-8 rounded-3xl',
                    'bg-[linear-gradient(155deg,var(--card)_0%,color-mix(in_srgb,var(--background)_82%,white)_58%,color-mix(in_srgb,var(--background)_88%,#838999)_100%)] border border-[#cfae83]/24',
                    'shadow-luxury'
                  )}
                >
                  <div className="w-12 h-12 rounded-full bg-[#838999]/12 flex items-center justify-center mb-6">
                    <Quote className="w-6 h-6 text-[#838999]" />
                  </div>

                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'w-5 h-5',
                          i < testimonial.rating
                            ? 'text-champagne-gold fill-current'
                            : 'text-blush-pink'
                        )}
                      />
                    ))}
                  </div>

                  <p className="text-charcoal leading-relaxed mb-6">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>

                  {testimonial.productName && (
                        <p className="text-sm text-[#838999] font-medium mb-4">
                      {dictionary.common.purchased}: {testimonial.productName}
                    </p>
                  )}

                  <div className="flex items-center gap-4 pt-6 border-t border-[#cfae83]/24">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#cfae83] to-[#838999] flex items-center justify-center">
                      <span className="text-lg font-semibold text-white">
                        {testimonial.customerName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-charcoal">
                        {testimonial.customerName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.customerLocation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '50K+', label: copy.stats[0] },
            { value: '4.8', label: copy.stats[1] },
            { value: '98%', label: copy.stats[2] },
            { value: '25K+', label: copy.stats[3] },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl lg:text-4xl font-serif font-bold text-plum">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </AtmosphereSection>
  )
}
