import { products } from '@/lib/data'

export function generateProductDescription(productSlug: string, tone: 'luxury' | 'clinical' = 'luxury') {
  const product = products.find((p) => p.slug === productSlug)
  if (!product) return 'Product not found.'
  if (tone === 'clinical') {
    return `${product.name}: Draft record for ${product.category}. Ingredient list and claims are pending verified supplier documentation.`
  }
  return `${product.name} is not ready for public marketing copy. Complete supplier review, INCI verification, and brand approval before publishing.`
}

export function generateTranslationDraft(text: string, locale: 'ar' | 'fr' | 'de') {
  return `[AI ${locale.toUpperCase()} Draft] ${text}`
}

export function improveMarketingCopy(text: string) {
  return `Rewrite neutrally after verification: ${text.replace(/\.$/, '')}. Avoid unverified claims and supplier wording.`
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
