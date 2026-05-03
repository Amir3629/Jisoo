"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Heart, MapPin, ArrowRight, Gift, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data";
import { useLocale } from "@/components/providers/locale-provider";
import { localizeHref } from "@/lib/i18n";
import { resolveImageSrc } from "@/lib/image-fallbacks";

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
  const copy = {
    welcome: locale === 'ar' ? 'مرحبًا بعودتك، سارة' : locale === 'fr' ? 'Bon retour, Sarah' : locale === 'de' ? 'Willkommen zurück, Sarah' : locale === 'ko' ? '다시 오신 것을 환영해요, Sarah' : locale === 'tr' ? 'Tekrar hoş geldin, Sarah' : 'Welcome back, Sarah',
    memberSince: locale === 'ar' ? 'عضو منذ نوفمبر 2024' : locale === 'fr' ? 'Membre depuis novembre 2024' : locale === 'de' ? 'Mitglied seit November 2024' : locale === 'ko' ? '2024년 11월부터 회원' : locale === 'tr' ? 'Kasım 2024’ten beri üye' : 'Member since November 2024',
    goldMember: locale === 'ar' ? 'عضو ذهبي' : locale === 'fr' ? 'Membre Gold' : locale === 'de' ? 'Gold-Mitglied' : locale === 'ko' ? '골드 멤버' : locale === 'tr' ? 'Gold Üye' : 'Gold Member',
    points: locale === 'ar' ? 'نقطة' : locale === 'fr' ? 'points' : locale === 'de' ? 'Punkte' : locale === 'ko' ? '포인트' : locale === 'tr' ? 'puan' : 'points',
    order: locale === 'ar' ? 'طلب' : locale === 'fr' ? 'Commande' : locale === 'de' ? 'Bestellung' : locale === 'ko' ? '주문' : locale === 'tr' ? 'Sipariş' : 'Order',
    delivered: locale === 'ar' ? 'تم التسليم' : locale === 'fr' ? 'Livrée' : locale === 'de' ? 'Zugestellt' : locale === 'ko' ? '배송 완료' : locale === 'tr' ? 'Teslim Edildi' : 'Delivered',
    manage: locale === 'ar' ? 'إدارة' : locale === 'fr' ? 'Gérer' : locale === 'de' ? 'Verwalten' : locale === 'ko' ? '관리' : locale === 'tr' ? 'Yönet' : 'Manage',
    work: locale === 'ar' ? 'العمل' : locale === 'fr' ? 'Travail' : locale === 'de' ? 'Arbeit' : locale === 'ko' ? '직장' : locale === 'tr' ? 'İş' : 'Work',
    rewardsTitle: locale === 'ar' ? 'ضاعف نقاطك هذا الشهر!' : locale === 'fr' ? 'Doublez vos points ce mois-ci !' : locale === 'de' ? 'Doppelte Punkte in diesem Monat!' : locale === 'ko' ? '이번 달 더블 포인트!' : locale === 'tr' ? 'Bu Ay Çifte Puan Kazanın!' : 'Earn Double Points This Month!',
    rewardsBody: locale === 'ar' ? 'بصفتك عضوًا ذهبيًا، تحصل على ضعفي النقاط على جميع المشتريات حتى 31 ديسمبر.' : locale === 'fr' ? 'En tant que membre Gold, vous gagnez 2x points sur tous les achats jusqu’au 31 décembre.' : locale === 'de' ? 'Als Gold-Mitglied erhältst du bis zum 31. Dezember doppelte Punkte auf alle Einkäufe.' : locale === 'ko' ? '골드 멤버는 12월 31일까지 모든 구매에 2배 포인트가 적립됩니다.' : locale === 'tr' ? 'Gold üye olarak 31 Aralık’a kadar tüm alışverişlerde 2x puan kazanırsın.' : 'As a Gold member, you&apos;re earning 2x points on all purchases through December 31st.',
  }
  const wishlistItems = products.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="rounded-2xl border border-[#cfae83]/22 bg-[#f4e5dc]/78 p-6 shadow-luxury backdrop-blur-xl">
        <div className="flex items-start justify-between">
          <div>
          <h2 className="font-serif text-2xl mb-2">{copy.welcome}</h2>
            <p className="text-muted-foreground">
              {copy.memberSince}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-accent">
              <Star className="w-5 h-5 fill-current" />
              <span className="font-medium">{copy.goldMember}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">450 {copy.points}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-[#cfae83]/20 bg-[linear-gradient(155deg,#f4e5dc_0%,#f8efe7_100%)] p-6 text-center shadow-luxury"
        >
          <ShoppingBag className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
          <p className="text-3xl font-serif mb-1">12</p>
          <p className="text-sm text-muted-foreground">{c.totalOrders}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-[#cfae83]/20 bg-[linear-gradient(155deg,#f4e5dc_0%,#f8efe7_100%)] p-6 text-center shadow-luxury"
        >
          <Heart className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
          <p className="text-3xl font-serif mb-1">8</p>
          <p className="text-sm text-muted-foreground">{c.wishlistItems}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-[#cfae83]/20 bg-[linear-gradient(155deg,#f4e5dc_0%,#f8efe7_100%)] p-6 text-center shadow-luxury"
        >
          <Gift className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
          <p className="text-3xl font-serif mb-1">450</p>
          <p className="text-sm text-muted-foreground">{c.rewardPoints}</p>
        </motion.div>
      </div>

      {/* Recent Orders */}
      <div className="rounded-2xl border border-[#cfae83]/22 bg-[#f4e5dc]/78 p-6 shadow-luxury backdrop-blur-xl">
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
                <p className="font-medium">{copy.order} #{order.id}</p>
                <p className="text-sm text-muted-foreground">
                  {order.date} • {order.items} items
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">${order.total.toFixed(2)}</p>
                <span className="inline-block rounded-full bg-[#cfae83]/14 px-2.5 py-1 text-xs text-[#9c7447]">
                  {copy.delivered}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wishlist Preview */}
      <div className="rounded-2xl border border-[#cfae83]/22 bg-[#f4e5dc]/78 p-6 shadow-luxury backdrop-blur-xl">
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
              <div className="relative aspect-square bg-[#f3e2d6] mb-3 overflow-hidden rounded-xl">
                <Image
                  src={resolveImageSrc(product.images[0]?.src)}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
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
      <div className="rounded-2xl border border-[#cfae83]/22 bg-[#f4e5dc]/78 p-6 shadow-luxury backdrop-blur-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-xl">{c.savedAddresses}</h3>
          <Link
            href={localizeHref('/account/addresses', locale)}
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          >
            {copy.manage}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-[#cfae83]/35 bg-[#cfae83]/10 p-4">
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
          <div className="rounded-xl border border-[#cfae83]/18 bg-[#f4e5dc]/70 p-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4" />
              <span className="font-medium">{copy.work}</span>
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
      <div className="rounded-2xl border border-[#cfae83]/24 bg-gradient-to-r from-[#cfae83]/15 via-[#f6e2ea]/32 to-[#d6a8ba]/16 p-8 text-center shadow-luxury">
        <Gift className="w-10 h-10 mx-auto mb-4 text-accent" />
        <h3 className="font-serif text-xl mb-2">{copy.rewardsTitle}</h3>
        <p className="text-muted-foreground mb-4 max-w-md mx-auto">
          {copy.rewardsBody}
        </p>
        <Button asChild className="rounded-full bg-[#cfae83] px-6 text-white hover:bg-[#b99467]">
          <Link href={localizeHref('/shop', locale)}>{c.shopNow}</Link>
        </Button>
      </div>
    </div>
  );
}
