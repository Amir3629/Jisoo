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
    <main className="min-h-screen bg-warm-ivory">
      <Header transparentOnTop logoSrc="/LOGO/Logonew.png" logoClassName="mt-6 h-20 lg:h-[6.4rem]" />

      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-fixed" aria-hidden="true">
          <Image
            src="/hero7/Untitled design (32).png"
            alt="Mist glass background"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-white/20" aria-hidden="true" />
        <div className="relative z-10 flex h-full items-start px-8 pt-[7.5rem] lg:px-12 lg:pt-[8.5rem]">
          <div className="max-w-2xl text-charcoal">
            <p className="text-kicker text-charcoal/78">New from our Korean partners</p>
            <h1 className="mt-3 font-serif text-4xl lg:text-6xl">Seoul Editions, Just Arrived</h1>
            <p className="mt-4 max-w-xl text-charcoal/72">Fresh skincare and skin-first color selected with care for your daily ritual.</p>
          </div>
        </div>
      </section>

      <section className="pb-8 pt-10 bg-gradient-to-b from-nude-beige/30 to-warm-ivory"><div className="max-w-7xl mx-auto px-4 lg:px-6"><h1 className="text-4xl lg:text-5xl font-serif text-plum">{t.title}</h1><p className="mt-3 text-charcoal/70">{t.body}</p></div></section>
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
        </div>
        {items.length === 0 && (
          <p className="max-w-7xl mx-auto px-4 lg:px-6 mt-6 text-sm text-charcoal/60">
            {t.empty}
          </p>
        )}
      </section>
      <Footer />
    </main>
  )
}
