import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop Korean Skincare',
  description:
    'Shop JISOO Korean skincare products including cleansers, toner pads, vitamin C serums, sunscreens, moisturizers, masks, and K-beauty care formulas.',
  alternates: {
    canonical: '/shop',
  },
}

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children
}
