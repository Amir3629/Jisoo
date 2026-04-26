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

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isRegionOpen, setIsRegionOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [topBarIndex, setTopBarIndex] = useState(0)
  const [mode, setMode] = useState<'soft' | 'color'>('color')
  const { itemCount, setIsCartOpen } = useCart()
  const { config } = useRegion()
  const { locale, dictionary } = useLocale()
  const navLinks: Array<{ href: string; label: string; hasDropdown?: boolean }> = [
    { href: '/shop/women', label: locale === 'ar' ? 'نساء' : locale === 'fr' ? 'Femmes' : locale === 'de' ? 'Damen' : locale === 'ko' ? '여성' : locale === 'tr' ? 'Kadın' : 'Women', hasDropdown: true },
    { href: '/shop/men', label: locale === 'ar' ? 'رجال' : locale === 'fr' ? 'Hommes' : locale === 'de' ? 'Herren' : locale === 'ko' ? '남성' : locale === 'tr' ? 'Erkek' : 'Men', hasDropdown: true },
    { href: '/tips', label: locale === 'ar' ? 'نصائح' : locale === 'fr' ? 'Conseils' : locale === 'de' ? 'Tipps' : locale === 'ko' ? '팁' : locale === 'tr' ? 'İpuçları' : 'Tips' },
    { href: '/gift-cards', label: locale === 'ar' ? 'بطاقات هدايا' : locale === 'fr' ? 'Cartes Cadeaux' : locale === 'de' ? 'Geschenkkarten' : locale === 'ko' ? '기프트 카드' : locale === 'tr' ? 'Hediye Kartları' : 'Gift Cards' },
    { href: '/rewards', label: locale === 'ar' ? 'المكافآت' : locale === 'fr' ? 'Récompenses' : locale === 'de' ? 'Prämien' : locale === 'ko' ? '리워드' : locale === 'tr' ? 'Ödüller' : 'Rewards' },
  ]
  const submenuCategories = locale === 'ar'
    ? ['ترطيب', 'سيروم', 'كريم', 'واقي شمس', 'غسول', 'تونر', 'عناية بالشعر', 'عناية باللحية', 'مجموعات هدايا', 'الأكثر مبيعًا']
    : locale === 'fr'
      ? ['Hydratation', 'Sérum', 'Crème', 'Solaire', 'Nettoyant', 'Toner', 'Soin cheveux', 'Soin barbe', 'Coffrets cadeaux', 'Meilleures ventes']
      : locale === 'de'
        ? ['Feuchtigkeit', 'Serum', 'Creme', 'Sonnenschutz', 'Reiniger', 'Toner', 'Haarpflege', 'Bartpflege', 'Geschenksets', 'Bestseller']
        : locale === 'ko'
          ? ['보습', '세럼', '크림', '선케어', '클렌저', '토너', '헤어 케어', '비어드 케어', '기프트 세트', '베스트셀러']
          : locale === 'tr'
            ? ['Nemlendirme', 'Serum', 'Krem', 'Güneş Koruyucu', 'Temizleyici', 'Toner', 'Saç Bakımı', 'Sakal Bakımı', 'Hediye Setleri', 'Çok Satanlar']
            : ['Hydration', 'Serum', 'Cream', 'Sunscreen', 'Cleanser', 'Toner', 'Hair Care', 'Beard Care', 'Gift Sets', 'Best Sellers']
  const topBarMessages = [
    { label: dictionary.header.freeShipping.replace('{{amount}}', '€100'), href: null },
    { label: 'TikTok', href: 'https://www.tiktok.com' },
    { label: 'Facebook', href: 'https://www.facebook.com' },
    { label: 'Instagram', href: 'https://www.instagram.com' },
  ]
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.25 })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  useEffect(() => {
    const timer = window.setInterval(() => setTopBarIndex(prev => (prev + 1) % topBarMessages.length), 3800)
    return () => window.clearInterval(timer)
  }, [])
  useEffect(() => {
    const stored = window.localStorage.getItem('jisoo-mode')
    const next = stored === 'soft' ? 'soft' : 'color'
    setMode(next)
    document.documentElement.setAttribute('data-ui-mode', next)
  }, [])
  const toggleMode = (next: 'soft' | 'color') => {
    setMode(next)
    window.localStorage.setItem('jisoo-mode', next)
    document.documentElement.setAttribute('data-ui-mode', next)
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[#e8c8d4] via-champagne-gold to-[#f4dfcf]"
        style={{ scaleX: progress }}
      />
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-warm-ivory/95 backdrop-blur-2xl shadow-[0_16px_34px_rgba(191,141,151,0.14)] border-b border-[#e9d5df]'
            : 'bg-transparent'
        )}
      >
        {/* Top Bar */}
        <div className="hidden lg:block bg-gradient-to-r from-[#fff7f2] via-[#fbeaf1] to-[#f8eee5] text-charcoal border-b border-[#ead9cd]">
          <div className="max-w-7xl mx-auto px-6 py-1.5 text-center text-[11px]">
            <AnimatePresence mode="wait">
              <motion.div key={topBarIndex} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="font-light tracking-[0.08em]">
                {topBarMessages[topBarIndex].href ? (
                  <a href={topBarMessages[topBarIndex].href!} target="_blank" rel="noopener noreferrer" className="hover:text-rose-mauve underline-offset-2 hover:underline">
                    {topBarMessages[topBarIndex].label}
                  </a>
                ) : topBarMessages[topBarIndex].label}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-charcoal hover:text-plum transition-colors"
              aria-label={dictionary.header.actions.openMenu}
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link href={localizeHref('/', locale)} className="flex-shrink-0 flex flex-col items-start">
              <motion.h1
              className="text-2xl lg:text-3xl font-serif font-bold tracking-tight text-[#7a5568]"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                JISOO
              </motion.h1>
              <span className="hidden lg:block text-[10px] uppercase tracking-[0.22em] text-[#7a5568]/70 mt-0.5">
                {locale === 'ar' ? 'إصدار سيول' : locale === 'fr' ? 'Édition Séoul' : locale === 'de' ? 'Seoul Edition' : locale === 'ko' ? '서울 에디션' : locale === 'tr' ? 'Seul Edisyonu' : 'Seoul Edition'}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map(link => (
                <div
                  key={link.href}
                  // P0: keep hover behavior and add keyboard parity for menu discovery.
                  onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.href)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  onFocus={() => link.hasDropdown && setActiveDropdown(link.href)}
                  onBlur={e => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                      setActiveDropdown(null)
                    }
                  }}
                  className="relative"
                >
                  <Link
                    href={localizeHref(link.href, locale)}
                    className={cn(
                      'text-sm font-medium tracking-[0.09em] transition-colors relative py-2',
                      'text-charcoal hover:text-rose-mauve',
                      'after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5',
                      'after:bg-rose-mauve after:scale-x-0 after:origin-center',
                      'after:transition-transform after:duration-300',
                      'hover:after:scale-x-100'
                    )}
                  >
                    <span className="flex items-center gap-1">
                      {link.label}
                      {link.hasDropdown && (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </span>
                  </Link>

                  {/* Mega Menu */}
                  <AnimatePresence>
                    {link.hasDropdown && activeDropdown === link.href && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 z-[70] -translate-x-1/2 pt-4"
                      >
                        <div className="surface-velvet-dropdown rounded-2xl shadow-editorial p-6 w-[560px] grid grid-cols-2 gap-3">
                          {submenuCategories.map(item => (
                            <Link key={item} href={localizeHref(`/shop?category=${encodeURIComponent(item.toLowerCase())}`, locale)} className="text-sm text-charcoal hover:text-rose-mauve transition-colors">
                              {item}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1 lg:gap-3">
              <div className="hidden lg:flex items-center rounded-full border border-rose-mauve/25 bg-warm-ivory/70 p-1 backdrop-blur-sm">
                <button
                  onClick={() => toggleMode('soft')}
                  className={cn('px-2.5 py-1 text-[10px] rounded-full transition-colors', mode === 'soft' ? 'bg-[#e8d7d8] text-charcoal' : 'text-charcoal/60 hover:text-charcoal')}
                >
                  {locale === 'ar' ? 'هادئ' : locale === 'fr' ? 'Doux' : locale === 'de' ? 'Soft' : locale === 'ko' ? '소프트' : locale === 'tr' ? 'Yumuşak' : 'Soft'}
                </button>
                <button
                  onClick={() => toggleMode('color')}
                  className={cn('px-2.5 py-1 text-[10px] rounded-full transition-colors', mode === 'color' ? 'bg-[#e8d7d8] text-charcoal' : 'text-charcoal/60 hover:text-charcoal')}
                >
                  {locale === 'ar' ? 'لون' : locale === 'fr' ? 'Couleur' : locale === 'de' ? 'Farbe' : locale === 'ko' ? '컬러' : locale === 'tr' ? 'Renk' : 'Color'}
                </button>
              </div>
              <div className="hidden lg:flex items-center gap-2 pr-1">
                <LocaleSwitcher />
                <button
                  onClick={() => setIsRegionOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-rose-mauve/20 bg-white/70 px-2.5 py-1 text-[11px] text-charcoal/75 hover:border-rose-mauve/40 hover:text-rose-mauve transition-colors"
                >
                  <Globe className="h-3.5 w-3.5" />
                  <span>{config.name}</span>
                  <ChevronDown className="h-3 w-3" />
                </button>
              </div>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-charcoal hover:text-rose-mauve transition-colors"
                aria-label={dictionary.header.actions.search}
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                href={localizeHref('/account', locale)}
                className="hidden sm:block p-2 text-charcoal hover:text-rose-mauve transition-colors"
                aria-label={dictionary.header.actions.account}
              >
                <User className="w-5 h-5" />
              </Link>

              <Link
                href={localizeHref('/account/wishlist', locale)}
                className="hidden sm:block p-2 text-charcoal hover:text-rose-mauve transition-colors"
                aria-label={dictionary.header.actions.wishlist}
              >
                <Heart className="w-5 h-5" />
              </Link>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-charcoal hover:text-rose-mauve transition-colors"
                aria-label={dictionary.header.actions.cart}
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-rose-mauve text-white text-xs font-medium rounded-full flex items-center justify-center"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="divider-luxury" />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              // P0: explicit drawer semantics for assistive tech.
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-warm-ivory z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-serif font-bold text-plum">JISOO</h2>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close menu"
                    className="p-2 -mr-2 text-charcoal hover:text-plum"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <nav className="space-y-6">
                  {navLinks.map(link => (
                    <Link
                      key={link.href}
                      href={localizeHref(link.href, locale)}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-lg font-medium text-charcoal hover:text-plum transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className="mt-8 pt-8 border-t border-blush-pink">
                  <Link
                    href={localizeHref('/account', locale)}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-3 text-charcoal hover:text-plum transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span>{dictionary.common.account}</span>
                  </Link>
                  <Link
                    href={localizeHref('/account/wishlist', locale)}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-3 text-charcoal hover:text-plum transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                    <span>{dictionary.common.wishlist}</span>
                  </Link>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      setIsRegionOpen(true)
                    }}
                    className="flex items-center gap-3 py-3 text-charcoal hover:text-plum transition-colors w-full"
                  >
                    <Globe className="w-5 h-5" />
                    <span>{config.name}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modals */}
      <CartDrawer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <RegionSelector isOpen={isRegionOpen} onClose={() => setIsRegionOpen(false)} />
    </>
  )
}
