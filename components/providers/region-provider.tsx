
'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Region, Language, RegionConfig } from '@/lib/types'
import { regionConfigs, formatPrice as formatBasePrice } from '@/lib/data'

interface RegionContextType {
  region: Region
  language: Language
  config: RegionConfig
  currency: string
  currencySymbol: string
  setRegion: (region: Region) => void
  setLanguage: (language: Language) => void
  formatPrice: (amount: number) => string
  isRTL: boolean
}

const RegionContext = createContext<RegionContextType | undefined>(undefined)
const STORAGE_KEY = 'jisoo-region-language-preference'

function detectPreferredRegionLanguage(initialLanguage: Language) {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
  const locales = navigator.languages?.length ? navigator.languages : [navigator.language]
  const lowerLocales = locales.map((l) => l.toLowerCase())

  if (tz.includes('Istanbul') || lowerLocales.some((l) => l.includes('-tr') || l.startsWith('tr'))) {
    return { region: 'TR' as Region, language: 'tr' as Language }
  }

  if (tz.includes('Dubai') || lowerLocales.some((l) => l.includes('-ae') || l.startsWith('ar'))) {
    return { region: 'UAE' as Region, language: lowerLocales.some((l) => l.startsWith('ar')) ? 'ar' as Language : 'en' as Language }
  }

  if (tz.includes('Toronto') || tz.includes('Vancouver') || lowerLocales.some((l) => l.includes('-ca'))) {
    return { region: 'CA' as Region, language: lowerLocales.some((l) => l.startsWith('fr')) ? 'fr' as Language : 'en' as Language }
  }

  if (tz.includes('Berlin') || lowerLocales.some((l) => l.startsWith('de'))) {
    return { region: 'EU' as Region, language: 'de' as Language }
  }

  if (tz.includes('Paris') || lowerLocales.some((l) => l.startsWith('fr'))) {
    return { region: 'EU' as Region, language: 'fr' as Language }
  }

  return { region: 'EU' as Region, language: initialLanguage }
}

export function RegionProvider({ children, initialLanguage = 'en' }: { children: ReactNode; initialLanguage?: Language }) {
  const [region, setRegionState] = useState<Region>('EU')
  const [language, setLanguageState] = useState<Language>(initialLanguage)

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as { region: Region; language: Language }
        const savedConfig = regionConfigs[parsed.region]
        if (savedConfig) {
          setRegionState(parsed.region)
          setLanguageState(savedConfig.languages.includes(parsed.language) ? parsed.language : savedConfig.defaultLanguage)
          return
        }
      } catch {}
    }

    const detected = detectPreferredRegionLanguage(initialLanguage)
    const detectedConfig = regionConfigs[detected.region]
    setRegionState(detected.region)
    setLanguageState(detectedConfig.languages.includes(detected.language) ? detected.language : detectedConfig.defaultLanguage)
  }, [initialLanguage])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ region, language }))
  }, [region, language])

  const config = useMemo(() => regionConfigs[region], [region])

  const setRegion = (newRegion: Region) => {
    setRegionState(newRegion)
    const newConfig = regionConfigs[newRegion]
    setLanguageState((prev) => (newConfig.languages.includes(prev) ? prev : newConfig.defaultLanguage))
  }

  const setLanguage = (newLanguage: Language) => {
    if (config.languages.includes(newLanguage)) {
      setLanguageState(newLanguage)
    }
  }

  const isRTL = language === 'ar'
  const formatPrice = (amount: number) => formatBasePrice(amount, config.currency)

  return (
    <RegionContext.Provider value={{ region, language, config, currency: config.currency, currencySymbol: config.currencySymbol, setRegion, setLanguage, formatPrice, isRTL }}>
      <div dir={isRTL ? 'rtl' : 'ltr'}>{children}</div>
    </RegionContext.Provider>
  )
}

export function useRegion() {
  const context = useContext(RegionContext)
  if (!context) throw new Error('useRegion must be used within a RegionProvider')
  return context
}
