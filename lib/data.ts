import type { Product, Category, Partner, Customer, Order, Review, Testimonial, RegionConfig, Coupon } from './types'
import { resolveImageSrc } from './image-fallbacks'
import { products, getProductBySlug, getProductById, getProductsByCategory, getRelatedProducts, formatPrice } from './products'

export { products, getProductBySlug, getProductById, getProductsByCategory, getRelatedProducts, formatPrice }

// Region Configurations
export const regionConfigs: Record<string, RegionConfig> = {
  UAE: {
    code: 'UAE',
    name: 'United Arab Emirates',
    currency: 'AED',
    currencySymbol: 'AED',
    languages: ['en', 'ar', 'ko'],
    defaultLanguage: 'en',
    isRTL: false,
  },
  EU: {
    code: 'EU',
    name: 'Europe',
    currency: 'EUR',
    currencySymbol: '€',
    languages: ['en', 'fr', 'de', 'ko'],
    defaultLanguage: 'en',
  },
  CA: {
    code: 'CA',
    name: 'Canada',
    currency: 'CAD',
    currencySymbol: 'CA$',
    languages: ['en', 'fr', 'ko'],
    defaultLanguage: 'en',
  },
  TR: {
    code: 'TR',
    name: 'Turkey',
    currency: 'TRY',
    currencySymbol: '₺',
    languages: ['tr', 'en', 'ko'],
    defaultLanguage: 'tr',
  },
}

// Partner Companies
export const partners: Partner[] = [
  {
    id: 'partner-1',
    name: 'Hanbang Lab',
    description: 'Korean herbal skincare expertise paired with modern formulation standards, with a focus on fermented ingredients.',
    logo: '/assets/backgrounds/cica-ampoule.jpeg',
    specialization: 'Fermented Skincare & Herbal Formulations',
    location: 'Seoul, South Korea',
    certifications: ['KFDA Certified', 'Cruelty-Free', 'Vegan Options'],
  },
  {
    id: 'partner-2',
    name: 'Glow Research',
    description: 'Skin-focused cosmetic research with refined tone-up and radiance-oriented formulas.',
    logo: '/assets/products/luminous-glow-serum.jpg',
    specialization: 'Brightening & Tone-Up Technology',
    location: 'Incheon, South Korea',
    certifications: ['ISO 22716', 'EWG Verified', 'Dermatologist Tested'],
  },
  {
    id: 'partner-3',
    name: 'Seoul Skin Science',
    description: 'Sensitive-skin-focused skincare developed through long-term formulation research and careful testing.',
    logo: '/assets/editorial/skincare-ingredients.jpg',
    specialization: 'Sensitive Skin & Clinical Solutions',
    location: 'Busan, South Korea',
    certifications: ['Clinical Studies', 'Hypoallergenic', 'Fragrance-Free Options'],
  },
]

