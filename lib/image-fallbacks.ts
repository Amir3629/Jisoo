const AVAILABLE_ASSETS = new Set([
  '/background/ChatGPT Image Apr 24, 2026, 02_45_33 AM.png',
  '/background/Dynamic.png',
  '/background/photo-1596755389378-c31d21fd1273.jpeg',
  '/black-skincare-expert-recommended-products-295961-1635525452337-square-1200-80.jpg',
  '/ChatGPT Image Apr 24, 2026, 10_47_39 PM.png',
  '/desing hero 2/ChatGPT Image Apr 24, 2026, 12_16_05 PM.png',
  '/desing hero 2/ChatGPT Image Apr 24, 2026, 12_23_16 PM.png',
  '/desing hero 2/ChatGPT Image Apr 24, 2026, 12_25_15 PM.png',
  '/desing hero 2/ChatGPT Image Apr 24, 2026, 12_30_22 PM.png',
  '/desing hero 2/ChatGPT Image Apr 24, 2026, 12_31_29 PM.png',
  '/first slide example/ChatGPT Image Apr 23, 2026, 08_14_40 PM.png',
  '/first slide example/ChatGPT Image Apr 23, 2026, 08_15_52 PM.png',
  '/first slide example/ChatGPT Image Apr 23, 2026, 08_19_23 PM.png',
  '/first slide example/ChatGPT Image Apr 23, 2026, 08_20_39 PM.png',
  '/first slide example/ChatGPT Image Apr 23, 2026, 08_23_22 PM.png',
  '/first slide example/ChatGPT Image Apr 23, 2026, 08_29_09 PM.png',
  '/first slide example/ChatGPT Image Apr 24, 2026, 10_47_39 PM.png',
  '/hero7/Untitled design (32).png',
  '/lip.jpg',
  '/placeholder.jpg',
  '/placeholder-user.jpg',
  '/placeholder.svg',
  '/products/glass-skin-essence-1.jpg',
  '/products/luminous-glow-serum-1.jpg',
  '/skincare-ingredients-featured.jpg',
  '/stunning-blue-eye-stockcake.jpg.webp',
  '/placeholder-logo.svg',
  '/placeholder-logo.png',
])

const GLOBAL_MISSING_IMAGE_FALLBACKS = [
  '/skincare-ingredients-featured.jpg',
  '/black-skincare-expert-recommended-products-295961-1635525452337-square-1200-80.jpg',
  '/background/photo-1596755389378-c31d21fd1273.jpeg',
  '/products/glass-skin-essence-1.jpg',
  '/products/luminous-glow-serum-1.jpg',
  '/lip.jpg',
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
    return '/placeholder-user.jpg'
  }

  return pickFallback(src)
}
