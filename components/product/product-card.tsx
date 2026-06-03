'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, Heart } from 'lucide-react'
import { Product } from '@/lib/types'
import { useCart } from '@/components/providers/cart-provider'
import { useRegion } from '@/components/providers/region-provider'
import { useLocale } from '@/components/providers/locale-provider'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { evaluateRegionAccess } from '@/lib/services/region-access'
import { localizeHref } from '@/lib/i18n'
import { resolveImageSrc } from '@/lib/image-fallbacks'
import { getProductCardBadge, getProductCareFocus } from '@/lib/product-merchandising'

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
  const cardBadge = getProductCardBadge(product, index)
  const careFocus = getProductCareFocus(product)

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

          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <span className={cn('inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium tracking-[0.02em] shadow-sm backdrop-blur-xl', cardBadge.tone)}>
              <span className="text-[12px] leading-none">{cardBadge.mark}</span>
              {cardBadge.label}
            </span>
            {product.isNew && (
              <span className="rounded-full bg-rose-mauve/95 px-3 py-1 text-xs font-medium text-warm-ivory">
                {dictionary.common.new}
              </span>
            )}
            {product.isBestSeller && (
              <span className="rounded-full bg-champagne-gold px-3 py-1 text-xs font-medium text-charcoal">
                {dictionary.common.bestSeller}
              </span>
            )}
          </div>

          <button
            type="button"
            aria-label={wishlistAria}
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-warm-ivory/70 bg-white/86/90 text-rose-mauve shadow-sm transition hover:scale-105 hover:bg-white/86"
          >
            <Heart className="h-4 w-4" />
          </button>

          <div aria-hidden="true" className="absolute bottom-4 right-4 h-14 w-14 opacity-55 transition group-hover:rotate-6 group-hover:opacity-80">
            <div className="absolute left-5 top-1 h-12 w-6 rotate-[32deg] rounded-[999px_999px_999px_20px] border border-rose-mauve/30 bg-white/45 shadow-[0_10px_30px_rgba(154,98,118,0.10)] backdrop-blur-sm" />
            <div className="absolute left-4 top-7 h-px w-9 rotate-[32deg] bg-rose-mauve/30" />
          </div>
        </div>
      </Link>

      <div className={cn('flex flex-1 flex-col gap-4 p-5', compact && 'p-4')}>
        <div className="flex-1 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-charcoal/72">
            {localizedCategory}
          </p>
          <Link href={localizeHref(`/product/${product.slug}`, locale)} className="block">
            <h3 className={cn('line-clamp-2 text-lg font-medium leading-snug text-charcoal', compact ? 'min-h-[3rem]' : 'min-h-[3.1rem]')}>
              {cardName}
            </h3>
          </Link>
          <div className="rounded-2xl border border-[#e4c8d2]/28 bg-[#fff8f9]/70 px-3 py-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-mauve">
              {careFocus.title}
            </p>
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-charcoal/62">
              {careFocus.description}
            </p>
          </div>
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
