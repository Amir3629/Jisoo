'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ProductCard } from '@/components/product/product-card'
import { products, categories } from '@/lib/data'
import { SlidersHorizontal, Grid3X3, LayoutGrid, ChevronDown, X } from 'lucide-react'
import { cn } from '@/lib/utils'

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

export default function ShopPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [gridView, setGridView] = useState<'grid' | 'large'>('grid')
  const [sortBy, setSortBy] = useState('featured')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const filteredProducts = products.filter(product => {
    if (selectedCategory && product.category !== selectedCategory) {
      return false
    }
    return true
  })

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
  }

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
          <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-b border-blush-pink/30">
            {/* Filter Toggle */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all',
                isFilterOpen
                  ? 'bg-plum text-warm-ivory'
                  : 'bg-white border border-blush-pink text-charcoal hover:border-rose-mauve'
              )}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
              {selectedFilters.length > 0 && (
                <span className="ml-1 px-2 py-0.5 rounded-full bg-rose-mauve text-white text-xs">
                  {selectedFilters.length}
                </span>
              )}
            </button>

            <div className="flex items-center gap-4">
              {/* Product Count */}
              <span className="text-sm text-muted-foreground hidden sm:block">
                {filteredProducts.length} products
              </span>

              {/* Grid Toggle */}
              <div className="flex items-center gap-1 p-1 bg-white rounded-full border border-blush-pink">
                <button
                  onClick={() => setGridView('grid')}
                  className={cn(
                    'p-2 rounded-full transition-colors',
                    gridView === 'grid' ? 'bg-plum text-white' : 'text-charcoal hover:bg-blush-pink/20'
                  )}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridView('large')}
                  className={cn(
                    'p-2 rounded-full transition-colors',
                    gridView === 'large' ? 'bg-plum text-white' : 'text-charcoal hover:bg-blush-pink/20'
                  )}
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
                    'bg-white border border-blush-pink text-charcoal',
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
                <div className="py-8 border-b border-blush-pink/30">
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
                                ? 'bg-plum text-warm-ivory'
                                : 'bg-white border border-blush-pink text-charcoal hover:border-rose-mauve'
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
                                ? 'bg-plum text-warm-ivory'
                                : 'bg-white border border-blush-pink text-charcoal hover:border-rose-mauve'
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
                                ? 'bg-plum text-warm-ivory'
                                : 'bg-white border border-blush-pink text-charcoal hover:border-rose-mauve'
                            )}
                          >
                            {range}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Active Filters */}
                  {selectedFilters.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-blush-pink/30">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm text-muted-foreground">Active:</span>
                        {selectedFilters.map(filter => (
                          <button
                            key={filter}
                            onClick={() => toggleFilter(filter)}
                            className="flex items-center gap-1 px-3 py-1 rounded-full bg-plum/10 text-plum text-sm"
                          >
                            {filter}
                            <X className="w-3 h-3" />
                          </button>
                        ))}
                        <button
                          onClick={() => setSelectedFilters([])}
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
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          {/* Load More */}
          <div className="mt-16 text-center">
            <button
              className={cn(
                'px-8 py-4 rounded-full font-medium',
                'border-2 border-plum text-plum',
                'hover:bg-plum hover:text-warm-ivory transition-all duration-300'
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
