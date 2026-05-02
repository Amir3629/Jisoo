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
  const featuredProducts = products.filter(p => p.isBestSeller || p.isNew).slice(0, 8)
  const copy = {
    kicker: locale === 'ar' ? 'اختيارات القيّمين' : locale === 'fr' ? 'La sélection du collectionneur' : locale === 'de' ? 'Die Sammler-Auswahl' : locale === 'ko' ? '컬렉터 에디트' : locale === 'tr' ? 'Koleksiyoner Seçkisi' : "The Collector's Edit",
    title: locale === 'ar' ? 'تركيبات قابلة للجمع بأسلوب معرض' : locale === 'fr' ? 'Formules iconiques, style galerie' : locale === 'de' ? 'Sammelformeln im Galerie-Stil' : locale === 'ko' ? '갤러리처럼 구성한 시그니처 포뮬러' : locale === 'tr' ? 'Galeri stili koleksiyon formülleri' : 'Collectible Formulas, Gallery Styled',
    description: locale === 'ar' ? 'تسلسل من الأيقونات والإصدارات الجديدة بإحساس ملموس وفاخر.' : locale === 'fr' ? 'Une séquence d’icônes et de nouveautés avec une mise en scène tactile.' : locale === 'de' ? 'Eine kuratierte Abfolge von Ikonen und Neuheiten mit taktilem Storytelling.' : locale === 'ko' ? '아이콘과 신제품을 감각적인 갤러리 무드로 구성했습니다.' : locale === 'tr' ? 'İkonlar ve yeni ürünlerden oluşan dokunsal, atmosferik bir seçki.' : 'A curated sequence of icons and new releases with atmospheric framing and tactile product storytelling.',
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
            className="inline-flex items-center gap-2 text-plum font-medium hover:text-rose-mauve transition-colors"
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
