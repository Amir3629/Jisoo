import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-warm-ivory">
      <Header />
      <section className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 lg:px-6">
          <h1 className="text-4xl font-serif text-plum mb-6">Accessibility Statement</h1>
          <p className="text-sm text-charcoal/60 mb-6">Last updated: April 22, 2026</p>
          <div className="space-y-4 text-charcoal/80 leading-relaxed">
            <p>JISOO is committed to providing an inclusive and welcoming digital experience for all customers.</p>
            <p>We continuously improve keyboard navigation, color contrast, and semantic labeling across storefront and account experiences.</p>
            <p>If you encounter accessibility barriers, please contact our support team and we will prioritize a solution.</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
