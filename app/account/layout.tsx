"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";
import { useLocale } from "@/components/providers/locale-provider";
import { localizeHref } from "@/lib/i18n";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const navItems = [
  { href: "/account", label: "Overview", icon: User },
  { href: "/account/orders", label: "Orders", icon: ShoppingBag },
  { href: "/account/wishlist", label: "Wishlist", icon: Heart },
  { href: "/account/addresses", label: "Addresses", icon: MapPin },
  { href: "/account/payment", label: "Payment Methods", icon: CreditCard },
  { href: "/account/settings", label: "Settings", icon: Settings },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { locale, dictionary } = useLocale();

  return (
    <div className="min-h-screen bg-[linear-gradient(164deg,#f4e5dc_0%,#f4e5dc_48%,#f7e7df_100%)] pt-36 pb-20 text-charcoal">
      <Header />
      <div className="container max-w-6xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-4xl md:text-5xl text-center mb-12 text-charcoal"
        >
          {dictionary.common.account}
        </motion.h1>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <nav className="space-y-2 rounded-2xl border border-[#cfae83]/20 bg-[#f4e5dc]/72 p-3 shadow-luxury backdrop-blur-xl">
              {navItems.map((item) => {
                const localized = localizeHref(item.href, locale);
                const isActive = pathname === localized;
                return (
                  <Link
                    key={item.href}
                    href={localized}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors ${
                      isActive
                        ? "bg-[#cfae83] text-white shadow-sm"
                        : "text-charcoal/68 hover:bg-[#f3e2d6] hover:text-charcoal"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
              <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-charcoal/60 transition-colors hover:bg-[#f3e2d6] hover:text-charcoal">
                <LogOut className="w-4 h-4" />
                {dictionary.common.signOut}
              </button>
            </nav>
          </motion.aside>

          {/* Main Content */}
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            {children}
          </motion.main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
