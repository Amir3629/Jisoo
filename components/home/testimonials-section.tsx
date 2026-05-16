'use client'

import { useEffect, useRef } from 'react'
import { Quote, Star } from 'lucide-react'
import { ChapterHeading } from '@/components/ui/chapter-heading'
import { AtmosphereSection } from '@/components/ui/atmosphere-section'
import { useLocale } from '@/components/providers/locale-provider'
import { cn } from '@/lib/utils'

const reviewPlaceholders = [
  {
    id: 'review-framework-1',
    label: 'Verified review import',
    title: 'Texture feedback',
    body: 'Customer note will appear here after order verification and moderation approval.',
  },
  {
    id: 'review-framework-2',
    label: 'Verified review import',
    title: 'Routine experience',
    body: 'Approved comments will focus on usage, comfort, and routine fit without unverified claims.',
  },
  {
    id: 'review-framework-3',
    label: 'Verified review import',
    title: 'Repeat care note',
    body: 'Only real customer feedback connected to verified purchases will be published here.',
  },
  {
    id: 'review-framework-4',
    label: 'Verified review import',
    title: 'Regional feedback',
    body: 'Region-specific notes can be added after translation and compliance review.',
  },
]

export function TestimonialsSection() {
  const { locale, dictionary } = useLocale()
  const t = dictionary.home
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const copy = {
    description: locale === 'ar' ? 'ستظهر قصص العملاء بعد التحقق من المراجعات الحقيقية.' : locale === 'fr' ? 'Les témoignages apparaîtront après validation de vrais avis clients.' : locale === 'de' ? 'Kundenstimmen erscheinen nach Prüfung echter Bewertungen.' : locale === 'ko' ? '검증된 고객 리뷰가 승인된 후 이곳에 표시됩니다.' : locale === 'tr' ? 'Gerçek müşteri yorumları onaylandıktan sonra burada gösterilecek.' : 'Verified customer stories will appear here after real review approval.',
    pending: locale === 'ar' ? 'استيراد المراجعات قيد الانتظار' : locale === 'fr' ? 'Import des avis en attente' : locale === 'de' ? 'Bewertungsimport ausstehend' : locale === 'ko' ? '리뷰 가져오기 대기 중' : locale === 'tr' ? 'Yorum aktarımı beklemede' : 'Review import pending',
  }
  const localizedReviews = reviewPlaceholders.map((card) => {
    const translations = {
      'review-framework-1': {
        label: locale === 'ar' ? 'استيراد مراجعة موثقة' : locale === 'fr' ? 'Import d’avis vérifié' : locale === 'de' ? 'Verifizierter Bewertungsimport' : locale === 'ko' ? '검증 리뷰 가져오기' : locale === 'tr' ? 'Doğrulanmış yorum aktarımı' : card.label,
        title: locale === 'ar' ? 'ملاحظات القوام' : locale === 'fr' ? 'Retour sur la texture' : locale === 'de' ? 'Texturfeedback' : locale === 'ko' ? '텍스처 피드백' : locale === 'tr' ? 'Doku geri bildirimi' : card.title,
        body: locale === 'ar' ? 'ستظهر ملاحظة العميل هنا بعد التحقق من الطلب وموافقة المراجعة.' : locale === 'fr' ? 'La note client apparaîtra ici après vérification de la commande et modération.' : locale === 'de' ? 'Kundenhinweise erscheinen hier nach Bestellprüfung und Moderationsfreigabe.' : locale === 'ko' ? '주문 확인과 검수 승인 후 고객 메모가 여기에 표시됩니다.' : locale === 'tr' ? 'Müşteri notu sipariş doğrulaması ve moderasyon onayından sonra burada görünecek.' : card.body,
      },
      'review-framework-2': {
        label: locale === 'ar' ? 'استيراد مراجعة موثقة' : locale === 'fr' ? 'Import d’avis vérifié' : locale === 'de' ? 'Verifizierter Bewertungsimport' : locale === 'ko' ? '검증 리뷰 가져오기' : locale === 'tr' ? 'Doğrulanmış yorum aktarımı' : card.label,
        title: locale === 'ar' ? 'تجربة الروتين' : locale === 'fr' ? 'Expérience routine' : locale === 'de' ? 'Routine-Erlebnis' : locale === 'ko' ? '루틴 경험' : locale === 'tr' ? 'Rutin deneyimi' : card.title,
        body: locale === 'ar' ? 'ستركّز التعليقات المعتمدة على الاستخدام والراحة وملاءمة الروتين دون ادعاءات غير موثقة.' : locale === 'fr' ? 'Les commentaires validés porteront sur l’usage, le confort et l’adéquation à la routine sans allégations non vérifiées.' : locale === 'de' ? 'Freigegebene Kommentare fokussieren Nutzung, Komfort und Routine-Fit ohne ungeprüfte Claims.' : locale === 'ko' ? '승인된 댓글은 확인되지 않은 주장 없이 사용감, 편안함, 루틴 적합성에 집중합니다.' : locale === 'tr' ? 'Onaylanan yorumlar doğrulanmamış iddialar olmadan kullanım, konfor ve rutin uyumuna odaklanacak.' : card.body,
      },
      'review-framework-3': {
        label: locale === 'ar' ? 'استيراد مراجعة موثقة' : locale === 'fr' ? 'Import d’avis vérifié' : locale === 'de' ? 'Verifizierter Bewertungsimport' : locale === 'ko' ? '검증 리뷰 가져오기' : locale === 'tr' ? 'Doğrulanmış yorum aktarımı' : card.label,
        title: locale === 'ar' ? 'ملاحظة عناية متكررة' : locale === 'fr' ? 'Note de soin répété' : locale === 'de' ? 'Wiederholte Pflegenotiz' : locale === 'ko' ? '반복 케어 메모' : locale === 'tr' ? 'Tekrarlanan bakım notu' : card.title,
        body: locale === 'ar' ? 'لن تُنشر هنا إلا ملاحظات عملاء حقيقية مرتبطة بمشتريات موثقة.' : locale === 'fr' ? 'Seuls de vrais retours clients liés à des achats vérifiés seront publiés ici.' : locale === 'de' ? 'Hier werden nur echte Kundenstimmen aus verifizierten Käufen veröffentlicht.' : locale === 'ko' ? '검증된 구매와 연결된 실제 고객 피드백만 여기에 게시됩니다.' : locale === 'tr' ? 'Burada yalnızca doğrulanmış satın alımlara bağlı gerçek müşteri geri bildirimleri yayımlanacak.' : card.body,
      },
      'review-framework-4': {
        label: locale === 'ar' ? 'استيراد مراجعة موثقة' : locale === 'fr' ? 'Import d’avis vérifié' : locale === 'de' ? 'Verifizierter Bewertungsimport' : locale === 'ko' ? '검증 리뷰 가져오기' : locale === 'tr' ? 'Doğrulanmış yorum aktarımı' : card.label,
        title: locale === 'ar' ? 'ملاحظات إقليمية' : locale === 'fr' ? 'Retour régional' : locale === 'de' ? 'Regionales Feedback' : locale === 'ko' ? '지역별 피드백' : locale === 'tr' ? 'Bölgesel geri bildirim' : card.title,
        body: locale === 'ar' ? 'يمكن إضافة ملاحظات خاصة بالمنطقة بعد الترجمة ومراجعة الامتثال.' : locale === 'fr' ? 'Des notes propres à la région peuvent être ajoutées après traduction et vérification conformité.' : locale === 'de' ? 'Regionsspezifische Hinweise können nach Übersetzung und Compliance-Prüfung ergänzt werden.' : locale === 'ko' ? '지역별 메모는 번역과 컴플라이언스 검토 후 추가할 수 있습니다.' : locale === 'tr' ? 'Bölgeye özel notlar çeviri ve uygunluk incelemesinden sonra eklenebilir.' : card.body,
      },
    } as const

    return { ...card, ...(translations[card.id as keyof typeof translations] ?? {}) }
  })
  const cards = [...localizedReviews, ...localizedReviews, ...localizedReviews]

  useEffect(() => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    let frame = 0
    let offset = 0
    const baseSpeed = 0.18
    let speed = baseSpeed
    let targetSpeed = baseSpeed
    let lastScrollY = window.scrollY
    let lastInteraction = 0
    let isDragging = false
    let dragStartX = 0
    let dragStartOffset = 0

    const getLoopWidth = () => track.scrollWidth / 3

    const animate = () => {
      const loopWidth = getLoopWidth()
      const desiredSpeed = isDragging || container.matches(':hover') || document.hidden ? 0 : targetSpeed

      speed += (desiredSpeed - speed) * 0.08
      offset += speed

      if (loopWidth > 0) {
        while (offset >= loopWidth) offset -= loopWidth
        while (offset < 0) offset += loopWidth
      }

      track.style.transform = `translate3d(${-offset}px, 0, 0)`

      if (performance.now() - lastInteraction > 520) {
        targetSpeed += (baseSpeed - targetSpeed) * 0.12
      }

      frame = window.requestAnimationFrame(animate)
    }

    const normalizeOffset = () => {
      const loopWidth = getLoopWidth()
      if (loopWidth <= 0) return
      while (offset >= loopWidth) offset -= loopWidth
      while (offset < 0) offset += loopWidth
    }

    const onScroll = () => {
      const delta = window.scrollY - lastScrollY
      lastScrollY = window.scrollY
      if (Math.abs(delta) < 1 || isDragging) return

      targetSpeed = delta > 0 ? 0.42 : -0.28
      lastInteraction = performance.now()
    }

    const onPointerDown = (event: PointerEvent) => {
      isDragging = true
      dragStartX = event.clientX
      dragStartOffset = offset
      targetSpeed = 0
      lastInteraction = performance.now()
      container.setPointerCapture(event.pointerId)
      container.classList.add('cursor-grabbing')
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!isDragging) return
      offset = dragStartOffset - (event.clientX - dragStartX)
      normalizeOffset()
      track.style.transform = `translate3d(${-offset}px, 0, 0)`
      lastInteraction = performance.now()
    }

    const endDrag = (event: PointerEvent) => {
      if (!isDragging) return
      isDragging = false
      container.releasePointerCapture(event.pointerId)
      container.classList.remove('cursor-grabbing')
      targetSpeed = baseSpeed
      lastInteraction = performance.now()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    container.addEventListener('pointerdown', onPointerDown)
    container.addEventListener('pointermove', onPointerMove)
    container.addEventListener('pointerup', endDrag)
    container.addEventListener('pointercancel', endDrag)
    frame = window.requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('scroll', onScroll)
      container.removeEventListener('pointerdown', onPointerDown)
      container.removeEventListener('pointermove', onPointerMove)
      container.removeEventListener('pointerup', endDrag)
      container.removeEventListener('pointercancel', endDrag)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <AtmosphereSection atmosphere="ivory" withAtmosphereOverlay={false} className="relative overflow-hidden pb-80 pt-14 lg:pb-[34rem] lg:pt-20">
      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <ChapterHeading
            kicker={t.customerStories}
            title={t.lovedBy}
            description={copy.description}
            align="center"
            className="mb-8 lg:mb-10 max-w-4xl mx-auto"
          />
        </div>

        <div ref={containerRef} className="relative left-1/2 w-[100dvw] -translate-x-1/2 cursor-grab touch-pan-y overflow-hidden pb-4 select-none">
          <div ref={trackRef} className="flex w-max gap-6 will-change-transform">
            {cards.map((card, index) => (
              <div key={`${card.id}-${index}`} className="w-[85vw] max-w-[400px] flex-shrink-0 sm:w-[400px]">
                <div
                  className={cn(
                    'h-full rounded-3xl border border-[#cfae83]/24 p-8 shadow-luxury',
                    'bg-[linear-gradient(155deg,var(--card)_0%,color-mix(in_srgb,var(--background)_88%,white)_58%,color-mix(in_srgb,var(--background)_92%,#cfae83)_100%)]'
                  )}
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#838999]/12">
                    <Quote className="h-6 w-6 text-[#838999]" />
                  </div>
                  <div className="mb-4 flex items-center gap-1">
                    {[0, 1, 2, 3, 4].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-current text-champagne-gold" />
                    ))}
                  </div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal/52">
                    {card.label}
                  </p>
                  <h3 className="mt-3 text-xl text-charcoal">{card.title}</h3>
                  <p className="mt-4 leading-7 text-charcoal/70">{card.body}</p>
                  <div className="mt-6 border-t border-[#cfae83]/24 pt-5">
                    <p className="text-sm font-medium text-[#838999]">{copy.pending}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AtmosphereSection>
  )
}
