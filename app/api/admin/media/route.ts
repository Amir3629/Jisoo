import { NextResponse } from 'next/server'
import { registerOriginalAsset } from '@/lib/services/media'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const asset = await registerOriginalAsset(body)
    return NextResponse.json(asset)
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to register media' }, { status: 400 })
  }
}
