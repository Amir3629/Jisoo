'use client'

import { partners } from '@/lib/data'
import { cn } from '@/lib/utils'
import { ChapterHeading } from '@/components/ui/chapter-heading'
import { AtmosphereSection } from '@/components/ui/atmosphere-section'
import { useLocale } from '@/components/providers/locale-provider'

export function PartnersSection() {
  const { locale } = useLocale()
  const copy = {
    kicker: locale === 'ar' ? 'شبكة التميز الكورية' : locale === 'fr' ? 'Réseau d’excellence coréenne' : locale === 'de' ? 'Koreanisches Exzellenznetzwerk' : locale === 'ko' ? '코리안 엑설런스 네트워크' : locale === 'tr' ? 'Kore Mükemmellik Ağı' : 'Korean Excellence Network',
    title: locale === 'ar' ? 'ثلاث دور. معيار توقيع واحد.' : locale === 'fr' ? 'Trois maisons. Un même standard signature.' : locale === 'de' ? 'Drei Häuser. Ein Signature-Standard.' : locale === 'ko' ? '세 하우스. 하나의 시그니처 기준.' : locale === 'tr' ? 'Üç maison. Tek imza standardı.' : 'Three Houses. One Signature Standard.',
    description: locale === 'ar' ? 'يجلب كل شريك تخصصًا مختلفًا لتشكيل هوية تركيبات JISOO.' : locale === 'fr' ? 'Chaque partenaire apporte une discipline distincte à l’identité des formules JISOO.' : locale === 'de' ? 'Jeder Partner bringt eine eigene Disziplin in die JISOO-Formelidentität ein.' : locale === 'ko' ? '각 파트너의 전문성이 JISOO 포뮬러 아이덴티티를 완성합니다.' : locale === 'tr' ? 'Her iş ortağı JISOO formül kimliğine ayrı bir uzmanlık katar.' : 'Each partner brings a distinct discipline—from fermented heritage to clinical precision—forming JISOO&apos;s formula identity.',
    partner: locale === 'ar' ? 'الشريك' : locale === 'fr' ? 'Partenaire' : locale === 'de' ? 'Partner' : locale === 'ko' ? '파트너' : locale === 'tr' ? 'Ortak' : 'Partner',
  }
  return (
    <AtmosphereSection atmosphere="blush" className="py-24 lg:py-32">
      <div className="relative max-w-7xl mx-auto px-4 lg:px-6">
        <ChapterHeading
          kicker={copy.kicker}
          title={copy.title}
          description={copy.description}
          align="center"
          ghostLabel="LABS"
          className="max-w-4xl mx-auto"
        />

        <div className="mt-14 space-y-5">
          {partners.map((partner, index) => (
            <div
              key={partner.id}
              className={cn(
                'grid lg:grid-cols-[220px_1fr_240px] gap-6 lg:gap-8 items-center rounded-[1.8rem] p-7 lg:p-8',
                'surface-velvet shadow-editorial'
              )}
            >
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-rose-mauve">{copy.partner} {index + 1}</p>
                <h3 className="mt-2 text-2xl font-serif text-charcoal">{partner.name}</h3>
                <p className="mt-2 text-sm text-charcoal/60">{partner.location}</p>
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.16em] text-rose-mauve/85">{partner.specialization}</p>
                <p className="mt-3 text-charcoal/80 leading-relaxed">{partner.description}</p>
              </div>

              <div className="flex flex-wrap lg:justify-end gap-2">
                {partner.certifications.map(cert => (
                  <span
                    key={cert}
                    className="rounded-full border border-rose-mauve/25 bg-white/70 px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] text-charcoal/75"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AtmosphereSection>
  )
}
