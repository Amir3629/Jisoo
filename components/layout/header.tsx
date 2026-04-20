'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronDown, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCart } from '@/components/providers/cart-provider'
import { useRegion } from '@/components/providers/region-provider'
import { CartDrawer } from '@/components/cart/cart-drawer'
import { SearchModal } from '@/components/search/search-modal'
import { RegionSelector } from '@/components/layout/region-selector'
import { categories } from '@/lib/data'

const navLinks = [
  { href: '/shop', label: 'Shop', hasDropdown: true },
  { href: '/shop/new-arrivals', label: 'New' },
  { href: '/shop/best-sellers', label: 'Best Sellers' },
  { href: '/about', label: 'Our Story' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isRegionOpen, setIsRegionOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { itemCount, setIsCartOpen } = useCart()
  const { config } = useRegion()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-warm-ivory/90 backdrop-blur-2xl shadow-editorial border-b border-rose-mauve/20'
            : 'bg-transparent'
        )}
      >
        {/* Top Bar */}
        <div className="hidden lg:block bg-gradient-to-r from-plum to-[#5d2b57] text-warm-ivory">
          <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-xs">
            <p className="font-light tracking-wide">
              Free shipping on orders over {config.currencySymbol}100
            </p>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setIsRegionOpen(true)}
                className="flex items-center gap-1.5 hover:text-blush-pink transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{config.name}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              <Link href="/help" className="hover:text-blush-pink transition-colors">
                Help
              </Link>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-charcoal hover:text-plum transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex flex-col items-start">
              <motion.h1
                className="text-2xl lg:text-3xl font-serif font-bold tracking-tight text-plum"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                JISOO
              </motion.h1>
              <span className="hidden lg:block text-[10px] uppercase tracking-[0.22em] text-plum/70 mt-0.5">
                Seoul Edition
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <div
                  key={link.href}
                  onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.href)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="relative"
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'text-sm font-medium tracking-[0.09em] transition-colors relative py-2',
                      'text-charcoal hover:text-plum',
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
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                      >
                        <div className="surface-velvet rounded-2xl shadow-editorial p-6 w-[560px] grid grid-cols-2 gap-6">
                          {categories.slice(0, 4).map(category => (
                            <div key={category.id}>
                              <Link
                                href={`/shop/${category.slug}`}
                                className="font-medium text-charcoal hover:text-plum transition-colors"
                              >
                                {category.name}
                              </Link>
                              {category.subcategories && (
                                <ul className="mt-2 space-y-1">
                                  {category.subcategories.slice(0, 4).map(sub => (
                                    <li key={sub.id}>
                                      <Link
                                        href={`/shop/${sub.slug}`}
                                        className="text-sm text-muted-foreground hover:text-plum transition-colors"
                                      >
                                        {sub.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 lg:gap-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-charcoal hover:text-plum transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                href="/account"
                className="hidden sm:block p-2 text-charcoal hover:text-plum transition-colors"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </Link>

              <Link
                href="/wishlist"
                className="hidden sm:block p-2 text-charcoal hover:text-plum transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
              </Link>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-charcoal hover:text-plum transition-colors"
                aria-label="Cart"
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
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-warm-ivory z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-serif font-bold text-plum">JISOO</h2>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 -mr-2 text-charcoal hover:text-plum"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <nav className="space-y-6">
                  {navLinks.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-lg font-medium text-charcoal hover:text-plum transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className="mt-8 pt-8 border-t border-blush-pink">
                  <Link
                    href="/account"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-3 text-charcoal hover:text-plum transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span>Account</span>
                  </Link>
                  <Link
                    href="/wishlist"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-3 text-charcoal hover:text-plum transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                    <span>Wishlist</span>
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
