'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, PlayCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EditorialMedia } from '@/components/ui/editorial-media'
import { AtmosphereSection } from '@/components/ui/atmosphere-section'
import { useLocale } from '@/components/providers/locale-provider'
import { localizeHref } from '@/lib/i18n'

const highlights = [
  { label: 'Korean Partner Labs', value: '3' },
  { label: 'Curated Hero Formulas', value: '28' },
  { label: 'Region-ready Markets', value: 'UAE · EU · CA' },
]

export function HeroSection() {
  const { locale } = useLocale()

  return (
    <AtmosphereSection atmosphere="ivory" className="relative min-h-[94vh] overflow-hidden pt-28 pb-20 lg:pt-32 lg:pb-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 left-[8%] h-72 w-72 rounded-full bg-rose-mauve/20 blur-3xl" />
        <div className="absolute top-[32%] right-[6%] h-80 w-80 rounded-full bg-champagne-gold/15 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-mauve/40 to-transparent" />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="text-[11px] uppercase tracking-[0.35em] text-rose-mauve/85">Luxury Korean Beauty House</p>

          <h1 className="mt-6 font-serif text-5xl leading-[1.02] text-charcoal sm:text-6xl lg:text-7xl">
            Cinematic Beauty
            <span className="mt-2 block text-plum">for Modern Rituals</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-charcoal/75 lg:text-lg">
            Discover editorial-grade skincare and complexion icons from Seoul&apos;s most respected laboratories—crafted for luminous skin, refined textures, and elevated daily rituals.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href={localizeHref('/shop', locale)}
              className={cn(
                'group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium lg:text-base',
                'bg-plum text-warm-ivory shadow-[0_20px_45px_rgba(88,36,74,0.22)] transition-all hover:-translate-y-0.5 hover:bg-plum/90'
              )}
            >
              Explore the Collection
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href={localizeHref('/ai-consultant', locale)}
              className="inline-flex items-center gap-2 rounded-full border border-plum/25 bg-white/75 px-6 py-3.5 text-sm font-medium text-plum backdrop-blur-sm transition-colors hover:bg-white lg:text-base"
            >
              <PlayCircle className="h-4 w-4" />
              Begin Your Beauty Consult
            </Link>
          </div>

          <div className="mt-11 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {highlights.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.18 + idx * 0.08 }}
                className="rounded-2xl border border-plum/12 bg-white/70 px-4 py-4 backdrop-blur-sm"
              >
                <p className="text-lg font-semibold text-plum">{item.value}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-charcoal/60">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[560px]"
        >
          <div className="relative overflow-hidden rounded-[2.6rem] border border-plum/15 bg-white/70 p-3 shadow-[0_26px_70px_rgba(84,33,69,0.16)] backdrop-blur-sm">
            <EditorialMedia
              src="/products/luminous-glow-serum-1.jpg"
              alt="JISOO Luminous Glow Serum hero"
              hint="Signature Radiance Edit"
              className="aspect-[4/5] rounded-[2.05rem]"
            />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute bottom-8 left-8 rounded-2xl border border-white/45 bg-white/82 px-4 py-3 shadow-lg backdrop-blur"
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-rose-mauve">Featured Formula</p>
              <p className="mt-1 font-serif text-lg text-charcoal">Luminous Glow Serum</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 12, y: 12 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.6, duration: 0.55 }}
            className="absolute -bottom-6 -right-2 w-48 overflow-hidden rounded-3xl border border-rose-mauve/20 bg-white/85 p-2 shadow-editorial backdrop-blur sm:w-56"
          >
            <EditorialMedia src="/products/glass-skin-essence-1.jpg" alt="Glass Skin Essence" className="aspect-[4/3] rounded-2xl" />
          </motion.div>
        </motion.div>
      </div>
    </AtmosphereSection>
  )
}
