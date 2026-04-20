'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { categories } from '@/lib/data'
import { EditorialMedia } from '@/components/ui/editorial-media'

export function CategoriesSection() {
  const displayCategories = categories.slice(0, 4)

  return (
    <section className="py-20 lg:py-28 bg-white relative">
      <div className="absolute inset-x-0 top-0 divider-luxury" />
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-[1fr_auto] items-end gap-6 mb-12"
        >
          <div>
            <p className="text-kicker text-rose-mauve">Category Edit</p>
            <h2 className="mt-4 text-4xl lg:text-5xl font-serif text-charcoal">
              Collections Curated as Campaign Chapters
            </h2>
          </div>
          <Link href="/shop" className="inline-flex items-center gap-2 text-plum font-medium hover:text-rose-mauve transition-colors">
            View Full Catalog
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-4 lg:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="lg:col-span-2"
          >
            <Link href={`/shop/${displayCategories[0].slug}`} className="group block">
              <EditorialMedia
                src={displayCategories[0].image}
                alt={displayCategories[0].name}
                hint={`${displayCategories[0].productCount} Products`}
                className="aspect-[16/10] rounded-[2rem] shadow-editorial"
                overlayClassName="bg-gradient-to-r from-charcoal/55 via-charcoal/15 to-transparent"
              />
              <div className="absolute" />
              <div className="-mt-24 ml-8 mb-2 relative z-10 max-w-md">
                <h3 className="text-4xl font-serif text-white">{displayCategories[0].name}</h3>
                <p className="text-white/80 mt-2">{displayCategories[0].description}</p>
              </div>
            </Link>
          </motion.div>

          <div className="grid gap-4 lg:gap-6">
            {displayCategories.slice(1).map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
              >
                <Link href={`/shop/${category.slug}`} className="group block">
                  <div className="relative rounded-[1.6rem] overflow-hidden shadow-editorial">
                    <EditorialMedia
                      src={category.image}
                      alt={category.name}
                      hint={`${category.productCount} Products`}
                      className="aspect-[4/3]"
                      overlayClassName="bg-gradient-to-t from-charcoal/55 to-transparent"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <h3 className="text-2xl font-serif text-white group-hover:translate-x-0.5 transition-transform">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

