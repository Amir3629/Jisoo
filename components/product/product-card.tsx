'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
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
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart()
  const { region } = useRegion()
  const { locale, dictionary } = useLocale()
  const access = evaluateRegionAccess(product, region)
  const wishlistAria = locale === 'ar' ? `أضف ${product.name} إلى المفضلة` : locale === 'fr' ? `Ajouter ${product.name} à la liste d’envies` : locale === 'de' ? `${product.name} zur Wunschliste hinzufügen` : locale === 'ko' ? `${product.name} 위시리스트에 추가` : locale === 'tr' ? `${product.name} favorilere ekle` : `Add ${product.name} to wishlist`

  if (!access.isVisible) {
    return null
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="group overflow-hidden rounded-[2rem] border border-rose-mauve/15 bg-white/95 shadow-[0_18px_50px_rgba(91,42,68,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(176,106,136,0.14)]"
    >
      <Link href={localizeHref(`/product/${product.slug}`, locale)} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#f7efe9]">
          <Image
            src={resolveImageSrc(product.images?.[0]?.src)}
            alt={product.images?.[0]?.alt || product.name}
            fill
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
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/85 text-rose-mauve shadow-sm backdrop-blur transition hover:scale-105 hover:bg-white"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>
      </Link>

      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.22em] text-rose-mauve/80">
            {product.category}
          </p>
          <Link href={localizeHref(`/product/${product.slug}`, locale)} className="block">
            <h3 className="text-lg font-medium leading-snug text-charcoal transition-colors group-hover:text-rose-mauve">
              {product.name}
            </h3>
          </Link>
          <p className="line-clamp-2 text-sm leading-6 text-charcoal/65">
            {product.description}
          </p>
        </div>

        {/* P0: allow wrapping so long localized CTA labels do not collide with price block. */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-charcoal">
              €{product.price.toFixed(2)}
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
              'rounded-full px-4',
              'bg-gradient-to-r from-rose-mauve to-[#d2ab82] text-white hover:brightness-105'
            )}
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            {access.isBuyable ? dictionary.product.addToCart : dictionary.product.notAvailable}
          </Button>
        </div>
      </div>
    </motion.article>
  )
}
