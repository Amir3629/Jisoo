'use client'

import Image from 'next/image'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ProductCard } from '@/components/product/product-card'
import { products } from '@/lib/data'
import { useLocale } from '@/components/providers/locale-provider'

const copy = {
  en: {
    title: 'New Arrivals',
    body: 'Fresh formulas and the newest additions to the JISOO ritual.',
    empty: 'No new arrivals are available right now. Please check back soon.',
  },
  ar: {
    title: 'وصل حديثًا',
    body: 'تركيبات جديدة وأحدث الإضافات إلى طقس JISOO.',
    empty: 'لا توجد منتجات جديدة متاحة الآن. يرجى العودة قريبًا.',
  },
  fr: {
    title: 'Nouveautés',
    body: 'Des formules fraîches et les dernières additions au rituel JISOO.',
    empty: 'Aucune nouveauté disponible pour le moment. Revenez bientôt.',
  },
  de: {
    title: 'Neuheiten',
    body: 'Frische Formeln und die neuesten Ergänzungen des JISOO-Rituals.',
    empty: 'Derzeit sind keine Neuheiten verfügbar. Bitte schau bald wieder vorbei.',
  },
  ko: {
    title: '신상품',
    body: 'JISOO 리추얼에 새롭게 더해진 신선한 포뮬러를 만나보세요.',
    empty: '현재 신상품이 없습니다. 곧 다시 확인해주세요.',
  },
  tr: {
    title: 'Yeni Gelenler',
    body: 'JISOO ritüeline yeni katılan taze formüller.',
    empty: 'Şu anda yeni ürün bulunmuyor. Lütfen yakında tekrar kontrol edin.',
  },
}

export default function NewArrivalsPage() {
  const { locale } = useLocale()
  const t = copy[locale]
  const items = products.filter((p) => p.isNew).slice(0, 12)

  return (
    <main className="snap-page-flow min-h-screen bg-warm-ivory">
      <Header transparentOnTop />

      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-[#f9eee8]" aria-hidden="true">
          <Image
            src="/assets/hero/home-desktop.png"
            alt="Mist glass background"
            fill
            sizes="100vw"
            priority
            className="scale-[1.015] object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-[#f9eee8]/[0.06]" aria-hidden="true" />
        <div className="relative z-10 flex h-full items-start px-8 pt-[7.5rem] lg:px-12 lg:pt-[8.5rem]">
          <div className="max-w-2xl text-charcoal">
            <p className="text-kicker text-charcoal/78">New from our Korean partners</p>
            <h1 className="mt-3 font-serif text-3xl lg:text-5xl">New Rituals, Softly Arrived</h1>
            <p className="mt-4 max-w-xl text-charcoal/72">Fresh skincare and skin-first color selected with care for your daily ritual.</p>
          </div>
        </div>
      </section>

      <section className="flex min-h-screen flex-col justify-center bg-[#f9eee8] py-24">
        <div className="mx-auto w-full max-w-7xl px-4 lg:px-6">
          <div className="mb-8">
            <h1 className="font-serif text-4xl text-plum lg:text-5xl">{t.title}</h1>
            <p className="mt-3 text-charcoal/70">{t.body}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.slice(0, 4).map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
          </div>
          {items.length === 0 && (
            <p className="mt-6 text-sm text-charcoal/60">
              {t.empty}
            </p>
          )}
        </div>
      </section>
      <section className="flex min-h-screen items-center bg-[#f9eee8] py-24">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
          {items.slice(4, 12).map((product, index) => <ProductCard key={product.id} product={product} index={index + 4} />)}
        </div>
      </section>
      <Footer />
    </main>
  )
}
