'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingBag, Heart } from 'lucide-react'
import { Product } from '@/lib/types'
import { useCart } from '@/components/providers/cart-provider'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart()

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="group overflow-hidden rounded-[2rem] border border-rose-mauve/15 bg-white/95 shadow-[0_18px_50px_rgba(91,42,68,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(176,106,136,0.14)]"
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#f7efe9]">
          <Image
            src={product.images?.[0]?.src || '/placeholder.jpg'}
            alt={product.images?.[0]?.alt || product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="rounded-full bg-rose-mauve/95 px-3 py-1 text-xs font-medium text-warm-ivory">
                New
              </span>
            )}
            {product.isBestSeller && (
              <span className="rounded-full bg-champagne-gold px-3 py-1 text-xs font-medium text-charcoal">
                Best Seller
              </span>
            )}
          </div>

          <button
            type="button"
            aria-label={`Add ${product.name} to wishlist`}
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
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="text-lg font-medium leading-snug text-charcoal transition-colors group-hover:text-rose-mauve">
              {product.name}
            </h3>
          </Link>
          <p className="line-clamp-2 text-sm leading-6 text-charcoal/65">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
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
            className={cn(
              'rounded-full px-4',
              'bg-rose-mauve text-white hover:bg-rose-mauve/90'
            )}
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </motion.article>
  )
}
