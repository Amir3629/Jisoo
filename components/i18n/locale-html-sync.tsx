'use client'

import { useEffect } from 'react'
import { useLocale } from '@/components/providers/locale-provider'

export function LocaleHtmlSync() {
  const { locale, dir } = useLocale()

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = dir
  }, [locale, dir])

  return null
}
