'use client'

<<<<<<< HEAD
import { useEffect, useMemo, useState } from 'react'
=======
import { Suspense, useEffect, useMemo, useState } from 'react'
>>>>>>> 309acd4 (Update Jisoo frontend fixes)
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

const skinTypes = ['Dry Skin', 'Oily Skin', 'Combination Skin', 'Sensitive Skin']

<<<<<<< HEAD
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

=======
const concerns = [
  { label: 'Hydration', value: 'hydration', aliases: ['hydration', 'moisture', 'dehydration', 'dryness'] },
  { label: 'Brightening', value: 'brightening', aliases: ['brightening', 'radiance', 'glow', 'pigmentation', 'tone-up', 'uneven tone'] },
  { label: 'Anti-Aging', value: 'anti-aging', aliases: ['anti-aging', 'anti aging', 'wrinkles', 'fine lines', 'firmness', 'elasticity', 'collagen'] },
  { label: 'Soothing', value: 'soothing', aliases: ['soothing', 'calming', 'sensitive', 'comfort'] },
  { label: 'Pores', value: 'pores', aliases: ['pores', 'pore', 'sebum', 'oiliness', 'clarity'] },
  { label: 'Acne', value: 'acne', aliases: ['acne', 'blemishes', 'breakout'] },
]

const priceRanges = [
  { label: 'Under €30', value: 'under-30' },
  { label: '€30 - €50', value: '30-50' },
  { label: '€50 - €80', value: '50-80' },
  { label: 'Over €80', value: 'over-80' },
]


const surfaceClass =
  'rounded-3xl border border-[#cfae83]/24 bg-[linear-gradient(155deg,var(--card)_0%,color-mix(in_srgb,var(--background)_88%,white)_58%,color-mix(in_srgb,var(--background)_92%,#cfae83)_100%)] shadow-luxury'
const softControlClass =
  'rounded-full border border-[#cfae83]/24 bg-[color-mix(in_srgb,var(--background)_82%,white)] text-charcoal shadow-sm'
const selectedControlClass =
  'rounded-full border border-rose-mauve/35 bg-[linear-gradient(135deg,#d8a7bd_0%,#d3af84_100%)] text-white shadow-luxury'
const categoryAliases: Record<string, string[]> = {
  skincare: ['cream', 'oil', 'mask', 'cleanser', 'toner', 'sun care', 'serum', 'ampoule', 'essence', 'lotion', 'fluid', 'emulsion', 'eye care', 'mist', 'toner pad', 'cleansing oil', 'exfoliant', 'tone-up care', 'trial care'],
  'body-care': ['body care', 'body-wash', 'body-lotion', 'body-oil', 'body-mist', 'bath-care', 'hand-care', 'foot-care'],
  'hair-care': ['hair care', 'shampoo', 'rinse', 'hair-treatment', 'hair-essence', 'hair-tonic', 'hair-styling'],
  sets: ['sets', 'set', 'bundle', 'bundles'],
  fragrance: ['fragrance'],
  oil: ['oil', 'cleansing oil', 'body oil'],
  oils: ['oil', 'cleansing oil', 'body oil'],
  mask: ['mask', 'sheet mask', 'wash-off pack'],
  masks: ['mask', 'sheet mask', 'wash-off pack'],
  cream: ['cream'],
  creams: ['cream'],
  moisturizers: ['cream', 'lotion', 'fluid', 'emulsion'],
  'sun-care': ['sun care'],
  suncare: ['sun care'],
  cleansers: ['cleanser', 'cleansing oil', 'exfoliant'],
  toners: ['toner', 'toner pad', 'essence'],
  serums: ['serum', 'ampoule'],
}

function normalize(value: string) {
  return value.trim().toLowerCase()
}

function slugify(value: string) {
  return normalize(value).replace(/\s+/g, '-')
}

