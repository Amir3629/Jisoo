import { ProductImageModeSwitcher } from '@/components/product/product-image-mode-switcher'
import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { LocaleProvider } from '@/components/providers/locale-provider'
import { RegionProvider } from '@/components/providers/region-provider'
import { CartProvider } from '@/components/providers/cart-provider'
import { ScrollSnapController } from '@/components/layout/scroll-snap-controller'
import { RouteTransitionShell } from '@/components/layout/route-transition-shell'
import { defaultLocale, dictionaries, getDirection } from '@/lib/i18n'
import { absoluteUrl, getOrganizationJsonLd, getWebsiteJsonLd, seoKeywords, siteDescription, siteName, siteUrl } from '@/lib/seo'
import { JisooIntroSplashSafety } from '@/components/layout/jisoo-intro-splash-safety'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: 'JISOO Cosmetic | Korean Skincare & Korean Beauty Rituals',
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: seoKeywords,
  authors: [{ name: 'JISOO Cosmetic' }],
  creator: 'JISOO Cosmetic',
  publisher: 'JISOO Cosmetic',
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      en: absoluteUrl('/en'),
      ar: absoluteUrl('/ar'),
      fr: absoluteUrl('/fr'),
      de: absoluteUrl('/de'),
      ko: absoluteUrl('/ko'),
      tr: absoluteUrl('/tr'),
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
    title: 'JISOO Cosmetic | Korean Skincare & Korean Beauty Rituals',
    description: siteDescription,
    url: siteUrl,
    type: 'website',
    locale: 'en_US',
    siteName,
    images: [
      {
        url: absoluteUrl('/assets/hero/home-desktop.png'),
        width: 1200,
        height: 630,
        alt: 'JISOO Cosmetic Korean skincare ritual collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JISOO Cosmetic | Korean Skincare & Korean Beauty Rituals',
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
        <JisooIntroSplashSafety />
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
          <RouteTransitionShell>{children}</RouteTransitionShell>
            </CartProvider>
          </RegionProvider>
        </LocaleProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
