'use client'

import { useEffect, useRef } from 'react'
import { Quote, Star } from 'lucide-react'
import { ChapterHeading } from '@/components/ui/chapter-heading'
import { AtmosphereSection } from '@/components/ui/atmosphere-section'
import { useLocale } from '@/components/providers/locale-provider'
import { cn } from '@/lib/utils'

const reviewPlaceholders = [
  {
    id: 'review-framework-1',
    label: 'Verified review import',
    title: 'Texture feedback',
    body: 'Customer note will appear here after order verification and moderation approval.',
  },
  {
    id: 'review-framework-2',
    label: 'Verified review import',
    title: 'Routine experience',
    body: 'Approved comments will focus on usage, comfort, and routine fit without unverified claims.',
  },
  {
    id: 'review-framework-3',
    label: 'Verified review import',
    title: 'Repeat care note',
    body: 'Only real customer feedback connected to verified purchases will be published here.',
  },
  {
    id: 'review-framework-4',
    label: 'Verified review import',
    title: 'Regional feedback',
    body: 'Region-specific notes can be added after translation and compliance review.',
  },
]

export function TestimonialsSection() {
  const { locale, dictionary } = useLocale()
  const t = dictionary.home
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const copy = {
    description: locale === 'ar' ? 'ستظهر قصص العملاء بعد التحقق من المراجعات الحقيقية.' : locale === 'fr' ? 'Les témoignages apparaîtront après validation de vrais avis clients.' : locale === 'de' ? 'Kundenstimmen erscheinen nach Prüfung echter Bewertungen.' : locale === 'ko' ? '검증된 고객 리뷰가 승인된 후 이곳에 표시됩니다.' : locale === 'tr' ? 'Gerçek müşteri yorumları onaylandıktan sonra burada gösterilecek.' : 'Verified customer stories will appear here after real review approval.',
  }
  const cards = [...reviewPlaceholders, ...reviewPlaceholders, ...reviewPlaceholders]

  useEffect(() => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    let frame = 0
    let offset = 0
    const baseSpeed = 0.18
    let speed = baseSpeed
    let targetSpeed = baseSpeed
    let lastScrollY = window.scrollY
    let lastInteraction = 0

    const getLoopWidth = () => track.scrollWidth / 3

    const animate = () => {
      const loopWidth = getLoopWidth()
      const desiredSpeed = container.matches(':hover') || document.hidden ? 0 : targetSpeed

      speed += (desiredSpeed - speed) * 0.08
      offset += speed

      if (loopWidth > 0) {
        while (offset >= loopWidth) offset -= loopWidth
        while (offset < 0) offset += loopWidth
      }

      track.style.transform = `translate3d(${-offset}px, 0, 0)`

      if (performance.now() - lastInteraction > 520) {
        targetSpeed += (baseSpeed - targetSpeed) * 0.12
      }

      frame = window.requestAnimationFrame(animate)
    }

    const onScroll = () => {
      const delta = window.scrollY - lastScrollY
      lastScrollY = window.scrollY
      if (Math.abs(delta) < 1) return

      targetSpeed = delta > 0 ? 1.25 : -0.9
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

        <div ref={containerRef} className="-mx-4 overflow-hidden px-4 pb-4">
          <div ref={trackRef} className="flex w-max gap-6 will-change-transform">
            {cards.map((card, index) => (
              <div key={`${card.id}-${index}`} className="w-[85vw] max-w-[400px] flex-shrink-0 sm:w-[400px]">
                <div
                  className={cn(
                    'h-full rounded-3xl border border-[#cfae83]/24 p-8 shadow-luxury',
                    'bg-[linear-gradient(155deg,var(--card)_0%,color-mix(in_srgb,var(--background)_88%,white)_58%,color-mix(in_srgb,var(--background)_92%,#cfae83)_100%)]'
                  )}
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#838999]/12">
                    <Quote className="h-6 w-6 text-[#838999]" />
                  </div>
                  <div className="mb-4 flex items-center gap-1">
                    {[0, 1, 2, 3, 4].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-current text-champagne-gold" />
                    ))}
                  </div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal/52">
                    {card.label}
                  </p>
                  <h3 className="mt-3 text-xl text-charcoal">{card.title}</h3>
                  <p className="mt-4 leading-7 text-charcoal/70">{card.body}</p>
                  <div className="mt-6 border-t border-[#cfae83]/24 pt-5">
                    <p className="text-sm font-medium text-[#838999]">Review import pending</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AtmosphereSection>
  )
}
