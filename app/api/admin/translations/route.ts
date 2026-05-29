import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json(
    { error: 'AI translation draft generation is temporarily disabled until AI access is available.' },
    { status: 503 },
  )
}
