'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { products } from '@/lib/data'
import { ProductCard } from '@/components/product/product-card'
import { ChapterHeading } from '@/components/ui/chapter-heading'
import { AtmosphereSection } from '@/components/ui/atmosphere-section'
import { useLocale } from '@/components/providers/locale-provider'
import { localizeHref } from '@/lib/i18n'

export function FeaturedProducts() {
  const { locale, dictionary } = useLocale()
  const t = dictionary.home
  const featuredProducts = products.filter(p => p.isBestSeller || p.isNew).slice(0, 8)

  return (
    <AtmosphereSection atmosphere="ivory" className="py-24 lg:py-32">
      <div className="absolute inset-x-0 top-0 divider-luxury" />
      <div className="relative max-w-7xl mx-auto px-4 lg:px-6">
        <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-end mb-12 lg:mb-16">
          <ChapterHeading
            kicker="The Collector's Edit"
            title="Collectible Formulas, Gallery Styled"
            description="A curated sequence of icons and new releases with atmospheric framing and tactile product storytelling."
            ghostLabel="COLLECT"
          />
          <Link
            href={localizeHref('/shop', locale)}
            className="inline-flex items-center gap-2 text-plum font-medium hover:text-rose-mauve transition-colors"
          >
            {t.viewEntireEdit}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </motion.div>
      </div>
    </AtmosphereSection>
  )
}
