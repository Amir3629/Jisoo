import { CartProvider } from '@/components/providers/cart-provider'
import { RegionProvider } from '@/components/providers/region-provider'
import { LocaleProvider } from '@/components/providers/locale-provider'
import { LocaleHtmlSync } from '@/components/i18n/locale-html-sync'
import { assertLocale, getDictionary, getDirection } from '@/lib/i18n'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const locale = assertLocale(lang)
  const dictionary = await getDictionary(locale)
  const dir = getDirection(locale)

  return (
    <LocaleProvider value={{ locale, dictionary, dir }}>
      <LocaleHtmlSync />
      <RegionProvider initialLanguage={locale}>
        <CartProvider>{children}</CartProvider>
      </RegionProvider>
    </LocaleProvider>
  )
}
