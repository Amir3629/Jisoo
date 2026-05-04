import type { Currency, Product, ProductAvailability, Region } from './types'
import { resolveImageSrc } from './image-fallbacks'

type ProductDraftInput = Omit<Product, 'brand' | 'partnerId' | 'currency' | 'price' | 'regionAvailability' | 'createdAt'> & {
  brand?: string
  partnerId?: string
  currency?: Currency
  price?: number
  regionAvailability?: Partial<Record<Region, ProductAvailability>>
  createdAt?: string
}

const pendingAvailability: Partial<Record<Region, ProductAvailability>> = {
  UAE: 'pending_review',
  EU: 'pending_review',
  CA: 'pending_review',
  TR: 'pending_review',
}

const pendingLongDescription =
  'Draft product record reserved for a JISOO-packaged item. Public copy, INCI list, claims, usage, and regional compliance must be completed after supplier documentation and internal review.'

function createProductDraft(input: ProductDraftInput): Product {
  return {
    brand: 'JISOO',
    partnerId: 'supplier-review',
    currency: 'EUR',
    price: 0,
    regionAvailability: pendingAvailability,
    status: 'draft',
    createdAt: '2026-05-04',
    ...input,
    images: input.images.map((image) => ({ ...image, src: resolveImageSrc(image.src) })),
    skinTypes: input.skinType,
    howToUse: input.usageInstructions,
    description: input.longDescription,
    benefits: input.keyBenefits.map((benefit) => ({ title: benefit })),
  }
}

