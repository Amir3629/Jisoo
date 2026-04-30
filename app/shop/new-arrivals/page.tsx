'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ProductCard } from '@/components/product/product-card'
import { products } from '@/lib/data'
import { HeroSection } from '@/components/home/hero-section'

export default function NewArrivalsPage() {
  const items = products.filter((p) => p.isNew).slice(0, 12)

  return (
    <main className="min-h-screen bg-warm-ivory">
      <Header />
      <HeroSection forcedConceptId="mist-glass" showConceptPicker={false} />
      <section className="pb-8 pt-10 bg-gradient-to-b from-nude-beige/30 to-warm-ivory"><div className="max-w-7xl mx-auto px-4 lg:px-6"><h1 className="text-4xl lg:text-5xl font-serif text-plum">New Arrivals</h1><p className="mt-3 text-charcoal/70">Fresh formulas and the newest additions to the JISOO ritual.</p></div></section>
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
        </div>
        {items.length === 0 && (
          <p className="max-w-7xl mx-auto px-4 lg:px-6 mt-6 text-sm text-charcoal/60">
            No new arrivals are available right now. Please check back soon.
          </p>
        )}
      </section>
      <Footer />
    </main>
  )
}
