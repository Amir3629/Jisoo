'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { categories } from '@/lib/data'
import { cn } from '@/lib/utils'

const categoryImages = [
  { gradient: 'from-rose-mauve/30 to-blush-pink/20', accent: 'bg-rose-mauve' },
  { gradient: 'from-champagne-gold/30 to-nude-beige/20', accent: 'bg-champagne-gold' },
  { gradient: 'from-plum/20 to-rose-mauve/10', accent: 'bg-plum' },
  { gradient: 'from-blush-pink/30 to-warm-ivory', accent: 'bg-blush-pink' },
  { gradient: 'from-nude-beige/40 to-champagne-gold/20', accent: 'bg-nude-beige' },
]

export function CategoriesSection() {
  const displayCategories = categories.slice(0, 5)

  return (
    <section className="py-24 lg:py-32 bg-warm-ivory">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 lg:mb-16"
        >
          <div>
            <span className="text-sm font-medium text-rose-mauve uppercase tracking-widest">
              Shop by Category
            </span>
            <h2 className="mt-4 text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-charcoal">
              Explore Our Collections
            </h2>
          </div>
          <Link
            href="/shop"
            className="group flex items-center gap-2 text-plum font-medium hover:text-rose-mauve transition-colors"
          >
            View All Categories
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Categories Grid - Bento Style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {/* Large Featured Category */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 lg:row-span-2"
          >
            <Link href={`/shop/${displayCategories[0].slug}`} className="group block h-full">
              <div
                className={cn(
                  'relative h-full min-h-[400px] lg:min-h-full rounded-3xl overflow-hidden',
                  'bg-gradient-to-br',
                  categoryImages[0].gradient
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <span className="text-sm font-medium text-white/80 uppercase tracking-wider">
                      {displayCategories[0].productCount} Products
                    </span>
                    <h3 className="mt-2 text-3xl lg:text-4xl font-serif font-bold text-white">
                      {displayCategories[0].name}
                    </h3>
                    <p className="mt-2 text-white/80 max-w-md">
                      {displayCategories[0].description}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 text-white font-medium group-hover:gap-3 transition-all">
                      Explore Collection
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </motion.div>
                </div>

                {/* Decorative Circle */}
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10" />
              </div>
            </Link>
          </motion.div>

          {/* Smaller Categories */}
          {displayCategories.slice(1).map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
            >
              <Link href={`/shop/${category.slug}`} className="group block">
                <div
                  className={cn(
                    'relative h-[200px] lg:h-[240px] rounded-2xl overflow-hidden',
                    'bg-gradient-to-br',
                    categoryImages[(index + 1) % categoryImages.length].gradient,
                    'transition-all duration-500',
                    'hover:shadow-luxury hover:-translate-y-1'
                  )}
                >
                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <span className="text-xs font-medium text-charcoal/60 uppercase tracking-wider">
                      {category.productCount} Products
                    </span>
                    <h3 className="mt-1 text-xl font-serif font-semibold text-charcoal group-hover:text-plum transition-colors">
                      {category.name}
                    </h3>
                    <div className="mt-3 flex items-center gap-2 text-sm text-plum font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Shop Now
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Accent */}
                  <div
                    className={cn(
                      'absolute top-4 right-4 w-12 h-12 rounded-full opacity-20',
                      categoryImages[(index + 1) % categoryImages.length].accent
                    )}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