export const products: Product[] = [
  createProductDraft({
    id: 'prod-radiance-boost-vitamin-c-23-serum',
    slug: 'radiance-boost-vitamin-c-23-serum',
    name: 'Radiance Boost Vitamin C 23 Serum',
    subtitle: 'High-strength vitamin C care',
    shortDescription: 'A concentrated vitamin C serum prepared for tone, radiance, and daily care review.',
    longDescription:
      'A lightweight serum format designed for a focused evening or morning routine. Public claims, regional compliance, and final INCI wording should be confirmed before launch copy is expanded.',
    keyBenefits: [
      'Helps support a brighter-looking routine',
      'Light, non-sticky serum texture',
      'Pairs with hydrating and soothing care steps',
      'Prepared for final supplier and compliance review',
    ],
    ingredients: [
      'Ascorbic acid',
      'Sodium ascorbyl phosphate',
      'Panthenol',
      'Squalane',
      'Adenosine',
      'Niacinamide',
      'Allantoin',
      'Tocopherol',
    ],
    usageInstructions:
      'Apply a small amount after cleansing and toning. Follow with moisturiser and daytime sun care. Introduce gradually for sensitive routines.',
    skinType: ['All skin types', 'Dull-looking skin'],
    concerns: ['dullness', 'uneven tone', 'daily-care'],
    category: 'serum',
    subcategory: 'serums',
    tags: ['serum', 'vitamin-c', 'radiance', 'supplier-review'],
    texture: 'Lightweight serum',
    finish: 'Fresh, refined finish',
    size: '12 ml / 0.40 fl. oz.',
    price: 19.57,
    images: [
      { id: 'radiance-boost-vitamin-c-23-serum-1', src: '/assets/products/luminous-glow-serum.jpg', alt: 'JISOO Radiance Boost Vitamin C 23 Serum', isMain: true },
    ],
    supplierNotes:
      'Reference file lists a high-content vitamin C serum with glow, even-looking tone, lightweight texture, panthenol, squalane, adenosine, niacinamide, allantoin, tocopherol, and sodium ascorbyl phosphate. Any numerical clinical percentages must be verified before publishing.',
    relatedProducts: ['prod-azulene-toner-pad', 'prod-daily-uv-shield-sun-cream'],
  }),
  createProductDraft({
    id: 'prod-pore-deep-clean-bubble-serum',
    slug: 'pore-deep-clean-bubble-serum',
    name: 'Pore Deep Clean Bubble Serum',
    subtitle: 'A soft bubble cleanser-serum format',
    shortDescription: 'A pore-focused cleansing step with a soft, rich bubble texture.',
    longDescription:
      'A cleansing-focused formula prepared for routines that need a fresh finish around excess oil, daily buildup, and visible pore concerns. Final claims and full INCI should be completed after documentation review.',
    keyBenefits: [
      'Soft bubble texture for daily cleansing',
      'Designed for excess oil and visible pore care',
      'Comfortable after-feel without a tight finish',
      'Prepared for acne-prone routine review',
    ],
    ingredients: [
      'Salicylic acid',
      'PHYTON5 complex',
      'Butylene glycol',
      'Orange peel extract',
      'Olive fruit oil',
      'Lavender extract',
      'Rosemary extract',
    ],
    usageInstructions:
      'Pump one to two times onto damp hands. Massage gently over the face in circular motions, then rinse with lukewarm water.',
    skinType: ['Oily skin', 'Combination skin', 'Congestion-prone skin'],
    concerns: ['pores', 'oiliness', 'cleansing'],
    category: 'cleanser',
    subcategory: 'cleansers',
    tags: ['cleanser', 'bubble', 'pore-care', 'supplier-review'],
    texture: 'Soft bubble foam',
    finish: 'Clean, comfortable finish',
    size: '145 g / 5.11 oz.',
    price: 13.98,
    images: [
      { id: 'pore-deep-clean-bubble-serum-1', src: '/assets/editorial/skincare-ingredients.jpg', alt: 'JISOO Pore Deep Clean Bubble Serum', isMain: true },
    ],
    supplierNotes:
      'Reference file mentions pore deep clean bubble, excess sebum, soft rich foam, acne-prone routines, salicylic acid, PHYTON5, and pH guidance. Use only after full INCI and claim checks.',
    relatedProducts: ['prod-pore-clear-vita-c-cleansing-foam', 'prod-azulene-toner-pad'],
  }),
  createProductDraft({
    id: 'prod-azulene-toner-pad',
    slug: 'azulene-toner-pad',
    name: 'Azulene Toner Pad',
    subtitle: 'Dewy glow toner pads',
    shortDescription: 'A ready-to-use toner pad format for quick hydration, cooling, and skin prep.',
    longDescription:
      'A pad-based toner step designed for simple daily prep or a short targeted care moment. The formula direction focuses on hydration, cooling, and refined texture support pending final supplier documentation.',
    keyBenefits: [
      'Quick toner-pad care for daily prep',
      'Hydrating, dewy-looking finish',
      'Cooling feel for comfort-focused routines',
      'Can be used as a short targeted pad mask',
    ],
    ingredients: [
      'Azulene',
      'Multi hyaluronic acid complex',
      'Vegan collagen',
      'Lactobacillus ferment',
      'PHA',
      'Calm-MDP complex',
    ],
    usageInstructions:
      'Swipe gently over clean skin after cleansing. For targeted care, leave on selected areas briefly, then pat in remaining toner.',
    skinType: ['All skin types', 'Dry skin', 'Sensitive-feeling skin'],
    concerns: ['dryness', 'texture', 'routine-prep'],
    category: 'toner pad',
    subcategory: 'toner-pads',
    tags: ['toner-pad', 'azulene', 'hydration', 'supplier-review'],
    texture: 'Embossed toner pad',
    finish: 'Dewy, refreshed finish',
    size: '140 ml / 4.73 fl. oz.',
    images: [
      { id: 'azulene-toner-pad-1', src: '/assets/editorial/product-table.png', alt: 'JISOO Azulene Toner Pad', isMain: true },
    ],
    supplierNotes:
      'Reference file lists skin-wrapping gel pad, dewy glow, azulene toner, 140 ml, hydration, antioxidant care, relief/defense, cooling/refining, vegan collagen, lactobacillus, PHA, and Calm-MDP. Verify final INCI.',
    relatedProducts: ['prod-radiance-boost-vitamin-c-23-serum', 'prod-daily-uv-shield-sun-cream'],
  }),
  createProductDraft({
    id: 'prod-daily-uv-shield-sun-cream',
    slug: 'daily-uv-shield-sun-cream',
    name: 'Daily UV Shield Sun Cream',
    subtitle: 'Light daily sun care',
    shortDescription: 'A lightweight daily sun cream with a moisturising, transparent-feeling finish.',
    longDescription:
      'A daily UV care cream designed for comfortable wear, a hydrated feel, and a clear finish under makeup or alone. SPF wording should be confirmed for every sales region before final publication.',
    keyBenefits: [
      'Daily UV care format',
      'Moisturising lotion texture',
      'Designed for a reduced white-cast finish',
      'Comfortable for daily morning routines',
    ],
    ingredients: [
      'Chamomile flower water',
      'Centella asiatica extract',
      'Blue agave leaf extract',
      'Tocopherol',
    ],
    usageInstructions:
      'Apply generously as the final morning care step. Reapply during prolonged daylight exposure or after sweating, swimming, or towel drying.',
    skinType: ['All skin types', 'Dry skin', 'Sensitive-feeling skin'],
    concerns: ['daily-protection', 'dryness', 'comfort'],
    category: 'sun care',
    subcategory: 'sun-care',
    tags: ['sun-care', 'daily-care', 'uv-care', 'supplier-review'],
    texture: 'Thin lotion cream',
    finish: 'Moisturised, transparent-looking finish',
    size: '50 ml / 1.69 fl. oz.',
    images: [
      { id: 'daily-uv-shield-sun-cream-1', src: '/assets/products/jisoo-daily-uv-shield-sun-cream-1.jpg', alt: 'JISOO Daily UV Shield Sun Cream product overview', isMain: true },
      { id: 'daily-uv-shield-sun-cream-2', src: '/assets/products/jisoo-daily-uv-shield-sun-cream-2.jpg', alt: 'JISOO Daily UV Shield Sun Cream review and UV care details' },
      { id: 'daily-uv-shield-sun-cream-3', src: '/assets/products/jisoo-daily-uv-shield-sun-cream-3.jpg', alt: 'JISOO Daily UV Shield Sun Cream ingredients and texture details' },
    ],
    supplierNotes:
      'Reference images list SPF50+ PA++++, UVA/UVB care, chamomile flower water, centella extract, blue agave extract, tocopherol, reduced white cast, calming and moisturising positioning. SPF/regulatory claims require regional review before publishing.',
    relatedProducts: ['prod-azulene-toner-pad', 'prod-pore-clear-vita-c-cleansing-foam'],
  }),
  createProductDraft({
    id: 'prod-pore-clear-vita-c-cleansing-foam',
    slug: 'pore-clear-vita-c-cleansing-foam',
    name: 'Pore Clear Vita-C Cleansing Foam',
    subtitle: 'Creamy pore-focused cleansing foam',
    shortDescription: 'A daily cleansing foam for pores, excess oil, and a fresh finish.',
    longDescription:
      'A soft foaming cleanser designed for a clear-feeling cleanse without an over-stripped finish. Final ingredient wording and claim language should be reviewed before launch.',
    keyBenefits: [
      'Creamy micro-bubble foam',
      'Designed for pore-focused cleansing',
      'Helps remove daily buildup and excess oil',
      'Fresh finish for morning or evening routines',
    ],
    ingredients: [
      'Vitamin C care complex',
      'Mild cleansing agents',
      'Hydrating support ingredients',
      'Ingredient list pending final INCI verification',
    ],
    usageInstructions:
      'Lather a small amount with water, massage over damp skin, then rinse thoroughly. Avoid the eye area.',
    skinType: ['Oily skin', 'Combination skin', 'All skin types'],
    concerns: ['pores', 'oiliness', 'cleansing'],
    category: 'cleanser',
    subcategory: 'cleansers',
    tags: ['cleanser', 'foam', 'pore-care', 'supplier-review'],
    texture: 'Creamy foam',
    finish: 'Fresh, clean finish',
    size: 'To be confirmed',
    images: [
      { id: 'pore-clear-vita-c-cleansing-foam-1', src: '/assets/products/jisoo-pore-clear-vita-c-cleansing-foam-1.jpg', alt: 'JISOO Pore Clear Vita-C Cleansing Foam overview', isMain: true },
      { id: 'pore-clear-vita-c-cleansing-foam-2', src: '/assets/products/jisoo-pore-clear-vita-c-cleansing-foam-2.jpg', alt: 'JISOO Pore Clear Vita-C Cleansing Foam detail information' },
    ],
    supplierNotes:
      'Reference images describe pore-clear vita-c cleansing foam, low-irritation cleansing, micro-bubbles, pore cleansing, sebum and impurity care, and vita-c positioning. Full INCI pending.',
    relatedProducts: ['prod-pore-deep-clean-bubble-serum', 'prod-daily-uv-shield-sun-cream'],
  }),
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((product) => product.category === categorySlug || product.subcategory === categorySlug)
}

