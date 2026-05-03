'use client'

import { useState, useEffect, useRef, type ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { ArrowLeft, Search, User, Menu, X, ChevronDown, Globe, Heart, ShoppingBag, Settings, Package } from 'lucide-react'
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
  { title: 'Care Categories', items: [{ label: 'Anti-Aging', href: '/shop?concern=anti-aging' }, { label: 'Oils', href: '/shop?category=oils' }, { label: 'Masks', href: '/shop?category=masks' }, { label: 'Creams', href: '/shop?category=creams' }] },
  { title: 'Edits', items: [{ label: 'Best Sellers', href: '/shop/best-sellers' }, { label: 'New Arrivals', href: '/shop/new-arrivals' }, { label: 'Sets / Bundles', href: '/shop?category=sets' }] },
  { title: 'Help & Experience', items: [{ label: 'AI Concierge', href: '/ai-consultant' }, { label: 'Rewards', href: '/rewards' }, { label: 'Tips', href: '/tips' }] },
]

function BrandIcon({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn('inline-flex h-3.5 w-3.5 items-center justify-center', className)}>{children}</span>
}
const FacebookBrand = ({ className }: { className?: string }) => <BrandIcon className={className}><svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.019 4.388 11.012 10.125 11.927v-8.437H7.078v-3.49h3.047V9.41c0-3.017 1.792-4.686 4.533-4.686 1.312 0 2.686.235 2.686.235v2.96H15.83c-1.49 0-1.955.926-1.955 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.085 24 18.092 24 12.073z"/></svg></BrandIcon>
const InstagramBrand = ({ className }: { className?: string }) => <BrandIcon className={className}><svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm8.9 1.85a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"/></svg></BrandIcon>
const TiktokBrand = ({ className }: { className?: string }) => <BrandIcon className={className}><svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.35h-3.17v12.29a2.9 2.9 0 1 1-2-2.75V8.66a6.06 6.06 0 1 0 6.17 6.05V8.62a8.14 8.14 0 0 0 4.77 1.54V7.02a4.8 4.8 0 0 1-2-.33z"/></svg></BrandIcon>
const TrustpilotBrand = ({ className }: { className?: string }) => <BrandIcon className={className}><svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full"><path d="M12 1.5 14.54 9.32H23l-6.84 4.97 2.61 8.03L12 17.36l-6.77 4.96 2.61-8.03L1 9.32h8.46L12 1.5z"/></svg></BrandIcon>

function AnimatedTopText({
  item,
}: {
  item: { label: string; href?: string; icon?: ({ className }: { className?: string }) => ReactNode; className?: string }
}) {
  const letters = Array.from(item.label)
  const Icon = item.icon
  const content = (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
      {Icon ? <Icon className={cn('h-3.5 w-3.5', item.className)} /> : null}
      <span className="inline-flex">
        {letters.map((letter, index) => (
          <motion.span
            key={`letter-${item.label}-${index}`}
            className="inline-block"
            variants={{
              hidden: { opacity: 0, x: -10, filter: 'blur(3px)' },
              show: { opacity: 1, x: 0, filter: 'blur(0px)' },
            }}
            transition={{
              duration: 0.36,
              delay: index * 0.024,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </span>
      {Icon ? <Icon className={cn('h-3.5 w-3.5', item.className)} /> : null}
    </span>
  )

  const wrapper = (
    <motion.span
      className="inline-flex items-center"
      exit={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
      transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.024,
          },
        },
      }}
      initial="hidden"
      animate="show"
    >
      {content}
    </motion.span>
  )

  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center hover:opacity-85">
        {wrapper}
      </a>
    )
  }

  return wrapper
}


