import type { Product, Category, Partner, Customer, Order, Review, Testimonial, RegionConfig, Coupon } from './types'
import { resolveImageSrc } from './image-fallbacks'

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
    description: 'Traditional Korean herbal beauty innovations with modern science. Specializing in fermented ingredients and ancient formulations.',
    logo: '/background/photo-1596755389378-c31d21fd1273.jpeg',
    specialization: 'Fermented Skincare & Herbal Formulations',
    location: 'Seoul, South Korea',
    certifications: ['KFDA Certified', 'Cruelty-Free', 'Vegan Options'],
  },
  {
    id: 'partner-2',
    name: 'Glow Research',
    description: 'Cutting-edge dermatological research meets luxury beauty. Known for breakthrough tone-up and brightening technologies.',
    logo: '/products/luminous-glow-serum-1.jpg',
    specialization: 'Brightening & Tone-Up Technology',
    location: 'Incheon, South Korea',
    certifications: ['ISO 22716', 'EWG Verified', 'Dermatologist Tested'],
  },
  {
    id: 'partner-3',
    name: 'Seoul Skin Science',
    description: 'Clinical-grade skincare backed by decades of dermatological research. Pioneers in sensitive skin solutions.',
    logo: '/skincare-ingredients-featured.jpg',
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
    name: 'Skincare',
    description: 'Discover the essence of K-beauty skincare',
    image: '/skincare-ingredients-featured.jpg',
    productCount: 156,
    subcategories: [
      { id: 'cat-cleansers', slug: 'cleansers', name: 'Cleansers', description: 'Gentle yet effective cleansing', image: '/products/glass-skin-essence-1.jpg', productCount: 24 },
      { id: 'cat-toners', slug: 'toners', name: 'Toners', description: 'Prep and balance your skin', image: '/background/photo-1596755389378-c31d21fd1273.jpeg', productCount: 18 },
      { id: 'cat-serums', slug: 'serums', name: 'Serums', description: 'Concentrated active treatments', image: '/products/luminous-glow-serum-1.jpg', productCount: 32 },
      { id: 'cat-moisturizers', slug: 'moisturizers', name: 'Moisturizers', description: 'Deep hydration and nourishment', image: '/black-skincare-expert-recommended-products-295961-1635525452337-square-1200-80.jpg', productCount: 28 },
      { id: 'cat-suncare', slug: 'sun-care', name: 'Sun Care', description: 'Advanced UV protection', image: '/desing hero 2/ChatGPT Image Apr 24, 2026, 12_25_15 PM.png', productCount: 16 },
      { id: 'cat-masks', slug: 'masks', name: 'Masks', description: 'Weekly treatment rituals', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_20_39 PM.png', productCount: 38 },
    ],
  },
  {
    id: 'cat-makeup',
    slug: 'makeup',
    name: 'Makeup',
    description: 'Effortless beauty, Korean style',
    image: '/lip.jpg',
    productCount: 89,
    subcategories: [
      { id: 'cat-base', slug: 'base', name: 'Base Makeup', description: 'Flawless skin foundation', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_14_40 PM.png', productCount: 22 },
      { id: 'cat-lips', slug: 'lips', name: 'Lips', description: 'Vibrant colors and care', image: '/lip.jpg', productCount: 34 },
      { id: 'cat-eyes', slug: 'eyes', name: 'Eyes', description: 'Define and enhance', image: '/stunning-blue-eye-stockcake.jpg.webp', productCount: 28 },
      { id: 'cat-cheeks', slug: 'cheeks', name: 'Cheeks', description: 'Natural flush and glow', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_29_09 PM.png', productCount: 15 },
    ],
  },
  {
    id: 'cat-sets',
    slug: 'sets',
    name: 'Gift Sets',
    description: 'Curated beauty collections',
    image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_19_23 PM.png',
    productCount: 24,
  },
  {
    id: 'cat-bestsellers',
    slug: 'best-sellers',
    name: 'Best Sellers',
    description: 'Customer favorites',
    image: '/desing hero 2/ChatGPT Image Apr 24, 2026, 12_30_22 PM.png',
    productCount: 50,
  },
  {
    id: 'cat-new',
    slug: 'new-arrivals',
    name: 'New Arrivals',
    description: 'Fresh from Korea',
    image: '/hero7/Untitled design (32).png',
    productCount: 32,
  },
]

// Products
export const products: Product[] = [
  {
    id: 'prod-1',
    slug: 'luminous-glow-serum',
    name: 'Luminous Glow Serum',
    subtitle: 'Radiance-Boosting Vitamin C Complex',
    brand: 'JISOO',
    partnerId: 'partner-2',
    description: 'A breakthrough vitamin C serum that delivers intense brightening power while respecting sensitive skin. Formulated with 15% pure vitamin C, niacinamide, and fermented rice water for a luminous, glass-skin finish.',
    shortDescription: 'Vitamin C brightening serum for radiant, glass-skin glow',
    price: 78,
    compareAtPrice: 95,
    currency: 'EUR',
    images: [
      { id: 'img-1-1', src: '/products/luminous-glow-serum-1.jpg', alt: 'Luminous Glow Serum front view', isMain: true },
      { id: 'img-1-2', src: '/products/glass-skin-essence-1.jpg', alt: 'Luminous Glow Serum texture' },
      { id: 'img-1-3', src: '/skincare-ingredients-featured.jpg', alt: 'Luminous Glow Serum application' },
    ],
    category: 'skincare',
    subcategory: 'serums',
    tags: ['brightening', 'vitamin-c', 'anti-aging', 'glow'],
    skinTypes: ['All Skin Types', 'Dull Skin', 'Uneven Tone'],
    concerns: ['Dullness', 'Dark Spots', 'Uneven Skin Tone', 'Fine Lines'],
    ingredients: [
      { name: 'Vitamin C (15%)', description: 'L-Ascorbic Acid', benefit: 'Brightens and protects against free radicals' },
      { name: 'Niacinamide', description: 'Vitamin B3', benefit: 'Minimizes pores and evens skin tone' },
      { name: 'Fermented Rice Water', description: 'Traditional Korean ingredient', benefit: 'Hydrates and promotes radiance' },
      { name: 'Hyaluronic Acid', description: 'Multi-weight complex', benefit: 'Deep hydration at every skin level' },
    ],
    benefits: [
      { title: 'Instant Glow', description: 'Visible radiance from first application', icon: 'sparkles' },
      { title: 'Dark Spot Reduction', description: 'Fades pigmentation over time', icon: 'sun' },
      { title: 'Glass Skin Effect', description: 'Smooth, luminous finish', icon: 'droplet' },
    ],
    howToUse: 'Apply 3-4 drops to clean, toned skin morning and evening. Follow with moisturizer. Use sunscreen during the day.',
    texture: 'Lightweight, water-gel',
    finish: 'Dewy, luminous',
    size: '30ml',
    rating: 4.8,
    reviewCount: 324,
    isNew: false,
    isBestSeller: true,
    regionAvailability: {
      UAE: 'visible_and_buyable',
      EU: 'visible_and_buyable',
      CA: 'visible_and_buyable',
    },
    relatedProducts: ['prod-2', 'prod-3', 'prod-4'],
    createdAt: '2024-01-15',
  },
  {
    id: 'prod-2',
    slug: 'hydra-cloud-cream',
    name: 'Hydra Cloud Cream',
    subtitle: 'Weightless Deep Moisture',
    brand: 'JISOO',
    partnerId: 'partner-1',
    description: 'An ultra-lightweight yet deeply hydrating cream that melts into skin like a cloud. Powered by 7 types of hyaluronic acid and a proprietary ceramide complex for 72-hour moisture lock.',
    shortDescription: 'Cloud-like moisturizer for lasting hydration',
    price: 65,
    currency: 'EUR',
    images: [
      { id: 'img-2-1', src: '/black-skincare-expert-recommended-products-295961-1635525452337-square-1200-80.jpg', alt: 'Hydra Cloud Cream jar', isMain: true },
      { id: 'img-2-2', src: '/products/glass-skin-essence-1.jpg', alt: 'Hydra Cloud Cream texture' },
    ],
    category: 'skincare',
    subcategory: 'moisturizers',
    tags: ['hydrating', 'moisturizer', 'sensitive-skin', 'lightweight'],
    skinTypes: ['All Skin Types', 'Dry Skin', 'Dehydrated Skin'],
    concerns: ['Dryness', 'Dehydration', 'Sensitivity', 'Fine Lines'],
    ingredients: [
      { name: '7-HA Complex', description: '7 types of Hyaluronic Acid', benefit: 'Multi-level hydration' },
      { name: 'Ceramide NP', description: 'Skin-identical lipid', benefit: 'Strengthens moisture barrier' },
      { name: 'Centella Asiatica', description: 'Soothing botanical', benefit: 'Calms and repairs skin' },
    ],
    benefits: [
      { title: '72-Hour Hydration', description: 'Long-lasting moisture lock', icon: 'droplet' },
      { title: 'Barrier Repair', description: 'Strengthens skin defense', icon: 'shield' },
      { title: 'Weightless Feel', description: 'No greasy residue', icon: 'feather' },
    ],
    howToUse: 'Apply generously as the last step of your skincare routine. Can be layered for extra hydration.',
    texture: 'Whipped, cloud-like',
    finish: 'Velvet matte',
    size: '50ml',
    rating: 4.9,
    reviewCount: 567,
    isBestSeller: true,
    regionAvailability: {
      UAE: 'visible_and_buyable',
      EU: 'visible_and_buyable',
      CA: 'visible_but_not_buyable',
    },
    relatedProducts: ['prod-1', 'prod-3'],
    createdAt: '2024-02-01',
  },
  {
    id: 'prod-3',
    slug: 'gentle-foam-cleanser',
    name: 'Gentle Cloud Foam Cleanser',
    subtitle: 'pH-Balanced Daily Cleanse',
    brand: 'JISOO',
    partnerId: 'partner-3',
    description: 'A luxuriously creamy foam cleanser that removes impurities without stripping. Formulated at skin-optimal pH 5.5 with soothing tea tree and calming green tea.',
    shortDescription: 'Gentle pH-balanced foam for daily cleansing',
    price: 32,
    currency: 'EUR',
    images: [
      { id: 'img-3-1', src: '/skincare-ingredients-featured.jpg', alt: 'Gentle Cloud Foam Cleanser', isMain: true },
    ],
    category: 'skincare',
    subcategory: 'cleansers',
    tags: ['cleanser', 'gentle', 'sensitive-skin', 'daily'],
    skinTypes: ['All Skin Types', 'Sensitive Skin'],
    concerns: ['Sensitivity', 'Cleansing'],
    ingredients: [
      { name: 'Green Tea Extract', description: 'Antioxidant-rich', benefit: 'Protects and soothes' },
      { name: 'Tea Tree Oil', description: 'Natural purifier', benefit: 'Gently cleanses without irritation' },
    ],
    benefits: [
      { title: 'pH 5.5 Formula', description: 'Respects skin barrier', icon: 'check' },
      { title: 'Sulfate-Free', description: 'No harsh stripping', icon: 'leaf' },
    ],
    howToUse: 'Pump foam onto damp hands, massage onto wet face, rinse thoroughly.',
    texture: 'Dense, creamy foam',
    finish: 'Clean, refreshed',
    size: '150ml',
    rating: 4.7,
    reviewCount: 289,
    regionAvailability: {
      UAE: 'visible_and_buyable',
      EU: 'visible_and_buyable',
      CA: 'visible_and_buyable',
    },
    createdAt: '2024-01-20',
  },
  {
    id: 'prod-4',
    slug: 'tone-up-sun-cream',
    name: 'Aura Tone-Up Sun Cream',
    subtitle: 'SPF50+ PA++++ with Glow Effect',
    brand: 'JISOO',
    partnerId: 'partner-2',
    description: 'A multitasking sunscreen that protects, tone-ups, and primes in one step. Micro-pearl technology creates an instant lit-from-within glow while providing superior UV protection.',
    shortDescription: 'Glowing sunscreen with SPF50+ and tone-up effect',
    price: 45,
    currency: 'EUR',
    images: [
      { id: 'img-4-1', src: '/desing hero 2/ChatGPT Image Apr 24, 2026, 12_25_15 PM.png', alt: 'Aura Tone-Up Sun Cream', isMain: true },
      { id: 'img-4-2', src: '/desing hero 2/ChatGPT Image Apr 24, 2026, 12_30_22 PM.png', alt: 'Aura Tone-Up Sun Cream swatch' },
    ],
    category: 'skincare',
    subcategory: 'sun-care',
    tags: ['sunscreen', 'tone-up', 'glow', 'spf50'],
    skinTypes: ['All Skin Types'],
    concerns: ['Sun Protection', 'Dullness', 'Uneven Tone'],
    ingredients: [
      { name: 'Micro-Pearl Complex', description: 'Light-reflecting pearls', benefit: 'Instant radiance boost' },
      { name: 'Niacinamide', description: 'Brightening vitamin', benefit: 'Evens skin tone over time' },
    ],
    benefits: [
      { title: 'SPF50+ PA++++', description: 'Maximum UV protection', icon: 'sun' },
      { title: 'Instant Tone-Up', description: 'Natural brightness', icon: 'sparkles' },
      { title: 'Makeup Primer', description: 'Smooth base for makeup', icon: 'layers' },
    ],
    howToUse: 'Apply liberally as the last step of morning skincare. Reapply every 2 hours when exposed to sun.',
    texture: 'Lightweight, silky',
    finish: 'Radiant, natural',
    size: '50ml',
    rating: 4.6,
    reviewCount: 412,
    isNew: true,
    regionAvailability: {
      UAE: 'visible_and_buyable',
      EU: 'visible_and_buyable',
      CA: 'pending_review',
    },
    createdAt: '2024-03-01',
  },
  {
    id: 'prod-5',
    slug: 'velvet-lip-tint',
    name: 'Velvet Matte Lip Tint',
    subtitle: 'Long-Wear Color',
    brand: 'JISOO',
    partnerId: 'partner-2',
    description: 'A weightless, transfer-proof lip tint that delivers rich color payoff with a soft velvet finish. Infused with hydrating oils to keep lips comfortable all day.',
    shortDescription: 'Velvety lip color that lasts all day',
    price: 28,
    currency: 'EUR',
    images: [
      { id: 'img-5-1', src: '/lip.jpg', alt: 'Velvet Matte Lip Tint', isMain: true },
    ],
    category: 'makeup',
    subcategory: 'lips',
    tags: ['lip-tint', 'matte', 'long-wear', 'hydrating'],
    skinTypes: ['All Skin Types'],
    concerns: ['Lip Color', 'Long-Wear'],
    ingredients: [
      { name: 'Jojoba Oil', description: 'Natural moisturizer', benefit: 'Keeps lips hydrated' },
      { name: 'Vitamin E', description: 'Antioxidant protection', benefit: 'Nourishes and protects' },
    ],
    benefits: [
      { title: '12-Hour Wear', description: 'Transfer-proof formula', icon: 'clock' },
      { title: 'Hydrating', description: 'No drying or flaking', icon: 'droplet' },
    ],
    howToUse: 'Apply directly to lips. Build for more intensity. No need for lip liner.',
    texture: 'Mousse-like',
    finish: 'Velvet matte',
    size: '4g',
    rating: 4.5,
    reviewCount: 178,
    variants: [
      { id: 'var-5-1', name: 'Rose Petal', sku: 'VLT-001', price: 28, inStock: true, stockQuantity: 45 },
      { id: 'var-5-2', name: 'Coral Kiss', sku: 'VLT-002', price: 28, inStock: true, stockQuantity: 32 },
      { id: 'var-5-3', name: 'Berry Crush', sku: 'VLT-003', price: 28, inStock: true, stockQuantity: 28 },
      { id: 'var-5-4', name: 'Nude Blush', sku: 'VLT-004', price: 28, inStock: false, stockQuantity: 0 },
    ],
    regionAvailability: {
      UAE: 'visible_and_buyable',
      EU: 'visible_and_buyable',
      CA: 'visible_and_buyable',
    },
    createdAt: '2024-02-15',
  },
  {
    id: 'prod-6',
    slug: 'cica-repair-ampoule',
    name: 'Cica Repair Ampoule',
    subtitle: 'Intensive Soothing Treatment',
    brand: 'JISOO',
    partnerId: 'partner-3',
    description: 'A concentrated ampoule with 95% Centella Asiatica extract for intense skin repair. Calms irritation, reduces redness, and strengthens the skin barrier for sensitive, stressed skin.',
    shortDescription: 'Intensive soothing ampoule for sensitive skin',
    price: 58,
    currency: 'EUR',
    images: [
      { id: 'img-6-1', src: '/background/photo-1596755389378-c31d21fd1273.jpeg', alt: 'Cica Repair Ampoule', isMain: true },
    ],
    category: 'skincare',
    subcategory: 'serums',
    tags: ['cica', 'soothing', 'sensitive-skin', 'repair'],
    skinTypes: ['Sensitive Skin', 'Irritated Skin', 'All Skin Types'],
    concerns: ['Redness', 'Irritation', 'Sensitivity', 'Barrier Repair'],
    ingredients: [
      { name: 'Centella Asiatica (95%)', description: 'Healing herb', benefit: 'Soothes and repairs skin' },
      { name: 'Madecassoside', description: 'Active compound', benefit: 'Reduces inflammation' },
      { name: 'Panthenol', description: 'Vitamin B5', benefit: 'Hydrates and calms' },
    ],
    benefits: [
      { title: 'Instant Calm', description: 'Reduces redness immediately', icon: 'heart' },
      { title: 'Barrier Repair', description: 'Strengthens skin defense', icon: 'shield' },
      { title: '95% Centella', description: 'Maximum concentration', icon: 'leaf' },
    ],
    howToUse: 'Apply 2-3 drops to irritated areas or all over face after toning. Follow with moisturizer.',
    texture: 'Watery, lightweight',
    finish: 'Dewy, comfortable',
    size: '30ml',
    rating: 4.9,
    reviewCount: 523,
    isBestSeller: true,
    regionAvailability: {
      UAE: 'visible_and_buyable',
      EU: 'visible_and_buyable',
      CA: 'visible_and_buyable',
    },
    createdAt: '2024-01-10',
  },
  {
    id: 'prod-7',
    slug: 'glass-skin-essence',
    name: 'Glass Skin Essence',
    subtitle: 'The Korean Glass Skin Secret',
    brand: 'JISOO',
    partnerId: 'partner-1',
    description: 'The iconic essence that delivers the famous Korean glass skin effect. Fermented botanical extracts plump and prep skin for maximum product absorption.',
    shortDescription: 'Essence for the ultimate glass skin effect',
    price: 52,
    currency: 'EUR',
    images: [
      { id: 'img-7-1', src: '/products/glass-skin-essence-1.jpg', alt: 'Glass Skin Essence', isMain: true },
    ],
    category: 'skincare',
    subcategory: 'toners',
    tags: ['essence', 'glass-skin', 'fermented', 'hydrating'],
    skinTypes: ['All Skin Types'],
    concerns: ['Dullness', 'Dehydration', 'Texture'],
    ingredients: [
      { name: 'Fermented Rice Extract', description: 'Traditional Korean ingredient', benefit: 'Brightens and plumps' },
      { name: 'Galactomyces', description: 'Fermented yeast', benefit: 'Refines texture' },
      { name: 'Bifida Ferment', description: 'Probiotic ingredient', benefit: 'Strengthens skin barrier' },
    ],
    benefits: [
      { title: 'Glass Skin Effect', description: 'Instantly luminous', icon: 'sparkles' },
      { title: 'Better Absorption', description: 'Preps skin for serums', icon: 'layers' },
    ],
    howToUse: 'Pat gently into skin after cleansing and toning. Use morning and night.',
    texture: 'Watery, fluid',
    finish: 'Glowy, plump',
    size: '150ml',
    rating: 4.8,
    reviewCount: 634,
    isBestSeller: true,
    isNew: true,
    regionAvailability: {
      UAE: 'visible_and_buyable',
      EU: 'visible_and_buyable',
      CA: 'visible_and_buyable',
    },
    createdAt: '2024-03-10',
  },
  {
    id: 'prod-8',
    slug: 'pore-minimizing-serum',
    name: 'Pore Refining Serum',
    subtitle: 'Visible Pore Minimizer',
    brand: 'JISOO',
    partnerId: 'partner-2',
    description: 'A targeted serum that visibly minimizes pores and controls excess oil. BHA and PHA gently exfoliate while zinc regulates sebum for a refined, smooth complexion.',
    shortDescription: 'Pore-minimizing serum for refined skin',
    price: 48,
    currency: 'EUR',
    images: [
      { id: 'img-8-1', src: '/stunning-blue-eye-stockcake.jpg.webp', alt: 'Pore Refining Serum', isMain: true },
    ],
    category: 'skincare',
    subcategory: 'serums',
    tags: ['pores', 'oil-control', 'exfoliating', 'refining'],
    skinTypes: ['Oily Skin', 'Combination Skin'],
    concerns: ['Enlarged Pores', 'Excess Oil', 'Texture'],
    ingredients: [
      { name: 'BHA (Salicylic Acid)', description: 'Oil-soluble acid', benefit: 'Clears pores from within' },
      { name: 'PHA', description: 'Gentle exfoliant', benefit: 'Smooths texture' },
      { name: 'Zinc PCA', description: 'Sebum regulator', benefit: 'Controls oil production' },
    ],
    benefits: [
      { title: 'Smaller Pores', description: 'Visibly refined appearance', icon: 'minimize' },
      { title: 'Oil Control', description: '12-hour matte finish', icon: 'droplet' },
    ],
    howToUse: 'Apply to T-zone or all over face after cleansing. Use in the evening for best results.',
    texture: 'Lightweight, fluid',
    finish: 'Matte, smooth',
    size: '30ml',
    rating: 4.6,
    reviewCount: 287,
    regionAvailability: {
      UAE: 'visible_and_buyable',
      EU: 'visible_and_buyable',
      CA: 'visible_but_not_buyable',
    },
    createdAt: '2024-02-20',
  },
]

// Reviews
export const reviews: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    customerId: 'cust-1',
    customerName: 'Sarah M.',
    customerAvatar: '/placeholder-user.jpg',
    rating: 5,
    title: 'Holy grail serum!',
    content: 'I have been using this serum for 3 months and my skin has never looked better. The glow is real and my dark spots have faded significantly. Worth every penny!',
    isVerified: true,
    helpfulCount: 45,
    createdAt: '2024-02-15',
  },
  {
    id: 'rev-2',
    productId: 'prod-1',
    customerId: 'cust-2',
    customerName: 'Fatima A.',
    rating: 5,
    title: 'Perfect for sensitive skin',
    content: 'I was worried about vitamin C irritating my sensitive skin but this formula is so gentle. I use it every day and love the results.',
    isVerified: true,
    helpfulCount: 32,
    createdAt: '2024-03-01',
  },
  {
    id: 'rev-3',
    productId: 'prod-2',
    customerId: 'cust-3',
    customerName: 'Emma L.',
    customerAvatar: '/placeholder-user.jpg',
    rating: 5,
    title: 'Cloud-like hydration',
    content: 'The texture is incredible - so light yet so hydrating. My dry skin drinks it up and stays plump all day. The 72-hour claim is not exaggerated!',
    isVerified: true,
    helpfulCount: 67,
    createdAt: '2024-02-28',
  },
]

