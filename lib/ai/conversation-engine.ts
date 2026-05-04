import { products } from '@/lib/data'
import type { Region } from '@/lib/types'
import { enforceJisooDomain } from '@/lib/ai/domain-lock'

export type ConciergeRole = 'user' | 'assistant'

export interface ConciergeTurn {
  id: string
  role: ConciergeRole
  content: string
}

export interface ConciergeAction {
  id: string
  type: 'product' | 'policy' | 'support' | 'navigation'
  title: string
  description: string
  href: string
}

export interface ConciergeResponse {
  answer: string
  actions: ConciergeAction[]
  suggestions: string[]
  restricted: boolean
  shouldAskFollowUp: boolean
}

interface SessionContext {
  concern?: string
  requestedRegion?: Region
  intent?: 'recommendation' | 'policy' | 'order_support' | 'ingredient' | 'comparison' | 'general'
}

const concernLexicon: Record<string, string[]> = {
  hydration: ['dry', 'dehydrated', 'hydration'],
  sensitivity: ['sensitive', 'redness', 'barrier', 'irritation'],
  acne: ['acne', 'breakout', 'blemish', 'pores'],
  glow: ['glow', 'dull', 'bright', 'radiance', 'tone'],
  aging: ['aging', 'fine line', 'wrinkle', 'firm'],
}

const shippingPolicies: Record<Region, string> = {
  UAE: 'For UAE, delivery is typically 2-4 business days for in-stock items.',
  EU: 'For EU destinations, delivery is typically 3-6 business days depending on country.',
  CA: 'For Canada, delivery typically ranges from 4-8 business days with region-specific compliance handling where required.',
  TR: 'For Turkey destinations, delivery is typically 3-7 business days based on city and customs.',
}

const returnPolicies: Record<Region, string> = {
  UAE: 'UAE returns are generally supported for eligible unopened items within 14 days of delivery.',
  EU: 'EU returns are generally supported for eligible unopened items within 14 days of delivery.',
  CA: 'Canada returns are supported for eligible unopened items within 14 days, with additional compliance retention for safety cases.',
  TR: 'Turkey returns are supported for eligible unopened items within 14 days of delivery.',
}

function inferConcern(text: string): string | undefined {
  const lower = text.toLowerCase()
  return Object.entries(concernLexicon).find(([, words]) => words.some(word => lower.includes(word)))?.[0]
}

function extractContext(history: ConciergeTurn[]): SessionContext {
  const userTurns = history.filter(turn => turn.role === 'user').map(turn => turn.content).join(' ')
  const lower = userTurns.toLowerCase()

  const intent: SessionContext['intent'] =
    lower.includes('ship') || lower.includes('return') || lower.includes('refund') ? 'policy'
      : lower.includes('order') || lower.includes('track') || lower.includes('support') ? 'order_support'
        : lower.includes('ingredient') ? 'ingredient'
          : lower.includes('compare') ? 'comparison'
            : lower.includes('recommend') || lower.includes('routine') ? 'recommendation'
              : 'general'

  return {
    concern: inferConcern(userTurns),
    intent,
  }
}

function productActions(region: Region, concern?: string): ConciergeAction[] {
  const filtered = products
    .filter(product => product.regionAvailability[region] !== 'hidden')
    .filter(product => !concern || product.concerns.some(item => item.toLowerCase().includes(concern)))
    .slice(0, 3)

  return filtered.map(product => ({
    id: `product-${product.id}`,
    type: 'product',
    title: product.name,
    description: `${product.shortDescription} · ${(product.regionAvailability[region] ?? 'visible_but_not_buyable').replaceAll('_', ' ')}`,
    href: `/product/${product.slug}`,
  }))
}

function policyActions(): ConciergeAction[] {
  return [
    { id: 'shipping', type: 'policy', title: 'Shipping information', description: 'Region-specific shipping windows and delivery guidance.', href: '/help/shipping' },
    { id: 'returns', type: 'policy', title: 'Returns & exchanges', description: 'Return eligibility, process, and timeline support.', href: '/help/returns' },
    { id: 'faq', type: 'support', title: 'Help Center FAQ', description: 'Answers for common order and policy questions.', href: '/help/faq' },
  ]
}

