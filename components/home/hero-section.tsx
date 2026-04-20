'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EditorialMedia } from '@/components/ui/editorial-media'

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.4])

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden pt-28 lg:pt-32 pb-14">
      <motion.div style={{ y }} className="absolute inset-0 mesh-luxury" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,248,244,0.66),rgba(255,248,244,0.82)_42%,rgba(255,248,244,1))]" />

      <motion.div style={{ opacity }} className="relative max-w-7xl mx-auto px-4 lg:px-6">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
          <div className="pt-10 lg:pt-16">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-kicker text-rose-mauve"
            >
              Seoul Ritual House · Since 2024
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-5 font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-[5.3rem] leading-[0.95] text-charcoal"
            >
              A New Language
              <span className="block text-plum">of Korean Beauty</span>
            </motion.h1>

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
                  'bg-plum text-warm-ivory font-medium shadow-editorial'
                )}
              >
                Discover Collection
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center rounded-full border border-plum/35 px-8 py-4 text-plum font-medium hover:bg-plum/5 transition-colors"
              >
                Our Story
              </Link>
            </motion.div>

            <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg">
              {[
                ['72h', 'Hydration Layering'],
                ['98%', 'Repurchase Intent'],
                ['3', 'Korean Lab Partners'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-plum/15 bg-white/65 backdrop-blur-sm px-4 py-4">
                  <p className="text-2xl font-serif text-plum">{value}</p>
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
              <div className="col-span-2 rounded-[2rem] p-6 lg:p-8 surface-velvet shadow-editorial relative overflow-hidden grain-soft">
                <p className="text-kicker text-rose-mauve">Campaign 01</p>
                <h3 className="mt-3 text-2xl lg:text-3xl font-serif text-charcoal">The Glass-Skin Atelier</h3>
                <p className="mt-3 text-charcoal/70 max-w-md">
                  Precision fermented actives, velvet textures, and reflective finishes crafted for modern ritualists.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