function productSearchText(product: Product) {
  return [
    product.name,
    product.category,
    product.subcategory,
    ...product.tags,
    ...product.skinType,
    ...product.concerns,
    ...product.keyBenefits,
    product.shortDescription,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

function categoryMatches(product: Product, selectedCategory: string | null) {
  if (!selectedCategory) return true

  const selected = normalize(selectedCategory)
  const candidates = new Set([
    selected,
    selected.replace(/-/g, ' '),
    selected.endsWith('s') ? selected.slice(0, -1) : selected,
    ...(categoryAliases[selected] ?? []),
  ])

  const productValues = [product.category, product.subcategory ?? '']
    .filter(Boolean)
    .flatMap((value) => [normalize(value), slugify(value)])

  return productValues.some((value) => candidates.has(value))
}

function skinTypeMatches(product: Product, selectedSkinTypes: string[]) {
  if (selectedSkinTypes.length === 0) return true

  const productSkinTypes = [...product.skinType, ...(product.skinTypes ?? [])].map(normalize)
  return selectedSkinTypes.some((skinType) => productSkinTypes.includes(normalize(skinType)))
}

function concernMatches(product: Product, selectedConcerns: string[]) {
  if (selectedConcerns.length === 0) return true

  const searchable = productSearchText(product)
  return selectedConcerns.some((label) => {
    const option = concerns.find((concern) => concern.label === label)
    const aliases = option?.aliases ?? [label]
    return aliases.some((alias) => searchable.includes(normalize(alias)))
  })
}

function priceMatches(product: Product, selectedPrices: string[]) {
  if (selectedPrices.length === 0) return true

  return selectedPrices.some((label) => {
    const price = product.price
    if (label === 'Under €30') return price < 30
    if (label === '€30 - €50') return price >= 30 && price <= 50
    if (label === '€50 - €80') return price > 50 && price <= 80
    if (label === 'Over €80') return price > 80
    return true
  })
}

function sortProducts(productList: Product[], sortBy: string) {
  return [...productList].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price
    if (sortBy === 'price-desc') return b.price - a.price
    if (sortBy === 'rating') return (b.rating ?? 0) - (a.rating ?? 0)
    if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()

    const aFeatured = Number(Boolean(a.isBestSeller)) + Number(Boolean(a.isNew))
    const bFeatured = Number(Boolean(b.isBestSeller)) + Number(Boolean(b.isNew))
    return bFeatured - aFeatured
  })
}

function findConcernLabelFromParam(value: string | null) {
  if (!value) return null
  const normalized = normalize(value).replace(/_/g, '-').replace(/\s+/g, '-')
  return concerns.find((concern) => concern.value === normalized || concern.aliases.some((alias) => slugify(alias) === normalized))?.label ?? null
}

function findPriceLabelFromParam(value: string | null) {
  if (!value) return null
  const normalized = normalize(value).replace(/\s+/g, '')
  return priceRanges.find((range) => range.value === normalized || normalize(range.label).replace(/\s+/g, '') === normalized)?.label ?? null
}

function ShopPageContent() {
  const searchParams = useSearchParams()
>>>>>>> 309acd4 (Update Jisoo frontend fixes)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [gridView, setGridView] = useState<'grid' | 'large'>('large')
  const [sortBy, setSortBy] = useState('featured')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
<<<<<<< HEAD
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
=======
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [visibleCount, setVisibleCount] = useState(12)

  useEffect(() => {
    const categoryParam = searchParams.get('category')
    const concernParam = searchParams.get('concern')
    const priceParam = searchParams.get('price')
    const sortParam = searchParams.get('sort')

    setSelectedCategory(categoryParam ? normalize(categoryParam) : null)

    const nextFilters = [findConcernLabelFromParam(concernParam), findPriceLabelFromParam(priceParam)].filter(Boolean) as string[]
    setSelectedFilters(nextFilters)

    if (sortParam && sortOptions.some((option) => option.value === sortParam)) {
      setSortBy(sortParam)
    }

    setVisibleCount(12)
    setIsFilterOpen(Boolean(categoryParam || concernParam || priceParam))
  }, [searchParams])

  const selectedSkinTypes = selectedFilters.filter((filter) => skinTypes.includes(filter))
  const selectedConcerns = selectedFilters.filter((filter) => concerns.some((concern) => concern.label === filter))
  const selectedPrices = selectedFilters.filter((filter) => priceRanges.some((range) => range.label === filter))

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      return categoryMatches(product, selectedCategory)
        && skinTypeMatches(product, selectedSkinTypes)
        && concernMatches(product, selectedConcerns)
        && priceMatches(product, selectedPrices)
    })

    return sortProducts(filtered, sortBy)
  }, [selectedCategory, selectedConcerns, selectedPrices, selectedSkinTypes, sortBy])

  const visibleProducts = filteredProducts.slice(0, visibleCount)
