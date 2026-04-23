import { NextResponse } from 'next/server'
import { draftTranslationWithAI } from '@/lib/services/ai'
import { updateTranslationWithAIDraft } from '@/lib/services/translation'

export async function POST(request: Request) {
  try {
    const { entryId, sourceText, targetLocale } = await request.json()
    const aiDraft = await draftTranslationWithAI(sourceText, targetLocale)
    const updated = await updateTranslationWithAIDraft(entryId, aiDraft)
    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to create translation draft' }, { status: 400 })
  }
}
