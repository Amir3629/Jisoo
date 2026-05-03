'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { locales, localizeHref, type Locale } from '@/lib/i18n'
import { useLocale } from '@/components/providers/locale-provider'
import { cn } from '@/lib/utils'

const languageMeta: Record<Locale, { name: string; flag: string }> = {
  en: { name: 'English', flag: '🇬🇧' },
  fr: { name: 'Français', flag: '🇫🇷' },
  de: { name: 'Deutsch', flag: '🇩🇪' },
  tr: { name: 'Türkçe', flag: '🇹🇷' },
  ar: { name: 'العربية', flag: '🇦🇪' },
  ko: { name: '한국어', flag: '🇰🇷' },
}

const orderedLocales: Locale[] = ['en', 'fr', 'de', 'tr', 'ar', 'ko']

export function LocaleSwitcher({ buttonClassName }: { buttonClassName?: string }) {
  const pathname = usePathname()
  const { locale } = useLocale()
  const [open, setOpen] = useState(false)
  const [isHeroHome, setIsHeroHome] = useState(false)
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

  useEffect(() => {
    const onScroll = () => setIsHeroHome(normalizedPath === '/' && window.scrollY < 14)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [normalizedPath])

  return (
    <div ref={wrapRef} className="relative">
      <button type="button" aria-haspopup="menu" aria-expanded={open} aria-label={`Current language ${languageMeta[locale].name}`} onClick={() => setOpen((prev) => !prev)} className={cn('inline-flex h-10 w-10 items-center justify-center text-charcoal/80 transition hover:text-charcoal hover:opacity-80', buttonClassName)}>
        <span aria-hidden className="grid h-5 w-5 place-items-center overflow-hidden rounded-full text-[1rem] leading-none">{languageMeta[locale].flag}</span>
      </button>
      {open && (
        <div
          role="menu"
          className={cn(
            'absolute right-0 z-[90] mt-2 w-52 rounded-2xl border p-2 text-charcoal',
            isHeroHome
              ? 'border-white/24 bg-transparent shadow-[0_18px_44px_rgba(44,37,40,0.14)] backdrop-blur-2xl'
              : 'border-[#cfae83]/28 bg-warm-ivory/72 shadow-editorial backdrop-blur-xl'
          )}
        >
          {orderedLocales.map((l) => <Link key={l} role="menuitem" href={localizeHref(normalizedPath, l)} className={cn('flex items-center rounded-xl px-3 py-2 text-sm transition-colors hover:bg-[#d5bc9b]/45 hover:text-charcoal', locale === l && 'bg-[#d5bc9b]/32 font-medium')}><span>{languageMeta[l].name}</span></Link>)}
        </div>
      )}
    </div>
  )
}