// Testimonials
export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    customerName: 'Sophie Chen',
    customerLocation: 'Dubai, UAE',
    customerAvatar: '/placeholder-user.jpg',
    content: 'JISOO has completely transformed my skincare routine. The products feel so luxurious and the results speak for themselves. My skin has never been this glowy!',
    rating: 5,
    productName: 'Luminous Glow Serum',
  },
  {
    id: 'test-2',
    customerName: 'Marie Dubois',
    customerLocation: 'Paris, France',
    customerAvatar: '/placeholder-user.jpg',
    content: 'As a beauty editor, I have tried countless products. JISOO stands out for its quality and the authentic K-beauty experience. The Glass Skin Essence is now my holy grail.',
    rating: 5,
    productName: 'Glass Skin Essence',
  },
  {
    id: 'test-3',
    customerName: 'Aisha Rahman',
    customerLocation: 'Toronto, Canada',
    customerAvatar: '/placeholder-user.jpg',
    content: 'Finally, a K-beauty brand that ships to Canada! The quality is exceptional and the customer service is amazing. My sensitive skin loves the Cica Repair Ampoule.',
    rating: 5,
    productName: 'Cica Repair Ampoule',
  },
  {
    id: 'test-4',
    customerName: 'Elena Schmidt',
    customerLocation: 'Berlin, Germany',
    customerAvatar: '/placeholder-user.jpg',
    content: 'The packaging is beautiful, the formulas are effective, and I love knowing that I am getting authentic Korean beauty products. JISOO is my new go-to!',
    rating: 5,
  },
]

