const AVAILABLE_ASSETS = new Set([
  '/assets/backgrounds/soft-cream-ritual.png',
  '/assets/backgrounds/care-dynamic.png',
  '/assets/backgrounds/cica-ampoule.jpeg',
  '/assets/editorial/care-expert.jpg',
  '/assets/editorial/campaign-cover.png',
  '/assets/editorial/cream-texture.png',
  '/assets/editorial/cream-ritual.png',
  '/assets/editorial/tone-up-sun-cream.png',
  '/assets/editorial/serum-dropper.png',
  '/assets/editorial/cream-still-life.png',
  '/assets/editorial/rose-layering.png',
  '/assets/editorial/serum-ritual.png',
  '/assets/editorial/eye-care.png',
  '/assets/editorial/sun-care.png',
  '/assets/editorial/night-routine.png',
  '/assets/editorial/soft-cheek-glow.png',
  '/assets/editorial/hero-editorial-cover.png',
  '/assets/editorial/product-table.png',
  '/assets/editorial/lips-closeup.jpg',
  '/assets/placeholders/placeholder.jpg',
  '/assets/placeholders/user.jpg',
  '/assets/placeholders/placeholder.svg',
  '/assets/products/glass-skin-essence.jpg',
  '/assets/products/luminous-glow-serum.jpg',
  '/assets/editorial/skincare-ingredients.jpg',
  '/assets/editorial/eye-closeup.webp',
  '/assets/placeholders/logo.svg',
  '/assets/placeholders/logo.png',
])

const GLOBAL_MISSING_IMAGE_FALLBACKS = [
  '/assets/editorial/skincare-ingredients.jpg',
  '/assets/editorial/care-expert.jpg',
  '/assets/backgrounds/cica-ampoule.jpeg',
  '/assets/products/glass-skin-essence.jpg',
  '/assets/products/luminous-glow-serum.jpg',
  '/assets/editorial/lips-closeup.jpg',
]

function pickFallback(seed: string) {
  let hash = 0
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  }
  return GLOBAL_MISSING_IMAGE_FALLBACKS[hash % GLOBAL_MISSING_IMAGE_FALLBACKS.length]
}

export function resolveImageSrc(src?: string | null): string {
  if (!src) return GLOBAL_MISSING_IMAGE_FALLBACKS[0]
  if (AVAILABLE_ASSETS.has(src)) return src

  if (src.startsWith('/avatars/') || src.startsWith('/testimonials/')) {
    return '/assets/placeholders/user.jpg'
  }

  return pickFallback(src)
}
