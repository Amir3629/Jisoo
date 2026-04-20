'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { categories } from '@/lib/data'
import { EditorialMedia } from '@/components/ui/editorial-media'
import { ChapterHeading } from '@/components/ui/chapter-heading'
import { AtmosphereSection } from '@/components/ui/atmosphere-section'

export function CategoriesSection() {
  const displayCategories = categories.slice(0, 4)

  return (
    <AtmosphereSection atmosphere="blush" className="py-24 lg:py-32">
      <div className="absolute inset-x-0 top-0 divider-luxury" />
      <div className="relative max-w-7xl mx-auto px-4 lg:px-6">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16">
          <div className="lg:sticky lg:top-28 self-start">
            <ChapterHeading
              kicker="Merchandise Chapters"
              title="Collections Composed Like a Campaign"
              description="Instead of a simple product taxonomy, each chapter is art-directed to reflect mood, finish, and ritual outcome."
              ghostLabel="EDIT"
            />
            <Link
              href="/shop"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-plum/30 px-6 py-3 text-plum font-medium hover:bg-plum/5 transition-colors"
            >
              Browse All Categories
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-5 lg:space-y-7">
            {displayCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-90px' }}
                transition={{ duration: 0.9, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={index % 2 === 1 ? 'lg:ml-14' : ''}
              >
                <Link href={`/shop/${category.slug}`} className="group block">
                  <div className="relative rounded-[2rem] overflow-hidden shadow-editorial">
                    <EditorialMedia
                      src={category.image}
                      alt={category.name}
                      hint={`${category.productCount} Products`}
                      className={index === 0 ? 'aspect-[16/9]' : 'aspect-[14/8]'}
                      overlayClassName="bg-gradient-to-r from-charcoal/60 via-charcoal/20 to-transparent"
                    />
                    <div className="absolute inset-0 p-7 lg:p-9 flex flex-col justify-end">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-white/80">Chapter {index + 1}</p>
                      <h3 className="mt-2 text-3xl lg:text-4xl font-serif text-white">{category.name}</h3>
                      <p className="mt-2 text-white/80 max-w-lg">{category.description}</p>
                      <span className="mt-6 inline-flex items-center gap-2 text-white font-medium">
                        Explore Chapter
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AtmosphereSection>
  )
}

