'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { products } from '@/lib/data'
import { ProductCard } from '@/components/product/product-card'

export function FeaturedProducts() {
  const featuredProducts = products.filter(p => p.isBestSeller || p.isNew).slice(0, 8)

  return (
    <section className="py-24 lg:py-32 bg-white">
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
              Customer Favorites
            </span>
            <h2 className="mt-4 text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-charcoal">
              Best Sellers & New Arrivals
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl">
              Discover what the JISOO community loves most. From iconic essentials to our latest innovations.
            </p>
          </div>
          <Link
            href="/shop"
            className="group flex items-center gap-2 text-plum font-medium hover:text-rose-mauve transition-colors"
          >
            View All Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* View More CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-plum text-plum font-medium hover:bg-plum hover:text-warm-ivory transition-all duration-300"
          >
            Explore Full Collection
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
