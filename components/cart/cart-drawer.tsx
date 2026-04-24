'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/components/providers/cart-provider'
import { formatPrice } from '@/lib/data'
import { cn } from '@/lib/utils'
import { useLocale } from '@/components/providers/locale-provider'
import { localizeHref } from '@/lib/i18n'
import { resolveImageSrc } from '@/lib/image-fallbacks'

export function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity } = useCart()
  const { locale, dictionary } = useLocale()

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-50"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[450px] bg-warm-ivory z-50 flex flex-col shadow-elevated"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-blush-pink">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-plum" />
                <h2 className="text-lg font-serif font-semibold text-charcoal">
                  {dictionary.cart.title} ({cart.items.length})
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 -mr-2 text-charcoal hover:text-plum transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 rounded-full bg-blush-pink/30 flex items-center justify-center mb-4">
                    <ShoppingBag className="w-8 h-8 text-rose-mauve" />
                  </div>
                  <h3 className="text-lg font-medium text-charcoal mb-2">{dictionary.cart.emptyTitle}</h3>
                  <p className="text-muted-foreground mb-6">
                    {dictionary.cart.emptyBody}
                  </p>
                  <Link
                    href={localizeHref('/shop', locale)}
                    onClick={() => setIsCartOpen(false)}
                    className={cn(
                      'px-6 py-3 rounded-full',
                      'bg-plum text-warm-ivory font-medium',
                      'hover:bg-plum/90 transition-colors'
                    )}
                  >
                    {dictionary.common.shopNow}
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.items.map(item => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="flex gap-4"
                    >
                      {/* Product Image */}
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-nude-beige flex-shrink-0">
                        <Image
                          src={resolveImageSrc(item.product.images[0]?.src)}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={localizeHref(`/product/${item.product.slug}`, locale)}
                          onClick={() => setIsCartOpen(false)}
                          className="font-medium text-charcoal hover:text-plum transition-colors line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        {item.variant && (
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {item.variant.name}
                          </p>
                        )}
                        <p className="text-sm font-medium text-plum mt-1">
                          {formatPrice(item.variant?.price ?? item.product.price)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className={cn(
                                'w-8 h-8 rounded-full flex items-center justify-center',
                                'border border-blush-pink text-charcoal',
                                'hover:bg-blush-pink/20 transition-colors',
                                'disabled:opacity-50 disabled:cursor-not-allowed'
                              )}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className={cn(
                                'w-8 h-8 rounded-full flex items-center justify-center',
                                'border border-blush-pink text-charcoal',
                                'hover:bg-blush-pink/20 transition-colors'
                              )}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.items.length > 0 && (
              <div className="border-t border-blush-pink p-6 space-y-4">
                {/* Summary */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatPrice(cart.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">
                      {cart.shipping === 0 ? 'Free' : formatPrice(cart.shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium">{formatPrice(cart.tax)}</span>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-blush-pink">
                  <span className="font-medium text-charcoal">Total</span>
                  <span className="text-lg font-semibold text-plum">
                    {formatPrice(cart.total)}
                  </span>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-2">
                  <Link
                    href={localizeHref('/checkout', locale)}
                    onClick={() => setIsCartOpen(false)}
                    className={cn(
                      'block w-full py-4 rounded-full text-center font-medium',
                      'bg-plum text-warm-ivory',
                      'hover:bg-plum/90 transition-colors'
                    )}
                  >
                    {dictionary.cart.proceedToCheckout}
                  </Link>
                  <Link
                    href={localizeHref('/cart', locale)}
                    onClick={() => setIsCartOpen(false)}
                    className={cn(
                      'block w-full py-4 rounded-full text-center font-medium',
                      'border border-plum text-plum',
                      'hover:bg-plum/5 transition-colors'
                    )}
                  >
                    {dictionary.cart.title}
                  </Link>
                </div>

                <p className="text-xs text-center text-muted-foreground">
                  Free shipping on orders over €100
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
