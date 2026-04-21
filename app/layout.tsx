import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { LocaleProvider } from '@/components/providers/locale-provider'
import { RegionProvider } from '@/components/providers/region-provider'
import { CartProvider } from '@/components/providers/cart-provider'
import { defaultLocale, dictionaries, getDirection } from '@/lib/i18n'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'JISOO | Premium Korean Beauty',
  description: 'Discover curated Korean beauty essentials. Premium skincare and makeup from Seoul to the world. Experience the art of K-beauty with JISOO.',
  keywords: ['Korean beauty', 'K-beauty', 'skincare', 'makeup', 'JISOO', 'luxury beauty', 'Korean skincare'],
  authors: [{ name: 'JISOO Beauty' }],
  openGraph: {
    title: 'JISOO | Premium Korean Beauty',
    description: 'Discover curated Korean beauty essentials from Seoul to the world.',
    type: 'website',
    locale: 'en_US',
    siteName: 'JISOO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JISOO | Premium Korean Beauty',
    description: 'Discover curated Korean beauty essentials from Seoul to the world.',
  },
}

export const viewport: Viewport = {
  themeColor: '#4B2247',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} bg-warm-ivory`}>
      <body className="font-sans antialiased">
        <LocaleProvider value={{ locale: defaultLocale, dictionary: dictionaries[defaultLocale], dir: getDirection(defaultLocale) }}>
          <RegionProvider initialLanguage={defaultLocale}>
            <CartProvider>{children}</CartProvider>
          </RegionProvider>
        </LocaleProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
