'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Droplets, Heart, Sparkles, Circle, Sun, Shield, Clock, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ChapterHeading } from '@/components/ui/chapter-heading'
import { AtmosphereSection } from '@/components/ui/atmosphere-section'
import { useLocale } from '@/components/providers/locale-provider'
import { localizedUi } from '@/lib/localized-ui'

const concerns = [
  { id: 'hydration', name: 'Hydration', icon: Droplets, color: 'from-blue-200 to-cyan-100', count: 42 },
  { id: 'soothing', name: 'Soothing', icon: Heart, color: 'from-pink-200 to-rose-100', count: 28 },
  { id: 'glow', name: 'Glow & Radiance', icon: Sparkles, color: 'from-amber-200 to-yellow-100', count: 35 },
  { id: 'pores', name: 'Pores', icon: Circle, color: 'from-purple-200 to-violet-100', count: 18 },
  { id: 'tone-up', name: 'Tone-Up', icon: Sun, color: 'from-orange-200 to-amber-100', count: 24 },
  { id: 'sensitive', name: 'Sensitive Skin', icon: Shield, color: 'from-green-200 to-emerald-100', count: 31 },
  { id: 'anti-aging', name: 'Anti-Aging', icon: Clock, color: 'from-indigo-200 to-blue-100', count: 22 },
  { id: 'acne', name: 'Acne & Blemishes', icon: XCircle, color: 'from-red-200 to-rose-100', count: 19 },
]

export function ConcernsSection() {
  const { locale } = useLocale()
  const t = localizedUi[locale]
  return (
    <AtmosphereSection atmosphere="blush" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <ChapterHeading
          kicker="Targeted Solutions"
          title="{t.shopByConcern}"
          description="Find products formulated to address your specific skin concerns. Korean beauty expertise meets your unique needs."
          align="center"
          className="mb-12 lg:mb-16 max-w-4xl mx-auto"
        />

        {/* Concerns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {concerns.map((concern, index) => (
            <motion.div
              key={concern.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Link
                href={`/shop?concern=${concern.id}`}
                className="group block"
              >
                <div
                  className={cn(
                    'relative aspect-square rounded-2xl overflow-hidden',
                    'bg-gradient-to-br',
                    concern.color,
                    'transition-all duration-500',
                    'hover:shadow-luxury hover:-translate-y-2'
                  )}
                >
                  {/* Icon */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="p-4 rounded-full bg-white/50 backdrop-blur-sm mb-4 shadow-sm"
                    >
                      <concern.icon className="w-8 h-8 text-charcoal/80" />
                    </motion.div>
                    <h3 className="font-medium text-charcoal text-center text-sm lg:text-base">
                      {concern.name}
                    </h3>
                    <p className="text-xs text-charcoal/60 mt-1">
                      {concern.count} products
                    </p>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Region Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 p-6 lg:p-8 rounded-2xl bg-gradient-to-r from-plum/5 via-rose-mauve/5 to-champagne-gold/5 border border-blush-pink/30"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div>
              <h3 className="font-serif font-semibold text-charcoal text-lg">
                Shopping from a different region?
              </h3>
              <p className="text-muted-foreground mt-1">
                Some products may vary by market. Check availability for UAE, Europe, or Canada.
              </p>
            </div>
            <Link
              href="/help/shipping"
              className={cn(
                'px-6 py-3 rounded-full whitespace-nowrap',
                'bg-plum text-warm-ivory font-medium',
                'hover:bg-plum/90 transition-colors'
              )}
            >
              {t.viewShippingInfo}
            </Link>
          </div>
        </motion.div>
      </div>
    </AtmosphereSection>
  )
}
