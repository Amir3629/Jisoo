import { NextResponse } from 'next/server'
import { getComplianceSummary } from '@/lib/services/compliance'

export async function GET() {
  const summary = await getComplianceSummary()
  return NextResponse.json(summary)
}
