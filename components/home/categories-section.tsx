'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { EditorialMedia } from '@/components/ui/editorial-media'
import { AtmosphereSection } from '@/components/ui/atmosphere-section'
import { useLocale } from '@/components/providers/locale-provider'
import { localizeHref } from '@/lib/i18n'

function TrustpilotRatingStrip() {
  const { locale } = useLocale()
  const copy = {
    excellent: locale === 'ar' ? 'ممتاز' : locale === 'fr' ? 'Excellent' : locale === 'de' ? 'Ausgezeichnet' : locale === 'ko' ? '훌륭함' : locale === 'tr' ? 'Mükemmel' : 'Excellent',
    reviewsOn: locale === 'ar' ? 'تقييم على' : locale === 'fr' ? 'avis sur' : locale === 'de' ? 'Bewertungen auf' : locale === 'ko' ? '개의 리뷰' : locale === 'tr' ? 'yorum' : 'reviews on',
  }

  return (
    <a
      href="https://www.trustpilot.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Trustpilot reviews"
      className="group mx-auto flex min-h-[58px] max-w-7xl flex-col items-center justify-center gap-2 px-4 text-center text-charcoal transition hover:opacity-90 sm:min-h-[64px] lg:flex-row lg:gap-4"
    >
      <span className="text-lg font-semibold sm:text-xl">{copy.excellent}</span>
      <span className="flex items-center gap-1" aria-label="4.4 out of 5 star rating on Trustpilot">
        {[0, 1, 2, 3, 4].map((star) => (
          <span key={star} className="grid h-6 w-6 place-items-center sm:h-7 sm:w-7">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-[#00B67A] sm:h-[18px] sm:w-[18px]">
              <path d="M12 2.75 14.18 9.45h7.05l-5.7 4.14 2.18 6.7L12 16.15l-5.71 4.14 2.18-6.7-5.7-4.14h7.05L12 2.75z" />
            </svg>
          </span>
        ))}
      </span>
      <span className="flex flex-wrap items-center justify-center gap-1.5 text-sm text-charcoal/86 sm:text-base">
        <strong className="font-semibold text-charcoal">2,737</strong>
        <span>{copy.reviewsOn}</span>
        <span className="inline-flex items-center gap-1.5 font-semibold text-charcoal">
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px] text-[#00B67A] sm:h-5 sm:w-5">
            <path d="M12 1.5 14.54 9.32H23l-6.84 4.97 2.61 8.03L12 17.36l-6.77 4.96 2.61-8.03L1 9.32h8.46L12 1.5z" />
          </svg>
          Trustpilot
        </span>
      </span>
    </a>
  )
}

export function CategoriesSection() {
  const { locale } = useLocale()
  const copy = {
    kicker: locale === 'ar' ? 'ثقة ونتائج' : locale === 'fr' ? 'Preuve & résultats' : locale === 'de' ? 'Vertrauen & Ergebnisse' : locale === 'ko' ? '신뢰와 결과' : locale === 'tr' ? 'Güven ve sonuçlar' : 'Proof-led care',
    title: locale === 'ar' ? 'نتائج هادئة يمكنك الوثوق بها' : locale === 'fr' ? 'Des résultats calmes, dignes de confiance' : locale === 'de' ? 'Ruhige Ergebnisse, denen man vertraut' : locale === 'ko' ? '신뢰할 수 있는 차분한 결과' : locale === 'tr' ? 'Güven veren sakin sonuçlar' : 'Quiet Results, Beautifully Proven',
    description: locale === 'ar' ? 'بدلاً من عرض طويل، نعرض العناية من خلال الدليل: يوم البداية، لحظة التحسن، والروتين المناسب.' : locale === 'fr' ? 'Au lieu d’un simple rayon, la sélection est guidée par la preuve: départ, progression, routine adaptée.' : locale === 'de' ? 'Statt nur Regalen zeigen wir Pflege über Belege: Ausgangspunkt, Fortschritt und passende Routine.' : locale === 'ko' ? '단순한 진열이 아니라 시작점, 변화, 맞춤 루틴으로 케어를 보여줍니다.' : locale === 'tr' ? 'Basit bir raf yerine bakımı kanıtla anlatıyoruz: başlangıç, ilerleme ve doğru rutin.' : 'A more reassuring way to shop care: see the starting point, understand the progress, and choose the routine with confidence.',
    cta: locale === 'ar' ? 'استكشاف العناية' : locale === 'fr' ? 'Explorer les soins' : locale === 'de' ? 'Pflege entdecken' : locale === 'ko' ? '케어 보기' : locale === 'tr' ? 'Bakımı keşfet' : 'Explore Care',
  }
  const activeOption = {
    title: 'Progress You Can Read',
    description: 'A refined before-after chapter that frames care by concern, time, texture, and visible comfort.',
  }

  return (
    <AtmosphereSection atmosphere="blush" className="pb-16 pt-4 lg:pb-20 lg:pt-5" data-snap-target="care-campaign">
      <div className="relative max-w-7xl mx-auto px-4 lg:px-6">
        <div className="mb-8 rounded-[2rem] border border-[#cfae83]/22 bg-[color-mix(in_srgb,var(--card)_72%,transparent)] px-3 py-2 shadow-[0_14px_38px_rgba(44,37,40,0.08)] backdrop-blur-xl">
          <TrustpilotRatingStrip />
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <div className="overflow-hidden rounded-[2.2rem] border border-[#cfae83]/24 bg-[#4a4e51] text-white shadow-editorial">
            <div className="grid min-h-[560px] lg:grid-cols-2">
              <div className="relative min-h-[320px]">
                <EditorialMedia
                  src="/assets/editorial/before-care.png"
                  alt="Before care journal"
                  hint="Before"
                  className="h-full min-h-[320px]"
                  sizes="(max-width: 1024px) 100vw, 36vw"
                  overlayClassName="bg-gradient-to-t from-charcoal/62 via-charcoal/10 to-transparent"
                />
                <span className="absolute left-5 top-5 rounded-full bg-white/18 px-4 py-2 text-xs uppercase tracking-[0.16em] backdrop-blur-md">Before</span>
              </div>
              <div className="relative min-h-[320px]">
                <EditorialMedia
                  src="/assets/editorial/after-care.png"
                  alt="After care journal"
                  hint="After"
                  className="h-full min-h-[320px]"
                  sizes="(max-width: 1024px) 100vw, 36vw"
                  overlayClassName="bg-gradient-to-t from-charcoal/62 via-charcoal/10 to-transparent"
                />
                <span className="absolute left-5 top-5 rounded-full bg-white/18 px-4 py-2 text-xs uppercase tracking-[0.16em] backdrop-blur-md">After</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center rounded-[2.2rem] border border-[#cfae83]/24 bg-[var(--card)] p-7 shadow-luxury lg:p-10">
            <p className="text-kicker text-charcoal/58">Before / After Care</p>
            <h2 className="mt-4 max-w-lg text-4xl text-charcoal lg:text-5xl">{activeOption.title}</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-charcoal/68">{activeOption.description}</p>
            <div className="mt-8 grid gap-3">
              {['Texture comfort', 'Fine-line support', 'Barrier glow'].map((item, index) => (
                <div key={item} className="flex items-center justify-between rounded-full border border-[#cfae83]/20 bg-white/24 px-5 py-3 text-charcoal/78">
                  <span>{item}</span>
                  <span className="text-sm font-semibold text-charcoal">{index === 0 ? '14 days' : index === 1 ? '28 days' : 'Daily'}</span>
                </div>
              ))}
            </div>
            <Link href={localizeHref('/shop?concern=anti-aging', locale)} className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#4a4e51] px-6 py-3 font-medium text-white transition hover:bg-charcoal">
              View Care Journals
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </AtmosphereSection>
  )
}
