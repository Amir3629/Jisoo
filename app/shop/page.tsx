'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ProductCard } from '@/components/product/product-card'
import { products, categories } from '@/lib/data'
import { SlidersHorizontal, Grid3X3, LayoutGrid, ChevronDown, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Product } from '@/lib/types'

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Best Rated' },
]

const skinTypes = ['All Skin Types', 'Dry Skin', 'Oily Skin', 'Combination Skin', 'Sensitive Skin']
const concerns = ['Hydration', 'Brightening', 'Anti-Aging', 'Soothing', 'Pores', 'Acne']
const priceRanges = ['Under €30', '€30 - €50', '€50 - €80', 'Over €80']

const queryFilterLabels: Record<string, string> = {
  'anti-aging': 'Anti-Aging',
  antiaging: 'Anti-Aging',
  oils: 'Oils',
  oil: 'Oils',
  masks: 'Masks',
  mask: 'Masks',
  creams: 'Creams',
  cream: 'Creams',
}

const filterAliases: Record<string, string[]> = {
  'Anti-Aging': ['anti-aging', 'anti aging', 'antiaging', 'wrinkles', 'firmness', 'firming', 'texture'],
  Oils: ['oil', 'oils', 'cleansing oil', 'cleansing-oils', 'body-oil'],
  Masks: ['mask', 'masks', 'sheet-masks', 'wash-off-packs', 'wash off pack'],
  Creams: ['cream', 'creams', 'moisturizers', 'moisturizer'],
}

