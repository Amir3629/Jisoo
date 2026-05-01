'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { categories } from '@/lib/data'
import { EditorialMedia } from '@/components/ui/editorial-media'
import { ChapterHeading } from '@/components/ui/chapter-heading'
import { AtmosphereSection } from '@/components/ui/atmosphere-section'
import { useLocale } from '@/components/providers/locale-provider'
import { localizeHref } from '@/lib/i18n'

export function CategoriesSection() {
  const { locale, dictionary } = useLocale()
  const t = dictionary.home
  const copy = {
    kicker: locale === 'ar' ? 'فصول المنتجات' : locale === 'fr' ? 'Chapitres Produits' : locale === 'de' ? 'Produktkapitel' : locale === 'ko' ? '상품 챕터' : locale === 'tr' ? 'Ürün Bölümleri' : 'Merchandise Chapters',
    title: locale === 'ar' ? 'تشكيلات مصممة كحملة' : locale === 'fr' ? 'Des collections composées comme une campagne' : locale === 'de' ? 'Kollektionen wie eine Kampagne komponiert' : locale === 'ko' ? '캠페인처럼 구성된 컬렉션' : locale === 'tr' ? 'Kampanya gibi kurgulanan koleksiyonlar' : 'Collections Composed Like a Campaign',
    description: locale === 'ar' ? 'بدل التصنيف البسيط، كل فصل مصمم ليعكس المزاج والنتيجة.' : locale === 'fr' ? 'Chaque chapitre est dirigé artistiquement pour refléter ambiance et résultat.' : locale === 'de' ? 'Jedes Kapitel ist art-direktional gestaltet und spiegelt Stimmung und Ergebnis.' : locale === 'ko' ? '단순 분류 대신 무드와 결과를 반영한 챕터 구성입니다.' : locale === 'tr' ? 'Basit kategori yerine her bölüm atmosfer ve sonucu yansıtır.' : 'Instead of a simple product taxonomy, each chapter is art-directed to reflect mood, finish, and ritual outcome.',
    chapter: locale === 'ar' ? 'الفصل' : locale === 'fr' ? 'Chapitre' : locale === 'de' ? 'Kapitel' : locale === 'ko' ? '챕터' : locale === 'tr' ? 'Bölüm' : 'Chapter',
  }
  const displayCategories = categories.slice(0, 4)

  return (
    <AtmosphereSection atmosphere="blush" className="py-24 lg:py-32">
      <div className="relative max-w-7xl mx-auto px-4 lg:px-6">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16">
          <div className="lg:sticky lg:top-28 self-start">
            <ChapterHeading
              kicker={copy.kicker}
              title={copy.title}
              description={copy.description}
              ghostLabel="EDIT"
            />
            <Link
              href={localizeHref('/shop', locale)}
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-plum/30 px-6 py-3 text-plum font-medium hover:bg-plum/5 transition-colors"
            >
              {t.browseAllCategories}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-5 lg:space-y-7">
            {displayCategories.map((category, index) => (
              <div key={category.id} className={index % 2 === 1 ? 'lg:ml-14' : ''}>
                <Link href={localizeHref(`/shop/${category.slug}`, locale)} className="group block">
                  <div className="relative rounded-[2rem] overflow-hidden shadow-editorial">
                    <EditorialMedia
                      src={category.image}
                      alt={category.name}
                      hint={`${category.productCount} Products`}
                      className={index === 0 ? 'aspect-[16/9]' : 'aspect-[14/8]'}
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      overlayClassName="bg-gradient-to-r from-charcoal/60 via-charcoal/20 to-transparent"
                    />
                    <div className="absolute inset-0 p-7 lg:p-9 flex flex-col justify-end">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-white/80">{copy.chapter} {index + 1}</p>
                      <h3 className="mt-2 text-3xl lg:text-4xl font-serif text-white">{category.name}</h3>
                      <p className="mt-2 text-white/80 max-w-lg">{category.description}</p>
                      <span className="mt-6 inline-flex items-center gap-2 text-white font-medium">
                        {t.exploreChapter}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AtmosphereSection>
  )
}
