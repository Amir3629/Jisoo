import { NextResponse } from 'next/server'
import { runSupplierSync } from '@/lib/services/supplier-sync'

export async function POST() {
  const feeds = await runSupplierSync()
  return NextResponse.json({ synced: feeds.length, feeds })
}
