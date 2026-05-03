import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { LocaleProvider } from '@/components/providers/locale-provider'
import { RegionProvider } from '@/components/providers/region-provider'
import { CartProvider } from '@/components/providers/cart-provider'
import { ScrollSnapController } from '@/components/layout/scroll-snap-controller'
import { defaultLocale, dictionaries, getDirection } from '@/lib/i18n'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'JISOO | Korean Care Rituals',
  description: 'Discover curated Korean care rituals for hydration, anti-aging support, masks, oils, creams, and daily skin comfort.',
  keywords: ['Korean care', 'skin care', 'anti-aging', 'hydration', 'masks', 'oils', 'creams', 'JISOO'],
  authors: [{ name: 'JISOO' }],
  openGraph: {
    title: 'JISOO | Korean Care Rituals',
    description: 'Curated Korean care rituals for hydration, masks, oils, creams, and skin comfort.',
    type: 'website',
    locale: 'en_US',
    siteName: 'JISOO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JISOO | Korean Care Rituals',
    description: 'Curated Korean care rituals for hydration, masks, oils, creams, and skin comfort.',
  },
}

export const viewport: Viewport = {
  themeColor: '#d6a8ba',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} bg-warm-ivory`}>
      <body className="font-sans antialiased">
        <LocaleProvider value={{ locale: defaultLocale, dictionary: dictionaries[defaultLocale], dir: getDirection(defaultLocale) }}>
          <RegionProvider initialLanguage={defaultLocale}>
            <CartProvider>
              <ScrollSnapController />
              {children}
            </CartProvider>
          </RegionProvider>
        </LocaleProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
