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

interface ProductCardProps {
  product: Product
  index?: number
  displayName?: string
  hideDescription?: boolean
  compact?: boolean
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

  if (!access.isVisible) {
    return null
  }

  return (
    <article className={cn('group overflow-hidden rounded-[2rem] border border-[#d8c3b6]/45 bg-warm-ivory/95 shadow-luxury transition-transform duration-300 hover:-translate-y-1', compact && 'rounded-[1.5rem]')}>
      <Link href={localizeHref(`/product/${product.slug}`, locale)} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-warm-ivory">
          <Image
            src={resolveImageSrc(product.images?.[0]?.src)}
            alt={cardName}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute top-3 left-3 flex flex-col gap-2">
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
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-warm-ivory/70 bg-warm-ivory/90 text-rose-mauve shadow-sm transition hover:scale-105 hover:bg-warm-ivory"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>
      </Link>

      <div className={cn('space-y-4 p-5', compact && 'p-4')}>
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-charcoal/72">
            {localizedCategory}
          </p>
          <Link href={localizeHref(`/product/${product.slug}`, locale)} className="block">
            <h3 className="text-lg font-medium leading-snug text-charcoal">
              {cardName}
            </h3>
          </Link>
          {!hideDescription && (
            <p className="line-clamp-2 text-sm leading-6 text-charcoal/65">
              {product.shortDescription}
            </p>
          )}
        </div>

        {/* P0: allow wrapping so long localized CTA labels do not collide with price block. */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
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
              'min-h-11 rounded-full px-4 font-medium',
              access.isBuyable
                ? 'bg-gradient-to-r from-rose-mauve to-[#d3af84] text-white shadow-[0_10px_24px_rgba(186,130,154,0.22)] hover:brightness-105'
                : 'border border-[#cfae83]/35 bg-warm-ivory text-charcoal opacity-100'
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
