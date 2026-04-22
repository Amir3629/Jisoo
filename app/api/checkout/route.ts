import { NextResponse } from 'next/server'
import { createCheckoutOrder } from '@/lib/services/checkout'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = await createCheckoutOrder(body)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Checkout failed' },
      { status: 400 },
    )
  }
}
