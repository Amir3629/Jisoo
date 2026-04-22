'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ProductCard } from '@/components/product/product-card'
import { products } from '@/lib/data'

export default function SetsPage() {
  const items = products.filter((p) => p.category === 'sets' || p.tags.includes('set')).slice(0, 12)
  const fallback = items.length ? items : products.slice(0, 8)

  return (
    <main className="min-h-screen bg-warm-ivory">
      <Header />
      <section className="pt-32 pb-16 bg-gradient-to-b from-blush-pink/20 to-warm-ivory">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <h1 className="text-4xl lg:text-5xl font-serif text-plum">Gift Sets</h1>
          <p className="mt-3 text-charcoal/70">Curated pairings for radiant routines and thoughtful gifting.</p>
          <p className="mt-2 text-sm text-charcoal/60">{fallback.length} set options available</p>
        </div>
      </section>
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {fallback.map((product, index) => <ProductCard key={`${product.id}-${index}`} product={product} index={index} />)}
        </div>
      </section>
      <Footer />
    </main>
  )
}
