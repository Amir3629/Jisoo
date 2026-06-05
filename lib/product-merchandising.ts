import type { Product } from './types'

export type ProductStatusBadgeKind = 'best-seller' | 'most-viewed' | 'customer-favorite'
export type ProductCareIconKind = 'hydration' | 'brightening' | 'anti-aging' | 'dry-skin' | 'sensitive-skin' | 'firming' | 'repair' | 'glow' | 'protection' | 'clarity'
export type RoutineStepKey = 'cleanse' | 'prep' | 'treat' | 'seal' | 'protect'

export const JISOO_LEAF_MARK_SRC = '/brand/jisoo-leaf-mark.png'

export interface ProductCareFocus {
  eyebrow: string
  title: string
  description: string
}

export interface ProductStatusBadge {
  kind: ProductStatusBadgeKind
  label: string
  iconSrc: string
}

export interface ProductCareChip {
  kind: ProductCareIconKind
  label: string
  iconSrc?: string
}

export interface ProductRoutineStep {
  key: RoutineStepKey
  step: string
  title: string
  description: string
  isCurrent: boolean
}

export interface ProductRoutinePlacement {
  current: ProductRoutineStep
  before?: ProductRoutineStep
  after?: ProductRoutineStep
  steps: ProductRoutineStep[]
}

const statusBadgeEntries: Array<{ kind: ProductStatusBadgeKind; slug: string }> = [
  { kind: 'best-seller', slug: 'pore-deep-clean-bubble-cleanser' },
  { kind: 'best-seller', slug: 'hydra-daily-snow-collagen-cream' },
  { kind: 'most-viewed', slug: 'radiance-boost-true-vitamin-c-23-serum' },
  { kind: 'customer-favorite', slug: 'dewy-glow-azulene-gel-toner-pad' },
]

const statusBadgeLabels: Record<ProductStatusBadgeKind, string> = {
  'best-seller': 'Best Sellers',
  'most-viewed': 'Most Viewed',
  'customer-favorite': 'Customer Favorite',
}

const statusBadgeIconSrc: Record<ProductStatusBadgeKind, string> = {
  'best-seller': '/icons/merchandising/best-seller-cup.png',
  'most-viewed': '/icons/merchandising/most-viewed.png',
  'customer-favorite': '/icons/merchandising/customer-favorite-heart.png',
}

const careChipIconSrc: Record<ProductCareIconKind, string> = {
  hydration: '/icons/merchandising/hydration.png',
  brightening: '/icons/merchandising/brightening.png',
  'anti-aging': '/icons/merchandising/anti-aging.png',
  'dry-skin': '/icons/merchandising/dry-skin.png',
  'sensitive-skin': '/icons/merchandising/sensitive-skin.png',
  firming: '/icons/merchandising/firming.png',
  repair: '/icons/merchandising/repair.png',
  glow: '/icons/merchandising/glow.png',
  protection: '/icons/merchandising/protection.png',
  clarity: '/icons/merchandising/clarity.png',
}

const concernFocusMap: Array<{ keys: string[]; focus: ProductCareFocus; chips: ProductCareChip[]; highlights: string[] }> = [
  {
    keys: ['hydration', 'moisture', 'dehydration', 'dryness', 'soothing', 'cooling'],
    focus: {
      eyebrow: 'Hydration & comfort',
      title: 'For hydration',
      description: 'Soft moisture support for skin that needs comfort and cushion.',
    },
    chips: [
      { kind: 'hydration', label: 'Hydration' },
      { kind: 'dry-skin', label: 'Dry skin' },
      { kind: 'glow', label: 'Glow' },
    ],
    highlights: ['Deep hydration', 'Dry skin support', 'Soft glow'],
  },
  {
    keys: ['dullness', 'uneven tone', 'radiance', 'brightening', 'pigmentation', 'tone-up', 'whitening'],
    focus: {
      eyebrow: 'Glow & tone',
      title: 'For brightening',
      description: 'A glow-focused step for a more even, fresh-looking finish.',
    },
    chips: [
      { kind: 'brightening', label: 'Brightening' },
      { kind: 'glow', label: 'Glow' },
      { kind: 'repair', label: 'Repair' },
    ],
    highlights: ['Brighter look', 'Even tone', 'Fresh glow'],
  },
  {
    keys: ['firmness', 'anti-aging', 'fine lines', 'wrinkles', 'elasticity', 'collagen'],
    focus: {
      eyebrow: 'Firmness care',
      title: 'For anti-aging',
      description: 'A firmness ritual for bounce, comfort, and smoother-looking skin.',
    },
    chips: [
      { kind: 'anti-aging', label: 'Anti-aging' },
      { kind: 'firming', label: 'Firming' },
      { kind: 'repair', label: 'Repair' },
    ],
    highlights: ['Firming care', 'Smooth texture', 'Bounce support'],
  },
  {
    keys: ['pores', 'oiliness', 'blemishes', 'clarity', 'sebum', 'acne', 'balance', 'calming'],
    focus: {
      eyebrow: 'Pore & clarity',
      title: 'For clear skin',
      description: 'A balancing step for clearer-looking, comfortable skin.',
    },
    chips: [
      { kind: 'clarity', label: 'Clarity' },
      { kind: 'sensitive-skin', label: 'Sensitive skin' },
      { kind: 'repair', label: 'Repair' },
    ],
    highlights: ['Clearer look', 'Pore care', 'Calm finish'],
  },
  {
    keys: ['daily protection', 'uv', 'sun', 'spf'],
    focus: {
      eyebrow: 'Daily shield',
      title: 'For protection',
      description: 'A comfortable final morning layer for daily UV care.',
    },
    chips: [
      { kind: 'protection', label: 'Protection' },
      { kind: 'hydration', label: 'Hydration' },
      { kind: 'sensitive-skin', label: 'Sensitive skin' },
    ],
    highlights: ['Daily SPF', 'Soft comfort', 'AM protection'],
  },
]

