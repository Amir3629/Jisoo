'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { locales, localizeHref, type Locale } from '@/lib/i18n'
import { useLocale } from '@/components/providers/locale-provider'
import { cn } from '@/lib/utils'

const languageMeta: Record<Locale, { name: string; flag: string }> = {
  en: { name: 'English', flag: '🇬🇧' },
  ar: { name: 'العربية', flag: '🇦🇪' },
  fr: { name: 'Français', flag: '🇫🇷' },
  de: { name: 'Deutsch', flag: '🇩🇪' },
  ko: { name: '한국어', flag: '🇰🇷' },
  tr: { name: 'Türkçe', flag: '🇹🇷' },
}

export function LocaleSwitcher({ buttonClassName }: { buttonClassName?: string }) {
  const pathname = usePathname()
  const { locale } = useLocale()
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onOutside = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [])

  const normalizedPath = (() => {
    const parts = pathname.split('/')
    if (locales.includes(parts[1] as Locale)) return `/${parts.slice(2).join('/')}`.replace(/\/$/, '') || '/'
    return pathname
  })()

  return (
    <div ref={wrapRef} className="relative">
      <button type="button" aria-haspopup="menu" aria-expanded={open} aria-label={`Current language ${languageMeta[locale].name}`} onClick={() => setOpen((prev) => !prev)} className={cn('inline-flex h-10 w-10 items-center justify-center text-charcoal/80 transition hover:text-charcoal hover:opacity-80', buttonClassName)}>
        <span aria-hidden className="grid h-5 w-5 place-items-center overflow-hidden rounded-full text-[1rem] leading-none">{languageMeta[locale].flag}</span>
      </button>
      {open && (
        <div role="menu" className="absolute right-0 z-[90] mt-2 w-52 rounded-2xl border border-rose-mauve/20 bg-white/95 p-2 shadow-editorial backdrop-blur-sm">
          {locales.map((l) => <Link key={l} role="menuitem" href={localizeHref(normalizedPath, l)} className={cn('flex items-center rounded-xl px-3 py-2 text-sm transition-colors hover:bg-rose-mauve/10', locale === l && 'bg-rose-mauve/15 font-medium')}><span>{languageMeta[l].name}</span></Link>)}
        </div>
      )}
    </div>
  )
}
