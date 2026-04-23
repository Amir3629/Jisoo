'use client'

import { useParams } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ProductCard } from '@/components/product/product-card'
import { categories, products } from '@/lib/data'

const routedCategories = new Set([
  ...categories.map(category => category.slug),
  ...categories.flatMap(category => category.subcategories?.map(sub => sub.slug) ?? []),
])

export default function ShopCategoryPage() {
  const params = useParams<{ category: string }>()
  const category = params.category

  const isKnownCategory = routedCategories.has(category)

  const filtered = isKnownCategory
    ? products.filter(product => product.category === category || product.subcategory === category)
    : []

  return (
    <main className="min-h-screen bg-warm-ivory">
      <Header />
      <section className="pt-32 pb-16 text-center bg-gradient-to-b from-nude-beige/50 to-warm-ivory">
        <h1 className="font-serif text-4xl lg:text-5xl text-charcoal capitalize">{category.replace(/-/g, ' ')}</h1>
        <p className="mt-4 text-muted-foreground">
          {isKnownCategory
            ? 'Curated products selected for this category.'
            : 'This category is not yet part of our public collection. Explore our full catalog instead.'}
        </p>
      </section>
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid gap-6 lg:gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.length > 0 ? filtered.map((product, index) => <ProductCard key={product.id} product={product} index={index} />) : <div className="col-span-full text-center text-muted-foreground">No products available in this category yet.</div>}
        </div>
      </section>
      <Footer />
    </main>
  )
}