const categoryFallbacks: Record<string, { focus: ProductCareFocus; chips: ProductCareChip[]; highlights: string[] }> = {
  cleanser: {
    focus: {
      eyebrow: 'First cleanse',
      title: 'For fresh skin',
      description: 'A fresh first step before toner, serum, and cream.',
    },
    chips: [
      { kind: 'clarity', label: 'Clarity' },
      { kind: 'sensitive-skin', label: 'Sensitive skin' },
    ],
    highlights: ['Fresh cleanse', 'Pore care', 'Soft finish'],
  },
  'cleansing oil': {
    focus: {
      eyebrow: 'First cleanse',
      title: 'For makeup & SPF',
      description: 'A first cleanse for sunscreen, makeup, and daily buildup.',
    },
    chips: [
      { kind: 'clarity', label: 'Clarity' },
      { kind: 'repair', label: 'Repair' },
    ],
    highlights: ['Makeup melt', 'SPF cleanse', 'Soft finish'],
  },
  toner: {
    focus: {
      eyebrow: 'Prep step',
      title: 'For skin prep',
      description: 'A light prep layer before targeted care.',
    },
    chips: [
      { kind: 'hydration', label: 'Hydration' },
      { kind: 'glow', label: 'Glow' },
    ],
    highlights: ['Skin prep', 'Light hydration', 'Balanced feel'],
  },
  'toner pad': {
    focus: {
      eyebrow: 'Prep step',
      title: 'For hydration',
      description: 'A quick pad ritual for fresh, comfortable skin.',
    },
    chips: [
      { kind: 'hydration', label: 'Hydration' },
      { kind: 'sensitive-skin', label: 'Sensitive skin' },
    ],
    highlights: ['Cooling prep', 'Hydration boost', 'Calm feel'],
  },
  serum: {
    focus: {
      eyebrow: 'Treatment step',
      title: 'For targeted care',
      description: 'A focused treatment layer before moisturizer.',
    },
    chips: [
      { kind: 'glow', label: 'Glow' },
      { kind: 'repair', label: 'Repair' },
    ],
    highlights: ['Targeted care', 'Smooth glow', 'Treatment step'],
  },
  cream: {
    focus: {
      eyebrow: 'Seal & comfort',
      title: 'For skin barrier',
      description: 'A comfort layer to seal in previous steps.',
    },
    chips: [
      { kind: 'hydration', label: 'Hydration' },
      { kind: 'repair', label: 'Repair' },
    ],
    highlights: ['Barrier comfort', 'Moisture seal', 'Soft finish'],
  },
  mask: {
    focus: {
      eyebrow: 'Weekly ritual',
      title: 'For treatment nights',
      description: 'An extra care moment for a softer weekly ritual.',
    },
    chips: [
      { kind: 'glow', label: 'Glow' },
      { kind: 'repair', label: 'Repair' },
    ],
    highlights: ['Weekly care', 'Soft texture', 'Ritual glow'],
  },
  'sun care': {
    focus: {
      eyebrow: 'Morning final step',
      title: 'For protection',
      description: 'The final AM step after moisturizer.',
    },
    chips: [
      { kind: 'protection', label: 'Protection' },
      { kind: 'hydration', label: 'Hydration' },
    ],
    highlights: ['Daily SPF', 'Final AM step', 'Soft shield'],
  },
}

const routineDefinitions: Omit<ProductRoutineStep, 'isCurrent'>[] = [
  { key: 'cleanse', step: '01', title: 'Cleanse', description: 'Start with cleanser to refresh skin.' },
  { key: 'prep', step: '02', title: 'Prep', description: 'Follow with toner, pads, or essence.' },
  { key: 'treat', step: '03', title: 'Treat', description: 'Apply serum or ampoule for targeted care.' },
  { key: 'seal', step: '04', title: 'Seal', description: 'Lock in care with cream or lotion.' },
  { key: 'protect', step: '05', title: 'Protect', description: 'In the morning, finish with sunscreen.' },
]

