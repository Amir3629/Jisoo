import { aiInsightRepository } from '@/lib/repositories'
import { aiProvider } from './provider'

export async function getBeautyAssistantReply(message: string) {
  return aiProvider.chat(message)
}

export async function getProductRecommendations(context: string) {
  return aiProvider.recommendProducts(context)
}

export async function draftTranslationWithAI(text: string, locale: string) {
  return aiProvider.draftTranslation(text, locale)
}

export async function recordOpsInsight(title: string, summary: string, payload: Record<string, unknown>) {
  return aiInsightRepository.upsert({
    id: `insight_${Date.now()}`,
    insightType: 'ops',
    title,
    summary,
    confidence: 0.61,
    payload,
    createdAt: new Date().toISOString(),
  })
}
