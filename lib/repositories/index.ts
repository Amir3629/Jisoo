import { products } from '@/lib/data'
import type { Product as UiProduct } from '@/lib/types'
import type { ComplaintRecord, ComplianceRecord, Customer, Order, SupplierProductFeed, TranslationEntry, SocialPost, MediaAsset, AIInsight } from '@/lib/domain/models'
import { InMemoryRepository } from './base'

const nowIso = new Date().toISOString()

const seededCustomers: Customer[] = [
  {
    id: 'cust-demo-1',
    email: 'noura@example.com',
    firstName: 'Noura',
    lastName: 'Al Mansoori',
    region: 'UAE',
    loyaltyPoints: 120,
    giftCardBalance: 0,
    wishlistProductIds: ['prod-1', 'prod-2'],
    addressIds: [],
    createdAt: nowIso,
    updatedAt: nowIso,
  },
]

export const productRepository = new InMemoryRepository<UiProduct>(products)
export const customerRepository = new InMemoryRepository<Customer>(seededCustomers)
export const orderRepository = new InMemoryRepository<Order>([])
export const complianceRepository = new InMemoryRepository<ComplianceRecord>([])
export const complaintRepository = new InMemoryRepository<ComplaintRecord>([])
export const supplierFeedRepository = new InMemoryRepository<SupplierProductFeed>([])
export const translationRepository = new InMemoryRepository<TranslationEntry>([])
export const socialPostRepository = new InMemoryRepository<SocialPost>([])
export const mediaRepository = new InMemoryRepository<MediaAsset>([])
export const aiInsightRepository = new InMemoryRepository<AIInsight>([])