// Sample Customer
export const sampleCustomer: Customer = {
  id: 'cust-1',
  email: 'sarah@example.com',
  firstName: 'Sarah',
  lastName: 'Mitchell',
  phone: '+971501234567',
  avatar: '/placeholder-user.jpg',
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
  wishlist: ['prod-2', 'prod-4', 'prod-7'],
  recentlyViewed: ['prod-1', 'prod-3', 'prod-5', 'prod-6'],
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
      { id: 'item-3', product: products[5], quantity: 1, price: 58 },
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

for (const product of products) {
  product.images = product.images.map(image => ({ ...image, src: resolveImageSrc(image.src) }))
}

for (const review of reviews) {
  review.customerAvatar = resolveImageSrc(review.customerAvatar)
}

for (const testimonial of testimonials) {
  testimonial.customerAvatar = resolveImageSrc(testimonial.customerAvatar)
}

sampleCustomer.avatar = resolveImageSrc(sampleCustomer.avatar)

// Helper functions
export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(p => p.category === categorySlug || p.subcategory === categorySlug)
}

export function getRelatedProducts(productId: string): Product[] {
  const product = getProductById(productId)
  if (!product?.relatedProducts) return []
  return product.relatedProducts.map(id => getProductById(id)).filter(Boolean) as Product[]
}

export function getProductReviews(productId: string): Review[] {
  return reviews.filter(r => r.productId === productId)
}

export function formatPrice(amount: number, currency: string = 'EUR'): string {
  const symbols: Record<string, string> = {
    EUR: '€',
    AED: 'AED ',
    CAD: 'CA$',
    TRY: '₺',
  }
  return `${symbols[currency] || currency}${amount.toFixed(2)}`
}
