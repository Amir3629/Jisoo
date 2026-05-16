'use client'

import Link from 'next/link'
import Image from 'next/image'
import { AtmosphereSection } from '@/components/ui/atmosphere-section'
import { useLocale } from '@/components/providers/locale-provider'
import { localizeHref } from '@/lib/i18n'

export function PartnersSection() {
  const { locale } = useLocale()
  const copy = {
    kicker: locale === 'ar' ? 'شبكة التميز الكورية' : locale === 'fr' ? 'Réseau d’excellence coréenne' : locale === 'de' ? 'Koreanisches Exzellenznetzwerk' : locale === 'ko' ? '코리안 엑설런스 네트워크' : locale === 'tr' ? 'Kore Mükemmellik Ağı' : 'Korean Excellence Network',
    title: locale === 'ar' ? 'اكتشف قصتنا' : locale === 'fr' ? 'Découvrez notre histoire' : locale === 'de' ? 'Entdecken Sie unsere Geschichte' : locale === 'ko' ? '우리의 이야기를 만나보세요' : locale === 'tr' ? 'Hikâyemizi Keşfedin' : 'Discover Our Story',
    description: locale === 'ar' ? 'تعرفي على فلسفتنا وسبب اختيار كل تركيبة بعناية.' : locale === 'fr' ? 'Découvrez notre philosophie et la sélection soignée derrière chaque formule.' : locale === 'de' ? 'Entdecken Sie unsere Philosophie und die kuratierte Auswahl hinter jeder Formel.' : locale === 'ko' ? '브랜드 철학과 각 포뮬러의 큐레이션 스토리를 확인하세요.' : locale === 'tr' ? 'Felsefemizi ve her formülün arkasındaki seçimi keşfedin.' : 'Discover the philosophy, craftsmanship, and care behind every JISOO ritual.',
    cta: locale === 'ar' ? 'اكتشف المزيد' : locale === 'fr' ? 'Découvrir plus' : locale === 'de' ? 'Mehr entdecken' : locale === 'ko' ? '더 알아보기' : locale === 'tr' ? 'Daha fazla keşfet' : 'Discover More',
  }

  return (
    <AtmosphereSection
      atmosphere="blush"
      withAtmosphereOverlay={false}
      className="bg-[var(--background)] py-0"
    >
      <div className="relative mx-auto max-w-none px-0">
        <div className="grid min-h-screen items-stretch bg-transparent lg:grid-cols-[0.92fr_1.08fr]">
          <div className="flex items-center justify-center px-6 pb-8 pt-12 text-center lg:px-16 lg:py-16">
            <div className="mx-auto max-w-xl">
              <p className="text-[clamp(1.9rem,3.2vw,3.4rem)] italic leading-tight text-charcoal/92">
                Cosmetics that inspire
              </p>
              <h2 className="font-serif text-[clamp(2rem,3.6vw,3.8rem)] font-medium uppercase leading-none text-charcoal">
                Confidence
              </h2>
              <p className="mx-auto mt-8 max-w-lg text-base leading-8 text-charcoal/72">
                JISOO blends Korean ritual memory with modern cosmetic precision, creating soft textures and polished glow for everyday confidence.
              </p>
              <Link href={localizeHref('/about', locale)} className="mt-9 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-rose-mauve to-[#d3af84] px-9 py-4 text-sm font-medium uppercase tracking-[0.04em] text-white transition-all hover:brightness-105">
                {copy.cta}
              </Link>
            </div>
          </div>

          <div className="relative min-h-[58vh] overflow-hidden bg-transparent px-4 pb-8 pt-0 lg:min-h-screen lg:p-8">
            <div className="absolute bottom-8 left-4 right-4 top-0 overflow-hidden rounded-[2rem] lg:bottom-8 lg:left-8 lg:right-8 lg:top-36 lg:rounded-[2.5rem]">
              <Image
                src="/assets/story/grandparents mobile.png"
                alt="JISOO Korean beauty campaign"
                fill
                sizes="(max-width: 1024px) 100vw, 54vw"
                className="object-cover object-center lg:hidden"
              />
              <Image
                src="/assets/story/grandparents.png"
                alt="JISOO Korean beauty campaign"
                fill
                sizes="54vw"
                className="hidden object-cover object-center lg:block"
              />
            </div>
          </div>
        </div>
      </div>
    </AtmosphereSection>
  )
}
