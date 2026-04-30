'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { locales, localizeHref, type Locale } from '@/lib/i18n'
import { useLocale } from '@/components/providers/locale-provider'
import { cn } from '@/lib/utils'

const languageMeta: Record<Locale, { name: string; flag: string }> = {
  en: { name: 'English', flag: '🇬🇧' },
  ar: { name: 'Arabic', flag: '🇦🇪' },
  fr: { name: 'French', flag: '🇫🇷' },
  de: { name: 'German', flag: '🇩🇪' },
  ko: { name: 'Korean', flag: '🇰🇷' },
  tr: { name: 'Turkish', flag: '🇹🇷' },
}

export function LocaleSwitcher() {
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
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Current language ${languageMeta[locale].name}`}
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-rose-mauve/25 bg-white/80 text-base shadow-sm transition-colors hover:border-rose-mauve/50"
      >
        <span aria-hidden>{languageMeta[locale].flag}</span>
      </button>
      <ChevronDown className={cn('pointer-events-none absolute -bottom-1 right-0 h-3 w-3 text-charcoal/70 transition-transform', open && 'rotate-180')} />

      {open && (
        <div role="menu" className="absolute right-0 z-[90] mt-2 w-52 rounded-2xl border border-rose-mauve/20 bg-white/95 p-2 shadow-editorial backdrop-blur-sm">
          {locales.map((l) => (
            <Link
              key={l}
              role="menuitem"
              href={localizeHref(normalizedPath, l)}
              className={cn('flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors hover:bg-rose-mauve/10', locale === l && 'bg-rose-mauve/15 font-medium')}
            >
              <span aria-hidden>{languageMeta[l].flag}</span>
              <span>{languageMeta[l].name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
