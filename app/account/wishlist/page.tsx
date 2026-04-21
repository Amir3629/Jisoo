"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data";
import { useCart } from "@/components/providers/cart-provider";
import { useRegion } from "@/components/providers/region-provider";
import { useLocale } from "@/components/providers/locale-provider";
import { localizedUi } from "@/lib/localized-ui";

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(products.slice(0, 8));
  const { addItem } = useCart();
  const { formatPrice } = useRegion();
  const { locale } = useLocale();
  const t = localizedUi[locale];

  const removeFromWishlist = (productId: string) => {
    setWishlistItems((items) => items.filter((item) => item.id !== productId));
  };

  const addToCart = (product: (typeof products)[0]) => {
    addItem(product);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="text-center py-16">
        <Heart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="font-serif text-xl mb-2">Your wishlist is empty</h3>
        <p className="text-muted-foreground mb-6">
          Save your favorite products to your wishlist for easy access later.
        </p>
        <Button asChild className="rounded-none">
          <Link href="/shop">
            Discover Products
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl">My Wishlist</h2>
        <p className="text-sm text-muted-foreground">
          {wishlistItems.length} items
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {wishlistItems.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              className="group bg-card border border-border"
            >
              <div className="relative aspect-square overflow-hidden">
                <Link href={`/product/${product.slug}`}>
                  <Image
                    src={product.images[0]?.src || "/placeholder-product.jpg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                {product.badges && product.badges.length > 0 && (
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 text-xs bg-primary text-primary-foreground">
                      {product.badges[0]}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  {product.brand}
                </p>
                <Link href={`/product/${product.slug}`}>
                  <h3 className="font-medium text-sm mb-2 line-clamp-2 hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {formatPrice(product.price)}
                    </span>
                    {product.compareAtPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(product.compareAtPrice)}
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  onClick={() => addToCart(product)}
                  variant="outline"
                  className="w-full mt-4 rounded-none"
                  size="sm"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  {t.addToCart}
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
