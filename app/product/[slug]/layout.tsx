import type { Metadata } from 'next'
import { getProductBySlug } from '@/lib/data'
import { absoluteUrl, siteName } from '@/lib/seo'

type ProductLayoutProps = {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductLayoutProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    return {
      title: 'Product Not Found',
      robots: { index: false, follow: true },
    }
  }

  const productUrl = `/product/${product.slug}`
  const image = product.images[0]?.src ? absoluteUrl(product.images[0].src) : absoluteUrl('/assets/hero/home-desktop.png')

  return {
    title: `${product.name} Korean Skincare`,
    description: product.shortDescription,
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      title: `${product.name} | ${siteName}`,
      description: product.shortDescription,
      url: productUrl,
      type: 'website',
      images: [{ url: image, alt: product.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | ${siteName}`,
      description: product.shortDescription,
      images: [image],
    },
  }
}

export default function ProductLayout({ children }: ProductLayoutProps) {
  return children
}
