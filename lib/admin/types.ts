// Admin Types for JISOO Operations Platform
import type { Product, Region, Language, Currency, Order, Customer } from '../types'

// ============ Supplier Types ============
export type SupplierSyncStatus = 'synced' | 'syncing' | 'error' | 'pending'
export type ProductChangeType = 'new' | 'updated' | 'removed' | 'unchanged'
export type ProductIngestionStatus = 'pending' | 'approved' | 'rejected' | 'staged' | 'published'

export interface Supplier {
  id: string
  name: string
  code: string
  logo: string
  location: string
  description: string
  specialization: string
  apiEndpoint?: string
  lastSyncAt: string
  syncStatus: SupplierSyncStatus
  totalProducts: number
  pendingProducts: number
  activeProducts: number
  contactEmail: string
  contactName: string
  certifications: string[]
}

export interface SupplierProduct {
  id: string
  supplierId: string
  supplierSku: string
  internalSku?: string
  name: string
  description: string
  price: number
  currency: Currency
  images: string[]
  category: string
  ingredients: string[]
  changeType: ProductChangeType
  status: ProductIngestionStatus
  previousVersion?: Partial<SupplierProduct>
  diff?: ProductDiff[]
  receivedAt: string
  processedAt?: string
  publishedAt?: string
  processedBy?: string
  notes?: string
}

export interface ProductDiff {
  field: string
  oldValue: string | number | null
  newValue: string | number | null
}

export interface SupplierNotification {
  id: string
  supplierId: string
  type: 'sync_complete' | 'sync_error' | 'new_products' | 'price_change' | 'product_removed'
  title: string
  message: string
  isRead: boolean
  createdAt: string
}

// ============ Region & Compliance Types ============
export type MarketStatus = 'visible_and_buyable' | 'visible_but_not_buyable' | 'hidden' | 'pending_compliance'
export type ComplianceDocType = 'COA' | 'MSDS' | 'STABILITY_REPORT' | 'LABEL' | 'INCI' | 'ALLERGEN' | 'OTHER'
export type ComplianceStatus = 'compliant' | 'non_compliant' | 'pending_review' | 'expired' | 'missing'

export interface MarketAvailability {
  productId: string
  productName: string
  productImage: string
  markets: {
    UAE: MarketStatus
    EU: MarketStatus
    CA: MarketStatus
  }
  complianceStatus: {
    UAE: ComplianceStatus
    EU: ComplianceStatus
    CA: ComplianceStatus
  }
  lastUpdated: string
  updatedBy?: string
  notes?: string
}

export interface ComplianceDocument {
  id: string
  productId: string
  type: ComplianceDocType
  name: string
  fileUrl: string
  fileSize: number
  region: Region | 'ALL'
  version: string
  uploadedAt: string
  uploadedBy: string
  expiresAt?: string
  status: ComplianceStatus
  notes?: string
}

export interface ComplianceRecord {
  productId: string
  productName: string
  productImage: string
  documents: ComplianceDocument[]
  complaints: ComplaintRecord[]
  labelVersions: LabelVersion[]
  marketReadiness: Record<Region, ComplianceStatus>
  lastAuditDate?: string
  nextAuditDue?: string
}

export interface ComplaintRecord {
  id: string
  productId: string
  customerId?: string
  region: Region
  type: 'adverse_reaction' | 'quality_issue' | 'packaging' | 'other'
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  status: 'open' | 'investigating' | 'resolved' | 'closed'
  resolution?: string
  createdAt: string
  resolvedAt?: string
  assignedTo?: string
}

export interface LabelVersion {
  id: string
  productId: string
  region: Region
  version: string
  language: Language
  fileUrl: string
  status: 'draft' | 'approved' | 'active' | 'archived'
  approvedAt?: string
  approvedBy?: string
  createdAt: string
}

// ============ Translation Types ============
export type TranslationStatus = 'pending' | 'machine_translated' | 'human_reviewed' | 'approved' | 'published'

export interface TranslationEntry {
  id: string
  entityType: 'product' | 'category' | 'content' | 'ui'
  entityId: string
  entityName: string
  field: string
  sourceLanguage: Language
  targetLanguage: Language
  sourceText: string
  machineTranslation?: string
  humanTranslation?: string
  finalText?: string
  status: TranslationStatus
  translatedBy?: string
  reviewedBy?: string
  lastUpdatedAt: string
}

export interface TranslationTask {
  id: string
  entityType: 'product' | 'category' | 'content'
  entityId: string
  entityName: string
  sourceLanguage: Language
  targetLanguages: Language[]
  fieldsToTranslate: string[]
  entries: TranslationEntry[]
  priority: 'low' | 'medium' | 'high'
  dueDate?: string
  status: 'pending' | 'in_progress' | 'review' | 'complete'
  assignedTo?: string
  createdAt: string
}

// ============ Media Types ============
export type MediaType = 'image' | 'video' | 'document'
export type CropPreset = 'website_hero' | 'website_product' | 'website_thumbnail' | 'instagram_square' | 'instagram_story' | 'tiktok_vertical'

export interface MediaAsset {
  id: string
  name: string
  type: MediaType
  originalUrl: string
  watermarkedUrl?: string
  thumbnailUrl: string
  width: number
  height: number
  fileSize: number
  mimeType: string
  focalPoint?: { x: number; y: number }
  crops: MediaCrop[]
  tags: string[]
  productIds: string[]
  uploadedAt: string
  uploadedBy: string
}