function productSearchText(product: Product) {
  return [product.name, product.category, product.subcategory, ...product.concerns, ...product.tags]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

function getMerchandisingMatch(product: Product) {
  const searchable = productSearchText(product)
  return concernFocusMap.find(({ keys }) => keys.some((key) => searchable.includes(key)))
}

export function getProductCareFocus(product: Product): ProductCareFocus {
  const concernMatch = getMerchandisingMatch(product)
  if (concernMatch) return concernMatch.focus

  return categoryFallbacks[product.category.trim().toLowerCase()]?.focus ?? {
    eyebrow: 'Skin care',
    title: 'For daily care',
    description: 'A curated JISOO step for a polished daily ritual.',
  }
}

export function getProductStatusBadge(product: Product): ProductStatusBadge | null {
  const entry = statusBadgeEntries.find((item) => item.slug === product.slug)
  if (!entry) return null

  return {
    kind: entry.kind,
    label: statusBadgeLabels[entry.kind],
    iconSrc: statusBadgeIconSrc[entry.kind],
  }
}

export function getProductCardBadge(product: Product): ProductStatusBadge | null {
  return getProductStatusBadge(product)
}

export function getProductCareChips(product: Product): ProductCareChip[] {
  const concernMatch = getMerchandisingMatch(product)
  const fallback = categoryFallbacks[product.category.trim().toLowerCase()]
  const chips = concernMatch?.chips ?? fallback?.chips ?? [
    { kind: 'glow', label: 'Glow' },
    { kind: 'repair', label: 'Repair' },
  ]

  return chips.slice(0, 1).map((chip) => ({
    ...chip,
    iconSrc: careChipIconSrc[chip.kind],
  }))
}

export function getProductCardHighlights(product: Product): string[] {
  const concernMatch = getMerchandisingMatch(product)
  const fallback = categoryFallbacks[product.category.trim().toLowerCase()]
  const highlights = concernMatch?.highlights ?? fallback?.highlights ?? ['Daily care', 'Soft finish', 'JISOO ritual']

  return highlights.slice(0, 3)
}

export function getRoutineStepKeyForProduct(product: Product): RoutineStepKey {
  const category = product.category.trim().toLowerCase()

  if (category.includes('cleanser') || category.includes('cleansing') || category.includes('exfoliant')) return 'cleanse'
  if (category.includes('toner') || category.includes('essence')) return 'prep'
  if (category.includes('serum') || category.includes('ampoule') || category.includes('tone-up')) return 'treat'
  if (category.includes('cream') || category.includes('lotion') || category.includes('fluid') || category.includes('emulsion') || category.includes('mask') || category.includes('oil')) return 'seal'
  if (category.includes('sun')) return 'protect'

  return 'treat'
}

export function getRoutinePlacementForProduct(product: Product): ProductRoutinePlacement {
  const currentKey = getRoutineStepKeyForProduct(product)
  const currentIndex = routineDefinitions.findIndex((step) => step.key === currentKey)
  const steps = routineDefinitions.map((step) => ({ ...step, isCurrent: step.key === currentKey }))

  return {
    current: steps[currentIndex],
    before: currentIndex > 0 ? steps[currentIndex - 1] : undefined,
    after: currentIndex < steps.length - 1 ? steps[currentIndex + 1] : undefined,
    steps,
  }
}

export function getRoutineStepsForProduct(product: Product): ProductRoutineStep[] {
  return getRoutinePlacementForProduct(product).steps
}


export function getRoutineFlowForProduct(product: Product): ProductRoutineStep[] {
  const placement = getRoutinePlacementForProduct(product)
  return [placement.before, placement.current, placement.after].filter(Boolean) as ProductRoutineStep[]
}

function routineSuggestionKeysForProduct(product: Product): RoutineStepKey[] {
  const placement = getRoutinePlacementForProduct(product)
  return [placement.before?.key, placement.after?.key, placement.current.key].filter(Boolean) as RoutineStepKey[]
}

export function getRoutineSuggestionProducts(product: Product, candidates: Product[], limit = 3): Product[] {
  const wantedKeys = routineSuggestionKeysForProduct(product)

  return candidates
    .filter((candidate) => candidate.id !== product.id)
    .filter((candidate) => wantedKeys.includes(getRoutineStepKeyForProduct(candidate)))
    .sort((a, b) => {
      const aRank = wantedKeys.indexOf(getRoutineStepKeyForProduct(a))
      const bRank = wantedKeys.indexOf(getRoutineStepKeyForProduct(b))
      return aRank - bRank
    })
    .slice(0, limit)
}
