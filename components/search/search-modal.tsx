'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, TrendingUp, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { products } from '@/lib/data'
import { cn } from '@/lib/utils'
import { EditorialMedia } from '@/components/ui/editorial-media'
import { useLocale } from '@/components/providers/locale-provider'
import { localizeHref } from '@/lib/i18n'
import { resolveImageSrc } from '@/lib/image-fallbacks'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const trendingSearches = [
  'Cream',
  'Facial Oil',
  'Mask',
  'Daily Cleanser',
  'Care Set',
]

const popularCategories = [
  { name: 'Serums', href: '/shop/serums', image: resolveImageSrc('/assets/products/luminous-glow-serum.jpg') },
  { name: 'Moisturizers', href: '/shop/moisturizers', image: resolveImageSrc('/assets/editorial/care-expert.jpg') },
  { name: 'Cleansers', href: '/shop/cleansers', image: resolveImageSrc('/assets/editorial/skincare-ingredients.jpg') },
]

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { locale, dictionary } = useLocale()
  const trendingTranslations: Record<string, Partial<Record<typeof locale, string>>> = {
    Cream: { ar: 'كريم', fr: 'Crème', de: 'Creme', ko: '크림', tr: 'Krem' },
    'Facial Oil': { ar: 'زيت للوجه', fr: 'Huile visage', de: 'Gesichtsoel', ko: '페이스 오일', tr: 'Yüz Yağı' },
    Mask: { ar: 'قناع', fr: 'Masque', de: 'Maske', ko: '마스크', tr: 'Maske' },
    'Daily Cleanser': { ar: 'منظف يومي', fr: 'Nettoyant quotidien', de: 'Taeglicher Reiniger', ko: '데일리 클렌저', tr: 'Günlük Temizleyici' },
    'Care Set': { ar: 'مجموعة عناية', fr: 'Set de soin', de: 'Pflegeset', ko: '케어 세트', tr: 'Bakım Seti' },
  }
  const trendingLocalized = trendingSearches.map(term =>
    trendingTranslations[term]?.[locale] ?? term
  )
  const categoriesLocalized = popularCategories.map(cat => ({
    ...cat,
    name: locale === 'ar' ? (cat.name === 'Serums' ? 'سيروم' : cat.name === 'Moisturizers' ? 'مرطبات' : 'منظفات')
      : locale === 'fr' ? (cat.name === 'Serums' ? 'Sérums' : cat.name === 'Moisturizers' ? 'Hydratants' : 'Nettoyants')
        : locale === 'de' ? (cat.name === 'Serums' ? 'Seren' : cat.name === 'Moisturizers' ? 'Feuchtigkeitspflege' : 'Reiniger')
          : locale === 'ko' ? (cat.name === 'Serums' ? '세럼' : cat.name === 'Moisturizers' ? '모이스처라이저' : '클렌저')
            : locale === 'tr' ? (cat.name === 'Serums' ? 'Serumlar' : cat.name === 'Moisturizers' ? 'Nemlendiriciler' : 'Temizleyiciler')
              : cat.name,
  }))
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(products.slice(0, 4))
  const inputRef = useRef<HTMLInputElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  // P0: debounce user input to reduce per-keystroke filtering work.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (query.length >= 2) {
        const filtered = products.filter(
          p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.tags.some(t => t.toLowerCase().includes(query.toLowerCase())) ||
            p.category.toLowerCase().includes(query.toLowerCase())
        )
        setResults(filtered.slice(0, 6))
      } else {
        setResults(products.slice(0, 4))
      }
    }, 180)

    return () => window.clearTimeout(timer)
  }, [query])

  // P0: add ESC handling, focus trap, body scroll lock, and focus restore for accessibility.
  useEffect(() => {
    if (!isOpen) return

    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    document.body.style.overflow = 'hidden'

    const focusSelector = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',')

    const moveFocusIntoModal = () => {
      inputRef.current?.focus()
    }
    window.requestAnimationFrame(moveFocusIntoModal)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      if (e.key !== 'Tab' || !modalRef.current) return
      const focusable = Array.from(modalRef.current.querySelectorAll<HTMLElement>(focusSelector))
      if (!focusable.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      previousFocusRef.current?.focus()
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-modal-title"
            className="fixed top-0 left-0 right-0 z-50 max-h-[90vh] overflow-y-auto"
          >
            <div ref={modalRef} className="bg-warm-ivory shadow-elevated">
              <div className="max-w-4xl mx-auto p-4 lg:p-6">
                <h2 id="search-modal-title" className="sr-only">Search products</h2>
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder={dictionary.search.placeholder}
                    className={cn(
                      'w-full pl-12 pr-12 py-4 rounded-full',
                      'bg-white border border-blush-pink',
                      'text-charcoal placeholder:text-muted-foreground',
                      'focus:outline-none focus:ring-2 focus:ring-rose-mauve/30',
                      'text-lg'
                    )}
                  />
                  <button
                    onClick={onClose}
                    aria-label="Close search"
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-charcoal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="mt-6 pb-4">
                  {query.length < 2 ? (
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Trending Searches */}
                      <div>
                        <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-4">
                          <TrendingUp className="w-4 h-4" />
                          {dictionary.search.trendingSearches}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {trendingLocalized.map(term => (
                            <button
                              key={term}
                              onClick={() => setQuery(term)}
                              className={cn(
                                'px-4 py-2 rounded-full text-sm',
                                'bg-blush-pink/30 text-charcoal',
                                'hover:bg-blush-pink/50 transition-colors'
                              )}
                            >
                              {term}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Popular Categories */}
                      <div>
                        <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-4">
                          <Clock className="w-4 h-4" />
                          {dictionary.search.popularCategories}
                        </h3>
                        <div className="space-y-3">
                          {categoriesLocalized.map(cat => (
                            <Link
                              key={cat.name}
                              href={localizeHref(cat.href, locale)}
                              onClick={onClose}
                              className="flex items-center gap-3 p-2 -mx-2 rounded-xl hover:bg-blush-pink/20 transition-colors"
                            >
                              <EditorialMedia
                                src={cat.image}
                                alt={cat.name}
                                className="w-12 h-12 rounded-lg"
                              />
                              <span className="font-medium text-charcoal">{cat.name}</span>
                              <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-4">
                        {results.length} {dictionary.search.resultsFor} &ldquo;{query}&rdquo;
                      </h3>
                      <div className="grid gap-4">
                        {results.map(product => (
                          <Link
                            key={product.id}
                            href={localizeHref(`/product/${product.slug}`, locale)}
                            onClick={onClose}
                            className="flex items-center gap-4 p-3 -mx-3 rounded-xl hover:bg-blush-pink/20 transition-colors"
                          >
                            <div className="w-16 h-16 rounded-lg bg-nude-beige overflow-hidden flex-shrink-0">
                              <Image
                                src={resolveImageSrc(product.images[0]?.src)}
                                alt={product.name}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-charcoal truncate">
                                {product.name}
                              </h4>
                              <p className="text-sm text-muted-foreground truncate">
                                {product.shortDescription}
                              </p>
                              <p className="text-sm font-medium text-plum mt-1">
                                €{product.price.toFixed(2)}
                              </p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                          </Link>
                        ))}
                      </div>

                      {results.length > 0 && (
                        <Link
                          href={localizeHref(`/shop?search=${encodeURIComponent(query)}`, locale)}
                          onClick={onClose}
                          className={cn(
                            'flex items-center justify-center gap-2 mt-6 py-3 rounded-full',
                            'bg-plum text-warm-ivory font-medium',
                            'hover:bg-plum/90 transition-colors'
                          )}
                        >
                          {dictionary.search.viewAllResults}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
