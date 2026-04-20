'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import { cn } from '@/lib/utils'
import { EditorialMedia } from '@/components/ui/editorial-media'
import { ChapterHeading } from '@/components/ui/chapter-heading'
import { AtmosphereSection } from '@/components/ui/atmosphere-section'

export function HeroSection() {
  return (
    <AtmosphereSection
      atmosphere="ivory"
      className="min-h-screen pt-28 pb-16 lg:pt-32"
    >
      <div className="relative">
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            initial={{ opacity: 0.45, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <div className="absolute top-[8%] left-[-6%] h-80 w-80 rounded-full bg-rose-mauve/18 blur-3xl" />
            <div className="absolute top-[18%] right-[4%] h-[24rem] w-[24rem] rounded-full bg-champagne-gold/14 blur-3xl" />
            <div className="absolute bottom-[4%] left-[24%] h-[20rem] w-[20rem] rounded-full bg-blush-pink/16 blur-3xl" />
          </motion.div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 lg:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="pt-10 lg:pt-16">
              <ChapterHeading
                kicker="Seoul Ritual House · Since 2024"
                title="A New Language of Korean Beauty"
                ghostLabel="JISOO"
                as="h1"
                className="max-w-2xl"
              />

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15 }}
                className="mt-8 max-w-xl text-base leading-relaxed txt-charcoal/75 lg:text-lg"
              >
                Editorially curated skincare and complexion icons from Korea&apos;s most progressive laboratories —
                designed to feel like a private beauty gallery, not a generic shop.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.25 }}
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <Link
                  href="/shop"
                  className={cn(
                    'group inline-flex items-center gap-2 rounded-full px-8 py-4',
                    'bg-plum font-medium text-warm-ivory shadow-editorial'
                  )}
                >
                  <span>Discover Collection</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                href="/about"
                  className="inline-flex items-center rounded-full border border-plum/25 px-8 py-4 font-medium text-plum transition-colors hover:bg-white/40"
                >
                  Our Story
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.35 }}
                className="mt-12 grid max-w-lg grid-cols-3 gap-4"
              >
                {[
                  ['72h', 'Hydration Layering'],
                  ['98%', 'Repurchase Intent'],
                  ['3', 'Korean Lab Partners'],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/50 bg-white/40 px-4 py-4 backdrop-blur-md"
                  >
                    <p className="font-serif text-2xl text-plum">{value}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.15em] text-charcoal/60">
                      {label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.2 }}
              className="relative lg:pl-8"
            >
              <div className="relative grid grid-cols-2 gap-4 lg:gap-5">
                <EditorialMedia
                  src="/products/luminous-glow-serum-1.jpg"
                  alt="Luminous Glow Serum"
                  hint="Editor Pick"
                  className="aspect-[4/5] rounded-[2rem] shadow-editorial"
                  priority
                />

                <EditorialMedia
                  src="/products/glass-skin-essence-1.jpg"
                  alt="Glass Skin Essence"
                  hint="New Formula"
                  className="mt-10 aspect-[4/5] rounded-[2rem] shadow-editorial"
                  priority
                />

                <div className="grain-soft surface-velvet relative col-span-2 overflow-hidden rounded-[2rem] p-6 shadow-editorial lg:p-8">
                  <p className="text-kicker text-rose-mauve">Campaign 01</p>
                  <h3 className="mt-3 font-serif text-2xl text-charcoal lg:text-3xl">
                    The Glass-Skin Atelier
                  </h3>
                  <p className="mt-3 max-w-md text-charcoal/70">
                    Precision fermented actives, velvet textures, and reflective finishes crafted for modern ritualists.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AtmosphereSection>
  )
}
