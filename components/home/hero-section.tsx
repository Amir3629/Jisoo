'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EditorialMedia } from '@/components/ui/editorial-media'
import { ChapterHeading } from '@/components/ui/chapter-heading'
import { AtmosphereSection } from '@/components/ui/atmosphere-section'
import { useLocale } from '@/components/providers/locale-provider'

export function HeroSection() {
  const { locale, dictionary } = useLocale()
  const t = dictionary.home
  const { scrollYProgress } = useScroll()

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.4])
  const badgeY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
  const cardRotate = useTransform(scrollYProgress, [0, 1], ['-3deg', '2deg'])

  return (
    <AtmosphereSection
      atmosphere="ivory"
      className="min-h-screen pt-28 lg:pt-32 pb-24"
    >
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] -left-16 h-80 w-80 rounded-full bg-rose-mauve/25 blur-3xl" />
        <div className="absolute bottom-[8%] right-[6%] h-[26rem] w-[26rem] rounded-full bg-champagne-gold/20 blur-3xl" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative max-w-7xl mx-auto px-4 lg:px-6">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
          <div className="pt-10 lg:pt-16">
            <ChapterHeading
              kicker="Seoul Ritual House · Since 2024"
              title="A New Language of Korean Beauty"
              ghostLabel="JISOO"
              as="h1"
              className="max-w-2xl"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-8 max-w-xl text-base lg:text-lg text-charcoal/75 leading-relaxed"
            >
             Editorially curated skincare and complexion icons from Korea&apos;s most progressive laboratories—
              designed to feel like a private beauty gallery, not a generic shop.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/shop"
                className={cn(
                  'group inline-flex items-center gap-2 rounded-full px-8 py-4',
                  'bg-rose-mauve text-warm-ivory font-medium shadow-editorial'
                )}
              >
                {t.discoverCollection}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center rounded-full border border-rose-mauve/35 px-8 py-4 text-rose-mauve font-medium hover:bg-rose-mauve/5 transition-colors"
              >
                {t.ourStory}
              </Link>
            </motion.div>

            <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg">
              {[
                ['72h', 'Hydration Layering'],
                ['98%', 'Repurchase Intent'],
                ['3', 'Korean Lab Partners'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-rose-mauve/20 bg-white/65 backdrop-blur-sm px-4 py-4">
                  <p className="text-2xl font-serif text-rose-mauve">{value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-charcoal/60">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25 }}
            className="relative lg:pl-8"
          >
            <motion.div
              style={{ y: badgeY }}
              className="absolute -top-4 right-4 z-20 rounded-full border border-rose-mauve/35 bg-white/85 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-rose-mauve shadow-editorial backdrop-blur-sm"
            >
              Editor&apos;s Selection
            </motion.div>

            <div className="relative grid grid-cols-2 gap-4 lg:gap-5">
              <EditorialMedia
                src="/products/luminous-glow-serum-1.jpg"
                alt="Luminous Glow Serum"
                hint="Editor Pick"
                className="aspect-[4/5] rounded-[2rem] shadow-editorial"
              />
              <EditorialMedia
                src="/products/glass-skin-essence-1.jpg"
                alt="Glass Skin Essence"
                hint="New Formula"
                className="aspect-[4/5] rounded-[2rem] shadow-editorial mt-10"
              />
              <motion.div
                style={{ rotate: cardRotate }}
                className="col-span-2 rounded-[2rem] p-6 lg:p-8 surface-velvet shadow-editorial relative overflow-hidden grain-soft origin-top-left"
              >
                <p className="text-kicker text-rose-mauve">Campaign 01</p>
                <h3 className="mt-3 text-2xl lg:text-3xl font-serif text-charcoal">The Glass-Skin Atelier</h3>
                <p className="mt-3 text-charcoal/70 max-w-md">
                  Precision fermented actives, velvet textures, and reflective finishes crafted for modern ritualists.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="absolute left-1/2 -translate-x-1/2 bottom-8 hidden md:flex items-center gap-3 rounded-full border border-rose-mauve/25 bg-white/70 px-5 py-2.5 backdrop-blur-sm"
      >
        <span className="h-2 w-2 rounded-full bg-champagne-gold animate-pulse-soft" />
        <span className="text-xs uppercase tracking-[0.18em] text-charcoal/70">Scroll the story</span>
      </motion.div>
    </AtmosphereSection>
  )
}