export function Header({
  transparentOnTop = false,
  lightOnTop = false,
  splitLightOnTop = false,
  logoSrc = '/assets/brand/jisoo-logo.png',
  logoClassName,
  showBackButton = false,
}: {
  transparentOnTop?: boolean
  lightOnTop?: boolean
  splitLightOnTop?: boolean
  logoSrc?: string
  logoClassName?: string
  showBackButton?: boolean
} = {}) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isRegionOpen, setIsRegionOpen] = useState(false)
  const [isMegaOpen, setIsMegaOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [topBarIndex, setTopBarIndex] = useState(0)
  const profileRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<number | null>(null)
  const pathname = usePathname()
  const router = useRouter()
  const { itemCount, setIsCartOpen } = useCart()
  const { locale, dictionary } = useLocale()
  const isHomePath = pathname === '/' || pathname === `/${locale}`
  const navLinks = [
    { href: '/shop', label: dictionary.header.nav.shop },
    { href: '/about', label: dictionary.header.nav.story },
    { href: '/ai-consultant', label: 'AI' },
  ]
  const discoverLabel = locale === 'ar' ? 'اكتشف' : locale === 'fr' ? 'Découvrir' : locale === 'de' ? 'Entdecken' : locale === 'ko' ? '둘러보기' : locale === 'tr' ? 'Keşfet' : 'Discover'
  const accountLoginLabel = locale === 'ar' ? 'الحساب / تسجيل الدخول' : locale === 'fr' ? 'Compte / Connexion' : locale === 'de' ? 'Konto / Login' : locale === 'ko' ? '계정 / 로그인' : locale === 'tr' ? 'Hesap / Giriş' : 'Account / Login'
  const cartLabel = locale === 'ar' ? 'السلة' : locale === 'fr' ? 'Panier' : locale === 'de' ? 'Warenkorb' : locale === 'ko' ? '장바구니' : locale === 'tr' ? 'Sepet' : 'Cart'
  const settingsLabel = locale === 'ar' ? 'الإعدادات' : locale === 'fr' ? 'Paramètres' : locale === 'de' ? 'Einstellungen' : locale === 'ko' ? '설정' : locale === 'tr' ? 'Ayarlar' : 'Settings'
  const headerText = (label: string) => {
    const translations: Record<string, Partial<Record<typeof locale, string>>> = {
      'Shop by Person': { ar: 'تسوق حسب الشخص', fr: 'Par personne', de: 'Nach Person', ko: '대상별 쇼핑', tr: 'Kişiye göre' },
      She: { ar: 'هي', fr: 'Elle', de: 'Sie', ko: '여성', tr: 'Kadın' },
      He: { ar: 'هو', fr: 'Lui', de: 'Er', ko: '남성', tr: 'Erkek' },
      'Care Categories': { ar: 'فئات العناية', fr: 'Catégories soin', de: 'Pflegekategorien', ko: '케어 카테고리', tr: 'Bakım kategorileri' },
      'Anti-Aging': { ar: 'مقاومة علامات التقدم', fr: 'Anti-âge', de: 'Anti-Aging', ko: '안티에이징', tr: 'Yaşlanma karşıtı' },
      Oils: { ar: 'زيوت', fr: 'Huiles', de: 'Öle', ko: '오일', tr: 'Yağlar' },
      Masks: { ar: 'أقنعة', fr: 'Masques', de: 'Masken', ko: '마스크', tr: 'Maskeler' },
      Creams: { ar: 'كريمات', fr: 'Crèmes', de: 'Cremes', ko: '크림', tr: 'Kremler' },
      Hydration: { ar: 'ترطيب', fr: 'Hydratation', de: 'Feuchtigkeit', ko: '수분', tr: 'Nem' },
      Edits: { ar: 'مختارات', fr: 'Sélections', de: 'Edits', ko: '에디트', tr: 'Seçkiler' },
      'Best Sellers': { ar: 'الأكثر مبيعًا', fr: 'Meilleures ventes', de: 'Bestseller', ko: '베스트셀러', tr: 'Çok satanlar' },
      'New Arrivals': { ar: 'وصل حديثًا', fr: 'Nouveautés', de: 'Neuheiten', ko: '신상품', tr: 'Yeni gelenler' },
      'Sets / Bundles': { ar: 'المجموعات', fr: 'Coffrets', de: 'Sets', ko: '세트', tr: 'Setler' },
      'Help & Experience': { ar: 'المساعدة والتجربة', fr: 'Aide & expérience', de: 'Hilfe & Erlebnis', ko: '도움말 및 경험', tr: 'Yardım ve deneyim' },
      'AI Concierge': { ar: 'المستشارة الذكية', fr: 'Concierge IA', de: 'KI-Beratung', ko: 'AI 컨시어지', tr: 'AI danışmanı' },
      Rewards: { ar: 'المكافآت', fr: 'Récompenses', de: 'Rewards', ko: '리워드', tr: 'Ödüller' },
      Tips: { ar: 'نصائح', fr: 'Conseils', de: 'Tipps', ko: '팁', tr: 'İpuçları' },
    }
    return translations[label]?.[locale] ?? label
  }
  const localizedMegaGroups = megaGroups.map((group) => ({
    ...group,
    title: headerText(group.title),
    items: group.items.map((item) => ({ ...item, label: headerText(item.label) })),
  }))
  const topBarMessages = [
    { label: dictionary.header.freeShipping.replace('{{amount}}', '€100') },
    { label: 'Facebook', href: 'https://www.facebook.com', icon: FacebookBrand, className: 'text-[#1877F2]' },
    { label: 'TikTok', href: 'https://www.tiktok.com', icon: TiktokBrand, className: 'text-black drop-shadow-[1px_0_0_#22d3ee] [text-shadow:-1px_0_0_#ec4899]' },
    { label: 'Excellent on Trustpilot', href: 'https://www.trustpilot.com', icon: TrustpilotBrand, className: 'text-[#00B67A]' },
    { label: 'Instagram', href: 'https://www.instagram.com', icon: InstagramBrand, className: 'text-[#E4405F]' },
  ]
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.25 })
  const hasHeaderFrame = isScrolled || !transparentOnTop || isMegaOpen
  const isLightHeader = !hasHeaderFrame && lightOnTop
  const isHeroOverlay = transparentOnTop && !isScrolled
  const topTextClass = isLightHeader ? 'text-white hover:text-white/75' : 'text-charcoal hover:text-[#8f6f46]'
  const rightTextClass = isLightHeader && splitLightOnTop ? 'text-charcoal hover:text-[#8f6f46]' : topTextClass
  const topIconClass = isLightHeader && !splitLightOnTop ? 'text-white/90 transition hover:text-white hover:opacity-80' : 'text-charcoal/80 transition hover:text-charcoal hover:opacity-80'
  const glassDropdownClass = isHeroOverlay
    ? 'border-white/22 bg-transparent shadow-[0_18px_44px_rgba(44,37,40,0.14)] backdrop-blur-2xl'
    : 'border-[#cfae83]/30 bg-warm-ivory/72 shadow-editorial backdrop-blur-xl'

  useEffect(() => { const on = () => setIsScrolled(window.scrollY > 12); window.addEventListener('scroll', on); return () => window.removeEventListener('scroll', on) }, [])
  useEffect(() => { const timer = window.setInterval(() => setTopBarIndex((prev) => (prev + 1) % topBarMessages.length), 8200); return () => window.clearInterval(timer) }, [topBarMessages.length])
  useEffect(() => { const onOutside = (event: MouseEvent) => { if (!profileRef.current?.contains(event.target as Node)) setIsProfileOpen(false) }; document.addEventListener('mousedown', onOutside); return () => document.removeEventListener('mousedown', onOutside) }, [])
  const openMega = () => { if (closeTimer.current) window.clearTimeout(closeTimer.current); setIsMegaOpen(true) }
  const keepMega = () => { if (closeTimer.current) window.clearTimeout(closeTimer.current) }
  const closeMega = () => { closeTimer.current = window.setTimeout(() => setIsMegaOpen(false), 220) }

  return (<>
    <motion.div className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[#e8c8d4] via-champagne-gold to-[#f4dfcf]" style={{ scaleX: progress }} />
    <motion.header onMouseEnter={keepMega} onMouseLeave={closeMega} initial={{ y: -96 }} animate={{ y: 0 }} transition={{ duration: 0.34 }} className={cn('fixed top-0 left-0 right-0 z-50 border-b transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300', hasHeaderFrame ? 'border-[#e9d5df] bg-warm-ivory/95 backdrop-blur-2xl shadow-[0_8px_25px_rgba(191,141,151,0.12)]' : 'border-transparent bg-transparent shadow-none backdrop-blur-0')}>
      <div className={cn('hidden border-b transition-[height,background-color,border-color] duration-300 lg:block', hasHeaderFrame ? 'h-8 border-rose-mauve/12 bg-warm-ivory' : 'h-0 overflow-hidden border-transparent bg-transparent')}>
        <div className={cn('mx-auto max-w-7xl px-6 h-8 flex items-center justify-center text-center text-[11px] tracking-[0.08em] transition-colors', !hasHeaderFrame && lightOnTop ? 'text-white/88' : 'text-charcoal/85')}>
          <AnimatePresence mode="wait" initial={false}>
            <AnimatedTopText key={topBarIndex} item={topBarMessages[topBarIndex]} />
          </AnimatePresence>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="relative flex h-16 items-center justify-between lg:h-[4.6rem]">
          <button onClick={() => setIsMobileMenuOpen(true)} className={cn('lg:hidden p-2 -ml-2', topIconClass)} aria-label={dictionary.header.actions.openMenu}><Menu className="w-6 h-6" /></button>
          <Link href={localizeHref('/', locale)} className="absolute left-1/2 z-10 -translate-x-1/2 flex-shrink-0 lg:relative lg:left-auto lg:translate-x-0"><Image src={logoSrc} alt="JISOO" width={280} height={140} priority className={cn('h-12 w-auto transition-[filter] lg:h-[3.85rem]', isLightHeader && 'brightness-0 invert', logoClassName)} /></Link>
          <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-5 xl:gap-7" aria-label="Primary navigation">
            {navLinks.map((link, index) => <Link key={link.href} href={localizeHref(link.href, locale)} className={cn('text-sm tracking-[0.1em] transition-colors', splitLightOnTop && index >= 4 ? rightTextClass : topTextClass)}>{link.label}</Link>)}
            <div className="relative" onMouseEnter={openMega}><button onClick={() => setIsMegaOpen((p) => !p)} aria-expanded={isMegaOpen} className={cn('inline-flex items-center gap-1 text-sm tracking-[0.1em] transition-colors', rightTextClass)}>{discoverLabel} <ChevronDown className="h-4 w-4" /></button></div>
          </nav>
          <div className="relative z-10 flex items-center gap-1.5 lg:gap-2"><div className="hidden lg:flex items-center gap-2"><LocaleSwitcher buttonClassName={cn('inline-flex h-10 w-10 items-center justify-center', topIconClass)} /><button onClick={() => setIsRegionOpen(true)} aria-label={dictionary.common.region} className={cn('inline-flex h-10 w-10 items-center justify-center', topIconClass)}><Globe className="h-4 w-4" /></button></div><button onClick={() => setIsSearchOpen(true)} className={cn('inline-flex h-10 w-10 items-center justify-center', topIconClass)} aria-label={dictionary.header.actions.search}><Search className="w-5 h-5" /></button><div className="relative" ref={profileRef}><button onClick={() => setIsProfileOpen((p) => !p)} className={cn('inline-flex h-10 w-10 items-center justify-center', topIconClass)} aria-label={dictionary.header.actions.account} aria-haspopup="menu" aria-expanded={isProfileOpen}><User className="w-5 h-5" /></button>{isProfileOpen && <div role="menu" className={cn('absolute right-0 z-[90] mt-2 w-52 rounded-2xl border p-2 text-charcoal', glassDropdownClass)}><Link role="menuitem" href={localizeHref('/account', locale)} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition hover:bg-[#d5bc9b]/45 hover:text-charcoal"><User className="h-4 w-4" />{accountLoginLabel}</Link><Link role="menuitem" href={localizeHref('/account/wishlist', locale)} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition hover:bg-[#d5bc9b]/45 hover:text-charcoal"><Heart className="h-4 w-4" />{dictionary.common.wishlist}</Link><button role="menuitem" onClick={() => { setIsProfileOpen(false); setIsCartOpen(true) }} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm transition hover:bg-[#d5bc9b]/45 hover:text-charcoal"><ShoppingBag className="h-4 w-4" />{cartLabel} {itemCount > 0 ? `(${itemCount})` : ''}</button><Link role="menuitem" href={localizeHref('/account/orders', locale)} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition hover:bg-[#d5bc9b]/45 hover:text-charcoal"><Package className="h-4 w-4" />{dictionary.common.orderHistory}</Link><Link role="menuitem" href={localizeHref('/account/settings', locale)} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition hover:bg-[#d5bc9b]/45 hover:text-charcoal"><Settings className="h-4 w-4" />{settingsLabel}</Link></div>}</div></div>
        </div>
      </div>
      <AnimatePresence mode="wait">{isMegaOpen && <motion.div onMouseEnter={openMega} initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: 8, filter: 'blur(4px)' }} transition={{ duration: 0.344, ease: [0.22,1,0.36,1] }} className={cn('hidden border-t lg:block', glassDropdownClass)}><motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }} className="mx-auto grid max-w-7xl grid-cols-4 gap-8 px-8 py-7">{localizedMegaGroups.map((group, gi) => <motion.div key={group.title} variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }} className={cn('space-y-3', gi !== 3 && 'border-r border-[#cfae83]/18 pr-6')}><p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/84">{group.title}</p><div className="space-y-2">{group.items.map((item) => <Link key={item.href + item.label} href={localizeHref(item.href, locale)} className="block rounded-lg px-2 py-1 text-sm text-charcoal/85 transition-all duration-200 hover:bg-[#d5bc9b]/42 hover:text-charcoal">{item.label}</Link>)}</div></motion.div>)}</motion.div></motion.div>}</AnimatePresence>
    </motion.header>
    <AnimatePresence>
      {showBackButton && !isHomePath && (
        <motion.button
          type="button"
          onClick={() => router.back()}
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -14 }}
          className={cn(
            'fixed left-4 top-[5.35rem] z-40 inline-flex h-9 w-9 items-center justify-center rounded-full border shadow-[0_10px_22px_rgba(149,103,74,0.13)] backdrop-blur-xl transition hover:-translate-y-0.5 lg:left-8 lg:top-[6.7rem]',
            hasHeaderFrame
              ? 'border-[#cfae83]/35 bg-warm-ivory/88 text-charcoal hover:bg-[#cfae83] hover:text-white'
              : 'border-white/35 bg-charcoal/20 text-white hover:bg-[#cfae83]'
          )}
          aria-label="Go back"
        >
          <ArrowLeft className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
    <AnimatePresence mode="wait">{isMobileMenuOpen && <motion.div initial={{ x: '-104%', opacity: 0.94 }} animate={{ x: 0, opacity: 1 }} exit={{ x: '-104%', opacity: 0.94 }} transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }} className="fixed top-0 left-0 bottom-0 z-50 w-[85%] max-w-sm overflow-y-auto bg-warm-ivory p-6 shadow-[18px_0_48px_rgba(44,37,40,0.18)] lg:hidden"><div className="mb-8 flex items-center justify-between"><div><p className="text-xs uppercase tracking-[0.18em] text-charcoal/55">JISOO</p><h2 className="mt-1 text-2xl font-semibold text-charcoal">Menu</h2></div><button onClick={() => setIsMobileMenuOpen(false)} className="rounded-full p-2 text-charcoal transition hover:bg-[#d5bc9b]/28"><X className="w-6 h-6" /></button></div><nav className="space-y-5">{[...navLinks, ...localizedMegaGroups.flatMap(g => g.items)].map((link) => <Link key={link.href + link.label} href={localizeHref(link.href, locale)} onClick={() => setIsMobileMenuOpen(false)} className="block text-lg">{link.label}</Link>)}</nav></motion.div>}</AnimatePresence>
    <CartDrawer /><SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} /><RegionSelector isOpen={isRegionOpen} onClose={() => setIsRegionOpen(false)} />
  </>)
}
