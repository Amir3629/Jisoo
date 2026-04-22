import { orderRepository, supplierFeedRepository } from '@/lib/repositories'

export async function getAnalyticsSnapshot() {
  const orders = await orderRepository.list()
  const supplierFeeds = await supplierFeedRepository.list()

  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0)
  const regionBuckets = orders.reduce<Record<string, { orders: number; revenue: number }>>((acc, order) => {
    const bucket = acc[order.region] ?? { orders: 0, revenue: 0 }
    bucket.orders += 1
    bucket.revenue += order.totalAmount
    acc[order.region] = bucket
    return acc
  }, {})

  return {
    totals: {
      orders: orders.length,
      revenue: totalRevenue,
      conversionRate: 2.3,
      visitors: 12045,
    },
    byRegion: regionBuckets,
    supplierQueue: {
      pendingFeedItems: supplierFeeds.filter(f => f.status === 'ingested' || f.status === 'staged').length,
      approvedFeedItems: supplierFeeds.filter(f => f.status === 'approved').length,
    },
  }
}