export function getRelatedProducts(productId: string): Product[] {
  const product = getProductById(productId)
  if (!product?.relatedProducts) return []
  return product.relatedProducts.map((id) => getProductById(id)).filter(Boolean) as Product[]
}

export function formatPrice(amount: number | undefined, currency: string = 'EUR'): string {
  if (!amount || amount <= 0) return 'Price pending'

  const symbols: Record<string, string> = {
    EUR: '€',
    AED: 'AED ',
    CAD: 'CA$',
    TRY: '₺',
  }

  return `${symbols[currency] || currency}${amount.toFixed(2)}`
}

export function createProductDraftFromRaw(rawText: string, overrides: Partial<ProductDraftInput> = {}): Product {
  const now = new Date().toISOString().slice(0, 10)
  const firstMeaningfulLine = rawText
    .split('\n')
    .map((line) => line.trim())
    .find(Boolean)

  return createProductDraft({
    id: overrides.id ?? `prod-draft-${Date.now()}`,
    slug: overrides.slug ?? 'supplier-product-draft',
    name: overrides.name ?? firstMeaningfulLine ?? 'Supplier Product Draft',
    shortDescription: overrides.shortDescription ?? 'Draft record awaiting verified supplier information.',
    longDescription: overrides.longDescription ?? pendingLongDescription,
    keyBenefits: overrides.keyBenefits ?? ['Benefit pending supplier documentation'],
    ingredients: overrides.ingredients ?? ['Ingredient list pending verified INCI documentation'],
    usageInstructions: overrides.usageInstructions ?? 'Usage instructions pending supplier documentation and internal review.',
    skinType: overrides.skinType ?? ['To be confirmed'],
    concerns: overrides.concerns ?? ['to-be-confirmed'],
    category: overrides.category ?? 'to-be-confirmed',
    subcategory: overrides.subcategory,
    tags: overrides.tags ?? ['supplier-review'],
    size: overrides.size ?? 'To be confirmed',
    images: overrides.images ?? [
      { id: 'supplier-draft-image', src: '/assets/placeholders/placeholder.svg', alt: 'Draft product placeholder', isMain: true },
    ],
    supplierNotes: rawText,
    createdAt: overrides.createdAt ?? now,
  })
}
