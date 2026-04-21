'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { locales, localizeHref, type Locale } from '@/lib/i18n'
import { useLocale } from '@/components/providers/locale-provider'
import { cn } from '@/lib/utils'

export function LocaleSwitcher() {
  const pathname = usePathname()
  const { locale } = useLocale()

  const normalizedPath = (() => {
    const parts = pathname.split('/')
    if (locales.includes(parts[1] as Locale)) {
      return `/${parts.slice(2).join('/')}`.replace(/\/$/, '') || '/'
    }
    return pathname
  })()

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/20 px-2 py-1 text-[11px] uppercase tracking-[0.18em]">
      {locales.map((l) => (
        <Link
          key={l}
          href={localizeHref(normalizedPath, l)}
          className={cn('rounded-full px-2 py-1 transition-colors', locale === l ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white')}
        >
          {l}
        </Link>
      ))}
    </div>
  )
}
