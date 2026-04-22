import type { MediaAsset } from '@/lib/domain/models'
import { mediaRepository } from '@/lib/repositories'

export async function registerOriginalAsset(asset: Omit<MediaAsset, 'kind' | 'watermarkApplied'>) {
  const entity: MediaAsset = {
    ...asset,
    kind: 'original',
    watermarkApplied: false,
  }
  return mediaRepository.upsert(entity)
}

export async function createWatermarkedAsset(original: MediaAsset, url: string) {
  const derivative: MediaAsset = {
    ...original,
    id: `${original.id}:wm`,
    originalUrl: url,
    kind: 'watermarked',
    watermarkApplied: true,
    derivativeOf: original.id,
    createdAt: new Date().toISOString(),
  }

  return mediaRepository.upsert(derivative)
}
