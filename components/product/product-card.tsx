'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react'
import type { Product, Region } from '@/lib/types'
import { formatPrice } from '@/lib/data'
import { useCart } from '@/components/providers/cart-provider'
import { useRegion } from '@/components/providers/region-provider'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addToCart } = useCart()
  const { region } = useRegion()

  const availability = product.regionAvailability[region]
  const isBuyable = availability === 'visible_and_buyable'
  const isVisibleOnly = availability === 'visible_but_not_buyable'

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isBuyable) {
      addToCart(product)
    }
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <Link href={`/product/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-nude-beige mb-4">
          {/* Product Image */}
          <Image
            src={product.images[0]?.src || '/placeholder-product.jpg'}
            alt={product.name}
            fill
            className={cn(
              'object-cover transition-transform duration-700',
              isHovered && 'scale-110'
            )}
          />

          {/* Overlay */}
          <div
            className={cn(
              'absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent',
              'opacity-0 transition-opacity duration-300',
              isHovered && 'opacity-100'
            )}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="px-3 py-1 text-xs font-medium bg-plum text-warm-ivory rounded-full">
                New
              </span>
            )}
            {product.isBestSeller && (
              <span className="px-3 py-1 text-xs font-medium bg-champagne-gold text-charcoal rounded-full">
                Best Seller
              </span>
            )}
            {product.compareAtPrice && (
              <span className="px-3 py-1 text-xs font-medium bg-rose-mauve text-warm-ivory rounded-full">
                Sale
              </span>
            )}
            {isVisibleOnly && (
              <span className="px-3 py-1 text-xs font-medium bg-charcoal/80 text-warm-ivory rounded-full">
                View Only
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className={cn(
              'absolute top-3 right-3 p-2.5 rounded-full transition-all duration-300',
              'bg-white/90 backdrop-blur-sm shadow-sm',
              isWishlisted ? 'text-rose-mauve' : 'text-charcoal/70',
              'hover:scale-110'
            )}
          >
            <Heart
              className={cn('w-5 h-5', isWishlisted && 'fill-current')}
            />
          </button>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 left-4 right-4 flex gap-2"
          >
            {isBuyable && (
              <button
                onClick={handleAddToCart}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 py-3 rounded-full',
                  'bg-plum text-warm-ivory font-medium text-sm',
                  'hover:bg-plum/90 transition-colors'
                )}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
            )}
            <button
              className={cn(
                'p-3 rounded-full',
                'bg-white/90 backdrop-blur-sm text-charcoal',
                'hover:bg-white transition-colors'
              )}
            >
              <Eye className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* Product Info */}
        <div>
          <p className="text-xs text-rose-mauve font-medium uppercase tracking-wider mb-1">
            {product.category}
          </p>
          <h3 className="font-medium text-charcoal group-hover:text-plum transition-colors line-clamp-1">
            {product.name}
          </h3>
          {product.subtitle && (
            <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
              {product.subtitle}
            </p>
          )}

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'w-3.5 h-3.5',
                    i < Math.floor(product.rating)
                      ? 'text-champagne-gold fill-current'
                      : 'text-blush-pink'
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mt-2">
            <span className="font-semibold text-plum">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Region Notice */}
          {isVisibleOnly && (
            <p className="text-xs text-rose-mauve mt-2">
              Not available for purchase in your region
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
