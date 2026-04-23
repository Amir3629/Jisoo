import { NextResponse } from 'next/server'
import { getProductRecommendations } from '@/lib/services/ai'

export async function POST(request: Request) {
  const body = await request.json()
  const recommendedProductIds = await getProductRecommendations(body.context ?? '')
  return NextResponse.json({ recommendedProductIds })
}
