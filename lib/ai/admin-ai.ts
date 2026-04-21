import { products } from '@/lib/data'

export function generateProductDescription(productSlug: string, tone: 'luxury' | 'clinical' = 'luxury') {
  const product = products.find((p) => p.slug === productSlug)
  if (!product) return 'Product not found.'
  if (tone === 'clinical') {
    return `${product.name}: Formulated for ${product.concerns.join(', ')} with key actives including ${product.ingredients.slice(0, 3).map((i) => i.name).join(', ')}.`
  }
  return `${product.name} delivers a couture K-beauty experience with ${product.benefits.slice(0, 2).map((b) => b.title.toLowerCase()).join(' and ')}—crafted to elevate daily ritual into visible radiance.`
}

export function generateTranslationDraft(text: string, locale: 'ar' | 'fr' | 'de') {
  return `[AI ${locale.toUpperCase()} Draft] ${text}`
}

export function improveMarketingCopy(text: string) {
  return `Discover a more elevated expression: ${text.replace(/\.$/, '')}, refined for a premium luxury beauty voice.`
}

export function suggestTagsAndCategory(seed: string) {
  const lower = seed.toLowerCase()
  const tags = ['k-beauty', 'premium', 'ritual']
  if (lower.includes('sun')) tags.push('suncare')
  if (lower.includes('hydrat')) tags.push('hydration')
  if (lower.includes('bright')) tags.push('brightening')
  const category = lower.includes('clean') ? 'cleansers' : lower.includes('sun') ? 'sun-care' : 'serums'
  return { tags, category }
}
