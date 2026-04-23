import type { Language, Region, Currency, ProductAvailability } from '@/lib/types'

export interface RegionAvailability {
  region: Region
  status: ProductAvailability
  complianceWarning?: string
  effectiveFrom?: string
  effectiveUntil?: string
}

export interface ProductVariant {
  id: string
  sku: string
  name: string
  shadeCode?: string
  price: number
  compareAtPrice?: number
  inStock: boolean
  stockQuantity: number
}

export interface Product {
  id: string
  slug: string
  supplierId: string
  sku: string
  name: string
  description: string
  category: string
  tags: string[]
  basePrice: number
  currency: Currency
  variants: ProductVariant[]
  regionAvailability: Record<Region, ProductAvailability>
  mediaAssetIds: string[]
  createdAt: string
  updatedAt: string
}

export interface Supplier {
  id: string
  code: string
  name: string
  contactName: string
  contactEmail: string
  apiEndpoint?: string
  enabled: boolean
  createdAt: string
}

export type SupplierFeedChangeType = 'new' | 'updated' | 'removed'
export type SupplierFeedStatus = 'ingested' | 'staged' | 'approved' | 'rejected' | 'published'

export interface SupplierProductFeed {
  id: string
  supplierId: string
  externalId: string
  payload: Record<string, unknown>
  changeType: SupplierFeedChangeType
  diffSummary: string[]
  status: SupplierFeedStatus
  receivedAt: string
  reviewedAt?: string
  reviewedBy?: string
}

export type ComplianceDocType = 'COA' | 'MSDS' | 'STABILITY' | 'LABEL_SAMPLE' | 'OTHER'
export type ComplianceStatus = 'compliant' | 'pending_review' | 'non_compliant' | 'expired' | 'missing'

export interface ComplianceRecord {
  id: string
  productId: string
  region: Region
  status: ComplianceStatus
  documentType: ComplianceDocType
  documentName: string
  documentUrl?: string
  expiresAt?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface ComplaintRecord {
  id: string
  productId: string
  customerId?: string
  region: Region
  complaintType: 'adverse_reaction' | 'quality_issue' | 'packaging' | 'labeling' | 'other'
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  resolution?: string
  status: 'open' | 'investigating' | 'resolved' | 'closed'
  createdAt: string
  updatedAt: string
}

export interface Address {
  id: string
  customerId: string
  label: string
  firstName: string
  lastName: string
  line1: string
  line2?: string
  city: string
  state?: string
  postalCode: string
  country: string
  phone?: string
  isDefaultShipping?: boolean
  isDefaultBilling?: boolean
}

export interface Customer {
  id: string
  email: string
  firstName: string
  lastName: string
  region: Region
  loyaltyPoints: number
  giftCardBalance: number
  wishlistProductIds: string[]
  addressIds: string[]
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: string
  productId: string
  variantId?: string
  name: string
  unitPrice: number
  quantity: number
  lineTotal: number
}

export interface Order {
  id: string
  customerId?: string
  region: Region
  currency: Currency
  status: 'pending' | 'paid' | 'processing' | 'fulfilled' | 'cancelled'
  items: OrderItem[]
  subtotal: number
  shippingAmount: number
  taxAmount: number
  totalAmount: number
  paymentProvider: 'paypal' | 'stripe' | 'manual'
  paymentStatus: 'pending' | 'authorized' | 'paid' | 'failed'
  shippingAddressId?: string
  billingAddressId?: string
  createdAt: string
  updatedAt: string
}

export type TranslationStatus = 'draft' | 'ai_draft' | 'human_review' | 'approved' | 'published'

export interface TranslationEntry {
  id: string
  key: string
  sourceLocale: Language
  targetLocale: Language
  sourceText: string
  aiDraft?: string
  humanEditedText?: string
  publishedText?: string
  status: TranslationStatus
  updatedAt: string
}

export type MediaAssetKind = 'original' | 'watermarked' | 'thumbnail' | 'social_crop'

export interface MediaAsset {
  id: string
  productId?: string
  originalUrl: string
  kind: MediaAssetKind
  width: number
  height: number
  format: string
  watermarkApplied: boolean
  derivativeOf?: string
  createdAt: string
}

export interface SocialPost {
  id: string
  channel: 'instagram' | 'tiktok'
  title: string
  caption: string
  locale: Language
  productIds: string[]
  mediaAssetIds: string[]
  status: 'draft' | 'approved' | 'scheduled' | 'published' | 'failed'
  scheduledFor?: string
  publishedAt?: string
  createdAt: string
}

export interface AIInsight {
  id: string
  insightType: 'recommendation' | 'translation_draft' | 'copy' | 'ops'
  title: string
  summary: string
  confidence: number
  payload: Record<string, unknown>
  createdAt: string
}
