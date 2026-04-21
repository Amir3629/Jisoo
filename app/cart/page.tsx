"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, ArrowRight, ShoppingBag, Gift, Truck } from "lucide-react";
import { useCart } from "@/components/providers/cart-provider";
import { useRegion } from "@/components/providers/region-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocale } from "@/components/providers/locale-provider";
import { localizeHref } from "@/lib/i18n";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, itemCount } = useCart();
  const { formatPrice } = useRegion();
  const { locale, dictionary } = useLocale();
  const c = dictionary.common;
  const t = dictionary.cart;

  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-32 pb-20">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-20"
          >
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="font-serif text-3xl mb-4">{t.emptyTitle}</h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              {t.emptyBody}
            </p>
            <Button asChild size="lg" className="rounded-none">
              <Link href={localizeHref('/shop', locale)}>
                {c.continueShopping}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-4xl md:text-5xl text-center mb-4"
        >
          {t.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-center mb-12"
        >
          {itemCount} {c.items}
        </motion.p>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item, index) => (
              <motion.div
                key={`${item.product.id}-${item.variant?.id || "default"}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 p-6 bg-card border border-border rounded-sm"
              >
                <div className="relative w-24 h-24 md:w-32 md:h-32 bg-muted rounded-sm overflow-hidden flex-shrink-0">
                  <Image
                    src={item.product.images[0]?.src || "/placeholder-product.jpg"}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                          {item.product.brand}
                        </p>
                        <h3 className="font-medium">{item.product.name}</h3>
                        {item.variant && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.variant.name}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.variant?.id)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center border border-border">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            Math.max(1, item.quantity - 1),
                            item.variant?.id
                          )
                        }
                        className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity + 1,
                            item.variant?.id
                          )
                        }
                        className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="font-medium">
                      {formatPrice(
                        (item.variant?.price || item.product.price) * item.quantity
                      )}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:sticky lg:top-32 h-fit"
          >
            <div className="bg-card border border-border p-6 rounded-sm">
              <h2 className="font-serif text-xl mb-6">{t.orderSummary}</h2>
              
              {/* Promo Code */}
              <div className="mb-6">
                <label className="text-sm text-muted-foreground mb-2 block">
                  {t.promoCode}
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder={t.enterCode}
                    className="rounded-none flex-1"
                  />
                  <Button variant="outline" className="rounded-none">
                    {t.apply}
                  </Button>
                </div>
              </div>

              <div className="space-y-3 py-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t.subtotal}</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t.shipping}</span>
                  <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-accent">
                    Add {formatPrice(50 - subtotal)} more for free shipping
                  </p>
                )}
              </div>

              <div className="flex justify-between py-4 border-t border-border font-medium">
                <span>{t.total}</span>
                <span>{formatPrice(total)}</span>
              </div>

              <Button asChild className="w-full rounded-none mt-4" size="lg">
                <Link href={localizeHref('/checkout', locale)}>
                  {t.proceedToCheckout}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>

              {/* Benefits */}
              <div className="mt-6 pt-6 border-t border-border space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Truck className="w-4 h-4" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Gift className="w-4 h-4" />
                  <span>Free samples with every order</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
