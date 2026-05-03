'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Globe } from 'lucide-react'
import { useRegion } from '@/components/providers/region-provider'
import { regionConfigs } from '@/lib/data'
import type { Region, Language } from '@/lib/types'
import { cn } from '@/lib/utils'

interface RegionSelectorProps { isOpen: boolean; onClose: () => void }

const languageMeta: Record<Language, { name: string; flag: string }> = {
  en: { name: 'English', flag: '🇬🇧' }, ar: { name: 'Arabic', flag: '🇦🇪' }, fr: { name: 'French', flag: '🇫🇷' }, de: { name: 'German', flag: '🇩🇪' }, ko: { name: 'Korean', flag: '🇰🇷' }, tr: { name: 'Turkish', flag: '🇹🇷' },
}

export function RegionSelector({ isOpen, onClose }: RegionSelectorProps) {
  const { region, language, setRegion, setLanguage } = useRegion()
  const currentConfig = regionConfigs[region]

  return <AnimatePresence>{isOpen && <>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-charcoal/45 backdrop-blur-sm z-50" onClick={onClose} />
    <motion.div initial={{ opacity: 0, y: 12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.97 }} className="fixed left-1/2 top-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-[#cfae83]/24 bg-warm-ivory/76 shadow-elevated backdrop-blur-2xl">
      <div className="flex items-center justify-between border-b border-blush-pink/80 p-5">
        <div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-full bg-rose-mauve/10"><Globe className="h-4 w-4 text-plum" /></span><h2 className="text-lg font-serif text-charcoal">Region & Language</h2></div>
        <button onClick={onClose} className="p-1.5 text-muted-foreground hover:text-charcoal"><X className="h-5 w-5" /></button>
      </div>
      <div className="space-y-5 p-5">
        <div>
          <h3 className="mb-2 text-xs uppercase tracking-[0.14em] text-charcoal/60">Region</h3>
          <div className="space-y-2">{Object.values(regionConfigs).map((r) => <button key={r.code} onClick={() => setRegion(r.code as Region)} className={cn('w-full rounded-xl border px-4 py-3 text-left transition-all', region === r.code ? 'border-plum bg-plum text-warm-ivory' : 'border-blush-pink bg-white hover:border-rose-mauve')}><div className="flex items-center justify-between"><div><p className="font-medium">{r.name}</p><p className={cn('text-xs', region === r.code ? 'text-blush-pink' : 'text-charcoal/60')}>{r.currencySymbol}</p></div>{region === r.code && <Check className="h-4 w-4" />}</div></button>)}</div>
        </div>
        <div>
          <h3 className="mb-2 text-xs uppercase tracking-[0.14em] text-charcoal/60">Language</h3>
          <div className="space-y-2">{Object.entries(languageMeta).map(([code, meta]) => { const lang = code as Language; const allowed = currentConfig.languages.includes(lang); return <button key={lang} onClick={() => allowed && setLanguage(lang)} disabled={!allowed} className={cn('flex w-full items-center justify-between rounded-xl border px-4 py-2.5 text-sm transition-colors', language === lang ? 'border-plum bg-plum text-warm-ivory' : allowed ? 'border-blush-pink bg-white hover:border-rose-mauve' : 'cursor-not-allowed border-blush-pink/40 bg-white/65 text-charcoal/35')}><span className="flex items-center gap-3"><span>{meta.flag}</span><span>{meta.name}</span></span>{language === lang && <Check className="h-4 w-4" />}</button> })}</div>
        </div>
      </div>
    </motion.div>
  </>}</AnimatePresence>
}
