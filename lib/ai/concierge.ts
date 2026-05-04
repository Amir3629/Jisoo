import { products } from '@/lib/data'
import type { Region } from '@/lib/types'

export interface ConciergeMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export interface ConciergeReply {
  answer: string
  productSlugs: string[]
  suggestions: string[]
  restricted: boolean
}

const domainKeywords = [
  'jisoo', 'product', 'serum', 'cream', 'cleanser', 'skincare', 'makeup', 'ingredient', 'shipping', 'return', 'order', 'policy', 'routine', 'skin', 'beauty', 'faq', 'delivery',
]

const policyByRegion: Record<Region, { shipping: string; returns: string; support: string }> = {
  UAE: {
    shipping: 'UAE express shipping typically arrives within 2-4 business days for in-stock items.',
    returns: 'Returns in UAE are accepted for eligible unopened items within 14 days of delivery.',
    support: 'For UAE order support, our concierge can help with tracking and exchange eligibility.',
  },
  EU: {
    shipping: 'EU deliveries typically arrive in 3-6 business days depending on destination country.',
    returns: 'EU returns are accepted for eligible unopened items within 14 days of delivery.',
    support: 'For EU orders, we can support order status, cancellation window checks, and returns guidance.',
  },
  CA: {
    shipping: 'Canada shipping is generally 4-8 business days depending on province and customs handling.',
    returns: 'Canada returns for eligible unopened items are supported within 14 days; compliance cases are retained longer.',
    support: 'For Canada, we also log complaint and safety inquiries for compliance workflows when required.',
  },
  TR: {
    shipping: 'Turkey deliveries generally arrive within 3-7 business days depending on destination.',
    returns: 'Turkey returns are supported for eligible unopened items within 14 days of delivery.',
    support: 'For Turkey, concierge support can help with tracking, return guidance, and follow-up.',
  },
}

const fallbackSuggestions = [
  'Recommend a routine for dull skin',
  'Which products are available in my region?',
  'Show shipping and return policy',
]

function isDomainQuestion(input: string): boolean {
  const lower = input.toLowerCase()
  return domainKeywords.some(keyword => lower.includes(keyword))
}

function getRegionAvailabilitySummary(region: Region) {
  const visible = products.filter(product => product.regionAvailability[region] !== 'hidden')
  const buyable = visible.filter(product => product.regionAvailability[region] === 'visible_and_buyable')
  return { visible, buyable }
}

function findProductsByConcern(input: string, region: Region) {
  const lower = input.toLowerCase()
  const concernTerms: Record<string, string[]> = {
    hydration: ['hydration', 'dry', 'dehydrated'],
    glow: ['glow', 'dull', 'radiance', 'bright'],
    sensitive: ['sensitive', 'calm', 'soothe', 'barrier'],
    antiaging: ['aging', 'fine line', 'wrinkle', 'firm'],
    acne: ['acne', 'blemish', 'breakout', 'pore'],
  }

  const matched = Object.entries(concernTerms).find(([, terms]) => terms.some(term => lower.includes(term)))
  if (!matched) return []

  return products
    .filter(product => product.regionAvailability[region] !== 'hidden')
    .filter(product =>
      product.tags.some(tag => tag.toLowerCase().includes(matched[0] === 'antiaging' ? 'anti' : matched[0])) ||
      product.concerns.some(concern => concern.toLowerCase().includes(matched[0] === 'antiaging' ? 'fine' : matched[0]))
    )
    .slice(0, 3)
}

function buildProductAnswer(input: string, region: Region): ConciergeReply | null {
  const lower = input.toLowerCase()
  const product = products.find(p => lower.includes(p.slug) || lower.includes(p.name.toLowerCase()))

  if (!product) return null

  const availability = product.regionAvailability[region] ?? 'visible_but_not_buyable'
  const ingredientPreview = product.ingredients.slice(0, 3).join(', ')

  return {
    answer: `${product.name} is a draft JISOO product record for ${product.category}. Ingredient review: ${ingredientPreview}. In ${region}, current availability is: ${availability.replaceAll('_', ' ')}. Usage: ${product.usageInstructions}`,
    productSlugs: [product.slug],
    suggestions: ['Show an alternative in my region', 'How should I layer this in a routine?'],
    restricted: false,
  }
}

export function generateConciergeReply({
  query,
  region,
  history,
}: {
  query: string
  region: Region
  history: ConciergeMessage[]
}): ConciergeReply {
  const input = query.trim()
  const lower = input.toLowerCase()

  if (!isDomainQuestion(lower)) {
    return {
      answer: 'I’m your JISOO Beauty Concierge, so I can only help with JISOO products, skincare routines, ingredients, shipping, returns, and order support. If you’d like, I can recommend a routine for your skin concern.',
      productSlugs: [],
      suggestions: fallbackSuggestions,
      restricted: true,
    }
  }

  const directProduct = buildProductAnswer(input, region)
  if (directProduct) {
    return directProduct
  }

  if (lower.includes('shipping') || lower.includes('delivery')) {
    return {
      answer: policyByRegion[region].shipping,
      productSlugs: [],
      suggestions: ['What is the return policy?', 'I need help with my order'],
      restricted: false,
    }
  }

  if (lower.includes('return') || lower.includes('refund') || lower.includes('exchange')) {
    return {
      answer: policyByRegion[region].returns,
      productSlugs: [],
      suggestions: ['How long does shipping take?', 'How can I contact support?'],
      restricted: false,
    }
  }

  if (lower.includes('order') || lower.includes('track') || lower.includes('support')) {
    return {
      answer: `${policyByRegion[region].support} You can also check your order history in the Account > Orders area.`,
      productSlugs: [],
      suggestions: ['Show shipping policy', 'Suggest products for sensitive skin'],
      restricted: false,
    }
  }

  if (lower.includes('ingredient') || lower.includes('inci')) {
    const top = products
      .filter(product => product.regionAvailability[region] !== 'hidden')
      .slice(0, 2)
      .map(product => `${product.name}: ${product.ingredients.slice(0, 2).join(', ')}`)
      .join(' · ')

    return {
      answer: `Here is the current ingredient review status: ${top}. Public ingredient copy should be completed only after verified supplier documentation and internal review.`,
      productSlugs: products.slice(0, 2).map(product => product.slug),
      suggestions: ['Is vitamin C good for sensitive skin?', 'Show me a gentle daily routine'],
      restricted: false,
    }
  }

  const concernPicks = findProductsByConcern(lower, region)
  if (concernPicks.length > 0) {
    return {
      answer: `Based on your concern, I suggest ${concernPicks.map(product => product.name).join(', ')}. I selected formulas that are visible in ${region} and aligned with your skincare goal.`,
      productSlugs: concernPicks.map(product => product.slug),
      suggestions: ['Build a morning routine', 'Which one is best for sensitive skin?'],
      restricted: false,
    }
  }

  const { visible, buyable } = getRegionAvailabilitySummary(region)
  const context = history.length > 4 ? 'Based on our conversation, ' : ''

  return {
    answer: `${context}I can guide you through product selection, ingredients, usage instructions, shipping/returns, and order support. In ${region}, ${buyable.length} products are currently buyable and ${visible.length} are visible in catalog.`,
    productSlugs: buyable.slice(0, 3).map(product => product.slug),
    suggestions: fallbackSuggestions,
    restricted: false,
  }
}
