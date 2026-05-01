'use client'

import Link from 'next/link'
import { Droplets, Heart, Sparkles, Circle, Sun, Shield, Clock, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ChapterHeading } from '@/components/ui/chapter-heading'
import { AtmosphereSection } from '@/components/ui/atmosphere-section'
import { useLocale } from '@/components/providers/locale-provider'
import { localizeHref } from '@/lib/i18n'

const concerns = [
  { id: 'hydration', name: 'Hydration', icon: Droplets, color: 'from-blush-pink/70 to-nude-beige', count: 42 },
  { id: 'soothing', name: 'Soothing', icon: Heart, color: 'from-rose-mauve/30 to-blush-pink/70', count: 28 },
  { id: 'glow', name: 'Glow & Radiance', icon: Sparkles, color: 'from-champagne-gold/35 to-nude-beige', count: 35 },
  { id: 'pores', name: 'Pores', icon: Circle, color: 'from-plum/20 to-rose-mauve/25', count: 18 },
  { id: 'tone-up', name: 'Tone-Up', icon: Sun, color: 'from-champagne-gold/30 to-blush-pink/45', count: 24 },
  { id: 'sensitive', name: 'Sensitive Skin', icon: Shield, color: 'from-nude-beige to-blush-pink/55', count: 31 },
  { id: 'anti-aging', name: 'Anti-Aging', icon: Clock, color: 'from-plum/15 to-champagne-gold/25', count: 22 },
  { id: 'acne', name: 'Acne & Blemishes', icon: XCircle, color: 'from-rose-mauve/25 to-blush-pink/60', count: 19 },
]

export function ConcernsSection() {
  const { locale, dictionary } = useLocale()
  const t = dictionary.home
  const copy = {
    description: locale === 'ar' ? 'اعثري على منتجات مصممة لاحتياجات بشرتك المحددة.' : locale === 'fr' ? 'Trouvez des produits formulés pour vos besoins cutanés précis.' : locale === 'de' ? 'Finde Formeln für deine konkreten Hautbedürfnisse.' : locale === 'ko' ? '피부 고민에 맞춘 제품을 찾아보세요.' : locale === 'tr' ? 'Cilt ihtiyacınıza özel formülleri bulun.' : 'Find products formulated to address your specific skin concerns. Korean beauty expertise meets your unique needs.',
    products: locale === 'ar' ? 'منتج' : locale === 'fr' ? 'produits' : locale === 'de' ? 'Produkte' : locale === 'ko' ? '개 제품' : locale === 'tr' ? 'ürün' : 'products',
  }
  return (
    <AtmosphereSection atmosphere="blush" withAtmosphereOverlay={false} className="relative overflow-hidden py-24 lg:py-32">
      <div className="relative max-w-7xl mx-auto px-4 lg:px-6">
        <ChapterHeading
          kicker={t.targetedSolutions}
          title={t.shopByConcern}
          description={copy.description}
          align="center"
          className="mb-12 lg:mb-16 max-w-4xl mx-auto"
        />

        {/* Concerns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {concerns.map((concern) => (
            <div key={concern.id}>
              <Link
                href={localizeHref(`/shop?concern=${concern.id}`, locale)}
                className="group block"
              >
                <div
                  className={cn(
                    'relative aspect-square rounded-2xl overflow-hidden',
                    'bg-gradient-to-br',
                    concern.color,
                    'transition-all duration-500',
                    'hover:shadow-luxury hover:-translate-y-1'
                  )}
                >
                  {/* Icon */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <div
                      className="p-4 rounded-full bg-white/60 mb-4 shadow-sm transition-transform duration-300 group-hover:scale-105"
                    >
                      <concern.icon className="w-8 h-8 text-charcoal/80" />
                    </div>
                    <h3 className="font-medium text-charcoal text-center text-sm lg:text-base">
                      {concern.name}
                    </h3>
                    <p className="text-xs text-charcoal/60 mt-1">
                      {concern.count} {copy.products}
                    </p>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors duration-300" />
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Region Banner */}
        <div className="mt-16 p-6 lg:p-8 rounded-2xl bg-gradient-to-r from-plum/5 via-rose-mauve/5 to-champagne-gold/5 border border-blush-pink/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div>
              <h3 className="font-serif font-semibold text-charcoal text-lg">
                {t.shoppingDifferentRegion}
              </h3>
              <p className="text-muted-foreground mt-1">
                {t.marketMayVary}
              </p>
            </div>
            <Link
              href={localizeHref('/help/shipping', locale)}
              className={cn(
                'px-6 py-3 rounded-full whitespace-nowrap',
                'bg-plum text-warm-ivory font-medium',
                'hover:bg-plum/90 transition-colors'
              )}
            >
              {t.viewShippingInfo}
            </Link>
          </div>
        </div>
      </div>
    </AtmosphereSection>
  )
}
