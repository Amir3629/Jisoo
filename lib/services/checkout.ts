import type { Order, OrderItem } from '@/lib/domain/models'
import type { CartItem, Region, Currency } from '@/lib/types'
import { orderRepository } from '@/lib/repositories'

export type PaymentProviderType = 'paypal' | 'manual'

export interface CheckoutInput {
  customerId?: string
  region: Region
  currency: Currency
  cartItems: CartItem[]
  shippingAddressId?: string
  billingAddressId?: string
  paymentProvider: PaymentProviderType
}

export interface PaymentIntentResult {
  provider: PaymentProviderType
  checkoutToken: string
  approvalUrl?: string
  status: 'created' | 'requires_action'
}

export interface PaymentGateway {
  createIntent(order: Order): Promise<PaymentIntentResult>
}

class MockPaypalGateway implements PaymentGateway {
  async createIntent(order: Order): Promise<PaymentIntentResult> {
    return {
      provider: 'paypal',
      checkoutToken: `paypal_${order.id}`,
      approvalUrl: `/checkout?token=paypal_${order.id}`,
      status: 'requires_action',
    }
  }
}

class ManualGateway implements PaymentGateway {
  async createIntent(order: Order): Promise<PaymentIntentResult> {
    return {
      provider: 'manual',
      checkoutToken: `manual_${order.id}`,
      status: 'created',
    }
  }
}

function toOrderItems(cartItems: CartItem[]): OrderItem[] {
  return cartItems.map(item => {
    const unitPrice = item.variant?.price ?? item.product.price
    return {
      id: `${item.product.id}:${item.variant?.id ?? 'default'}`,
      productId: item.product.id,
      variantId: item.variant?.id,
      name: item.product.name,
      quantity: item.quantity,
      unitPrice,
      lineTotal: unitPrice * item.quantity,
    }
  })
}

function selectGateway(paymentProvider: PaymentProviderType): PaymentGateway {
  return paymentProvider === 'paypal' ? new MockPaypalGateway() : new ManualGateway()
}

export async function createCheckoutOrder(input: CheckoutInput): Promise<{ order: Order; paymentIntent: PaymentIntentResult }> {
  const items = toOrderItems(input.cartItems)
  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0)
  const shippingAmount = subtotal >= 100 ? 0 : 9.99
  const taxAmount = subtotal * 0.08
  const totalAmount = subtotal + shippingAmount + taxAmount
  const now = new Date().toISOString()

  const order: Order = {
    id: `ord_${Date.now()}`,
    customerId: input.customerId,
    region: input.region,
    currency: input.currency,
    status: 'pending',
    items,
    subtotal,
    shippingAmount,
    taxAmount,
    totalAmount,
    paymentProvider: input.paymentProvider,
    paymentStatus: 'pending',
    shippingAddressId: input.shippingAddressId,
    billingAddressId: input.billingAddressId,
    createdAt: now,
    updatedAt: now,
  }

  await orderRepository.upsert(order)

  const gateway = selectGateway(input.paymentProvider)
  const paymentIntent = await gateway.createIntent(order)

  return { order, paymentIntent }
}
