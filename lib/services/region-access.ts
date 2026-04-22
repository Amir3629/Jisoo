import type { Product, ProductAvailability, Region } from '@/lib/types'

export interface RegionAccessResult {
  productId: string
  region: Region
  status: ProductAvailability
  isVisible: boolean
  isBuyable: boolean
  canAddToCart: boolean
  complianceWarning?: string
}

const warningByStatus: Partial<Record<ProductAvailability, string>> = {
  visible_but_not_buyable: 'This product is visible in your market but cannot currently be purchased.',
  pending_review: 'This product is pending regional compliance review.',
}

export function evaluateRegionAccess(product: Product, region: Region): RegionAccessResult {
  const status = product.regionAvailability[region]

  return {
    productId: product.id,
    region,
    status,
    isVisible: status !== 'hidden',
    isBuyable: status === 'visible_and_buyable',
    canAddToCart: status === 'visible_and_buyable',
    complianceWarning: warningByStatus[status],
  }
}

export function canPurchaseProduct(product: Product, region: Region): boolean {
  return evaluateRegionAccess(product, region).isBuyable
}
