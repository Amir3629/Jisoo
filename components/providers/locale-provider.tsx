'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { defaultLocale, dictionaries, type Dictionary, type Locale } from '@/lib/i18n'

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

const fallbackValue: LocaleContextValue = {
  locale: defaultLocale,
  dictionary: dictionaries[defaultLocale],
  dir: 'ltr',
}

export function useLocale() {
  return useContext(LocaleContext) ?? fallbackValue
}
