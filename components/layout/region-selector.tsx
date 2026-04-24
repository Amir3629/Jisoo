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

const languageNames: Record<Language, string> = {
  en: 'English',
  ar: 'العربية',
  fr: 'Français',
  de: 'Deutsch',
  ko: '한국어',
  tr: 'Türkçe',
}

export function RegionSelector({ isOpen, onClose }: RegionSelectorProps) {
  const { region, language, config, setRegion, setLanguage } = useRegion()

  const handleRegionChange = (newRegion: Region) => {
    setRegion(newRegion)
  }

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-warm-ivory rounded-2xl shadow-elevated z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-blush-pink">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-plum" />
                <h2 className="text-lg font-serif font-semibold text-charcoal">
                  Region & Language
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-muted-foreground hover:text-charcoal transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Region Selection */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  Select Your Region
                </h3>
                <div className="space-y-2">
                  {Object.values(regionConfigs).map(regionConfig => (
                    <button
                      key={regionConfig.code}
                      onClick={() => handleRegionChange(regionConfig.code)}
                      className={cn(
                        'w-full flex items-center justify-between p-4 rounded-xl transition-all',
                        region === regionConfig.code
                          ? 'bg-plum text-warm-ivory'
                          : 'bg-white border border-blush-pink hover:border-rose-mauve'
                      )}
                    >
                      <div className="text-left">
                        <p className="font-medium">{regionConfig.name}</p>
                        <p
                          className={cn(
                            'text-sm',
                            region === regionConfig.code
                              ? 'text-blush-pink'
                              : 'text-muted-foreground'
                          )}
                        >
                          Currency: {regionConfig.currencySymbol}
                        </p>
                      </div>
                      {region === regionConfig.code && (
                        <Check className="w-5 h-5" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Language Selection */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  Select Language
                </h3>
                <div className="flex flex-wrap gap-2">
                  {config.languages.map(lang => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={cn(
                        'px-4 py-2 rounded-full text-sm font-medium transition-all',
                        language === lang
                          ? 'bg-plum text-warm-ivory'
                          : 'bg-white border border-blush-pink text-charcoal hover:border-rose-mauve'
                      )}
                    >
                      {languageNames[lang]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 pt-0">
              <button
                onClick={onClose}
                className={cn(
                  'w-full py-4 rounded-full font-medium',
                  'bg-plum text-warm-ivory',
                  'hover:bg-plum/90 transition-colors'
                )}
              >
                Confirm Selection
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
