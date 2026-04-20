// Region and Locale Types
export type Region = 'UAE' | 'EU' | 'CA'
export type Language = 'en' | 'ar' | 'fr' | 'de'
export type Currency = 'AED' | 'EUR' | 'CAD'

export interface RegionConfig {
  code: Region
  name: string
  currency: Currency
  currencySymbol: string
  languages: Language[]
  defaultLanguage: Language
  isRTL?: boolean
}

// Product Types
export type ProductAvailability = 'visible_and_buyable' | 'visible_but_not_buyable' | 'hidden' | 'pending_review'

export interface ProductVariant {
  id: string
  name: string
  sku: string
  price: number
  compareAtPrice?: number
  inStock: boolean
  stockQuantity: number
}

export interface ProductImage {
  id: string
  src: string
  alt: string
  isMain?: boolean
}

export interface ProductIngredient {
  name: string
  description: string
  benefit: string
  icon?: string
}

export interface ProductBenefit {
  title: string
  description: string
  icon: string
}

export interface Product {
  id: string
  slug: string
  name: string
  subtitle?: string
  brand: string
  partnerId: string
  description: string
  shortDescription: string
  price: number
  compareAtPrice?: number
  currency: Currency
  images: ProductImage[]
  category: string
  subcategory?: string
  tags: string[]
  skinTypes: string[]
  concerns: string[]
  ingredients: ProductIngredient[]
  benefits: ProductBenefit[]
  howToUse: string
  texture?: string
  finish?: string
  size: string
  rating: number
  reviewCount: number
  isNew?: boolean
  isBestSeller?: boolean
  isLimitedEdition?: boolean
  regionAvailability: Record<Region, ProductAvailability>
  variants?: ProductVariant[]
  relatedProducts?: string[]
  createdAt: string
}

// Category Types
export interface Category {
  id: string
  slug: string
  name: string
  description: string
  image: string
  productCount: number
  subcategories?: Category[]
}

// Partner Types
export interface Partner {
  id: string
  name: string
  description: string
  logo: string
  specialization: string
  location: string
  certifications: string[]
}

// Cart Types
export interface CartItem {
  id: string
  product: Product
  quantity: number
  variant?: ProductVariant
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  currency: Currency
}

// Order Types
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export interface OrderItem {
  id: string
  product: Product
  quantity: number
  price: number
  variant?: ProductVariant
}

export interface Order {
  id: string
  orderNumber: string
  status: OrderStatus
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  currency: Currency
  shippingAddress: Address
  billingAddress: Address
  paymentMethod: string
  createdAt: string
  updatedAt: string
  trackingNumber?: string
  estimatedDelivery?: string
}

// Customer Types
export interface Address {
  id: string
  firstName: string
  lastName: string
  company?: string
  address1: string
  address2?: string
  city: string
  state?: string
  postalCode: string
  country: string
  phone: string
  isDefault?: boolean
}

export interface Customer {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  avatar?: string
  addresses: Address[]
  defaultShippingAddressId?: string
  defaultBillingAddressId?: string
  wishlist: string[]
  recentlyViewed: string[]
  points: number
  tier: 'bronze' | 'silver' | 'gold' | 'platinum'
  createdAt: string
}

// Review Types
export interface Review {
  id: string
  productId: string
  customerId: string
  customerName: string
  customerAvatar?: string
  rating: number
  title: string
  content: string
  images?: string[]
  isVerified: boolean
  helpfulCount: number
  createdAt: string
}

// Coupon Types
export interface Coupon {
  code: string
  description: string
  discountType: 'percentage' | 'fixed'
  discountValue: number
  minOrderAmount?: number
  maxUses?: number
  usedCount: number
  validFrom: string
  validUntil: string
  isActive: boolean
}

// Gift Card Types
export interface GiftCard {
  code: string
  balance: number
  originalAmount: number
  currency: Currency
  isActive: boolean
  expiresAt: string
}

// Support Ticket Types
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed'
export type TicketPriority = 'low' | 'medium' | 'high'

export interface SupportTicket {
  id: string
  subject: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  orderId?: string
  messages: TicketMessage[]
  createdAt: string
  updatedAt: string
}

export interface TicketMessage {
  id: string
  content: string
  isFromCustomer: boolean
  attachments?: string[]
  createdAt: string
}

// AI Assistant Types
export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  productRecommendations?: Product[]
}

// Testimonial Types
export interface Testimonial {
  id: string
  customerName: string
  customerLocation: string
  customerAvatar?: string
  content: string
  rating: number
  productId?: string
  productName?: string
}
