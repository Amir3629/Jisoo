'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, Heart, Trophy, Eye, Star, Droplets, Sparkles, Shield, Sun, Activity, type LucideIcon } from 'lucide-react'
import { Product } from '@/lib/types'
import { useCart } from '@/components/providers/cart-provider'
import { useRegion } from '@/components/providers/region-provider'
import { useLocale } from '@/components/providers/locale-provider'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { evaluateRegionAccess } from '@/lib/services/region-access'
import { localizeHref } from '@/lib/i18n'
import { resolveImageSrc } from '@/lib/image-fallbacks'
import { getProductCardHighlights, getProductCareChips, getProductStatusBadge, type ProductCareIconKind, type ProductStatusBadgeKind } from '@/lib/product-merchandising'

interface ProductCardProps {
  product: Product
  index?: number
  displayName?: string
  hideDescription?: boolean
  compact?: boolean
}


const SECOND_MODE_PRODUCT_IMAGES = [
  '/assets/products/product-second-mode-final/jisoo-second-mode-product-01.png',
  '/assets/products/product-second-mode-final/jisoo-second-mode-product-02.png',
  '/assets/products/product-second-mode-final/jisoo-second-mode-product-03.png',
  '/assets/products/product-second-mode-final/jisoo-second-mode-product-04.png',
  '/assets/products/product-second-mode-final/jisoo-second-mode-product-05.png',
  '/assets/products/product-second-mode-final/jisoo-second-mode-product-06.png',
] as const

function getSecondModeProductImage(index: number) {
  return SECOND_MODE_PRODUCT_IMAGES[index % SECOND_MODE_PRODUCT_IMAGES.length]
}

const statusIconMap: Record<ProductStatusBadgeKind, LucideIcon> = {
  'best-seller': Trophy,
  'most-viewed': Eye,
  'customer-favorite': Heart,
}

const careIconMap: Record<ProductCareIconKind, LucideIcon> = {
  hydration: Droplets,
  brightening: Sparkles,
  'anti-aging': Star,
  'dry-skin': Heart,
  'sensitive-skin': Shield,
  firming: Activity,
  repair: Shield,
  glow: Sparkles,
  protection: Sun,
  clarity: Eye,
}