export function generateConciergeTurn({ query, region, history }: { query: string; region: Region; history: ConciergeTurn[] }): ConciergeResponse {
  const trimmed = query.trim()
  const context = extractContext([...history, { id: 'pending', role: 'user', content: trimmed }])

  const domainLock = enforceJisooDomain(trimmed)

  if (!domainLock.allowed) {
    return {
      answer: domainLock.redirectMessage,
      actions: [
        { id: 'support', type: 'support', title: 'Contact JISOO Concierge', description: 'Talk with our team for product or order assistance.', href: '/help/contact' },
        { id: 'shop', type: 'navigation', title: 'Browse JISOO collection', description: 'Explore all formulas available by your market.', href: '/shop' },
      ],
      suggestions: ['Recommend a routine for dehydrated skin', 'Show shipping and return policy'],
      restricted: true,
      shouldAskFollowUp: true,
    }
  }

  if (context.intent === 'policy') {
    return {
      answer: `${shippingPolicies[region]} ${returnPolicies[region]} If you want, I can also guide you to the exact help pages now.`,
      actions: policyActions(),
      suggestions: ['Help with an order issue', 'What products are available in my region?'],
      restricted: false,
      shouldAskFollowUp: false,
    }
  }

  if (context.intent === 'order_support') {
    return {
      answer:
        'For order support, I can guide tracking, returns eligibility, and contact flow. Please share your issue type (tracking delay, damaged item, or return request) and I’ll provide the fastest path.',
      actions: [
        { id: 'orders', type: 'support', title: 'View order history', description: 'Check order status and details in your account.', href: '/account/orders' },
        { id: 'contact', type: 'support', title: 'Contact concierge support', description: 'Reach our team for direct order resolution.', href: '/help/contact' },
      ],
      suggestions: ['My package is delayed', 'I need a return request'],
      restricted: false,
      shouldAskFollowUp: true,
    }
  }

  const mentionedProduct = products.find(product => trimmed.toLowerCase().includes(product.slug) || trimmed.toLowerCase().includes(product.name.toLowerCase()))
  if (mentionedProduct) {
    return {
      answer: `${mentionedProduct.name} is a draft JISOO product record for ${mentionedProduct.category}. Ingredient review: ${mentionedProduct.ingredients.slice(0, 3).join(', ')}. In ${region}, this product is ${(mentionedProduct.regionAvailability[region] ?? 'visible_but_not_buyable').replaceAll('_', ' ')}. Usage: ${mentionedProduct.usageInstructions}`,
      actions: [
        {
          id: `product-${mentionedProduct.id}`,
          type: 'product',
          title: mentionedProduct.name,
          description: mentionedProduct.shortDescription,
          href: `/product/${mentionedProduct.slug}`,
        },
        ...policyActions().slice(0, 1),
      ],
      suggestions: ['Compare with another product', 'Build a simple 3-step routine'],
      restricted: false,
      shouldAskFollowUp: false,
    }
  }

  const concern = context.concern
  const actions = productActions(region, concern)
  const followUpQuestion = concern
    ? `Would you like a morning or evening routine focus for ${concern}?`
    : 'Before I recommend products, what is your top skin concern (hydration, sensitivity, acne, glow, or aging)?'

  return {
    answer:
      actions.length > 0
        ? `Based on your goals, I selected ${actions.length} JISOO options available in ${region}. ${followUpQuestion}`
        : `I can guide your routine based on concern, ingredients, and region availability. ${followUpQuestion}`,
    actions: actions.length > 0 ? actions : policyActions(),
    suggestions: ['Hydration routine', 'Sensitive skin routine', 'Compare top two recommendations'],
    restricted: false,
    shouldAskFollowUp: true,
  }
}
