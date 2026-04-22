"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Heart, MapPin, ArrowRight, Gift, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data";
import { useLocale } from "@/components/providers/locale-provider";
import { localizeHref } from "@/lib/i18n";

const recentOrders = [
  {
    id: "JIS-A7B3C9",
    date: "Dec 15, 2024",
    status: "Delivered",
    total: 156.00,
    items: 3,
  },
  {
    id: "JIS-X2Y8Z4",
    date: "Nov 28, 2024",
    status: "Delivered",
    total: 89.00,
    items: 2,
  },
];

export default function AccountPage() {
  const { locale, dictionary } = useLocale();
  const c = dictionary.common;
  const wishlistItems = products.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-card border border-border p-6">
        <div className="flex items-start justify-between">
          <div>
          <h2 className="font-serif text-2xl mb-2">Welcome back, Sarah</h2>
            <p className="text-muted-foreground">
              Member since November 2024
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-accent">
              <Star className="w-5 h-5 fill-current" />
              <span className="font-medium">Gold Member</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">450 points</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border p-6 text-center"
        >
          <ShoppingBag className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
          <p className="text-3xl font-serif mb-1">12</p>
          <p className="text-sm text-muted-foreground">{c.totalOrders}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border p-6 text-center"
        >
          <Heart className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
          <p className="text-3xl font-serif mb-1">8</p>
          <p className="text-sm text-muted-foreground">{c.wishlistItems}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border p-6 text-center"
        >
          <Gift className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
          <p className="text-3xl font-serif mb-1">450</p>
          <p className="text-sm text-muted-foreground">{c.rewardPoints}</p>
        </motion.div>
      </div>

      {/* Recent Orders */}
      <div className="bg-card border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-xl">{c.recentOrders}</h3>
          <Link
            href={localizeHref('/account/orders', locale)}
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          >
            {c.viewAll}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between py-4 border-b border-border last:border-0 last:pb-0"
            >
              <div>
                <p className="font-medium">Order #{order.id}</p>
                <p className="text-sm text-muted-foreground">
                  {order.date} • {order.items} items
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">${order.total.toFixed(2)}</p>
                <span className="inline-block px-2 py-0.5 text-xs bg-primary/10 text-primary">
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wishlist Preview */}
      <div className="bg-card border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-xl">{c.wishlist}</h3>
          <Link
            href={localizeHref('/account/wishlist', locale)}
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          >
            {c.viewAll}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {wishlistItems.map((product) => (
            <Link
              key={product.id}
              href={localizeHref(`/product/${product.slug}`, locale)}
              className="group"
            >
              <div className="relative aspect-square bg-muted mb-3 overflow-hidden">
                <Image
                  src={product.images[0]?.src || "/placeholder.jpg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                {product.brand}
              </p>
              <p className="text-sm font-medium mt-1 line-clamp-1">
                {product.name}
              </p>
              <p className="text-sm text-muted-foreground">
                ${product.price.toFixed(2)}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Saved Addresses */}
      <div className="bg-card border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-xl">{c.savedAddresses}</h3>
          <Link
            href={localizeHref('/account/addresses', locale)}
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          >
            Manage
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 border border-primary bg-primary/5">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4" />
              <span className="font-medium">Default</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Sarah Kim<br />
              123 Beauty Lane<br />
              Los Angeles, CA 90001<br />
              United States
            </p>
          </div>
          <div className="p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4" />
              <span className="font-medium">Work</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Sarah Kim<br />
              456 Office Blvd, Suite 200<br />
              Los Angeles, CA 90010<br />
              United States
            </p>
          </div>
        </div>
      </div>

      {/* Rewards Banner */}
      <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-8 text-center">
        <Gift className="w-10 h-10 mx-auto mb-4 text-accent" />
        <h3 className="font-serif text-xl mb-2">Earn Double Points This Month!</h3>
        <p className="text-muted-foreground mb-4 max-w-md mx-auto">
          As a Gold member, you&apos;re earning 2x points on all purchases through December 31st.
        </p>
        <Button asChild className="rounded-none">
          <Link href={localizeHref('/shop', locale)}>{c.shopNow}</Link>
        </Button>
      </div>
    </div>
  );
}
