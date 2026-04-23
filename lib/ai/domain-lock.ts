const JISOO_DOMAIN_TERMS = [
  'jisoo', 'skincare', 'beauty', 'serum', 'cream', 'cleanser', 'ingredient', 'routine', 'shipping', 'return', 'refund', 'policy', 'order', 'help', 'contact', 'compare', 'product',
]

export interface DomainLockResult {
  allowed: boolean
  redirectMessage: string
}

export function enforceJisooDomain(query: string): DomainLockResult {
  const lower = query.toLowerCase()
  const allowed = JISOO_DOMAIN_TERMS.some(term => lower.includes(term))

  if (allowed) {
    return { allowed: true, redirectMessage: '' }
  }

  return {
    allowed: false,
    redirectMessage:
      'I’m your JISOO Beauty Concierge, so I stay focused on JISOO products, skincare guidance, ingredients, shipping/returns, and order support. Share a skin concern and I’ll guide you right away.',
  }
}
