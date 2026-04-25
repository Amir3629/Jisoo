import { resolveImageSrc } from '@/lib/image-fallbacks'

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  publishedAt: string
  coverImage: string
  content: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'glass-skin-night-ritual',
    title: 'The 5-Step Glass Skin Night Ritual',
    excerpt: 'A calming evening routine for bounce, hydration, and morning radiance.',
    category: 'Ritual',
    readTime: '6 min read',
    publishedAt: '2026-04-10',
    coverImage: resolveImageSrc('/social/post-1.jpg'),
    content: [
      'Start with a gentle cleanse to remove sunscreen and makeup without disrupting your barrier.',
      'Layer hydrating essence and targeted serum while skin is still slightly damp.',
      'Seal with a comforting cream and support overnight repair with a sleeping mask when needed.',
    ],
  },
  {
    slug: 'barrier-first-morning-routine',
    title: 'Barrier-First Morning Routine for Sensitive Skin',
    excerpt: 'A gentle AM order of application to calm reactivity and protect glow all day.',
    category: 'Education',
    readTime: '4 min read',
    publishedAt: '2026-04-18',
    coverImage: resolveImageSrc('/social/post-3.jpg'),
    content: [
      'Keep cleansing light in the morning and avoid over-stripping your skin barrier.',
      'Use one calming serum, then lock hydration with a moisturizer rich in barrier-supporting lipids.',
      'Finish with broad-spectrum SPF and reapply through the day.',
    ],
  },
  {
    slug: 'how-to-layer-active-serums',
    title: 'How to Layer Active Serums Without Irritation',
    excerpt: 'Balance brightening and calming formulas for results with comfort.',
    category: 'Education',
    readTime: '5 min read',
    publishedAt: '2026-04-05',
    coverImage: resolveImageSrc('/social/post-2.jpg'),
    content: [
      'Introduce one active at a time and monitor skin response for at least a week.',
      'Pair potent ingredients with barrier-supporting hydrators to maintain comfort.',
      'Always finish daytime routines with broad-spectrum SPF.',
    ],
  },
]

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}

export function getBlogPostsSorted() {
  return [...blogPosts].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
}