>>>>>>> 309acd4 (Update Jisoo frontend fixes)

  const toggleFilter = (filter: string) => {
    setVisibleCount(12)
    setSelectedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
  }

<<<<<<< HEAD
  const clearAllFilters = () => {
    setSelectedCategory(null)
    setSelectedFilters([])
  }

  const activeFilterCount = selectedFilters.length + (selectedCategory ? 1 : 0)
=======
  const clearSkinTypeFilters = () => {
    setVisibleCount(12)
    setSelectedFilters(prev => prev.filter(filter => !skinTypes.includes(filter)))
  }

  const clearAll = () => {
    setSelectedCategory(null)
    setSelectedFilters([])
    setVisibleCount(12)
  }
>>>>>>> 309acd4 (Update Jisoo frontend fixes)

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
<<<<<<< HEAD
              {activeFilterCount > 0 && (
                <span className={cn(
                  'ml-1 px-2 py-0.5 rounded-full text-xs',
                  isFilterOpen ? 'bg-white/20 text-white' : 'bg-rose-mauve/18 text-plum'
                )}>
                  {activeFilterCount}
=======
              {selectedFilters.length > 0 && (
                <span className="ml-2 inline-flex h-7 min-w-7 items-center justify-center rounded-full border border-[#d3af84]/55 bg-white/92 px-2 text-xs font-semibold leading-none text-[#4f363c] shadow-[0_6px_14px_rgba(79,54,60,0.10),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-sm">
                  {selectedFilters.length}
>>>>>>> 309acd4 (Update Jisoo frontend fixes)
                </span>
              )}
            </button>

            <div className="flex items-center gap-4">
              {/* Product Count */}
              <span className="text-sm text-muted-foreground">
                {filteredProducts.length} products
              </span>

<<<<<<< HEAD
              {/* Grid Toggle */}
              <div className={cn('flex items-center gap-1 p-1 rounded-full', softControlClass)}>
=======
              {/* Grid Toggle - desktop/tablet only */}
              <div className="hidden sm:flex items-center gap-1 p-1 bg-white rounded-full border border-blush-pink">
>>>>>>> 309acd4 (Update Jisoo frontend fixes)
                <button
                  onClick={() => setGridView('grid')}
                  className={cn(
                    'p-2 rounded-full transition-colors',
                    gridView === 'grid' ? 'bg-[linear-gradient(135deg,#d8a7bd_0%,#d3af84_100%)] text-white' : 'text-charcoal hover:bg-blush-pink/20'
                  )}
<<<<<<< HEAD
                  aria-label="Grid view"
=======
                  aria-label="Compact product grid"
>>>>>>> 309acd4 (Update Jisoo frontend fixes)
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridView('large')}
                  className={cn(
                    'p-2 rounded-full transition-colors',
                    gridView === 'large' ? 'bg-[linear-gradient(135deg,#d8a7bd_0%,#d3af84_100%)] text-white' : 'text-charcoal hover:bg-blush-pink/20'
                  )}
<<<<<<< HEAD
                  aria-label="Large grid view"
=======
                  aria-label="Large product grid"
>>>>>>> 309acd4 (Update Jisoo frontend fixes)
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
                          onClick={() => { setSelectedCategory(null); setVisibleCount(12) }}
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
                            onClick={() => { setSelectedCategory(cat.slug); setVisibleCount(12) }}
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
                        <button
                          onClick={clearSkinTypeFilters}
                          className={cn(
                            'px-3 py-1.5 rounded-full text-sm transition-all',
                            selectedSkinTypes.length === 0
                              ? 'bg-gradient-to-r from-rose-mauve to-[#d3af84] text-white'
                              : 'bg-white border border-blush-pink text-charcoal hover:border-rose-mauve'
                          )}
                        >
                          All Skin Types
                        </button>
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
                            key={concern.value}
                            onClick={() => toggleFilter(concern.label)}
                            className={cn(
                              'px-3 py-1.5 rounded-full text-sm transition-all',
<<<<<<< HEAD
                              selectedFilters.includes(concern)
                                ? selectedControlClass
                                : cn(softControlClass, 'hover:border-rose-mauve/45')
=======
                              selectedFilters.includes(concern.label)
                                ? 'bg-gradient-to-r from-rose-mauve to-[#d3af84] text-white'
                                : 'bg-white border border-blush-pink text-charcoal hover:border-rose-mauve'
>>>>>>> 309acd4 (Update Jisoo frontend fixes)
                            )}
                          >
                            {concern.label}
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
                            key={range.value}
                            onClick={() => toggleFilter(range.label)}
                            className={cn(
                              'px-3 py-1.5 rounded-full text-sm transition-all',
<<<<<<< HEAD
                              selectedFilters.includes(range)
                                ? selectedControlClass
                                : cn(softControlClass, 'hover:border-rose-mauve/45')
=======
                              selectedFilters.includes(range.label)
                                ? 'bg-gradient-to-r from-rose-mauve to-[#d3af84] text-white'
                                : 'bg-white border border-blush-pink text-charcoal hover:border-rose-mauve'
>>>>>>> 309acd4 (Update Jisoo frontend fixes)
                            )}
                          >
                            {range.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Active Filters */}
<<<<<<< HEAD
                  {activeFilterCount > 0 && (
                    <div className="mt-6 pt-6 border-t border-[#cfae83]/24">
=======
                  {(selectedFilters.length > 0 || selectedCategory) && (
                    <div className="mt-6 pt-6 border-t border-blush-pink/30">
>>>>>>> 309acd4 (Update Jisoo frontend fixes)
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm text-muted-foreground">Active:</span>
                        {selectedCategory && (
                          <button
                            onClick={() => setSelectedCategory(null)}
<<<<<<< HEAD
                            className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#d3af84]/18 text-charcoal text-sm border border-[#cfae83]/20"
                          >
                            {categories.find((category) => category.slug === selectedCategory)?.name ?? selectedCategory}
=======
                            className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#d3af84]/18 text-charcoal text-sm"
                          >
                            {selectedCategory.replace(/-/g, ' ')}
>>>>>>> 309acd4 (Update Jisoo frontend fixes)
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
<<<<<<< HEAD
                          onClick={clearAllFilters}
=======
                          onClick={clearAll}
>>>>>>> 309acd4 (Update Jisoo frontend fixes)
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
          {visibleProducts.length > 0 ? (
            <div
              className={cn(
<<<<<<< HEAD
                'px-8 py-4 rounded-full font-medium',
                'bg-gradient-to-r from-rose-mauve to-[#d3af84] text-white shadow-luxury',
                'hover:brightness-105 transition-all duration-300'
=======
                'grid gap-6 lg:gap-8 mt-8',
                gridView === 'grid'
                  ? 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
>>>>>>> 309acd4 (Update Jisoo frontend fixes)
              )}
            >
              {visibleProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} hideDescription />
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-3xl border border-blush-pink/30 bg-white/60 p-10 text-center">
              <h2 className="font-serif text-2xl text-charcoal">No matching products</h2>
              <p className="mt-3 text-muted-foreground">Try clearing filters or choosing another care category.</p>
              <button
                onClick={clearAll}
                className="mt-6 rounded-full bg-gradient-to-r from-rose-mauve to-[#d3af84] px-6 py-3 text-sm font-medium text-white"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Load More */}
          {visibleCount < filteredProducts.length && (
            <div className="mt-16 text-center">
              <button
                onClick={() => setVisibleCount((count) => count + 12)}
                className={cn(
                  'px-8 py-4 rounded-full font-medium',
                  'bg-gradient-to-r from-rose-mauve to-[#d3af84] text-white',
                  'hover:brightness-105 transition-all duration-300'
                )}
              >
                Load More Products
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-warm-ivory" />}>
      <ShopPageContent />
    </Suspense>
  )
}
