'use client'

import Link from 'next/link'
import { ChapterHeading } from '@/components/ui/chapter-heading'
import { AtmosphereSection } from '@/components/ui/atmosphere-section'
import { useLocale } from '@/components/providers/locale-provider'

export function PartnersSection() {
  const { locale } = useLocale()
  const copy = {
    kicker: locale === 'ar' ? 'شبكة التميز الكورية' : locale === 'fr' ? 'Réseau d’excellence coréenne' : locale === 'de' ? 'Koreanisches Exzellenznetzwerk' : locale === 'ko' ? '코리안 엑설런스 네트워크' : locale === 'tr' ? 'Kore Mükemmellik Ağı' : 'Korean Excellence Network',
    title: locale === 'ar' ? 'اكتشف قصتنا' : locale === 'fr' ? 'Découvrez notre histoire' : locale === 'de' ? 'Entdecken Sie unsere Geschichte' : locale === 'ko' ? '우리의 이야기를 만나보세요' : locale === 'tr' ? 'Hikâyemizi Keşfedin' : 'Discover Our Story',
    description: locale === 'ar' ? 'تعرفي على فلسفتنا وسبب اختيار كل تركيبة بعناية.' : locale === 'fr' ? 'Découvrez notre philosophie et la sélection soignée derrière chaque formule.' : locale === 'de' ? 'Entdecken Sie unsere Philosophie und die kuratierte Auswahl hinter jeder Formel.' : locale === 'ko' ? '브랜드 철학과 각 포뮬러의 큐레이션 스토리를 확인하세요.' : locale === 'tr' ? 'Felsefemizi ve her formülün arkasındaki seçimi keşfedin.' : 'Discover the philosophy, craftsmanship, and care behind every JISOO ritual.',
    cta: locale === 'ar' ? 'استكشف صفحة قصتنا' : locale === 'fr' ? 'Explorer notre histoire' : locale === 'de' ? 'Unsere Geschichte entdecken' : locale === 'ko' ? 'Our Story 보기' : locale === 'tr' ? 'Hikâyemizi keşfet' : 'Visit Our Story',
  }

  return (
    <AtmosphereSection atmosphere="blush" className="py-24 lg:py-32">
      <div className="relative mx-auto max-w-7xl px-4 lg:px-6">
        <ChapterHeading kicker={copy.kicker} title={copy.title} description={copy.description} align="center" className="mx-auto max-w-4xl" />

        <div className="mx-auto mt-14 max-w-3xl rounded-[2rem] border border-rose-mauve/20 bg-[linear-gradient(160deg,#fffaf8_0%,#fef8f7_100%)] p-10 text-center shadow-editorial">
          <p className="text-sm leading-relaxed text-charcoal/75">{copy.description}</p>
          <Link href="/our-story" className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#cfac7f] to-[#d9bd97] px-6 py-3 text-sm font-medium text-white transition hover:brightness-105">
            {copy.cta}
          </Link>
        </div>
      </div>
    </AtmosphereSection>
  )
}
