'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronDown, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCart } from '@/components/providers/cart-provider'
import { useRegion } from '@/components/providers/region-provider'
import { useLocale } from '@/components/providers/locale-provider'
import { localizeHref } from '@/lib/i18n'
import { LocaleSwitcher } from '@/components/i18n/locale-switcher'
import { CartDrawer } from '@/components/cart/cart-drawer'
import { SearchModal } from '@/components/search/search-modal'
import { RegionSelector } from '@/components/layout/region-selector'

const megaItems = [
  { label: 'Women', href: '/shop/women' }, { label: 'Men', href: '/shop/men' }, { label: 'Skincare', href: '/shop?category=skincare' }, { label: 'Makeup', href: '/shop?category=makeup' },
  { label: 'Hydration', href: '/shop?category=hydration' }, { label: 'Best Sellers', href: '/shop/best-sellers' }, { label: 'New Arrivals', href: '/shop/new-arrivals' }, { label: 'Sets / Bundles', href: '/shop?category=sets' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isRegionOpen, setIsRegionOpen] = useState(false)
  const [isMegaOpen, setIsMegaOpen] = useState(false)
  const { itemCount, setIsCartOpen } = useCart()
  const { config } = useRegion()
  const { locale, dictionary } = useLocale()
  const navLinks = [{ href: '/shop', label: 'Shop' }, { href: '/shop/new-arrivals', label: 'New' }, { href: '/shop/best-sellers', label: 'Best Sellers' }, { href: '/ai-consultant', label: 'AI Concierge' }]
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.25 })
  useEffect(() => { const on = () => setIsScrolled(window.scrollY > 20); window.addEventListener('scroll', on); return () => window.removeEventListener('scroll', on) }, [])

  return (<>
    <motion.div className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[#e8c8d4] via-champagne-gold to-[#f4dfcf]" style={{ scaleX: progress }} />
    <motion.header initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6 }} className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-500', isScrolled ? 'bg-warm-ivory/95 backdrop-blur-2xl border-b border-[#e9d5df]' : 'bg-transparent')}>
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 -ml-2" aria-label={dictionary.header.actions.openMenu}><Menu className="w-6 h-6" /></button>
          <Link href={localizeHref('/', locale)} className="flex-shrink-0 flex flex-col items-start"><h1 className="text-2xl lg:text-3xl font-serif font-bold text-[#7a5568]">JISOO</h1></Link>

          <nav className="hidden lg:flex items-center gap-7" aria-label="Primary navigation">
            {navLinks.map((link) => <Link key={link.href} href={localizeHref(link.href, locale)} className="text-sm tracking-[0.1em] text-charcoal hover:text-rose-mauve">{link.label}</Link>)}
            <div className="relative" onMouseEnter={() => setIsMegaOpen(true)} onMouseLeave={() => setIsMegaOpen(false)}>
              <button onClick={() => setIsMegaOpen((p) => !p)} aria-expanded={isMegaOpen} className="inline-flex items-center gap-1 text-sm tracking-[0.1em] text-charcoal hover:text-rose-mauve">Discover <ChevronDown className="h-4 w-4" /></button>
            </div>
          </nav>

          <div className="flex items-center gap-1 lg:gap-2">
            <div className="hidden lg:flex items-center gap-2 pr-1"><LocaleSwitcher />
              <button onClick={() => setIsRegionOpen(true)} className="inline-flex items-center gap-1.5 rounded-full border border-rose-mauve/20 bg-white/70 px-2.5 py-1 text-[11px]"><Globe className="h-3.5 w-3.5" /><span>{config.code}</span></button>
            </div>
            <button onClick={() => setIsSearchOpen(true)} className="p-2" aria-label={dictionary.header.actions.search}><Search className="w-5 h-5" /></button>
            <Link href={localizeHref('/account', locale)} className="hidden sm:block p-2" aria-label={dictionary.header.actions.account}><User className="w-5 h-5" /></Link>
            <Link href={localizeHref('/account/wishlist', locale)} className="hidden sm:block p-2" aria-label={dictionary.header.actions.wishlist}><Heart className="w-5 h-5" /></Link>
            <button onClick={() => setIsCartOpen(true)} className="relative p-2" aria-label={dictionary.header.actions.cart}><ShoppingBag className="w-5 h-5" />{itemCount > 0 && <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-rose-mauve text-white text-xs rounded-full flex items-center justify-center">{itemCount}</span>}</button>
          </div>
        </div>
      </div>

      <AnimatePresence>{isMegaOpen && <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} className="hidden lg:block border-t border-rose-mauve/15 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto grid max-w-7xl grid-cols-4 gap-3 px-6 py-6">{megaItems.map((item) => <Link key={item.label} href={localizeHref(item.href, locale)} className="rounded-xl border border-rose-mauve/15 bg-warm-ivory/80 p-4 text-sm hover:border-rose-mauve/40">{item.label}</Link>)}</div>
      </motion.div>}</AnimatePresence>
    </motion.header>

    <AnimatePresence>{isMobileMenuOpen && <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="fixed top-0 left-0 bottom-0 z-50 w-[85%] max-w-sm overflow-y-auto bg-warm-ivory p-6 lg:hidden"><div className="mb-8 flex items-center justify-between"><h2 className="text-2xl font-serif">JISOO</h2><button onClick={() => setIsMobileMenuOpen(false)}><X className="w-6 h-6" /></button></div><nav className="space-y-5">{[...navLinks, ...megaItems].map((link) => <Link key={link.href+link.label} href={localizeHref(link.href, locale)} onClick={() => setIsMobileMenuOpen(false)} className="block text-lg">{link.label}</Link>)}</nav></motion.div>}</AnimatePresence>
    <CartDrawer /><SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} /><RegionSelector isOpen={isRegionOpen} onClose={() => setIsRegionOpen(false)} />
  </>)
}
