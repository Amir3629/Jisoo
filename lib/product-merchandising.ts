import type { Product } from './types'

export interface ProductCareFocus {
  eyebrow: string
  title: string
  description: string
}

export interface ProductCardBadge {
  label: string
  mark: string
  tone: string
}

export interface ProductRoutineStep {
  step: string
  title: string
  description: string
  match?: string
}

const concernFocusMap: Array<{ keys: string[]; focus: ProductCareFocus }> = [
  {
    keys: ['hydration', 'dehydration', 'dryness', 'soothing', 'cooling'],
    focus: {
      eyebrow: 'Hydration & comfort',
      title: 'For hydration',
      description: 'Adds a soft veil of moisture and keeps skin feeling calm and cushioned.',
    },
  },
  {
    keys: ['dullness', 'uneven tone', 'radiance', 'brightening', 'glow'],
    focus: {
      eyebrow: 'Glow & tone',
      title: 'For brightening',
      description: 'Supports a fresher-looking glow and a more even, luminous finish.',
    },
  },
  {
    keys: ['firmness', 'anti-aging', 'fine lines', 'wrinkles', 'elasticity'],
    focus: {
      eyebrow: 'Firmness care',
      title: 'For anti-aging',
      description: 'Layers into routines focused on bounce, firmness, and smoother-looking skin.',
    },
  },
  {
    keys: ['pores', 'oiliness', 'blemishes', 'clarity', 'sebum'],
    focus: {
      eyebrow: 'Pore & clarity',
      title: 'For clear skin',
      description: 'Helps refine the look of pores while keeping the routine clean and balanced.',
    },
  },
  {
    keys: ['daily protection', 'uv', 'sun', 'spf'],
    focus: {
      eyebrow: 'Daily shield',
      title: 'For protection',
      description: 'Finishes the morning routine with comfortable daily protection.',
    },
  },
]

const categoryFallbackFocus: Record<string, ProductCareFocus> = {
  cleanser: {
    eyebrow: 'First cleanse',
    title: 'For fresh skin',
    description: 'Starts the routine by lifting away daily buildup without making skin feel stripped.',
  },
  'cleansing oil': {
    eyebrow: 'First cleanse',
    title: 'For makeup & SPF',
    description: 'Melts away sunscreen and makeup before your water-based cleanse.',
  },
  toner: {
    eyebrow: 'Prep step',
    title: 'For skin prep',
    description: 'Prepares skin so the next serum or cream layers smoothly.',
  },
  'toner pad': {
    eyebrow: 'Prep step',
    title: 'For hydration',
    description: 'A quick pad step for fresh, cooled, and lightly hydrated skin.',
  },
  essence: {
    eyebrow: 'First treatment',
    title: 'For glow prep',
    description: 'A lightweight layer that helps skin feel receptive to serums.',
  },
  serum: {
    eyebrow: 'Treatment step',
    title: 'For targeted care',
    description: 'Targets a visible concern before sealing the routine with cream.',
  },
  ampoule: {
    eyebrow: 'Intensive step',
    title: 'For boosted care',
    description: 'A concentrated layer for days when your skin needs extra support.',
  },
  cream: {
    eyebrow: 'Seal & comfort',
    title: 'For skin barrier',
    description: 'Locks in earlier layers and leaves skin feeling comforted.',
  },
  mask: {
    eyebrow: 'Weekly ritual',
    title: 'For treatment nights',
    description: 'Adds an extra ritual moment when skin needs more care.',
  },
  oil: {
    eyebrow: 'Final glow',
    title: 'For soft glow',
    description: 'A finishing touch to soften dry areas and add a healthy-looking sheen.',
  },
  'sun care': {
    eyebrow: 'Morning final step',
    title: 'For protection',
    description: 'The last AM layer to help protect skin through the day.',
  },
}

const badgeRotation: ProductCardBadge[] = [
  { label: 'Best Seller', mark: '★', tone: 'border-white/20 bg-charcoal/88 text-white' },
  { label: 'Most Viewed', mark: '◐', tone: 'border-rose-mauve/25 bg-white/92 text-rose-mauve' },
  { label: 'Glow Pick', mark: '✦', tone: 'border-white/20 bg-gradient-to-r from-rose-mauve to-[#d3af84] text-white' },
  { label: 'Routine Hero', mark: '✓', tone: 'border-[#d3af84]/30 bg-[#fff8ee]/95 text-[#8b623e]' },
  { label: 'Customer Favorite', mark: '♡', tone: 'border-rose-mauve/25 bg-white/92 text-rose-mauve' },
]

export function getProductCareFocus(product: Product): ProductCareFocus {
  const searchable = [product.name, product.category, product.subcategory, ...product.concerns, ...product.tags]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  const concernMatch = concernFocusMap.find(({ keys }) => keys.some((key) => searchable.includes(key)))
  if (concernMatch) return concernMatch.focus

  return categoryFallbackFocus[product.category.trim().toLowerCase()] ?? {
    eyebrow: 'Skin care',
    title: 'For daily care',
    description: 'A curated JISOO formula for a simple, polished daily ritual.',
  }
}

export function getProductCardBadge(product: Product, index: number): ProductCardBadge {
  const searchable = [product.name, product.category, product.subcategory, ...product.concerns, ...product.tags]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  if (product.isBestSeller || searchable.includes('anti-aging') || searchable.includes('firmness') || searchable.includes('fine lines')) {
    return badgeRotation[0]
  }

  if (searchable.includes('sun') || searchable.includes('uv')) {
    return { label: 'Daily Essential', mark: '☼', tone: 'border-[#d3af84]/30 bg-[#fff8ee]/95 text-[#8b623e]' }
  }

  return badgeRotation[index % badgeRotation.length]
}

export function getRoutineStepsForProduct(product: Product): ProductRoutineStep[] {
  const category = product.category.trim().toLowerCase()
  const focus = getProductCareFocus(product)

  return [
    {
      step: '01',
      title: 'Cleanse',
      description: 'Begin with cleanser to remove sunscreen, makeup, and daily buildup.',
      match: category.includes('cleanser') || category.includes('cleansing') ? 'This product can be your first routine step.' : undefined,
    },
    {
      step: '02',
      title: 'Prep with toner or pads',
      description: 'Use toner, essence, or toner pads to refresh skin and prepare it for treatments.',
      match: category.includes('toner') || category.includes('essence') ? 'Use this here, right after cleansing.' : undefined,
    },
    {
      step: '03',
      title: 'Apply serum / ampoule',
      description: 'Layer targeted treatments from thinnest to richest texture; let each layer settle.',
      match: category.includes('serum') || category.includes('ampoule') ? `Use this here: ${focus.title.toLowerCase()}.` : undefined,
    },
    {
      step: '04',
      title: 'Seal with cream',
      description: 'Finish with moisturizer to lock in hydration and keep the barrier comfortable.',
      match: category.includes('cream') || category.includes('lotion') || category.includes('emulsion') ? 'Use this after treatment layers.' : undefined,
    },
    {
      step: '05',
      title: 'AM only: SPF',
      description: 'In the morning, sunscreen is the final step after moisturizer.',
      match: category.includes('sun') ? 'Use this as the final morning step.' : undefined,
    },
  ]
}
