import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { defaultLocale, locales } from '@/lib/i18n'

const PUBLIC_FILE = /\.(.*)$/

function getPreferredLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language') ?? ''

  const browserLocales = acceptLanguage
    .split(',')
    .map((part) => part.trim().split(';')[0]?.toLowerCase())
    .filter(Boolean)

  for (const browserLocale of browserLocales) {
    const baseLocale = browserLocale.split('-')[0]

    if (locales.includes(browserLocale as (typeof locales)[number])) {
      return browserLocale
    }

    if (locales.includes(baseLocale as (typeof locales)[number])) {
      return baseLocale
    }
  }

  return defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/_next') ||
    pathname.includes('/api/') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next()
  }

  const hasLocale = locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`))

  if (!hasLocale) {
    const url = request.nextUrl.clone()
    const preferredLocale = getPreferredLocale(request)
    url.pathname = `/${preferredLocale}${pathname === '/' ? '' : pathname}`
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
