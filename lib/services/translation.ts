import type { TranslationEntry } from '@/lib/domain/models'
import { translationRepository } from '@/lib/repositories'

export async function createTranslationEntry(entry: TranslationEntry) {
  return translationRepository.upsert(entry)
}

export async function updateTranslationWithAIDraft(entryId: string, aiDraft: string) {
  const current = await translationRepository.getById(entryId)
  if (!current) throw new Error('Translation entry not found')

  return translationRepository.upsert({
    ...current,
    aiDraft,
    status: 'ai_draft',
    updatedAt: new Date().toISOString(),
  })
}

export async function publishTranslation(entryId: string, text: string) {
  const current = await translationRepository.getById(entryId)
  if (!current) throw new Error('Translation entry not found')

  return translationRepository.upsert({
    ...current,
    publishedText: text,
    status: 'published',
    updatedAt: new Date().toISOString(),
  })
}
