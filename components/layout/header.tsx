'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Search, User, Menu, X, ChevronDown, Globe, Heart, ShoppingBag, Settings, Package } from 'lucide-react'
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
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [topBarIndex, setTopBarIndex] = useState(0)
  const profileRef = useRef<HTMLDivElement>(null)
  const { itemCount, setIsCartOpen } = useCart()
  const { locale, dictionary } = useLocale()
  const navLinks = [{ href: '/shop', label: 'Shop' }, { href: '/shop/new-arrivals', label: 'New' }, { href: '/shop/best-sellers', label: 'Best Sellers' }, { href: '/ai-consultant', label: 'AI Concierge' }]
  const topBarMessages = [{ label: dictionary.header.freeShipping.replace('{{amount}}', '€100'), href: null }, { label: 'TikTok', href: 'https://www.tiktok.com' }, { label: 'Facebook', href: 'https://www.facebook.com' }, { label: 'Instagram', href: 'https://www.instagram.com' }]
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.25 })

  useEffect(() => { const on = () => setIsScrolled(window.scrollY > 12); window.addEventListener('scroll', on); return () => window.removeEventListener('scroll', on) }, [])
  useEffect(() => { const timer = window.setInterval(() => setTopBarIndex((prev) => (prev + 1) % topBarMessages.length), 5400); return () => window.clearInterval(timer) }, [topBarMessages.length])
  useEffect(() => {
    const onOutside = (event: MouseEvent) => { if (!profileRef.current?.contains(event.target as Node)) setIsProfileOpen(false) }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [])

  return (<>
    <motion.div className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[#e8c8d4] via-champagne-gold to-[#f4dfcf]" style={{ scaleX: progress }} />
    <motion.header initial={{ y: -96 }} animate={{ y: 0 }} transition={{ duration: 0.34 }} className={cn('fixed top-0 left-0 right-0 z-50 border-b transition-[background-color,backdrop-filter,border-color,box-shadow] duration-150', isScrolled ? 'border-[#e9d5df] bg-warm-ivory/95 backdrop-blur-2xl shadow-[0_8px_25px_rgba(191,141,151,0.12)]' : 'border-transparent bg-warm-ivory/72 backdrop-blur-md')}>
      <div className="hidden border-b border-rose-mauve/12 bg-gradient-to-r from-[#fff7f2] via-[#fbeaf1] to-[#f8eee5] lg:block">
        <div className="mx-auto max-w-7xl px-6 py-1.5 text-center text-[11px] tracking-[0.08em] text-charcoal/85">
          <AnimatePresence mode="wait">
            <motion.div key={topBarIndex} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.34, ease: 'easeOut' }}>
              {topBarMessages[topBarIndex].href ? <a href={topBarMessages[topBarIndex].href!} target="_blank" rel="noopener noreferrer" className="hover:text-rose-mauve hover:underline underline-offset-2">{topBarMessages[topBarIndex].label}</a> : topBarMessages[topBarIndex].label}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between lg:h-[4.6rem]">
          <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 -ml-2" aria-label={dictionary.header.actions.openMenu}><Menu className="w-6 h-6" /></button>
          <Link href={localizeHref('/', locale)} className="flex-shrink-0"><h1 className="text-2xl lg:text-3xl font-serif font-bold text-[#7a5568] leading-none">JISOO</h1></Link>
          <nav className="hidden lg:flex items-center gap-7" aria-label="Primary navigation">
            {navLinks.map((link) => <Link key={link.href} href={localizeHref(link.href, locale)} className="text-sm tracking-[0.1em] text-charcoal hover:text-rose-mauve">{link.label}</Link>)}
            <div className="relative" onMouseEnter={() => setIsMegaOpen(true)} onMouseLeave={() => setIsMegaOpen(false)}><button onClick={() => setIsMegaOpen((p) => !p)} aria-expanded={isMegaOpen} className="inline-flex items-center gap-1 text-sm tracking-[0.1em] text-charcoal hover:text-rose-mauve">Discover <ChevronDown className="h-4 w-4" /></button></div>
          </nav>
          <div className="flex items-center gap-1.5 lg:gap-2">
            <div className="hidden lg:flex items-center gap-2">
              <LocaleSwitcher buttonClassName="h-9 w-9" />
              <button onClick={() => setIsRegionOpen(true)} aria-label="Select region" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-rose-mauve/20 bg-white/80 shadow-sm hover:border-rose-mauve/45"><Globe className="h-4 w-4" /></button>
            </div>
            <button onClick={() => setIsSearchOpen(true)} className="p-2" aria-label={dictionary.header.actions.search}><Search className="w-5 h-5" /></button>
            <div className="relative" ref={profileRef}>
              <button onClick={() => setIsProfileOpen((p) => !p)} className="p-2" aria-label={dictionary.header.actions.account} aria-haspopup="menu" aria-expanded={isProfileOpen}><User className="w-5 h-5" /></button>
              {isProfileOpen && (
                <div role="menu" className="absolute right-0 z-[90] mt-2 w-52 rounded-2xl border border-rose-mauve/20 bg-white/95 p-2 shadow-editorial backdrop-blur-sm">
                  <Link role="menuitem" href={localizeHref('/account', locale)} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-rose-mauve/10"><User className="h-4 w-4" />Account / Login</Link>
                  <Link role="menuitem" href={localizeHref('/account/wishlist', locale)} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-rose-mauve/10"><Heart className="h-4 w-4" />Wishlist</Link>
                  <button role="menuitem" onClick={() => { setIsProfileOpen(false); setIsCartOpen(true) }} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-rose-mauve/10"><ShoppingBag className="h-4 w-4" />Cart {itemCount > 0 ? `(${itemCount})` : ''}</button>
                  <Link role="menuitem" href={localizeHref('/account/orders', locale)} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-rose-mauve/10"><Package className="h-4 w-4" />Orders</Link>
                  <Link role="menuitem" href={localizeHref('/account/settings', locale)} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-rose-mauve/10"><Settings className="h-4 w-4" />Settings</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>{isMegaOpen && <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} className="hidden lg:block border-t border-rose-mauve/15 bg-white/95 backdrop-blur-xl"><div className="mx-auto grid max-w-7xl grid-cols-4 gap-3 px-6 py-6">{megaItems.map((item) => <Link key={item.label} href={localizeHref(item.href, locale)} className="rounded-xl border border-rose-mauve/15 bg-warm-ivory/80 p-4 text-sm hover:border-rose-mauve/40">{item.label}</Link>)}</div></motion.div>}</AnimatePresence>
    </motion.header>
    <AnimatePresence>{isMobileMenuOpen && <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="fixed top-0 left-0 bottom-0 z-50 w-[85%] max-w-sm overflow-y-auto bg-warm-ivory p-6 lg:hidden"><div className="mb-8 flex items-center justify-between"><h2 className="text-2xl font-serif">JISOO</h2><button onClick={() => setIsMobileMenuOpen(false)}><X className="w-6 h-6" /></button></div><nav className="space-y-5">{[...navLinks, ...megaItems].map((link) => <Link key={link.href+link.label} href={localizeHref(link.href, locale)} onClick={() => setIsMobileMenuOpen(false)} className="block text-lg">{link.label}</Link>)}</nav></motion.div>}</AnimatePresence>
    <CartDrawer /><SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} /><RegionSelector isOpen={isRegionOpen} onClose={() => setIsRegionOpen(false)} />
  </>)
}
