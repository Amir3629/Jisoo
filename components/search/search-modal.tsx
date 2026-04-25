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
  'Glass Skin',
  'Vitamin C Serum',
  'Sunscreen SPF50',
  'Cica',
  'Hydrating Cream',
]

const popularCategories = [
  { name: 'Serums', href: '/shop/serums', image: resolveImageSrc('/categories/serums.jpg') },
  { name: 'Moisturizers', href: '/shop/moisturizers', image: resolveImageSrc('/categories/moisturizers.jpg') },
  { name: 'Cleansers', href: '/shop/cleansers', image: resolveImageSrc('/categories/cleansers.jpg') },
]

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { locale, dictionary } = useLocale()
  const trendingLocalized = trendingSearches.map(term =>
    locale === 'ar'
      ? term === 'Glass Skin' ? 'بشرة زجاجية' : term === 'Vitamin C Serum' ? 'سيروم فيتامين C' : term === 'Sunscreen SPF50' ? 'واقي شمس SPF50' : term === 'Hydrating Cream' ? 'كريم مرطب' : term
      : locale === 'fr'
        ? term === 'Glass Skin' ? 'Peau de verre' : term === 'Vitamin C Serum' ? 'Sérum Vitamine C' : term === 'Sunscreen SPF50' ? 'Solaire SPF50' : term === 'Hydrating Cream' ? 'Crème hydratante' : term
        : locale === 'de'
          ? term === 'Glass Skin' ? 'Glass Skin' : term === 'Vitamin C Serum' ? 'Vitamin C Serum' : term === 'Sunscreen SPF50' ? 'Sonnenschutz SPF50' : term === 'Hydrating Cream' ? 'Feuchtigkeitscreme' : term
          : locale === 'ko'
            ? term === 'Glass Skin' ? '글래스 스킨' : term === 'Vitamin C Serum' ? '비타민 C 세럼' : term === 'Sunscreen SPF50' ? '선크림 SPF50' : term === 'Hydrating Cream' ? '보습 크림' : term
            : locale === 'tr'
              ? term === 'Glass Skin' ? 'Glass Skin' : term === 'Vitamin C Serum' ? 'C Vitamini Serumu' : term === 'Sunscreen SPF50' ? 'Güneş Koruyucu SPF50' : term === 'Hydrating Cream' ? 'Nemlendirici Krem' : term
              : term
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

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
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
  }, [query])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
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
            className="fixed top-0 left-0 right-0 z-50 max-h-[90vh] overflow-y-auto"
          >
            <div className="bg-warm-ivory shadow-elevated">
              <div className="max-w-4xl mx-auto p-4 lg:p-6">
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