const normalizeToken = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const titleFromParam = (value: string) => {
  const normalized = normalizeToken(value)
  if (queryFilterLabels[normalized]) return queryFilterLabels[normalized]

  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1).toLowerCase()}`)
    .join(' ')
}

const filtersFromQuery = (category: string | null, concern: string | null) => {
  return [category, concern]
    .filter((value): value is string => Boolean(value))
    .map(titleFromParam)
    .filter((value, index, list) => list.indexOf(value) === index)
}

const productTokens = (product: Product) => [
  product.category,
  product.subcategory,
  product.name,
  ...(product.concerns ?? []),
  ...(product.tags ?? []),
  ...(product.skinTypes ?? []),
].filter((value): value is string => Boolean(value))

const matchesAlias = (product: Product, filter: string) => {
  const tokens = productTokens(product)
  const normalizedTokens = tokens.map((token) => normalizeToken(token))
  const aliases = filterAliases[filter] ?? [filter]

  return aliases.some((alias) => {
    const normalizedAlias = normalizeToken(alias)
    return normalizedTokens.some((token) => token === normalizedAlias || token.includes(normalizedAlias))
  })
}

const categoryMatchesProduct = (product: Product, categorySlug: string) => {
  const category = categories.find((item) => item.slug === categorySlug)
  const allowedSlugs = new Set([
    categorySlug,
    ...(category?.subcategories?.map((subcategory) => subcategory.slug) ?? []),
  ])

  const productCategory = normalizeToken(product.category)
  const productSubcategory = product.subcategory ? normalizeToken(product.subcategory) : ''

  return allowedSlugs.has(productCategory) || allowedSlugs.has(productSubcategory)
}

const priceRangeMatches = (product: Product, filter: string) => {
  const price = product.price ?? 0

  if (filter === 'Under €30') return price < 30
  if (filter === '€30 - €50') return price >= 30 && price <= 50
  if (filter === '€50 - €80') return price > 50 && price <= 80
  if (filter === 'Over €80') return price > 80

  return true
}

const filterMatchesProduct = (product: Product, filter: string) => {
  if (priceRanges.includes(filter)) return priceRangeMatches(product, filter)
  if (filter === 'All Skin Types') return true
  if (skinTypes.includes(filter)) return matchesAlias(product, filter)

  return matchesAlias(product, filter)
}

export default function ShopPage() {
  const searchParams = useSearchParams()
  const queryCategory = searchParams.get('category')
  const queryConcern = searchParams.get('concern')

  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [gridView, setGridView] = useState<'grid' | 'large'>('grid')
  const [sortBy, setSortBy] = useState('featured')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedFilters, setSelectedFilters] = useState<string[]>(() => filtersFromQuery(queryCategory, queryConcern))

  const surfaceClass =
    'rounded-3xl border border-[#cfae83]/24 bg-[linear-gradient(155deg,var(--card)_0%,color-mix(in_srgb,var(--background)_88%,white)_58%,color-mix(in_srgb,var(--background)_92%,#cfae83)_100%)] shadow-luxury'
  const softControlClass =
    'rounded-full border border-[#cfae83]/24 bg-[color-mix(in_srgb,var(--background)_82%,white)] text-charcoal shadow-sm'
  const selectedControlClass =
    'rounded-full border border-rose-mauve/35 bg-[linear-gradient(135deg,#d8a7bd_0%,#d3af84_100%)] text-white shadow-luxury'

  useEffect(() => {
    setSelectedCategory(null)
    setSelectedFilters(filtersFromQuery(queryCategory, queryConcern))
    // Important: do not open the filter drawer here.
    // Header links can select a category/concern, but the panel should open only after clicking "Filters".
  }, [queryCategory, queryConcern])

  const filteredProducts = useMemo(() => {
    const visibleProducts = products.filter(product => {
      if (selectedCategory && !categoryMatchesProduct(product, selectedCategory)) {
        return false
      }

      return selectedFilters.every((filter) => filterMatchesProduct(product, filter))
    })

    return [...visibleProducts].sort((a, b) => {
      if (sortBy === 'price-asc') return (a.price ?? 0) - (b.price ?? 0)
      if (sortBy === 'price-desc') return (b.price ?? 0) - (a.price ?? 0)

      return 0
    })
  }, [selectedCategory, selectedFilters, sortBy])

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
  }

  const clearAllFilters = () => {
    setSelectedCategory(null)
    setSelectedFilters([])
  }

  const activeFilterCount = selectedFilters.length + (selectedCategory ? 1 : 0)

  return (
    <main className="min-h-screen bg-warm-ivory">
      <Header />

      {/* Hero Banner */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-b from-nude-beige/50 to-warm-ivory">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-charcoal"
          >
            Shop All Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Explore our curated collection of premium Korean beauty essentials
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-b border-[#cfae83]/24">
            {/* Filter Toggle */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all',
                isFilterOpen ? selectedControlClass : cn(softControlClass, 'hover:border-rose-mauve/45')
              )}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className={cn(
                  'ml-1 px-2 py-0.5 rounded-full text-xs',
                  isFilterOpen ? 'bg-white/20 text-white' : 'bg-rose-mauve/18 text-plum'
                )}>
                  {activeFilterCount}
                </span>
              )}
            </button>

            <div className="flex items-center gap-4">
              {/* Product Count */}
              <span className="text-sm text-muted-foreground hidden sm:block">
                {filteredProducts.length} products
              </span>

              {/* Grid Toggle */}
              <div className={cn('flex items-center gap-1 p-1 rounded-full', softControlClass)}>
                <button
                  onClick={() => setGridView('grid')}
                  className={cn(
                    'p-2 rounded-full transition-colors',
                    gridView === 'grid' ? 'bg-[linear-gradient(135deg,#d8a7bd_0%,#d3af84_100%)] text-white' : 'text-charcoal hover:bg-blush-pink/20'
                  )}
                  aria-label="Grid view"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridView('large')}
                  className={cn(
                    'p-2 rounded-full transition-colors',
                    gridView === 'large' ? 'bg-[linear-gradient(135deg,#d8a7bd_0%,#d3af84_100%)] text-white' : 'text-charcoal hover:bg-blush-pink/20'
                  )}
                  aria-label="Large grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className={cn(
                    'appearance-none px-4 py-2.5 pr-10 rounded-full text-sm',
                    softControlClass,
                    'focus:outline-none focus:border-rose-mauve cursor-pointer'
                  )}
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className={cn('my-8 p-6 sm:p-8', surfaceClass)}>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Categories */}
                    <div>
                      <h3 className="font-medium text-charcoal mb-4">Category</h3>
                      <div className="space-y-2">
                        <button
                          onClick={() => setSelectedCategory(null)}
                          className={cn(
                            'block text-sm transition-colors',
                            !selectedCategory ? 'text-plum font-medium' : 'text-muted-foreground hover:text-charcoal'
                          )}
                        >
                          All Categories
                        </button>
                        {categories.slice(0, 5).map(cat => (
                          <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.slug)}
                            className={cn(
                              'block text-sm transition-colors',
                              selectedCategory === cat.slug
                                ? 'text-plum font-medium'
                                : 'text-muted-foreground hover:text-charcoal'
                            )}
                          >
                            {cat.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Skin Type */}
                    <div>
                      <h3 className="font-medium text-charcoal mb-4">Skin Type</h3>
                      <div className="flex flex-wrap gap-2">
                        {skinTypes.map(type => (
                          <button
                            key={type}
                            onClick={() => toggleFilter(type)}
                            className={cn(
                              'px-3 py-1.5 rounded-full text-sm transition-all',
                              selectedFilters.includes(type)
                                ? selectedControlClass
                                : cn(softControlClass, 'hover:border-rose-mauve/45')
                            )}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Concerns */}
                    <div>
                      <h3 className="font-medium text-charcoal mb-4">Concern</h3>
                      <div className="flex flex-wrap gap-2">
                        {concerns.map(concern => (
                          <button
                            key={concern}
                            onClick={() => toggleFilter(concern)}
                            className={cn(
                              'px-3 py-1.5 rounded-full text-sm transition-all',
                              selectedFilters.includes(concern)
                                ? selectedControlClass
                                : cn(softControlClass, 'hover:border-rose-mauve/45')
                            )}
                          >
                            {concern}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div>
                      <h3 className="font-medium text-charcoal mb-4">Price</h3>
                      <div className="flex flex-wrap gap-2">
                        {priceRanges.map(range => (
                          <button
                            key={range}
                            onClick={() => toggleFilter(range)}
                            className={cn(
                              'px-3 py-1.5 rounded-full text-sm transition-all',
                              selectedFilters.includes(range)
                                ? selectedControlClass
                                : cn(softControlClass, 'hover:border-rose-mauve/45')
                            )}
                          >
                            {range}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Active Filters */}
                  {activeFilterCount > 0 && (
                    <div className="mt-6 pt-6 border-t border-[#cfae83]/24">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm text-muted-foreground">Active:</span>
                        {selectedCategory && (
                          <button
                            onClick={() => setSelectedCategory(null)}
                            className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#d3af84]/18 text-charcoal text-sm border border-[#cfae83]/20"
                          >
                            {categories.find((category) => category.slug === selectedCategory)?.name ?? selectedCategory}
                            <X className="w-3 h-3" />
                          </button>
                        )}
                        {selectedFilters.map(filter => (
                          <button
                            key={filter}
                            onClick={() => toggleFilter(filter)}
                            className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#d3af84]/18 text-charcoal text-sm border border-[#cfae83]/20"
                          >
                            {filter}
                            <X className="w-3 h-3" />
                          </button>
                        ))}
                        <button
                          onClick={clearAllFilters}
                          className="text-sm text-rose-mauve hover:text-plum transition-colors ml-2"
                        >
                          Clear all
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div
            className={cn(
              'grid gap-6 lg:gap-8 mt-8',
              gridView === 'grid'
                ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            )}
          >
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} hideDescription />
            ))}
          </div>

          {/* Load More */}
          <div className="mt-16 text-center">
            <button
              className={cn(
                'px-8 py-4 rounded-full font-medium',
                'bg-gradient-to-r from-rose-mauve to-[#d3af84] text-white shadow-luxury',
                'hover:brightness-105 transition-all duration-300'
              )}
            >
              Load More Products
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
