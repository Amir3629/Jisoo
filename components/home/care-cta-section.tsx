'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { AtmosphereSection } from '@/components/ui/atmosphere-section'
import { useLocale } from '@/components/providers/locale-provider'
import { localizeHref } from '@/lib/i18n'

export function CareCtaSection() {
  const { locale } = useLocale()
  const copy = {
    kicker: locale === 'ar' ? 'طقس عناية هادئ' : locale === 'fr' ? 'Rituel de soin calme' : locale === 'de' ? 'Ruhiges Pflegeritual' : locale === 'ko' ? '차분한 케어 리추얼' : locale === 'tr' ? 'Sakin bakım ritüeli' : 'Quiet Care Ritual',
    title: locale === 'ar' ? 'ابدئي بروتينك حسب احتياج بشرتك.' : locale === 'fr' ? 'Commencez par le besoin réel de votre peau.' : locale === 'de' ? 'Beginne mit dem, was deine Haut wirklich braucht.' : locale === 'ko' ? '피부에 필요한 것부터 시작하세요.' : locale === 'tr' ? 'Cildinizin gerçekten ihtiyacı olan yerden başlayın.' : 'Start with what your skin actually needs.',
    body: locale === 'ar' ? 'اختاري بين الترطيب، مقاومة علامات التقدم، الأقنعة، الزيوت والكريمات لبناء طقس يومي واضح.' : locale === 'fr' ? 'Choisissez hydratation, anti-âge, masques, huiles et crèmes pour composer un rituel clair.' : locale === 'de' ? 'Wähle Hydration, Anti-Aging, Masken, Öle und Cremes für eine klare tägliche Routine.' : locale === 'ko' ? '수분, 안티에이징, 마스크, 오일, 크림을 중심으로 루틴을 구성하세요.' : locale === 'tr' ? 'Nem, yaşlanma karşıtı bakım, maskeler, yağlar ve kremlerle net bir rutin kurun.' : 'Choose hydration, anti-aging, masks, oils, and creams to shape a clear daily care ritual.',
    primary: locale === 'ar' ? 'اختاري حسب الاحتياج' : locale === 'fr' ? 'Choisir par besoin' : locale === 'de' ? 'Nach Bedarf wählen' : locale === 'ko' ? '고민별로 선택' : locale === 'tr' ? 'İhtiyaca göre seç' : 'Shop by Concern',
    secondary: locale === 'ar' ? 'اسألي المستشار' : locale === 'fr' ? 'Demander au concierge' : locale === 'de' ? 'Concierge fragen' : locale === 'ko' ? '컨시어지에게 묻기' : locale === 'tr' ? 'Danışmana sor' : 'Ask AI',
  }

  return (
    <AtmosphereSection atmosphere="ivory" withAtmosphereOverlay={false} className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-[#cfae83]/24 bg-warm-ivory/62 p-8 shadow-[0_22px_60px_rgba(70,49,32,0.10),inset_0_1px_0_rgba(255,255,255,0.34)] backdrop-blur-xl lg:p-12">
          <div className="max-w-3xl">
            <p className="text-kicker text-charcoal/64">{copy.kicker}</p>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-charcoal lg:text-5xl">{copy.title}</h2>
            <p className="mt-5 max-w-2xl text-charcoal/72">{copy.body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={localizeHref('/shop', locale)} className="inline-flex items-center gap-2 rounded-full bg-charcoal px-6 py-3 text-sm font-medium text-warm-ivory transition hover:bg-[#8f6f46]">
                {copy.primary}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={localizeHref('/ai-consultant', locale)} className="inline-flex items-center gap-2 rounded-full border border-charcoal/18 bg-white/35 px-6 py-3 text-sm font-medium text-charcoal backdrop-blur-md transition hover:bg-[#d5bc9b]/55">
                <Sparkles className="h-4 w-4" />
                {copy.secondary}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AtmosphereSection>
  )
}