// Categories
export const categories: Category[] = [
  {
    id: 'cat-skincare',
    slug: 'skincare',
    name: 'Skin Care',
    description: 'Daily care formats prepared for verified supplier data',
    image: '/assets/editorial/skincare-ingredients.jpg',
    productCount: products.filter((product) => ['cream', 'oil', 'mask', 'cleanser', 'toner', 'sun care', 'serum', 'ampoule', 'essence', 'lotion', 'fluid', 'emulsion', 'eye care', 'mist', 'toner pad', 'cleansing oil', 'exfoliant', 'tone-up care', 'trial care'].includes(product.category)).length,
    subcategories: [
      { id: 'cat-cleansers', slug: 'cleansers', name: 'Cleansers', description: 'Cleansing formats pending verified details', image: '/assets/products/glass-skin-essence.jpg', productCount: getProductsByCategory('cleansers').length },
      { id: 'cat-cleansing-oils', slug: 'cleansing-oils', name: 'Cleansing Oils', description: 'Oil cleansing drafts pending review', image: '/assets/products/luminous-glow-serum.jpg', productCount: getProductsByCategory('cleansing-oils').length },
      { id: 'cat-exfoliants', slug: 'exfoliants', name: 'Exfoliants', description: 'Exfoliating formats pending review', image: '/assets/editorial/skincare-ingredients.jpg', productCount: getProductsByCategory('exfoliants').length },
      { id: 'cat-toners', slug: 'toners', name: 'Toners', description: 'Toner drafts pending verified details', image: '/assets/backgrounds/cica-ampoule.jpeg', productCount: getProductsByCategory('toners').length },
      { id: 'cat-toner-pads', slug: 'toner-pads', name: 'Toner Pads', description: 'Pad formats pending review', image: '/assets/editorial/product-table.png', productCount: getProductsByCategory('toner-pads').length },
      { id: 'cat-essences', slug: 'essences', name: 'Essences', description: 'Essence drafts pending documentation', image: '/assets/products/glass-skin-essence.jpg', productCount: getProductsByCategory('essences').length },
      { id: 'cat-serums', slug: 'serums', name: 'Serums', description: 'Serum drafts pending documentation', image: '/assets/products/luminous-glow-serum.jpg', productCount: getProductsByCategory('serums').length },
      { id: 'cat-ampoules', slug: 'ampoules', name: 'Ampoules', description: 'Ampoule drafts pending documentation', image: '/assets/backgrounds/cica-ampoule.jpeg', productCount: getProductsByCategory('ampoules').length },
      { id: 'cat-moisturizers', slug: 'moisturizers', name: 'Creams', description: 'Cream drafts pending review', image: '/assets/editorial/care-expert.jpg', productCount: getProductsByCategory('moisturizers').length },
      { id: 'cat-lotions', slug: 'lotions', name: 'Lotions', description: 'Lotion drafts pending review', image: '/assets/placeholders/placeholder.svg', productCount: getProductsByCategory('lotions').length },
      { id: 'cat-fluids', slug: 'fluids', name: 'Fluids', description: 'Fluid drafts pending review', image: '/assets/placeholders/placeholder.svg', productCount: getProductsByCategory('fluids').length },
      { id: 'cat-emulsions', slug: 'emulsions', name: 'Emulsions', description: 'Emulsion drafts pending review', image: '/assets/placeholders/placeholder.svg', productCount: getProductsByCategory('emulsions').length },
      { id: 'cat-eye-care', slug: 'eye-care', name: 'Eye Care', description: 'Eye care drafts pending review', image: '/assets/editorial/eye-care.png', productCount: getProductsByCategory('eye-care').length },
      { id: 'cat-mists', slug: 'mists', name: 'Mists', description: 'Mist drafts pending review', image: '/assets/placeholders/placeholder.svg', productCount: getProductsByCategory('mists').length },
      { id: 'cat-suncare', slug: 'sun-care', name: 'Sun Care', description: 'Sun care drafts pending regulatory review', image: '/assets/editorial/tone-up-sun-cream.png', productCount: getProductsByCategory('sun-care').length },
      { id: 'cat-base-care', slug: 'base-care', name: 'Tone-Up & Base', description: 'Base care drafts pending review', image: '/assets/editorial/rose-layering.png', productCount: getProductsByCategory('base-care').length },
      { id: 'cat-trial-pouches', slug: 'trial-pouches', name: 'Trial Pouches', description: 'Trial format drafts pending review', image: '/assets/placeholders/placeholder.svg', productCount: getProductsByCategory('trial-pouches').length },
      { id: 'cat-masks', slug: 'masks', name: 'Masks', description: 'Mask formats pending verified details', image: '/assets/editorial/sun-care.png', productCount: getProductsByCategory('masks').length },
      { id: 'cat-sheet-masks', slug: 'sheet-masks', name: 'Sheet Masks', description: 'Sheet mask drafts pending review', image: '/assets/placeholders/placeholder.svg', productCount: getProductsByCategory('sheet-masks').length },
      { id: 'cat-wash-off-packs', slug: 'wash-off-packs', name: 'Wash-Off Packs', description: 'Wash-off pack drafts pending review', image: '/assets/placeholders/placeholder.svg', productCount: getProductsByCategory('wash-off-packs').length },
    ],
  },
  {
    id: 'cat-body-care',
    slug: 'body-care',
    name: 'Body Care',
    description: 'Body care formats prepared for verified supplier data',
    image: '/assets/editorial/product-table.png',
    productCount: getProductsByCategory('body care').length,
    subcategories: [
      { id: 'cat-body-wash', slug: 'body-wash', name: 'Body Wash', description: 'Body wash drafts pending review', image: '/assets/placeholders/placeholder.svg', productCount: getProductsByCategory('body-wash').length },
      { id: 'cat-body-lotion', slug: 'body-lotion', name: 'Body Lotion', description: 'Body lotion drafts pending review', image: '/assets/placeholders/placeholder.svg', productCount: getProductsByCategory('body-lotion').length },
      { id: 'cat-body-oil', slug: 'body-oil', name: 'Body Oil', description: 'Body oil drafts pending review', image: '/assets/placeholders/placeholder.svg', productCount: getProductsByCategory('body-oil').length },
      { id: 'cat-body-mist', slug: 'body-mist', name: 'Body Mist', description: 'Body mist drafts pending review', image: '/assets/placeholders/placeholder.svg', productCount: getProductsByCategory('body-mist').length },
      { id: 'cat-bath-care', slug: 'bath-care', name: 'Bath Care', description: 'Bath care drafts pending review', image: '/assets/placeholders/placeholder.svg', productCount: getProductsByCategory('bath-care').length },
      { id: 'cat-hand-care', slug: 'hand-care', name: 'Hand Care', description: 'Hand care drafts pending review', image: '/assets/placeholders/placeholder.svg', productCount: getProductsByCategory('hand-care').length },
      { id: 'cat-foot-care', slug: 'foot-care', name: 'Foot Care', description: 'Foot care drafts pending review', image: '/assets/placeholders/placeholder.svg', productCount: getProductsByCategory('foot-care').length },
    ],
  },
  {
    id: 'cat-hair-care',
    slug: 'hair-care',
    name: 'Hair Care',
    description: 'Hair care formats prepared for verified supplier data',
    image: '/assets/placeholders/placeholder.svg',
    productCount: getProductsByCategory('hair care').length,
    subcategories: [
      { id: 'cat-shampoo', slug: 'shampoo', name: 'Shampoo', description: 'Shampoo drafts pending review', image: '/assets/placeholders/placeholder.svg', productCount: getProductsByCategory('shampoo').length },
      { id: 'cat-rinse', slug: 'rinse', name: 'Rinse', description: 'Rinse drafts pending review', image: '/assets/placeholders/placeholder.svg', productCount: getProductsByCategory('rinse').length },
      { id: 'cat-hair-treatment', slug: 'hair-treatment', name: 'Treatments', description: 'Treatment drafts pending review', image: '/assets/placeholders/placeholder.svg', productCount: getProductsByCategory('hair-treatment').length },
      { id: 'cat-hair-essence', slug: 'hair-essence', name: 'Hair Essence', description: 'Hair essence drafts pending review', image: '/assets/placeholders/placeholder.svg', productCount: getProductsByCategory('hair-essence').length },
      { id: 'cat-hair-tonic', slug: 'hair-tonic', name: 'Hair Tonic', description: 'Hair tonic drafts pending review', image: '/assets/placeholders/placeholder.svg', productCount: getProductsByCategory('hair-tonic').length },
      { id: 'cat-hair-styling', slug: 'hair-styling', name: 'Styling', description: 'Styling drafts pending review', image: '/assets/placeholders/placeholder.svg', productCount: getProductsByCategory('hair-styling').length },
    ],
  },
  {
    id: 'cat-sets',
    slug: 'sets',
    name: 'Care Sets',
    description: 'Set drafts pending verified product selection',
    image: '/assets/editorial/eye-care.png',
    productCount: getProductsByCategory('sets').length,
  },
  {
    id: 'cat-fragrance',
    slug: 'fragrance',
    name: 'Fragrance',
    description: 'Fragrance drafts pending positioning and compliance review',
    image: '/assets/placeholders/placeholder.svg',
    productCount: getProductsByCategory('fragrance').length,
  },
  {
    id: 'cat-bestsellers',
    slug: 'best-sellers',
    name: 'Reviewed Favorites',
    description: 'Reserved for verified sales and review data',
    image: '/assets/editorial/serum-dropper.png',
    productCount: 0,
  },
  {
    id: 'cat-new',
    slug: 'new-arrivals',
    name: 'Supplier Review',
    description: 'JISOO product records prepared from reviewed supplier references',
    image: '/assets/editorial/product-table.png',
    productCount: products.length,
  },
]

