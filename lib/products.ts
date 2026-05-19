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

const buyableAvailability: Partial<Record<Region, ProductAvailability>> = {
  UAE: 'visible_and_buyable',
  EU: 'visible_and_buyable',
  CA: 'visible_and_buyable',
  TR: 'visible_and_buyable',
}

export const jisooProductImages = [
  '/assets/products/jisoo-new/jisoo-product-20260518-01.png',
  '/assets/products/jisoo-new/jisoo-product-20260518-02.png',
  '/assets/products/jisoo-new/jisoo-product-20260518-03.png',
  '/assets/products/jisoo-new/jisoo-product-20260518-04.png',
  '/assets/products/jisoo-new/jisoo-product-20260518-05.png',
  '/assets/products/jisoo-new/jisoo-product-20260518-06.png',
  '/assets/products/jisoo-new/jisoo-product-20260518-07.png',
] as const

const featuredProductImages = [
  '/assets/products/jisoo-featured/jisoo-featured-product-01.png',
  '/assets/products/jisoo-featured/jisoo-featured-product-02.png',
  '/assets/products/jisoo-featured/jisoo-featured-product-03.png',
] as const

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

function slugifyProductName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function createCatalogProduct(input: {
  category: string
  concerns: string[]
  description: string
  imageIndex: number
  imageSrc?: string
  name: string
  price: number
  size?: string
  subcategory?: string
  tags?: string[]
}) {
  const slug = slugifyProductName(input.name)
  const mainImageSrc = input.imageSrc ?? jisooProductImages[input.imageIndex % jisooProductImages.length]

  return createProductDraft({
    id: `prod-${slug}`,
    slug,
    name: input.name,
    brand: 'JISOO',
    subtitle: input.category,
    shortDescription: input.description,
    longDescription: `${input.description} Product details, ingredient lists, and regional claims should be confirmed against supplier documentation before final publication.`,
    keyBenefits: [
      input.description,
      'Prepared for the curated Care Formulas edit',
      'Listed with supplier-reference pricing',
    ],
    ingredients: ['Ingredient list pending verified supplier documentation'],
    usageInstructions: 'Use as directed for the product format. Patch test before first use and adjust frequency for sensitive skin.',
    skinType: ['All skin types'],
    concerns: input.concerns,
    category: input.category,
    subcategory: input.subcategory,
    tags: input.tags ?? ['jisoo', 'supplier-reference'],
    texture: 'To be confirmed',
    finish: 'To be confirmed',
    size: input.size ?? 'To be confirmed',
    price: input.price,
    regionAvailability: buyableAvailability,
    images: [
      {
        id: `${slug}-1`,
        src: mainImageSrc,
        alt: `JISOO ${input.name} product visual`,
        isMain: true,
      },
      {
        id: `${slug}-2`,
        src: jisooProductImages[(input.imageIndex + 1) % jisooProductImages.length],
        alt: `JISOO ${input.name} detail visual`,
      },
    ],
    supplierNotes: 'Product adapted from supplier-reference storefront screenshots for the JISOO catalog.',
    relatedProducts: [],
    status: 'ready_for_review',
  })
}

