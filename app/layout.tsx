import { ProductImageModeSwitcher } from '@/components/product/product-image-mode-switcher'
import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { LocaleProvider } from '@/components/providers/locale-provider'
import { RegionProvider } from '@/components/providers/region-provider'
import { CartProvider } from '@/components/providers/cart-provider'
import { ScrollSnapController } from '@/components/layout/scroll-snap-controller'
import { defaultLocale, dictionaries, getDirection } from '@/lib/i18n'
import { absoluteUrl, getOrganizationJsonLd, getWebsiteJsonLd, seoKeywords, siteDescription, siteName, siteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: 'JISOO | Korean Skincare & K-Beauty Rituals',
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: seoKeywords,
  authors: [{ name: 'JISOO' }],
  creator: 'JISOO',
  publisher: 'JISOO',
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
  alternates: {
    canonical: '/',
    languages: {
      en: '/en',
      ar: '/ar',
      fr: '/fr',
      de: '/de',
      ko: '/ko',
      tr: '/tr',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'JISOO | Korean Skincare & K-Beauty Rituals',
    description: siteDescription,
    url: '/',
    type: 'website',
    locale: 'en_US',
    siteName,
    images: [
      {
        url: absoluteUrl('/assets/hero/home-desktop.png'),
        width: 1200,
        height: 630,
        alt: 'JISOO Korean skincare ritual collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JISOO | Korean Skincare & K-Beauty Rituals',
    description: siteDescription,
    images: [absoluteUrl('/assets/hero/home-desktop.png')],
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
    <html lang="en" className="bg-warm-ivory">
      <body className="site-continuous-surface bg-background font-sans text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getOrganizationJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getWebsiteJsonLd()) }}
        />
        <LocaleProvider value={{ locale: defaultLocale, dictionary: dictionaries[defaultLocale], dir: getDirection(defaultLocale) }}>
          <RegionProvider initialLanguage={defaultLocale}>
            <CartProvider>
              <ScrollSnapController />
              <ProductImageModeSwitcher />
          {children}
            </CartProvider>
          </RegionProvider>
        </LocaleProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
