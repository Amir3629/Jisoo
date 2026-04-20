'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const ritualSteps = [
  {
    number: '01',
    title: 'Cleanse',
    description: 'Begin with our gentle cloud foam cleanser. The pH-balanced formula removes impurities while preserving your skin barrier.',
    color: 'from-blush-pink/30',
  },
  {
    number: '02',
    title: 'Tone & Prep',
    description: 'Our Glass Skin Essence preps your skin for optimal absorption. Fermented botanicals plump and hydrate.',
    color: 'from-rose-mauve/20',
  },
  {
    number: '03',
    title: 'Treat',
    description: 'Apply targeted treatments. Our serums address specific concerns from brightening to soothing.',
    color: 'from-champagne-gold/20',
  },
  {
    number: '04',
    title: 'Moisturize',
    description: 'Lock in hydration with our Hydra Cloud Cream. 72-hour moisture retention for plump, dewy skin.',
    color: 'from-plum/10',
  },
  {
    number: '05',
    title: 'Protect',
    description: 'Finish with our Aura Tone-Up Sun Cream. SPF50+ protection with a natural glow effect.',
    color: 'from-nude-beige/40',
  },
]

export function RitualSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section ref={containerRef} className="py-24 lg:py-32 bg-warm-ivory relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0"
      >
        <div className="absolute top-1/4 -left-40 w-80 h-80 rounded-full bg-blush-pink/20 blur-3xl" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 rounded-full bg-rose-mauve/10 blur-3xl" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-24"
        >
          <span className="text-sm font-medium text-rose-mauve uppercase tracking-widest">
            The K-Beauty Way
          </span>
          <h2 className="mt-4 text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-charcoal">
            The Ritual of Korean Beauty
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            Discover the art of layering products for maximum efficacy. 
            Each step builds upon the last for transformative results.
          </p>
        </motion.div>

        {/* Ritual Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blush-pink via-rose-mauve to-plum opacity-30" />

          <div className="space-y-16 lg:space-y-24">
            {ritualSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className={cn(
                  'relative grid lg:grid-cols-2 gap-8 lg:gap-20 items-center',
                  index % 2 === 1 && 'lg:direction-rtl'
                )}
              >
                {/* Content */}
                <div className={cn('lg:text-left', index % 2 === 1 && 'lg:order-2 lg:text-right')}>
                  <div
                    className={cn(
                      'inline-flex items-center justify-center w-16 h-16 rounded-full mb-6',
                      'bg-gradient-to-br',
                      step.color,
                      'to-white border border-blush-pink/30'
                    )}
                  >
                    <span className="text-xl font-serif font-bold text-plum">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-serif font-bold text-charcoal mb-4">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                    {step.description}
                  </p>
                </div>

                {/* Visual */}
                <div className={cn(index % 2 === 1 && 'lg:order-1')}>
                  <motion.div
                    whileInView={{ scale: [0.95, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={cn(
                      'relative aspect-square max-w-sm mx-auto rounded-3xl overflow-hidden',
                      'bg-gradient-to-br',
                      step.color,
                      'to-white'
                    )}
                  >
                    {/* Placeholder for product imagery */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 rounded-full bg-white/50 backdrop-blur-sm mx-auto mb-4 flex items-center justify-center">
                          <span className="text-2xl font-serif font-bold text-plum">
                            {step.number}
                          </span>
                        </div>
                        <p className="text-plum font-medium">{step.title}</p>
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white/30" />
                    <div className="absolute -top-5 -left-5 w-24 h-24 rounded-full bg-white/20" />
                  </motion.div>
                </div>

                {/* Center Dot for Timeline */}
                <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-rose-mauve border-4 border-warm-ivory z-10" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <Link
            href="/shop"
            className={cn(
              'inline-flex items-center gap-2 px-8 py-4 rounded-full',
              'bg-plum text-warm-ivory font-medium',
              'hover:bg-plum/90 transition-all duration-300',
              'shadow-lg shadow-plum/20'
            )}
          >
            Shop the Ritual
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
