'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EditorialMedia } from '@/components/ui/editorial-media'
import { ChapterHeading } from '@/components/ui/chapter-heading'
import { AtmosphereSection } from '@/components/ui/atmosphere-section'
import { useLocale } from '@/components/providers/locale-provider'
import { localizeHref } from '@/lib/i18n'
import { resolveImageSrc } from '@/lib/image-fallbacks'

const ritualSteps = [
  {
    number: '01',
    title: 'Cleanse',
    description:
      'Begin with our gentle cloud foam cleanser. The pH-balanced formula removes impurities while preserving your skin barrier.',
    color: 'from-blush-pink/30',
    image: resolveImageSrc('/assets/editorial/skincare-ingredients.jpg'),
  },
  {
    number: '02',
    title: 'Tone & Prep',
    description:
      'Our Glass Skin Essence preps your skin for optimal absorption. Fermented botanicals plump and hydrate.',
    color: 'from-rose-mauve/20',
    image: resolveImageSrc('/assets/products/glass-skin-essence.jpg'),
  },
  {
    number: '03',
    title: 'Treat',
    description:
      'Apply targeted treatments. Our serums address specific concerns from brightening to soothing.',
    color: 'from-champagne-gold/20',
    image: resolveImageSrc('/assets/products/luminous-glow-serum.jpg'),
  },
  {
    number: '04',
    title: 'Moisturize',
    description:
      'Lock in hydration with our Hydra Cloud Cream. 72-hour moisture retention for plump, dewy skin.',
    color: 'from-plum/10',
    image: resolveImageSrc('/assets/editorial/care-expert.jpg'),
  },
  {
    number: '05',
    title: 'Protect',
    description:
      'Finish with our Aura Tone-Up Sun Cream. SPF50+ protection with a natural glow effect.',
    color: 'from-nude-beige/40',
    image: resolveImageSrc('/assets/editorial/tone-up-sun-cream.png'),
  },
]

export function RitualSection() {
  const { locale, dictionary } = useLocale()
  const t = dictionary.home
  const copy = {
    kicker: locale === 'ar' ? 'طريق الجمال الكوري' : locale === 'fr' ? 'La voie K-Beauty' : locale === 'de' ? 'Der K-Beauty Weg' : locale === 'ko' ? 'K-뷰티 방식' : locale === 'tr' ? 'K-Beauty Yolu' : 'The K-Beauty Way',
    title: locale === 'ar' ? 'طقس الجمال الكوري' : locale === 'fr' ? 'Le rituel de la beauté coréenne' : locale === 'de' ? 'Das Ritual koreanischer Schönheit' : locale === 'ko' ? '코리안 뷰티 리추얼' : locale === 'tr' ? 'Kore Güzellik Ritüeli' : 'The Ritual of Korean Beauty',
    description: locale === 'ar' ? 'اكتشفي فن طبقات المنتجات لتحقيق أفضل النتائج.' : locale === 'fr' ? 'Découvrez l’art de superposer les soins pour une efficacité maximale.' : locale === 'de' ? 'Entdecke das Schichten von Produkten für maximale Wirksamkeit.' : locale === 'ko' ? '최대 효능을 위한 레이어링 루틴을 경험하세요.' : locale === 'tr' ? 'Maksimum etki için ürünleri katmanlama sanatını keşfedin.' : 'Discover the art of layering products for maximum efficacy. Each step builds upon the last for transformative results.',
    step: locale === 'ar' ? 'الخطوة' : locale === 'fr' ? 'Étape' : locale === 'de' ? 'Schritt' : locale === 'ko' ? '단계' : locale === 'tr' ? 'Adım' : 'Step',
  }
  return (
    <AtmosphereSection atmosphere="ivory" withAtmosphereOverlay={false} className="py-24 lg:py-32">
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 opacity-75">
          <div className="absolute top-1/4 -left-32 h-64 w-64 rounded-full bg-blush-pink/14 blur-2xl" />
          <div className="absolute bottom-1/4 -right-32 h-72 w-72 rounded-full bg-rose-mauve/8 blur-2xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 lg:px-6">
          <ChapterHeading
            kicker={copy.kicker}
            title={copy.title}
            description={copy.description}
            align="center"
            className="mx-auto mb-16 max-w-4xl lg:mb-24"
          />

          <div className="relative">
            <div className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-gradient-to-b from-blush-pink via-rose-mauve to-plum opacity-30 lg:block" />

            <div className="space-y-16 lg:space-y-24">
              {ritualSteps.map((step, index) => (
                <div
                  key={step.number}
                  className={cn(
                    'relative grid items-center gap-8 lg:grid-cols-2 lg:gap-20',
                    index % 2 === 1 && 'lg:[direction:rtl]'
                  )}
                >
                  <div className={cn('lg:text-left', index % 2 === 1 && 'lg:order-2 lg:text-right')}>
                    <div
                      className={cn(
                        'mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br',
                        step.color,
                        'to-white border border-blush-pink/30'
                      )}
                    >
                      <span className="font-serif text-xl font-bold text-plum">{step.number}</span>
                    </div>

                    <h3 className="mb-4 font-serif text-2xl font-bold text-charcoal lg:text-3xl">
                      {step.title}
                    </h3>

                    <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>

                  <div className={cn(index % 2 === 1 && 'lg:order-1')}>
                    <div
                      className={cn(
                        'relative mx-auto aspect-square max-w-sm overflow-hidden rounded-3xl bg-gradient-to-br',
                        step.color,
                        'to-white shadow-editorial'
                      )}
                    >
                      <EditorialMedia
                        src={step.image}
                        alt={step.title}
                        className="absolute inset-0"
                        sizes="(max-width: 1024px) 100vw, 384px"
                        hint={`${copy.step} ${step.number}`}
                      />

                      <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/30" />
                      <div className="absolute -left-5 -top-5 h-24 w-24 rounded-full bg-white/20" />
                    </div>
                  </div>

                  <div className="absolute left-1/2 top-1/2 z-10 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-warm-ivory bg-rose-mauve lg:block" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 text-center">
            <Link
              href={localizeHref('/shop', locale)}
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-8 py-4',
                'bg-gradient-to-r from-rose-mauve to-champagne-gold font-medium text-white transition-all duration-300 hover:brightness-105',
                'shadow-lg shadow-rose-mauve/20'
              )}
            >
              {t.shopTheRitual}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </AtmosphereSection>
  )
}
