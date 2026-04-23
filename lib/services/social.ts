import type { SocialPost } from '@/lib/domain/models'
import { socialPostRepository } from '@/lib/repositories'

export async function createSocialDraft(post: SocialPost) {
  return socialPostRepository.upsert(post)
}

export async function approveSocialPost(postId: string) {
  const existing = await socialPostRepository.getById(postId)
  if (!existing) throw new Error('Post not found')

  return socialPostRepository.upsert({
    ...existing,
    status: 'approved',
  })
}
