'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
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

export function RegionProvider({ children }: { children: ReactNode }) {
  const [region, setRegionState] = useState<Region>('EU')
  const [language, setLanguageState] = useState<Language>('en')

  const config = regionConfigs[region]

  const setRegion = (newRegion: Region) => {
    setRegionState(newRegion)
    const newConfig = regionConfigs[newRegion]
    if (!newConfig.languages.includes(language)) {
      setLanguageState(newConfig.defaultLanguage)
    }
  }

  const setLanguage = (newLanguage: Language) => {
    if (config.languages.includes(newLanguage)) {
      setLanguageState(newLanguage)
    }
  }

  const isRTL = language === 'ar'
  const formatPrice = (amount: number) => formatBasePrice(amount, config.currency)

  return (
    <RegionContext.Provider
      value={{
        region,
        language,
        config,
        currency: config.currency,
        currencySymbol: config.currencySymbol,
        setRegion,
        setLanguage,
        formatPrice,
        isRTL,
      }}
    >
      <div dir={isRTL ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </RegionContext.Provider>
  )
}

export function useRegion() {
  const context = useContext(RegionContext)
  if (!context) {
    throw new Error('useRegion must be used within a RegionProvider')
  }
  return context
}
