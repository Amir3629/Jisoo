'use client'

import { use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { useLocale } from '@/components/providers/locale-provider'
import { localizeHref, type Locale } from '@/lib/i18n'

const copy: Record<Locale, Record<string, { title: string; tips: string[]; back: string; pairingTitle: string; pairingBody: string; pairingCta: string }>> = {
  en: { skin: { title: 'Skin Care Guide', tips: ['Prioritize hydration layers from toner to cream.', 'Patch test new actives for 24 hours.', 'Pair barrier-friendly cleansers with calming serum.'], back: '← Back to all guides', pairingTitle: 'JISOO Product Pairing', pairingBody: 'For this care guide, start with hydration-forward toner + serum + cream sequence for Seoul-level glow.', pairingCta: 'Shop hydration-focused formulas →' }, face: { title: 'Face Care Guide', tips: ['Use gentle cleanser morning/night.', 'Apply serum on damp skin for better moisture lock.', 'Finish with cream to seal hydration.'], back: '← Back to all guides', pairingTitle: 'JISOO Product Pairing', pairingBody: 'For this care guide, start with hydration-forward toner + serum + cream sequence for Seoul-level glow.', pairingCta: 'Shop hydration-focused formulas →' }, eye: { title: 'Eye Care Guide', tips: ['Use ring finger pressure only.', 'Hydrating eye formulas reduce dryness appearance.', 'Apply sunscreen around orbital area carefully.'], back: '← Back to all guides', pairingTitle: 'JISOO Product Pairing', pairingBody: 'For this care guide, start with hydration-forward toner + serum + cream sequence for Seoul-level glow.', pairingCta: 'Shop hydration-focused formulas →' }, hair: { title: 'Hair Care Guide', tips: ['Hydrate scalp weekly with lightweight mask.', 'Avoid stripping shampoos for dry scalp.', 'Use leave-in care on ends only.'], back: '← Back to all guides', pairingTitle: 'JISOO Product Pairing', pairingBody: 'For this care guide, start with hydration-forward toner + serum + cream sequence for Seoul-level glow.', pairingCta: 'Shop hydration-focused formulas →' }, beard: { title: 'Beard Care Guide', tips: ['Cleanse beard and skin beneath daily.', 'Apply beard-softening moisturizer.', 'Comb gently to prevent breakage.'], back: '← Back to all guides', pairingTitle: 'JISOO Product Pairing', pairingBody: 'For this care guide, start with hydration-forward toner + serum + cream sequence for Seoul-level glow.', pairingCta: 'Shop hydration-focused formulas →' }, 'sun-care': { title: 'Sun Care Guide', tips: ['Use broad-spectrum SPF every morning.', 'Reapply every 2–3 hours outdoors.', 'Pair sunscreen with hydration-focused base products.'], back: '← Back to all guides', pairingTitle: 'JISOO Product Pairing', pairingBody: 'For this care guide, start with hydration-forward toner + serum + cream sequence for Seoul-level glow.', pairingCta: 'Shop hydration-focused formulas →' } },
  ar: {}, fr: {}, de: {}, ko: {}, tr: {},
}
for (const locale of ['ar', 'fr', 'de', 'ko', 'tr'] as const) {
  copy[locale] = {
    skin: { ...copy.en.skin, back: locale === 'ar' ? '← العودة إلى جميع الأدلة' : locale === 'fr' ? '← Retour à tous les guides' : locale === 'de' ? '← Zurück zu allen Guides' : locale === 'ko' ? '← 전체 가이드로 돌아가기' : '← Tüm rehberlere dön', pairingTitle: locale === 'ar' ? 'تنسيق منتجات JISOO' : locale === 'fr' ? 'Association Produits JISOO' : locale === 'de' ? 'JISOO Produkt-Kombination' : locale === 'ko' ? 'JISOO 제품 페어링' : 'JISOO Ürün Eşleştirmesi', pairingBody: locale === 'ar' ? 'لهذا الدليل ابدئي بتسلسل تونر + سيروم + كريم يركز على الترطيب.' : locale === 'fr' ? 'Pour ce guide, commencez par une séquence toner + sérum + crème axée hydratation.' : locale === 'de' ? 'Für diesen Guide starte mit einer feuchtigkeitsfokussierten Toner + Serum + Creme-Sequenz.' : locale === 'ko' ? '이 가이드는 토너 + 세럼 + 크림 보습 루틴으로 시작해보세요.' : 'Bu rehber için nem odaklı toner + serum + krem sıralamasıyla başlayın.', pairingCta: locale === 'ar' ? 'تسوقي التركيبات المرطبة ←' : locale === 'fr' ? 'Acheter les formules hydratantes →' : locale === 'de' ? 'Feuchtigkeitsformeln shoppen →' : locale === 'ko' ? '보습 포뮬러 쇼핑하기 →' : 'Nem odaklı formülleri keşfet →' },
    face: { ...copy.en.face, back: copy[locale].skin?.back ?? copy.en.skin.back, pairingTitle: copy[locale].skin?.pairingTitle ?? copy.en.skin.pairingTitle, pairingBody: copy[locale].skin?.pairingBody ?? copy.en.skin.pairingBody, pairingCta: copy[locale].skin?.pairingCta ?? copy.en.skin.pairingCta },
    eye: { ...copy.en.eye, back: copy[locale].skin?.back ?? copy.en.skin.back, pairingTitle: copy[locale].skin?.pairingTitle ?? copy.en.skin.pairingTitle, pairingBody: copy[locale].skin?.pairingBody ?? copy.en.skin.pairingBody, pairingCta: copy[locale].skin?.pairingCta ?? copy.en.skin.pairingCta },
    hair: { ...copy.en.hair, back: copy[locale].skin?.back ?? copy.en.skin.back, pairingTitle: copy[locale].skin?.pairingTitle ?? copy.en.skin.pairingTitle, pairingBody: copy[locale].skin?.pairingBody ?? copy.en.skin.pairingBody, pairingCta: copy[locale].skin?.pairingCta ?? copy.en.skin.pairingCta },
    beard: { ...copy.en.beard, back: copy[locale].skin?.back ?? copy.en.skin.back, pairingTitle: copy[locale].skin?.pairingTitle ?? copy.en.skin.pairingTitle, pairingBody: copy[locale].skin?.pairingBody ?? copy.en.skin.pairingBody, pairingCta: copy[locale].skin?.pairingCta ?? copy.en.skin.pairingCta },
    'sun-care': { ...copy.en['sun-care'], back: copy[locale].skin?.back ?? copy.en.skin.back, pairingTitle: copy[locale].skin?.pairingTitle ?? copy.en.skin.pairingTitle, pairingBody: copy[locale].skin?.pairingBody ?? copy.en.skin.pairingBody, pairingCta: copy[locale].skin?.pairingCta ?? copy.en.skin.pairingCta },
  }
}

export default function TipsCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { locale } = useLocale()
  const { category } = use(params)
  const c = copy[locale][category] ?? copy[locale].skin
  return (
    <main className="min-h-screen bg-warm-ivory">
      <Header />
      <section className="mx-auto max-w-5xl px-4 pb-16 pt-32 lg:px-6">
        <Link href={localizeHref('/tips', locale)} className="text-sm text-rose-mauve">{c.back}</Link>
        <div className="relative mt-5 h-64 overflow-hidden rounded-3xl lg:h-80">
          <Image src="/first slide example/ChatGPT Image Apr 23, 2026, 08_29_09 PM.png" alt={`${c.title} banner`} fill sizes="(max-width: 1024px) 100vw, 960px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/50 via-charcoal/20 to-transparent" />
          <h1 className="absolute bottom-8 left-6 font-serif text-4xl text-white lg:text-6xl">{c.title}</h1>
        </div>
        <ul className="mt-8 space-y-4">
          {c.tips.map((t) => <li key={t} className="rounded-2xl border border-rose-mauve/20 bg-white/85 p-5 text-charcoal/75 shadow-sm">{t}</li>)}
        </ul>
        <div className="mt-10 rounded-3xl border border-rose-mauve/20 bg-gradient-to-r from-[#fbeff4] to-[#f8efe7] p-7">
          <h2 className="font-serif text-3xl text-charcoal">{c.pairingTitle}</h2>
          <p className="mt-2 text-charcoal/70">{c.pairingBody}</p>
          <Link href={localizeHref('/shop', locale)} className="mt-4 inline-block text-rose-mauve">{c.pairingCta}</Link>
        </div>
      </section>
      <Footer />
    </main>
  )
}
