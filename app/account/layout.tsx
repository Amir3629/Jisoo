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
  LogOut
} from "lucide-react";
import { useLocale } from "@/components/providers/locale-provider";
import { localizeHref } from "@/lib/i18n";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ArrowLeft } from "lucide-react";

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
    <div className="min-h-screen bg-[linear-gradient(160deg,#fffaf8_0%,#fef8f7_100%)] pt-32 pb-20">
      <Header />
      <div className="container max-w-6xl mx-auto px-4">
        <Link href={localizeHref("/", locale)} className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#cfac7f] to-[#d9bd97] px-4 py-2 text-sm text-white transition hover:brightness-105"><ArrowLeft className="h-4 w-4" />Back</Link>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-4xl md:text-5xl text-center mb-12"
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
            <nav className="space-y-1">
              {navItems.map((item) => {
                const localized = localizeHref(item.href, locale);
                const isActive = pathname === localized;
                return (
                  <Link
                    key={item.href}
                    href={localized}
                    className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
              <button className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:bg-muted hover:text-foreground w-full transition-colors">
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