export const products: Product[] = [
  createCatalogProduct({ category: 'serum', concerns: ['dullness', 'uneven tone'], description: '[RENEWAL] High content of vitamin C serum renewal launched.', imageIndex: 0, imageSrc: featuredProductImages[0], name: 'Radiance Boost True Vitamin C 23 Serum', price: 19.57, size: '20 ml / 0.67 fl. oz.', subcategory: 'serums' }),
  createCatalogProduct({ category: 'cleanser', concerns: ['pores', 'oiliness'], description: 'The #1-selling bubble cleanser, redesigned. The formulation and feel are the same, only the design has been renewed.', imageIndex: 1, imageSrc: featuredProductImages[1], name: 'Pore Deep Clean Bubble Cleanser', price: 13.98, size: '145 g / 5.11 oz.', subcategory: 'cleansers' }),
  createCatalogProduct({ category: 'toner pad', concerns: ['hydration', 'soothing'], description: 'Hydration, soothing, and cooling all in one. Azulene multi gel pads are now available.', imageIndex: 2, imageSrc: featuredProductImages[2], name: 'Dewy Glow Azulene Gel Toner Pad', price: 16.78, size: '140 ml / 4.73 fl. oz.', subcategory: 'toner-pads' }),
  createCatalogProduct({ category: 'sun care', concerns: ['daily protection', 'hydration'], description: 'Softer, smoother, and more hydrating. Upgraded from mineral to chemical UV protection.', imageIndex: 3, imageSrc: featuredProductImages[0], name: 'Daily UV Shield Sunscreen', price: 13.84, size: '50 ml / 1.69 fl. oz.', subcategory: 'sun-care' }),
  createCatalogProduct({ category: 'cleanser', concerns: ['oiliness', 'cleansing'], description: 'Introducing a mildly alkaline cleansing foam for those with oily skin.', imageIndex: 4, name: 'Pore Clear Vita-Colla Cleansing Form', price: 10.49, size: '150 ml / 5.07 fl. oz.', subcategory: 'cleansers' }),
  createCatalogProduct({ category: 'cream', concerns: ['firmness', 'hydration'], description: 'Ultra-low molecular collagen doubles the collagen in the skin.', imageIndex: 5, name: 'Hydra Daily Snow Collagen Cream', price: 17.48, size: '50 ml / 1.69 fl. oz.', subcategory: 'moisturizers' }),
  createCatalogProduct({ category: 'cream', concerns: ['wrinkles', 'texture'], description: 'Delivers maximum wrinkle care with minimal irritation.', imageIndex: 6, name: 'Professional Concentrate Spicule Cream', price: 17.48, size: '30 ml / 1.01 fl. oz.', subcategory: 'moisturizers' }),
  createCatalogProduct({ category: 'cream', concerns: ['pores', 'texture'], description: '[Clinically Proven] Real Effect Pore Cream that instantly improves pore appearance by 23% after use.', imageIndex: 7, name: 'Real Effect Pore Tightening Cream', price: 17.13, size: '50 ml / 1.69 fl. oz.', subcategory: 'moisturizers' }),
  createCatalogProduct({ category: 'serum', concerns: ['pigmentation', 'uneven tone'], description: 'A vitamin serum that fades pigmentation and restores skin vitality for a brighter, healthier look.', imageIndex: 0, name: 'Real Effect Vita Toning Serum', price: 18.45, size: '30 ml / 1.01 fl. oz.', subcategory: 'serums' }),
  createCatalogProduct({ category: 'exfoliant', concerns: ['texture', 'cleansing'], description: 'Removes dead skin in just 30 seconds, with no soaking needed.', imageIndex: 1, name: 'Deep Clean Soft Peeling Gel', price: 12.58, size: '120 ml / 4.06 fl. oz.', subcategory: 'exfoliants' }),
  createCatalogProduct({ category: 'toner', concerns: ['pores', 'balance'], description: '[Clinically Proven] Improves pores by 12% after 2 weeks and by 19% after 4 weeks of use.', imageIndex: 2, name: 'Real Effect Pore Smoothing Skin Balancer', price: 20.97, size: '200 ml / 6.76 fl. oz.', subcategory: 'toners' }),
  createCatalogProduct({ category: 'tone-up care', concerns: ['uneven tone', 'base care'], description: 'Smoothly evens out blemished and uneven skin tone for a flawless, natural finish.', imageIndex: 3, name: 'White Touch Selfie Cream', price: 20.97, size: '100 g / 3.53 oz.', subcategory: 'base-care' }),
  createCatalogProduct({ category: 'cream', concerns: ['barrier', 'dryness'], description: 'A barrier-support cream for daily moisture and comfort.', imageIndex: 4, name: 'Pure Hop Panthenol Barrier Cream 100ml', price: 17.98, size: '100 ml', subcategory: 'moisturizers' }),
  createCatalogProduct({ category: 'cleanser', concerns: ['cleansing', 'daily care'], description: 'A soft whip foam cleanser for everyday cleansing routines.', imageIndex: 5, name: 'Pure Me Whip Foam Cleanser 150ml', price: 14.16, size: '150 ml', subcategory: 'cleansers' }),
  createCatalogProduct({ category: 'sun care', concerns: ['daily protection'], description: 'Daily mellow UV sunscreen with SPF50+/PA++++ positioning.', imageIndex: 6, name: 'All Day Mellow UV Sun Screen 50ml (SPF50+/PA++++)', price: 16.48, size: '50 ml', subcategory: 'sun-care' }),
  createCatalogProduct({ category: 'mask', concerns: ['texture', 'soothing'], description: 'A yogurt cream wash-off mask pack for a soft care ritual.', imageIndex: 7, name: 'Yogurt Cream Wash-off Mask Pack 130ml', price: 15.73, size: '130 ml', subcategory: 'wash-off-packs' }),
  createCatalogProduct({ category: 'serum', concerns: ['blemishes', 'calming'], description: 'A cicacare blemish serum for targeted care.', imageIndex: 0, name: 'Luminous Cicacare Blemish Serum', price: 20.00, size: '50 ml', subcategory: 'serums' }),
  createCatalogProduct({ category: 'serum', concerns: ['blemishes', 'pores'], description: 'A blemish traces serum for melanin and pore-tightening relief.', imageIndex: 1, name: 'Luminous Cica Care Blemish Traces Serum 50ml Melanin Pore Tightening Relief', price: 21.00, size: '50 ml', subcategory: 'serums' }),
  createCatalogProduct({ category: 'cream', concerns: ['moisture', 'barrier'], description: 'A moisture lasting cream for daily hydration.', imageIndex: 2, name: 'Moisture Lasting Cream 100ml', price: 16.85, size: '100 ml', subcategory: 'moisturizers' }),
  createCatalogProduct({ category: 'cream', concerns: ['soothing', 'hydration'], description: 'Aqua soothing gel cream for lightweight moisture.', imageIndex: 3, name: 'Aqua Soothing Gel Cream 50 ml', price: 16.10, size: '50 ml', subcategory: 'moisturizers' }),
  createCatalogProduct({ category: 'tone-up care', concerns: ['tone-up', 'base care'], description: 'No-sebum whitening tone-up cream for a smooth base finish.', imageIndex: 4, name: 'No-sebum Whitening Tone Up Cream 50ml', price: 16.85, size: '50 ml', subcategory: 'base-care' }),
  createCatalogProduct({ category: 'toner', concerns: ['clarity', 'balance'], description: 'Heartleaf skin-clear toner for daily balancing care.', imageIndex: 5, name: 'Heartleaf skin clear toner 300ml', price: 14.61, size: '300 ml', subcategory: 'toners' }),
  createCatalogProduct({ category: 'fluid', concerns: ['hydration', 'daily care'], description: 'Essence fluid lotion for breathable daily moisture.', imageIndex: 6, name: 'Breeze Essence Fluid Lotion 210ml', price: 14.98, size: '210 ml', subcategory: 'fluids' }),
  createCatalogProduct({ category: 'cream', concerns: ['blemishes', 'calming'], description: 'A luminous cicacare blemish cream for comfort-focused care.', imageIndex: 7, name: 'Luminous Cicacare Blemish Cream 50ml', price: 20.97, size: '50 ml', subcategory: 'moisturizers' }),
  createCatalogProduct({ category: 'cleanser', concerns: ['acne', 'cleansing'], description: 'Mild BHA 5.5 bubble foam cleanser for acne-prone cleansing routines.', imageIndex: 0, name: 'Mild BHA 5.5 Bubble Foam Cleanser 200ml', price: 16.48, size: '200 ml', subcategory: 'cleansers' }),
  createCatalogProduct({ category: 'cleanser', concerns: ['cleansing', 'daily care'], description: 'Pure Me foam cleanser for generous daily cleansing.', imageIndex: 1, name: 'Pure Me Foam Cleanser 500ml', price: 17.23, size: '500 ml', subcategory: 'cleansers' }),
  createCatalogProduct({ category: 'cleansing oil', concerns: ['makeup removal', 'cleansing'], description: 'Essential Deep cleansing oil for first-step cleansing.', imageIndex: 2, name: 'Essential Deep Cleansing Oil 250ml', price: 17.60, size: '250 ml', subcategory: 'cleansing-oils' }),
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
      { id: 'supplier-draft-image', src: '/assets/products/jisoo-new/jisoo-product-20260518-01.png', alt: 'Draft product product visual', isMain: true },
      { id: 'supplier-draft-image-2', src: '/assets/products/jisoo-new/jisoo-product-20260518-02.png', alt: 'Draft product care detail visual' },
    ],
    supplierNotes: rawText,
    createdAt: overrides.createdAt ?? now,
  })
}
