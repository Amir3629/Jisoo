'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { Dictionary, Locale } from '@/lib/i18n'

interface LocaleContextValue {
  locale: Locale
  dictionary: Dictionary
  dir: 'ltr' | 'rtl'
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({
  children,
  value,
}: {
  children: ReactNode
  value: LocaleContextValue
}) {
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const value = useContext(LocaleContext)
  if (!value) throw new Error('useLocale must be used within LocaleProvider')
  return value
}
