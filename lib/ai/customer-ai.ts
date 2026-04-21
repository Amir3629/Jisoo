import { products } from '@/lib/data'
import type { ProductAvailability, Region } from '@/lib/types'

export interface CustomerAiResult {
  answer: string
  productSlugs: string[]
  suggestions: string[]
}

const concernMap: Record<string, string[]> = {
  acne: ['acne', 'breakout', 'blemish'],
  dryness: ['dry', 'dehydrated'],
  darkSpots: ['dark spot', 'hyperpigmentation', 'pigment'],
  aging: ['wrinkle', 'fine line', 'aging'],
}

function matchConcern(input: string) {
  const lower = input.toLowerCase()
  return Object.entries(concernMap).find(([, terms]) => terms.some((t) => lower.includes(t)))?.[0]
}

function regionAvailabilityLabel(status: ProductAvailability) {
  if (status === 'visible_and_buyable') return 'buyable'
  if (status === 'visible_but_not_buyable') return 'visible only'
  if (status === 'pending_review') return 'pending review'
  return 'hidden'
}

export function runCustomerAssistant(query: string, region: Region): CustomerAiResult {
  const lower = query.toLowerCase()

  if (lower.includes('compare')) {
    const sample = products.slice(0, 2)
    return {
      answer: `${sample[0].name} focuses on ${sample[0].tags.slice(0, 2).join(', ')}, while ${sample[1].name} is stronger for ${sample[1].tags.slice(0, 2).join(', ')}.`,
      productSlugs: sample.map((p) => p.slug),
      suggestions: ['Which one is better for sensitive skin?', 'Show price and availability'],
    }
  }

  if (lower.includes('available') || lower.includes(region.toLowerCase())) {
    const available = products.filter((p) => p.regionAvailability[region] !== 'hidden').slice(0, 4)
    return {
      answer: `For ${region}, I found ${available.length} relevant items. Availability is shown as buyable, visible only, or pending review.`,
      productSlugs: available.map((p) => p.slug),
      suggestions: ['Only show buyable products', 'Show by concern: acne'],
    }
  }

  const concern = matchConcern(lower)
  if (concern) {
    const filtered = products
      .filter((p) => p.tags.some((tag) => tag.toLowerCase().includes(concern === 'darkSpots' ? 'bright' : concern)))
      .slice(0, 4)

    return {
      answer: `For ${concern}, I recommend starting with ${filtered.map((p) => p.name).slice(0, 2).join(' and ')}. I prioritized products that are ${regionAvailabilityLabel(filtered[0]?.regionAvailability[region] ?? 'hidden')} in ${region}.`,
      productSlugs: filtered.map((p) => p.slug),
      suggestions: ['Build me a simple 3-step routine', 'Which is best value?'],
    }
  }

  const defaults = products.slice(0, 3)
  return {
    answer: 'I can help with concern-based recommendations, region availability, and quick comparisons. Tell me your skin concern or region.',
    productSlugs: defaults.map((p) => p.slug),
    suggestions: ['What is good for acne?', `Which products are available in ${region}?`, 'Compare your top 2 serums'],
  }
}
