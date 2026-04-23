import { NextResponse } from 'next/server'
import { getAnalyticsSnapshot } from '@/lib/services/analytics'

export async function GET() {
  const snapshot = await getAnalyticsSnapshot()
  return NextResponse.json(snapshot)
}
