'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

const INTRO_SESSION_KEY = 'jisoo_intro_seen_v1'

export function LuxuryIntroSplash({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion()
  const [showIntro, setShowIntro] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion) {
      setReady(true)
      return
    }

    try {
      const seen = sessionStorage.getItem(INTRO_SESSION_KEY)
      if (seen) {
        setReady(true)
        return
      }

      setShowIntro(true)
      setReady(true)
      sessionStorage.setItem(INTRO_SESSION_KEY, '1')

      const timeout = window.setTimeout(() => {
        setShowIntro(false)
      }, 1200)

      return () => window.clearTimeout(timeout)
    } catch {
      setReady(true)
    }
  }, [prefersReducedMotion])

  if (!ready) {
    return <div className="min-h-screen bg-warm-ivory" />
  }

  return (
    <div className="relative">
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[90] overflow-hidden bg-gradient-to-br from-plum via-rose-mauve to-[#7f3d66]"
            aria-label="JISOO intro splash"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne-gold/70 to-transparent" />
              <motion.div
                initial={{ opacity: 0.35, scale: 0.95 }}
                animate={{ opacity: 0.8, scale: 1.08 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="absolute -top-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-champagne-gold/20 blur-2xl"
              />
              <motion.div
                initial={{ opacity: 0.2, y: 20 }}
                animate={{ opacity: 0.45, y: -10 }}
                transition={{ duration: 1.1, ease: 'easeOut' }}
                className="absolute bottom-8 right-8 h-32 w-32 rounded-full bg-blush-pink/24 blur-xl"
              />
            </div>

            <div className="relative flex h-full items-center justify-center px-6">
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="text-[10px] uppercase tracking-[0.38em] text-champagne-gold/90"
                >
                  Seoul Edition
                </motion.p>
                <h1 className={cn('mt-3 font-serif text-5xl tracking-[0.18em] text-warm-ivory sm:text-6xl')}>
                  JISOO
                </h1>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </div>
  )
}
