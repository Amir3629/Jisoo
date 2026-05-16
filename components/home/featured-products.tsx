'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Rows3, StretchHorizontal } from 'lucide-react'
import { products } from '@/lib/data'
import { ProductCard } from '@/components/product/product-card'
import { ChapterHeading } from '@/components/ui/chapter-heading'
import { AtmosphereSection } from '@/components/ui/atmosphere-section'
import { useLocale } from '@/components/providers/locale-provider'
import { localizeHref } from '@/lib/i18n'
import { cn } from '@/lib/utils'

type ProductViewMode = 'grid' | 'swipe'

function compactProductName(name: string, category: string) {
  const normalizedCategory = category.trim().toLowerCase()
  const suffixes = Array.from(new Set([
    normalizedCategory,
    normalizedCategory.replace(/\s+/g, '-'),
    normalizedCategory.replace(/\s+/g, ' '),
    'sunscreen',
    'sun screen',
    'cleanser',
    'cleansing form',
    'cleansing foam',
    'cream',
    'serum',
    'toner',
    'toner pad',
    'gel',
    'peeling gel',
    'skin balancer',
    'lotion',
    'fluid lotion',
    'mask pack',
    'cleansing oil',
  ].filter(Boolean)))

  let compact = name
  suffixes
    .sort((a, b) => b.length - a.length)
    .forEach((suffix) => {
      compact = compact.replace(new RegExp(`\\s+${suffix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i'), '')
    })

  return compact.trim() || name
}

export function FeaturedProducts() {
  const { locale, dictionary } = useLocale()
  const t = dictionary.home
  const featuredProducts = products
  const [isExpanded, setIsExpanded] = useState(false)
  const [viewMode, setViewMode] = useState<ProductViewMode>('grid')
  const visibleProducts = useMemo(() => (isExpanded ? featuredProducts : featuredProducts.slice(0, 8)), [featuredProducts, isExpanded])
  const swipeRows = useMemo(() => [
    featuredProducts.filter((_, index) => index % 2 === 0),
    featuredProducts.filter((_, index) => index % 2 === 1),
  ], [featuredProducts])
  const copy = {
    kicker: locale === 'ar' ? 'اختيارات العناية' : locale === 'fr' ? 'La sélection soin' : locale === 'de' ? 'Die Pflege-Auswahl' : locale === 'ko' ? '케어 에디트' : locale === 'tr' ? 'Bakım Seçkisi' : 'The Care Edit',
    title: locale === 'ar' ? 'تركيبات عناية بأسلوب معرض' : locale === 'fr' ? 'Formules de soin, style galerie' : locale === 'de' ? 'Pflegeformeln im Galerie-Stil' : locale === 'ko' ? '갤러리처럼 구성한 케어 포뮬러' : locale === 'tr' ? 'Galeri stili bakım formülleri' : 'Care Formulas, Gallery Styled',
    description: locale === 'ar' ? 'تسلسل من الكريمات والزيوت والأقنعة والعناية اليومية بإحساس ملموس.' : locale === 'fr' ? 'Une séquence de crèmes, huiles, masques et soins quotidiens avec une mise en scène tactile.' : locale === 'de' ? 'Eine kuratierte Abfolge von Cremes, Ölen, Masken und täglicher Pflege.' : locale === 'ko' ? '크림, 오일, 마스크, 데일리 케어를 감각적인 무드로 구성했습니다.' : locale === 'tr' ? 'Kremler, yağlar, maskeler ve günlük bakımdan oluşan atmosferik bir seçki.' : 'A curated sequence of creams, oils, masks, and daily care formulas with atmospheric framing.',
  }

  return (
    <AtmosphereSection atmosphere="ivory" className="py-14 sm:py-20 lg:py-32">
      <div className="relative max-w-7xl mx-auto px-4 lg:px-6">
        <div className="mb-8 grid gap-4 sm:mb-10 lg:mb-16 lg:grid-cols-[1fr_auto] lg:items-end">
          <ChapterHeading
            kicker={copy.kicker}
            title={copy.title}
            description={copy.description}
          />
          <Link
            href={localizeHref('/shop', locale)}
            className="inline-flex w-fit max-w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-mauve to-[#d3af84] px-6 py-3 text-sm font-medium text-white transition-all hover:brightness-105"
          >
            {t.viewEntireEdit}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex rounded-full border border-[#cfae83]/28 bg-warm-ivory/70 p-1">
            {[
              { id: 'grid', label: 'Gallery', icon: Rows3 },
              { id: 'swipe', label: 'Swipe', icon: StretchHorizontal },
            ].map((mode) => {
              const Icon = mode.icon
              const active = viewMode === mode.id
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setViewMode(mode.id as ProductViewMode)}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition',
                    active ? 'bg-gradient-to-r from-rose-mauve to-[#d3af84] text-white shadow-[0_10px_22px_rgba(186,130,154,0.18)]' : 'text-charcoal/70 hover:bg-white/30 hover:text-charcoal'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {mode.label}
                </button>
              )
            })}
          </div>

          <p className="text-xs text-charcoal/58">
            {viewMode === 'grid' ? 'Two rows first, expand for the full catalog.' : 'Swipe sideways to browse more formulas.'}
          </p>
        </div>

        {viewMode === 'grid' ? (
          <>
            <motion.div layout className="grid grid-cols-1 gap-5 min-[420px]:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              <AnimatePresence initial={false}>
                {visibleProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 28, scale: 0.975, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: 18, scale: 0.985, filter: 'blur(8px)' }}
                    transition={{ duration: 0.68, delay: isExpanded && index >= 8 ? Math.min((index - 8) * 0.045, 0.42) : 0, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ProductCard
                      product={product}
                      index={index}
                      displayName={compactProductName(product.name, product.category)}
                      hideDescription
                      compact
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {featuredProducts.length > 8 && (
              <div className="mt-7 flex justify-center">
                <button
                  type="button"
                  onClick={() => setIsExpanded((value) => !value)}
                  aria-expanded={isExpanded}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#cfae83]/32 bg-warm-ivory/75 text-charcoal shadow-[0_12px_26px_rgba(70,49,32,0.10)] transition hover:-translate-y-0.5 hover:bg-white/35"
                  title={isExpanded ? 'Show fewer products' : 'Show all products'}
                >
                  <ChevronDown className={cn('h-5 w-5 transition-transform', isExpanded && 'rotate-180')} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--background)] via-[var(--background)]/72 to-transparent backdrop-blur-[1px]" />
            <div className="space-y-5 lg:space-y-8">
              {swipeRows.map((row, rowIndex) => (
                <div key={rowIndex} className="overflow-x-auto pb-2 [scrollbar-width:thin]" aria-label={`Product row ${rowIndex + 1}`}>
                  <div className="grid auto-cols-[minmax(245px,1fr)] grid-flow-col gap-5 pr-16 lg:auto-cols-[minmax(280px,1fr)] lg:gap-8">
                    {row.map((product, index) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        index={index}
                        displayName={compactProductName(product.name, product.category)}
                        hideDescription
                        compact
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AtmosphereSection>
  )
}
