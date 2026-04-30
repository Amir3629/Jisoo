'use client'

import { useState, useEffect, useRef, type ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Search, User, Menu, X, ChevronDown, Globe, Heart, ShoppingBag, Settings, Package } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCart } from '@/components/providers/cart-provider'
import { useLocale } from '@/components/providers/locale-provider'
import { localizeHref } from '@/lib/i18n'
import { LocaleSwitcher } from '@/components/i18n/locale-switcher'
import { CartDrawer } from '@/components/cart/cart-drawer'
import { SearchModal } from '@/components/search/search-modal'
import { RegionSelector } from '@/components/layout/region-selector'

const megaGroups = [
  { title: 'Shop by Person', items: [{ label: 'She', href: '/shop/women' }, { label: 'He', href: '/shop/men' }] },
  { title: 'Beauty Categories', items: [{ label: 'Skincare', href: '/shop?category=skincare' }, { label: 'Makeup', href: '/shop?category=makeup' }, { label: 'Hydration', href: '/shop?category=hydration' }] },
  { title: 'Edits', items: [{ label: 'Best Sellers', href: '/shop/best-sellers' }, { label: 'New Arrivals', href: '/shop/new-arrivals' }, { label: 'Sets / Bundles', href: '/shop?category=sets' }] },
  { title: 'Help & Experience', items: [{ label: 'AI Concierge', href: '/ai-consultant' }, { label: 'Rewards', href: '/rewards' }, { label: 'Tips', href: '/tips' }] },
]

function BrandIcon({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn('inline-flex h-3.5 w-3.5 items-center justify-center', className)}>{children}</span>
}
const FacebookBrand = ({ className }: { className?: string }) => <BrandIcon className={className}><svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.019 4.388 11.012 10.125 11.927v-8.437H7.078v-3.49h3.047V9.41c0-3.017 1.792-4.686 4.533-4.686 1.312 0 2.686.235 2.686.235v2.96H15.83c-1.49 0-1.955.926-1.955 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.085 24 18.092 24 12.073z"/></svg></BrandIcon>
const InstagramBrand = ({ className }: { className?: string }) => <BrandIcon className={className}><svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm8.9 1.85a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"/></svg></BrandIcon>
const TiktokBrand = ({ className }: { className?: string }) => <BrandIcon className={className}><svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.35h-3.17v12.29a2.9 2.9 0 1 1-2-2.75V8.66a6.06 6.06 0 1 0 6.17 6.05V8.62a8.14 8.14 0 0 0 4.77 1.54V7.02a4.8 4.8 0 0 1-2-.33z"/></svg></BrandIcon>

