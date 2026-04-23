const AVAILABLE_ASSETS = new Set([
  '/placeholder.jpg',
  '/placeholder-user.jpg',
  '/placeholder.svg',
  '/products/glass-skin-essence-1.jpg',
  '/products/luminous-glow-serum-1.jpg',
  '/placeholder-logo.svg',
  '/placeholder-logo.png',
])

const PRODUCT_FALLBACKS = [
  '/products/luminous-glow-serum-1.jpg',
  '/products/glass-skin-essence-1.jpg',
]

const CATEGORY_FALLBACKS = [
  '/products/glass-skin-essence-1.jpg',
  '/products/luminous-glow-serum-1.jpg',
]

export function resolveImageSrc(src?: string | null): string {
  if (!src) return '/placeholder.jpg'
  if (AVAILABLE_ASSETS.has(src)) return src

  if (src.startsWith('/products/')) {
    return PRODUCT_FALLBACKS[src.length % PRODUCT_FALLBACKS.length]
  }

  if (src.startsWith('/categories/')) {
    return CATEGORY_FALLBACKS[src.length % CATEGORY_FALLBACKS.length]
  }

  if (src.startsWith('/avatars/') || src.startsWith('/testimonials/')) {
    return '/placeholder-user.jpg'
  }

  if (src.startsWith('/partners/') || src.startsWith('/suppliers/') || src.startsWith('/media/') || src.startsWith('/social/')) {
    return '/placeholder.jpg'
  }

  return '/placeholder.jpg'
}