// Products are defined in ./products with neutral JISOO records ready for final verification.

// Reviews
export const reviews: Review[] = []

export function getProductReviews(productId: string): Review[] {
  return reviews.filter((review) => review.productId === productId)
}

// Verified testimonials will be imported only after real customer review approval.
export const testimonials: Testimonial[] = []

// Sample Customer
export const sampleCustomer: Customer = {
  id: 'cust-1',
  email: 'sarah@example.com',
  firstName: 'Sarah',
  lastName: 'Mitchell',
  phone: '+971501234567',
  avatar: '/assets/placeholders/user.jpg',
  addresses: [
    {
      id: 'addr-1',
      firstName: 'Sarah',
      lastName: 'Mitchell',
      address1: '123 Palm Jumeirah',
      address2: 'Apt 45',
      city: 'Dubai',
      postalCode: '00000',
      country: 'United Arab Emirates',
      phone: '+971501234567',
      isDefault: true,
    },
  ],
  defaultShippingAddressId: 'addr-1',
  defaultBillingAddressId: 'addr-1',
  wishlist: [
    'prod-radiance-boost-vitamin-c-23-serum',
    'prod-daily-uv-shield-sun-cream',
    'prod-pore-clear-vita-c-cleansing-foam',
  ],
  recentlyViewed: [
    'prod-pore-deep-clean-bubble-serum',
    'prod-azulene-toner-pad',
    'prod-daily-uv-shield-sun-cream',
  ],
  points: 2450,
  tier: 'gold',
  createdAt: '2023-06-15',
}

