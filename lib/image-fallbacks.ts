const AVAILABLE_ASSETS = new Set([
  '/assets/backgrounds/soft-cream-ritual.png',
  '/assets/backgrounds/care-dynamic.png',
  '/assets/backgrounds/cica-ampoule.jpeg',
  '/assets/editorial/care-expert.jpg',
  '/assets/editorial/campaign-cover.png',
  '/assets/editorial/before-care.png',
  '/assets/editorial/after-care.png',
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
  '/Product images/Jisoo 6.png',
  '/Product images/jisoo 99.png',
  '/Product images/jisoo4.png',
  '/Product images/jisoo7.png',
  '/Product images/jisoo8.png',
  '/Product images/jisoo9.png',
  '/Product images/jisoo99.png',
  '/Product images/jisooo77.png',
  '/assets/products/glass-skin-essence.jpg',
  '/assets/products/luminous-glow-serum.jpg',
  '/assets/products/jisoo-daily-uv-shield-sun-cream-1.jpg',
  '/assets/products/jisoo-daily-uv-shield-sun-cream-2.jpg',
  '/assets/products/jisoo-daily-uv-shield-sun-cream-3.jpg',
  '/assets/products/jisoo-pore-clear-vita-c-cleansing-foam-1.jpg',
  '/assets/products/jisoo-pore-clear-vita-c-cleansing-foam-2.jpg',
  '/assets/editorial/skincare-ingredients.jpg',
  '/assets/editorial/eye-closeup.webp',
  '/assets/ritual/ritual-oil-drop.svg',
  '/assets/ritual/ritual-silk-folds.svg',
  '/assets/ritual/ritual-rice-water.svg',
  '/assets/ritual/ritual-cream-pearl.svg',
  '/assets/ritual/ritual-botanical-shadow.svg',
  '/assets/ritual/ritual-gold-mist.svg',
  '/assets/story/grandparents.png',
  '/assets/placeholders/logo.svg',
  '/assets/placeholders/logo.png',
])

const GLOBAL_MISSING_IMAGE_FALLBACKS = [
  '/Product images/Jisoo 6.png',
  '/Product images/jisoo 99.png',
  '/Product images/jisoo4.png',
  '/Product images/jisoo7.png',
  '/Product images/jisoo8.png',
  '/Product images/jisoo9.png',
  '/Product images/jisoo99.png',
  '/Product images/jisooo77.png',
  '/assets/products/glass-skin-essence.jpg',
  '/assets/products/jisoo-daily-uv-shield-sun-cream-1.jpg',
  '/assets/products/jisoo-daily-uv-shield-sun-cream-2.jpg',
  '/assets/products/jisoo-daily-uv-shield-sun-cream-3.jpg',
  '/assets/products/jisoo-pore-clear-vita-c-cleansing-foam-1.jpg',
  '/assets/products/jisoo-pore-clear-vita-c-cleansing-foam-2.jpg',
  '/assets/products/luminous-glow-serum.jpg',
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
  if (src.startsWith('https://') || src.startsWith('http://')) return src
  if (AVAILABLE_ASSETS.has(src)) return src

  if (src.startsWith('/avatars/') || src.startsWith('/testimonials/')) {
    return '/assets/placeholders/user.jpg'
  }

  return pickFallback(src)
}
