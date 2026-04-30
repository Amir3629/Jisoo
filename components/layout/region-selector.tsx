'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Globe } from 'lucide-react'
import { useRegion } from '@/components/providers/region-provider'
import { regionConfigs } from '@/lib/data'
import type { Region, Language } from '@/lib/types'
import { cn } from '@/lib/utils'

interface RegionSelectorProps {
  isOpen: boolean
  onClose: () => void
}

const languageMeta: Record<Language, { name: string; flag: string }> = {
  en: { name: 'English', flag: '🇬🇧' },
  ar: { name: 'Arabic', flag: '🇦🇪' },
  fr: { name: 'French', flag: '🇫🇷' },
  de: { name: 'German', flag: '🇩🇪' },
  ko: { name: 'Korean', flag: '🇰🇷' },
  tr: { name: 'Turkish', flag: '🇹🇷' },
}

export function RegionSelector({ isOpen, onClose }: RegionSelectorProps) {
  const { region, language, setRegion, setLanguage } = useRegion()
  const currentConfig = regionConfigs[region]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-50" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 z-50 w-[92%] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-warm-ivory shadow-elevated"
          >
            <div className="flex items-center justify-between border-b border-blush-pink p-6">
              <div className="flex items-center gap-3"><Globe className="h-5 w-5 text-plum" /><h2 className="text-lg font-serif font-semibold text-charcoal">Region & Language</h2></div>
              <button onClick={onClose} className="p-2 -mr-2 text-muted-foreground hover:text-charcoal"><X className="h-5 w-5" /></button>
            </div>

            <div className="grid gap-6 p-6 md:grid-cols-2">
              <div>
                <h3 className="mb-3 text-sm font-medium text-muted-foreground">Select Region</h3>
                <div className="space-y-2">
                  {Object.values(regionConfigs).map((r) => (
                    <button key={r.code} onClick={() => setRegion(r.code as Region)} className={cn('w-full rounded-xl p-4 text-left transition-all border', region === r.code ? 'border-plum bg-plum text-warm-ivory' : 'border-blush-pink bg-white hover:border-rose-mauve')}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{r.name}</p>
                          <p className={cn('text-sm', region === r.code ? 'text-blush-pink' : 'text-muted-foreground')}>Currency: {r.currencySymbol}</p>
                        </div>
                        {region === r.code && <Check className="h-5 w-5" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-medium text-muted-foreground">Select Language</h3>
                <div className="space-y-2">
                  {Object.entries(languageMeta).map(([code, meta]) => {
                    const lang = code as Language
                    const allowed = currentConfig.languages.includes(lang)
                    return (
                      <button
                        key={lang}
                        onClick={() => allowed && setLanguage(lang)}
                        disabled={!allowed}
                        className={cn('flex w-full items-center justify-between rounded-xl border px-4 py-2.5 text-sm transition-colors',
                          language === lang ? 'border-plum bg-plum text-warm-ivory' : allowed ? 'border-blush-pink bg-white hover:border-rose-mauve' : 'cursor-not-allowed border-blush-pink/50 bg-white/70 text-charcoal/35')}
                      >
                        <span className="flex items-center gap-3"><span>{meta.flag}</span><span>{meta.name}</span></span>
                        {language === lang && <Check className="h-4 w-4" />}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
