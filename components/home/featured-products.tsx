'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { products } from '@/lib/data'
import { ProductCard } from '@/components/product/product-card'
import { ChapterHeading } from '@/components/ui/chapter-heading'
import { AtmosphereSection } from '@/components/ui/atmosphere-section'
import { useLocale } from '@/components/providers/locale-provider'
import { localizeHref } from '@/lib/i18n'

export function FeaturedProducts() {
  const { locale, dictionary } = useLocale()
  const t = dictionary.home
  const featuredProducts = products.slice(0, 8)
  const copy = {
    kicker: locale === 'ar' ? 'اختيارات العناية' : locale === 'fr' ? 'La sélection soin' : locale === 'de' ? 'Die Pflege-Auswahl' : locale === 'ko' ? '케어 에디트' : locale === 'tr' ? 'Bakım Seçkisi' : 'The Care Edit',
    title: locale === 'ar' ? 'تركيبات عناية بأسلوب معرض' : locale === 'fr' ? 'Formules de soin, style galerie' : locale === 'de' ? 'Pflegeformeln im Galerie-Stil' : locale === 'ko' ? '갤러리처럼 구성한 케어 포뮬러' : locale === 'tr' ? 'Galeri stili bakım formülleri' : 'Care Formulas, Gallery Styled',
    description: locale === 'ar' ? 'تسلسل من الكريمات والزيوت والأقنعة والعناية اليومية بإحساس ملموس.' : locale === 'fr' ? 'Une séquence de crèmes, huiles, masques et soins quotidiens avec une mise en scène tactile.' : locale === 'de' ? 'Eine kuratierte Abfolge von Cremes, Ölen, Masken und täglicher Pflege.' : locale === 'ko' ? '크림, 오일, 마스크, 데일리 케어를 감각적인 무드로 구성했습니다.' : locale === 'tr' ? 'Kremler, yağlar, maskeler ve günlük bakımdan oluşan atmosferik bir seçki.' : 'A curated sequence of creams, oils, masks, and daily care formulas with atmospheric framing.',
  }

  return (
    <AtmosphereSection atmosphere="ivory" className="py-24 lg:py-32">
      <div className="relative max-w-7xl mx-auto px-4 lg:px-6">
        <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-end mb-12 lg:mb-16">
          <ChapterHeading
            kicker={copy.kicker}
            title={copy.title}
            description={copy.description}
          />
          <Link
            href={localizeHref('/shop', locale)}
            className="inline-flex items-center gap-2 rounded-full border border-plum/20 bg-plum px-6 py-3 font-medium text-warm-ivory shadow-sm transition hover:bg-charcoal hover:text-warm-ivory"
          >
            {t.viewEntireEdit}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </AtmosphereSection>
  )
}
