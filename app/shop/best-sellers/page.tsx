'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ProductCard } from '@/components/product/product-card'
import { products } from '@/lib/data'

export default function BestSellersPage() {
  const bestSellers = products.filter(product => product.isBestSeller)

  return (
    <main className="min-h-screen bg-warm-ivory">
      <Header />
      <section className="pt-32 pb-16 text-center bg-gradient-to-b from-nude-beige/50 to-warm-ivory">
        <h1 className="font-serif text-4xl lg:text-5xl text-charcoal">Best Sellers</h1>
        <p className="mt-4 text-muted-foreground">Customer-loved Korean beauty essentials, selected for texture, finish, and routine compatibility.</p>
      </section>
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid gap-6 lg:gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {bestSellers.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
        </div>
      </section>
      <Footer />
    </main>
  )
}