function AnimatedTopText({ text }: { text: string }) {
  const [current, setCurrent] = useState(text)
  const [prev, setPrev] = useState<string | null>(null)

  useEffect(() => {
    if (text === current) return

    setPrev(current)

    const timer = setTimeout(() => {
      setCurrent(text)
      setPrev(null)
    }, 760)

    return () => clearTimeout(timer)
  }, [text, current])

  const renderLetters = (value: string, mode: 'enter' | 'exit') =>
    Array.from(value).map((letter, index) => (
      <motion.span
        key={`${mode}-${value}-${index}`}
        className="inline-block"
        initial={mode === 'enter' ? { opacity: 0, x: -8, y: 4, filter: 'blur(3px)' } : false}
        animate={mode === 'enter' ? { opacity: 1, x: 0, y: 0, filter: 'blur(0px)' } : { opacity: 0, x: 16, y: -1, filter: 'blur(4px)' }}
        transition={{
          duration: mode === 'enter' ? 0.42 : 0.62,
          delay: index * 0.026,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {letter === ' ' ? '\u00A0' : letter}
      </motion.span>
    ))

  return (
    <span className="relative inline-flex items-center justify-center text-charcoal/80 hover:text-charcoal transition overflow-hidden whitespace-nowrap">
      {prev && (
        <span className="absolute inline-flex">
          {renderLetters(prev, 'exit')}
        </span>
      )}

      <span className="inline-flex">
        {renderLetters(current, 'enter')}
      </span>
    </span>
  )
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isRegionOpen, setIsRegionOpen] = useState(false)
  const [isMegaOpen, setIsMegaOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [topBarIndex, setTopBarIndex] = useState(0)
  const profileRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<number | null>(null)
  const { itemCount, setIsCartOpen } = useCart()
  const { locale, dictionary } = useLocale()
  const navLinks = [{ href: '/shop', label: 'Shop' }, { href: '/shop/new-arrivals', label: 'New' }, { href: '/shop/best-sellers', label: 'Best Sellers' }, { href: '/ai-consultant', label: 'AI Concierge' }]
  const topBarMessages = [
    { label: dictionary.header.freeShipping.replace('{{amount}}', '€100') },
    { label: 'Facebook', href: 'https://www.facebook.com', icon: FacebookBrand, className: 'text-[#1877F2]' },
    { label: 'TikTok', href: 'https://www.tiktok.com', icon: TiktokBrand, className: 'text-black drop-' },
    { label: 'Instagram', href: 'https://www.instagram.com', icon: InstagramBrand, className: 'text-[#E4405F]' },
  ]
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.25 })

  useEffect(() => { const on = () => setIsScrolled(window.scrollY > 12); window.addEventListener('scroll', on); return () => window.removeEventListener('scroll', on) }, [])
  useEffect(() => { const timer = window.setInterval(() => setTopBarIndex((prev) => (prev + 1) % topBarMessages.length), 8200); return () => window.clearInterval(timer) }, [topBarMessages.length])
  useEffect(() => { const onOutside = (event: MouseEvent) => { if (!profileRef.current?.contains(event.target as Node)) setIsProfileOpen(false) }; document.addEventListener('mousedown', onOutside); return () => document.removeEventListener('mousedown', onOutside) }, [])
  const openMega = () => { if (closeTimer.current) window.clearTimeout(closeTimer.current); setIsMegaOpen(true) }
  const closeMega = () => { closeTimer.current = window.setTimeout(() => setIsMegaOpen(false), 150) }

  return (<>
    <motion.div className="fixed top-1 left-0 right-0 z-[60] h-[2px] origin-left " style={{ scaleX: progress }} />
    <motion.header initial={{ y: -96 }} animate={{ y: 0 }} transition={{ duration: 0.34 }} className={cn('fixed top-1 left-0 right-0 z-50 ', isScrolled ? '' : '')}>
      <div className="hidden ">
        <div className="mx-auto max-w-7xl px-6 h-8 flex items-center justify-center text-charcoal/80 hover:text-charcoal transition text-center text-[11px] tracking-[0.08em] text-charcoal/85">
          <AnimatePresence mode="wait">
            <motion.div key={topBarIndex} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              {(() => { const item = topBarMessages[topBarIndex]; if (!item.href || !item.icon) return <AnimatedTopText text={item.label} />; const Icon = item.icon; return <a href={item.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:opacity-85"><Icon className={cn('h-3.5 w-3.5', item.className)} /><AnimatedTopText text={item.label} /><Icon className={cn('h-3.5 w-3.5', item.className)} /></a> })()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="relative flex h-16 items-center justify-between lg:h-[4.6rem]">
          <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-1 -ml-2" aria-label={dictionary.header.actions.openMenu}><Menu className="w-6 h-6" /></button>
          <Link href={localizeHref('/', locale)} className="relative z-10 flex-shrink-0"><Image src="/LOGO/Jisoo LOGO.png" alt="JISOO" width={200} height={58} priority className="h-10 w-auto lg:h-[3.2rem]" /></Link>
          <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-1" aria-label="Primary navigation">
            {navLinks.map((link) => <Link key={link.href} href={localizeHref(link.href, locale)} className="text-sm tracking-[0.1em] text-charcoal hover:text-rose-mauve">{link.label}</Link>)}
            <div className="relative" onMouseEnter={openMega} onMouseLeave={closeMega}><button onClick={() => setIsMegaOpen((p) => !p)} aria-expanded={isMegaOpen} className="inline-flex items-center gap-1 text-sm tracking-[0.1em] text-charcoal hover:text-rose-mauve">Discover <ChevronDown className="h-4 w-4" /></button></div>
          </nav>
          <div className="relative z-10 flex items-center gap-1 lg:gap-1"><div className="hidden lg:flex items-center gap-1"><LocaleSwitcher buttonClassName="h-9 w-9" /><button onClick={() => setIsRegionOpen(true)} aria-label="Select region" className="inline-flex h-9 w-9 items-center justify-center rounded-full border "><Globe className="h-4 w-4" /></button></div><button onClick={() => setIsSearchOpen(true)} className="p-1" aria-label={dictionary.header.actions.search}><Search className="w-5 h-5" /></button><div className="relative" ref={profileRef}><button onClick={() => setIsProfileOpen((p) => !p)} className="p-1" aria-label={dictionary.header.actions.account} aria-haspopup="menu" aria-expanded={isProfileOpen}><User className="w-5 h-5" /></button>{isProfileOpen && <div role="menu" className="absolute right-0 z-[90] mt-2 w-52 rounded-2xl border "><Link role="menuitem" href={localizeHref('/account', locale)} className="flex items-center gap-1 rounded-xl px-3 py-2 text-sm hover:"><User className="h-4 w-4" />Account / Login</Link><Link role="menuitem" href={localizeHref('/account/wishlist', locale)} className="flex items-center gap-1 rounded-xl px-3 py-2 text-sm hover:"><Heart className="h-4 w-4" />Wishlist</Link><button role="menuitem" onClick={() => { setIsProfileOpen(false); setIsCartOpen(true) }} className="flex w-full items-center gap-1 rounded-xl px-3 py-2 text-sm hover:"><ShoppingBag className="h-4 w-4" />Cart {itemCount > 0 ? `(${itemCount})` : ''}</button><Link role="menuitem" href={localizeHref('/account/orders', locale)} className="flex items-center gap-1 rounded-xl px-3 py-2 text-sm hover:"><Package className="h-4 w-4" />Orders</Link><Link role="menuitem" href={localizeHref('/account/settings', locale)} className="flex items-center gap-1 rounded-xl px-3 py-2 text-sm hover:"><Settings className="h-4 w-4" />Settings</Link></div>}</div></div>
        </div>
      </div>
      <AnimatePresence mode="wait">{isMegaOpen && <motion.div onMouseEnter={openMega} onMouseLeave={closeMega} initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: 8, filter: 'blur(4px)' }} transition={{ duration: 0.344, ease: [0.22,1,0.36,1] }} className="hidden lg:block "><motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }} className="mx-auto grid max-w-7xl grid-cols-4 gap-1 px-8 py-7">{megaGroups.map((group, gi) => <motion.div key={group.title} variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }} className={cn('space-y-3', gi !== 3 && '')}><p className="text-xs uppercase tracking-[0.14em] text-charcoal/55">{group.title}</p><div className="space-y-2">{group.items.map((item) => <Link key={item.label} href={localizeHref(item.href, locale)} className="block rounded-md px-1.5 py-1 text-sm text-charcoal/85 transition-all duration-200 hover:">{item.label}</Link>)}</div></motion.div>)}</motion.div></motion.div>}</AnimatePresence>
    </motion.header>
    <AnimatePresence mode="wait">{isMobileMenuOpen && <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="fixed top-1 left-0 bottom-0 z-50 w-[85%] max-w-sm overflow-y-auto "><div className="mb-8 flex items-center justify-between"><Image src="/LOGO/Jisoo LOGO.png" alt="JISOO" width={120} height={36} className="h-8 w-auto" /><button onClick={() => setIsMobileMenuOpen(false)}><X className="w-6 h-6" /></button></div><nav className="space-y-5">{[...navLinks, ...megaGroups.flatMap(g => g.items)].map((link) => <Link key={link.href + link.label} href={localizeHref(link.href, locale)} onClick={() => setIsMobileMenuOpen(false)} className="block text-lg">{link.label}</Link>)}</nav></motion.div>}</AnimatePresence>
    <CartDrawer /><SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} /><RegionSelector isOpen={isRegionOpen} onClose={() => setIsRegionOpen(false)} />
  </>)
}