// Sample Orders
export const sampleOrders: Order[] = [
  {
    id: 'order-1',
    orderNumber: 'JISOO-2024-001234',
    status: 'delivered',
    items: [
      { id: 'item-1', product: products[0], quantity: 1, price: 78 },
      { id: 'item-2', product: products[1], quantity: 2, price: 130 },
    ],
    subtotal: 208,
    tax: 10.40,
    shipping: 0,
    discount: 20,
    total: 198.40,
    currency: 'EUR',
    shippingAddress: sampleCustomer.addresses[0],
    billingAddress: sampleCustomer.addresses[0],
    paymentMethod: 'PayPal',
    createdAt: '2024-02-10',
    updatedAt: '2024-02-18',
    trackingNumber: 'DHL1234567890',
    estimatedDelivery: '2024-02-18',
  },
  {
    id: 'order-2',
    orderNumber: 'JISOO-2024-001567',
    status: 'shipped',
    items: [
      { id: 'item-3', product: products[4], quantity: 1, price: 0 },
    ],
    subtotal: 58,
    tax: 2.90,
    shipping: 5,
    discount: 0,
    total: 65.90,
    currency: 'EUR',
    shippingAddress: sampleCustomer.addresses[0],
    billingAddress: sampleCustomer.addresses[0],
    paymentMethod: 'Credit Card',
    createdAt: '2024-03-05',
    updatedAt: '2024-03-07',
    trackingNumber: 'DHL9876543210',
    estimatedDelivery: '2024-03-12',
  },
]

// Coupons
export const coupons: Coupon[] = [
  {
    code: 'WELCOME20',
    description: '20% off your first order',
    discountType: 'percentage',
    discountValue: 20,
    minOrderAmount: 50,
    isActive: true,
    validFrom: '2024-01-01',
    validUntil: '2024-12-31',
    usedCount: 0,
  },
  {
    code: 'GLOW10',
    description: '10% off all serums',
    discountType: 'percentage',
    discountValue: 10,
    isActive: true,
    validFrom: '2024-03-01',
    validUntil: '2024-04-30',
    usedCount: 0,
  },
]

// Concerns for filtering
export const skinConcerns = [
  { id: 'hydration', name: 'Hydration', icon: 'droplet' },
  { id: 'soothing', name: 'Soothing', icon: 'heart' },
  { id: 'glow', name: 'Glow & Radiance', icon: 'sparkles' },
  { id: 'pores', name: 'Pores', icon: 'circle' },
  { id: 'tone-up', name: 'Tone-Up', icon: 'sun' },
  { id: 'sensitive', name: 'Sensitive Skin', icon: 'shield' },
  { id: 'anti-aging', name: 'Anti-Aging', icon: 'clock' },
  { id: 'acne', name: 'Acne & Blemishes', icon: 'x-circle' },
]

for (const partner of partners) {
  partner.logo = resolveImageSrc(partner.logo)
}

for (const category of categories) {
  category.image = resolveImageSrc(category.image)
  for (const subcategory of category.subcategories ?? []) {
    subcategory.image = resolveImageSrc(subcategory.image)
  }
}

for (const testimonial of testimonials) {
  testimonial.customerAvatar = resolveImageSrc(testimonial.customerAvatar)
}

sampleCustomer.avatar = resolveImageSrc(sampleCustomer.avatar)

// Product helper functions are re-exported from ./products.
