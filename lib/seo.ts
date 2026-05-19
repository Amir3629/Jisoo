import { products, categories } from './data'
import { locales } from './i18n'

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://jisoo.com').replace(/\/$/, '')

export const siteName = 'JISOO'

export const siteDescription =
  'Shop JISOO Korean skincare rituals, K-beauty cleansers, vitamin C serums, toner pads, sunscreen, creams, masks, and daily care formulas.'

export const seoKeywords = [
  'JISOO',
  'JISOO Korean skincare',
  'Korean skincare',
  'K-beauty',
  'K beauty products',
  'Korean beauty ritual',
  'glass skin routine',
  'vitamin C serum',
  'Korean sunscreen',
  'Korean cleanser',
  'toner pads',
  'barrier cream',
  'moisturizer',
  'sheet mask',
  'Dubai Korean skincare',
  'Europe Korean skincare',
  'Canada Korean skincare',
]

export function absoluteUrl(path = '/') {
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`
}

export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: siteUrl,
    logo: absoluteUrl('/assets/LOGO/image.png'),
    sameAs: [],
  }
}

export function getWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function getProductJsonLd(product: (typeof products)[number]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    image: product.images.map((image) => absoluteUrl(image.src)),
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    sku: product.id,
    category: product.category,
    offers: {
      '@type': 'Offer',
      url: absoluteUrl(`/product/${product.slug}`),
      priceCurrency: product.currency,
      price: product.price > 0 ? product.price.toFixed(2) : undefined,
      availability: product.price > 0 ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
      itemCondition: 'https://schema.org/NewCondition',
    },
  }
}

export function getSitemapPaths() {
  const staticPaths = [
    '',
    '/shop',
    '/shop/new-arrivals',
    '/shop/best-sellers',
    '/shop/sets',
    '/new',
    '/best-sellers',
    '/our-story',
    '/about',
    '/tips',
    '/help',
  ]

  const categoryPaths = categories.map((category) => `/shop/${category.slug}`)
  const productPaths = products.map((product) => `/product/${product.slug}`)
  const localizedStaticPaths = locales.flatMap((locale) => staticPaths.map((path) => `/${locale}${path}`))
  const localizedProductPaths = locales.flatMap((locale) => productPaths.map((path) => `/${locale}${path}`))
  const localizedCategoryPaths = locales.flatMap((locale) => categoryPaths.map((path) => `/${locale}${path}`))

  return [...staticPaths, ...categoryPaths, ...productPaths, ...localizedStaticPaths, ...localizedCategoryPaths, ...localizedProductPaths]
}
