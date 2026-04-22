import { NextResponse } from 'next/server'
import { createSocialDraft } from '@/lib/services/social'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const post = await createSocialDraft(body)
    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to create post' }, { status: 400 })
  }
}
