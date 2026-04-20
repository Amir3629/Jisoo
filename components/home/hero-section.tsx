'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 lg:pt-28"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating gradient orbs */}
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blush-pink/40 to-rose-mauve/20 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-nude-beige/60 to-champagne-gold/20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-rose-mauve/10 blur-2xl"
        />
      </div>

      {/* Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6 py-20 lg:py-32"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-plum/10 text-plum text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span>Curated K-Beauty from Seoul</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-charcoal leading-tight"
            >
              <span className="block">Discover the</span>
              <span className="block text-gradient-premium">Art of Korean</span>
              <span className="block">Beauty</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0"
            >
              Experience premium skincare and makeup from Korea&apos;s finest beauty houses. 
              Curated for Dubai, Europe, and Canada.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link
                href="/shop"
                className={cn(
                  'group flex items-center gap-2 px-8 py-4 rounded-full',
                  'bg-plum text-warm-ivory font-medium',
                  'hover:bg-plum/90 transition-all duration-300',
                  'shadow-lg shadow-plum/20'
                )}
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className={cn(
                  'flex items-center gap-2 px-8 py-4 rounded-full',
                  'border-2 border-plum text-plum font-medium',
                  'hover:bg-plum hover:text-warm-ivory transition-all duration-300'
                )}
              >
                Our Story
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-champagne-gold" />
                <span>Free Shipping 100+</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-champagne-gold" />
                <span>Authentic Korean</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-champagne-gold" />
                <span>Expert Curation</span>
              </div>
            </motion.div>
          </div>

          {/* Visual Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Main Product Display */}
            <div className="relative">
              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-8 -left-8 w-48 h-64 rounded-2xl bg-white shadow-elevated overflow-hidden"
              >
                <div className="w-full h-full bg-gradient-to-br from-blush-pink/30 to-rose-mauve/20 flex items-center justify-center">
                  <div className="text-center p-4">
                    <p className="text-xs text-rose-mauve font-medium uppercase tracking-wider">
                      Serum
                    </p>
                    <p className="font-serif font-semibold text-charcoal mt-1">
                      Luminous Glow
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -right-4 w-56 h-72 rounded-2xl bg-white shadow-elevated overflow-hidden"
              >
                <div className="w-full h-full bg-gradient-to-br from-nude-beige/50 to-champagne-gold/20 flex items-center justify-center">
                  <div className="text-center p-4">
                    <p className="text-xs text-champagne-gold font-medium uppercase tracking-wider">
                      Moisturizer
                    </p>
                    <p className="font-serif font-semibold text-charcoal mt-1">
                      Hydra Cloud
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Center Element */}
              <div className="relative z-10 mx-auto w-72 h-96 rounded-3xl bg-gradient-to-b from-white to-nude-beige shadow-luxury overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-mauve/10 via-transparent to-champagne-gold/10" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-8 border border-blush-pink/30 rounded-full"
                  />
                  <div className="relative z-10 text-center">
                    <p className="text-sm text-rose-mauve font-medium uppercase tracking-widest">
                      New Arrival
                    </p>
                    <h3 className="mt-3 text-2xl font-serif font-bold text-plum">
                      Glass Skin
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Essence
                    </p>
                    <div className="mt-4 w-16 h-0.5 bg-champagne-gold mx-auto" />
                    <p className="mt-4 text-lg font-semibold text-plum">
                      €52
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-1/4 right-0 w-4 h-4 rounded-full bg-champagne-gold"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-1/4 left-0 w-3 h-3 rounded-full bg-rose-mauve"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-plum/30 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-2.5 rounded-full bg-plum/50"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
