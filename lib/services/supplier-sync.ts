import type { SupplierProductFeed } from '@/lib/domain/models'
import { supplierFeedRepository } from '@/lib/repositories'

export interface SupplierAdapter {
  supplierId: string
  pullFeed(): Promise<SupplierProductFeed[]>
}

class MockSupplierAdapter implements SupplierAdapter {
  constructor(public supplierId: string) {}

  async pullFeed(): Promise<SupplierProductFeed[]> {
    const now = new Date().toISOString()
    return [
      {
        id: `${this.supplierId}-feed-${Date.now()}`,
        supplierId: this.supplierId,
        externalId: `${this.supplierId}-SKU-001`,
        payload: { name: 'Incoming Supplier Product', price: 49 },
        changeType: 'new',
        diffSummary: ['New product discovered from feed'],
        status: 'ingested',
        receivedAt: now,
      },
    ]
  }
}

const adapters: SupplierAdapter[] = [new MockSupplierAdapter('supplier-1'), new MockSupplierAdapter('supplier-2'), new MockSupplierAdapter('supplier-3')]

export async function runSupplierSync() {
  const feeds = (await Promise.all(adapters.map(adapter => adapter.pullFeed()))).flat()
  for (const feed of feeds) {
    await supplierFeedRepository.upsert(feed)
  }
  return feeds
}

export async function reviewSupplierFeed(feedId: string, approved: boolean, reviewedBy: string) {
  const existing = await supplierFeedRepository.getById(feedId)
  if (!existing) throw new Error('Feed item not found')

  const updated: SupplierProductFeed = {
    ...existing,
    status: approved ? 'approved' : 'rejected',
    reviewedAt: new Date().toISOString(),
    reviewedBy,
  }

  return supplierFeedRepository.upsert(updated)
}