export function ProductCard({ product, index = 0, displayName, hideDescription = false, compact = false }: ProductCardProps) {
  const { addItem } = useCart()
  const { region } = useRegion()
  const { locale, dictionary } = useLocale()
  const access = evaluateRegionAccess(product, region)
  const cardName = displayName ?? product.name
  const localizedCategory = (() => {
    const value = product.category.trim().toLowerCase()
    const labels: Record<string, Record<typeof locale, string>> = {
      serum: { ar: 'سيروم', fr: 'Sérum', de: 'Serum', ko: '세럼', tr: 'Serum', en: 'Serum' },
      cleanser: { ar: 'منظف', fr: 'Nettoyant', de: 'Reiniger', ko: '클렌저', tr: 'Temizleyici', en: 'Cleanser' },
      'toner pad': { ar: 'باد تونر', fr: 'Pads tonifiants', de: 'Toner-Pads', ko: '토너 패드', tr: 'Tonik pedi', en: 'Toner Pad' },
      'sun care': { ar: 'عناية شمسية', fr: 'Soin solaire', de: 'Sonnenpflege', ko: '선 케어', tr: 'Güneş bakımı', en: 'Sun Care' },
      cream: { ar: 'كريم', fr: 'Crème', de: 'Creme', ko: '크림', tr: 'Krem', en: 'Cream' },
      toner: { ar: 'تونر', fr: 'Tonique', de: 'Toner', ko: '토너', tr: 'Tonik', en: 'Toner' },
      mask: { ar: 'قناع', fr: 'Masque', de: 'Maske', ko: '마스크', tr: 'Maske', en: 'Mask' },
      oil: { ar: 'زيت', fr: 'Huile', de: 'Öl', ko: '오일', tr: 'Yağ', en: 'Oil' },
    }
    return labels[value]?.[locale] ?? product.category
  })()
  const wishlistAria = locale === 'ar' ? `أضف ${cardName} إلى المفضلة` : locale === 'fr' ? `Ajouter ${cardName} à la liste d’envies` : locale === 'de' ? `${cardName} zur Wunschliste hinzufügen` : locale === 'ko' ? `${cardName} 위시리스트에 추가` : locale === 'tr' ? `${cardName} favorilere ekle` : `Add ${cardName} to wishlist`

  const defaultProductImageSrc = resolveImageSrc(product.images?.[0]?.src)
  const secondModeProductImageSrc = resolveImageSrc(getSecondModeProductImage(index))
  const statusBadge = getProductStatusBadge(product)
  const careChips = getProductCareChips(product)
  const cardHighlights = getProductCardHighlights(product)
  const StatusIcon = statusBadge ? statusIconMap[statusBadge.kind] : null

  if (!access.isVisible) {
    return null
  }

  return (
    <article className={cn('jisoo-product-card group flex h-full flex-col overflow-hidden rounded-[2rem] border border-[#e4c8d2]/24 bg-white/86/95 shadow-[0_18px_60px_rgba(79,54,60,0.075)] transition-transform duration-300 hover:-translate-y-1', compact && 'rounded-[1.5rem]')}>
      <Link href={localizeHref(`/product/${product.slug}`, locale)} className="block flex-none">
        <div className="relative aspect-[4/5] overflow-hidden bg-white/86">
          <>
            <Image
              src={defaultProductImageSrc}
              alt={cardName}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="product-card-default-image object-cover transition-[opacity,transform] duration-700 group-hover:scale-105"
            />
            <Image
              src={secondModeProductImageSrc}
              alt={cardName}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="product-card-second-mode-image object-cover transition-[opacity,transform] duration-700 group-hover:scale-105"
            />
          </>

          {statusBadge && StatusIcon && (
            <div className="absolute left-3 top-3">
              <div className="group/status relative inline-flex">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-warm-ivory/70 bg-white/86/90 text-rose-mauve shadow-sm backdrop-blur-xl transition duration-300 group-hover/status:scale-105">
                  <StatusIcon className="h-4 w-4" />
                </span>
                <span className="pointer-events-none absolute left-0 top-full mt-2 translate-y-1 whitespace-nowrap rounded-full border border-blush-pink/50 bg-white/95 px-3 py-1 text-[11px] font-medium text-charcoal opacity-0 shadow-sm backdrop-blur-xl transition-all duration-300 group-hover/status:translate-y-0 group-hover/status:opacity-100">
                  {statusBadge.label}
                </span>
              </div>
            </div>
          )}

          <button
            type="button"
            aria-label={wishlistAria}
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-warm-ivory/70 bg-white/86/90 text-rose-mauve shadow-sm transition hover:scale-105 hover:bg-white/86"
          >
            <Heart className="h-4 w-4" />
          </button>

        </div>
      </Link>

      <div className={cn('flex flex-1 flex-col gap-4 p-5', compact && 'p-4')}>
        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap gap-2" aria-label={`${cardName} care focus`}>
            {careChips.map((chip) => {
              const CareIcon = careIconMap[chip.kind]
              return (
                <span key={chip.label} className="group/care relative inline-flex">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-blush-pink/45 bg-white/70 text-rose-mauve shadow-sm transition duration-300 group-hover/care:-translate-y-0.5 group-hover/care:border-rose-mauve/45 group-hover/care:bg-white">
                    <CareIcon className="h-3.5 w-3.5" />
                  </span>
                  <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-full border border-blush-pink/50 bg-white/95 px-2.5 py-1 text-[11px] font-medium text-charcoal opacity-0 shadow-sm backdrop-blur-xl transition-all duration-300 group-hover/care:translate-y-0 group-hover/care:opacity-100">
                    {chip.label}
                  </span>
                </span>
              )
            })}
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-charcoal/72">
            {localizedCategory}
          </p>
          <Link href={localizeHref(`/product/${product.slug}`, locale)} className="block">
            <h3 className={cn('line-clamp-2 text-lg font-medium leading-snug text-charcoal', compact ? 'min-h-[3rem]' : 'min-h-[3.1rem]')}>
              {cardName}
            </h3>
          </Link>
          <ul className="grid gap-1.5 text-xs leading-5 text-charcoal/62">
            {cardHighlights.map((highlight) => (
              <li key={highlight} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-mauve/55" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
          {!hideDescription && (
            <p className="line-clamp-2 text-sm leading-6 text-charcoal/65">
              {product.shortDescription}
            </p>
          )}
        </div>

        {/* P0: allow wrapping so long localized CTA labels do not collide with price block. */}
        <div className="mt-auto flex w-full flex-col items-stretch gap-3">
          <div className="flex w-full items-baseline gap-2">
            <span className="text-lg font-semibold text-charcoal">
              {product.price > 0 ? `€${product.price.toFixed(2)}` : 'Price pending'}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-sm text-charcoal/40 line-through">
                €{product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>

          <Button
            type="button"
            onClick={() => addItem(product)}
            disabled={!access.isBuyable}
            className={cn(
              'w-full min-h-12 rounded-full px-6 font-semibold tracking-[0.01em]',
              access.isBuyable
                ? 'bg-gradient-to-r from-rose-mauve to-[#d3af84] text-white shadow-[0_18px_60px_rgba(79,54,60,0.075)] hover:brightness-105 hover:shadow-[0_22px_70px_rgba(154,98,118,0.16)]'
                : 'border border-[#e4c8d2]/24 bg-white/86 text-charcoal opacity-100'
            )}
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            {access.isBuyable ? dictionary.product.addToCart : dictionary.product.notAvailable}
          </Button>
        </div>
      </div>
    </article>
  )
}