export interface MediaCrop {
  preset: CropPreset
  url: string
  width: number
  height: number
}

// ============ Social Publishing Types ============
export type SocialChannel = 'instagram' | 'tiktok' | 'website'
export type PublishStatus = 'draft' | 'scheduled' | 'published' | 'failed'

export interface SocialPost {
  id: string
  channel: SocialChannel
  title: string
  caption: string
  mediaIds: string[]
  productIds: string[]
  scheduledAt?: string
  publishedAt?: string
  status: PublishStatus
  approvedBy?: string
  approvedAt?: string
  engagement?: {
    likes: number
    comments: number
    shares: number
    views: number
  }
  createdAt: string
  createdBy: string
}

export interface ContentCalendarItem {
  id: string
  date: string
  posts: SocialPost[]
  notes?: string
}

// ============ Analytics Types ============
export interface SalesMetric {
  date: string
  revenue: number
  orders: number
  averageOrderValue: number
  conversionRate: number
}

export interface RegionMetric {
  region: Region
  revenue: number
  orders: number
  visitors: number
  conversionRate: number
  topProducts: string[]
  growth: number
}

export interface ProductPerformance {
  productId: string
  productName: string
  productImage: string
  revenue: number
  unitsSold: number
  views: number
  conversionRate: number
  returnRate: number
  averageRating: number
  trend: 'up' | 'down' | 'stable'
}

export interface SupplierPerformance {
  supplierId: string
  supplierName: string
  revenue: number
  productCount: number
  averageRating: number
  topProducts: string[]
}

export interface AnalyticsDashboard {
  period: 'day' | 'week' | 'month' | 'year'
  totalRevenue: number
  revenueGrowth: number
  totalOrders: number
  ordersGrowth: number
  totalVisitors: number
  visitorsGrowth: number
  conversionRate: number
  conversionGrowth: number
  averageOrderValue: number
  aovGrowth: number
  salesByDay: SalesMetric[]
  salesByRegion: RegionMetric[]
  topProducts: ProductPerformance[]
  topSuppliers: SupplierPerformance[]
  newCustomers: number
  returningCustomers: number
}

// ============ AI Copilot Types ============
export type AIInsightType = 'sales' | 'inventory' | 'compliance' | 'translation' | 'marketing' | 'customer'

export interface AIInsight {
  id: string
  type: AIInsightType
  title: string
  summary: string
  details: string
  priority: 'low' | 'medium' | 'high'
  actionItems?: string[]
  relatedProducts?: string[]
  relatedRegions?: Region[]
  createdAt: string
  isRead: boolean
  isDismissed: boolean
}

export interface AICopilotMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  insights?: AIInsight[]
  productRecommendations?: string[]
  actionTaken?: string
}

export interface AICopilotSession {
  id: string
  messages: AICopilotMessage[]
  context?: {
    currentPage: string
    selectedProducts?: string[]
    selectedRegion?: Region
  }
  createdAt: string
}

// ============ Admin Dashboard Types ============
export interface AdminDashboardData {
  overview: {
    totalSales: number
    salesGrowth: number
    totalOrders: number
    ordersGrowth: number
    conversionRate: number
    conversionGrowth: number
    pendingSupplierProducts: number
    lowStockAlerts: number
    regionRestrictionAlerts: number
    translationTasks: number
    socialTasks: number
  }
  recentActivity: ActivityItem[]
  topProducts: ProductPerformance[]
  aiInsights: AIInsight[]
  pendingActions: PendingAction[]
}

export interface ActivityItem {
  id: string
  type: 'order' | 'product' | 'supplier' | 'compliance' | 'translation' | 'social'
  title: string
  description: string
  timestamp: string
  icon: string
  link?: string
}

export interface PendingAction {
  id: string
  type: 'supplier_review' | 'compliance_update' | 'translation_review' | 'social_approval'
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  dueDate?: string
  link: string
}

// ============ Admin User Types ============
export type AdminRole = 'super_admin' | 'admin' | 'manager' | 'editor' | 'viewer'

export interface AdminUser {
  id: string
  email: string
  name: string
  avatar?: string
  role: AdminRole
  permissions: string[]
  lastLoginAt: string
  createdAt: string
}

// ============ Order Management Types ============
export interface AdminOrder extends Order {
  customerEmail: string
  customerName: string
  internalNotes?: string
  communicationHistory: OrderCommunication[]
  timeline: OrderTimelineEvent[]
}

export interface OrderCommunication {
  id: string
  type: 'email' | 'sms' | 'internal_note'
  subject?: string
  content: string
  sentAt: string
  sentBy: string
}

export interface OrderTimelineEvent {
  id: string
  type: string
  title: string
  description: string
  timestamp: string
  actor?: string
}

// ============ Customer Management Types ============
export interface AdminCustomer extends Customer {
  totalSpent: number
  orderCount: number
  averageOrderValue: number
  lastOrderAt?: string
  isVIP: boolean
  segment: 'new' | 'regular' | 'loyal' | 'at_risk' | 'churned'
  notes?: string
  tags: string[]
  communicationPreferences: {
    email: boolean
    sms: boolean
    push: boolean
  }
}
