'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EditorialMedia } from '@/components/ui/editorial-media'
import { ChapterHeading } from '@/components/ui/chapter-heading'
import { AtmosphereSection } from '@/components/ui/atmosphere-section'
import { useLocale } from '@/components/providers/locale-provider'
import { localizeHref } from '@/lib/i18n'

const ritualSteps = [
  {
    number: '01',
    title: 'Cleanse',
    description:
      'Start with a verified cleanser once supplier documentation is approved.',
    color: 'from-blush-pink/30',
    image: '/assets/ritual/01.png',
  },
  {
    number: '02',
    title: 'Tone & Prep',
    description:
      'Use a toner or prep step only after final formula, usage, and INCI review.',
    color: 'from-rose-mauve/20',
    image: '/assets/ritual/02.png',
  },
  {
    number: '03',
    title: 'Treat',
    description:
      'Treatment steps will be organized by confirmed concerns and approved claims.',
    color: 'from-champagne-gold/20',
    image: '/assets/ritual/03.png',
  },
  {
    number: '04',
    title: 'Moisturize',
    description:
      'Creams and oils will be described with neutral copy after supplier verification.',
    color: 'from-plum/10',
    image: '/assets/ritual/04.png',
  },
  {
    number: '05',
    title: 'Protect',
    description:
      'Sun care guidance will be published only after compliant regional review.',
    color: 'from-nude-beige/40',
    image: '/assets/ritual/05.png',
  },
  {
    number: '06',
    title: 'Glow',
    description:
      'Finish with a composed ritual moment: calm texture, soft light, and everyday confidence.',
    color: 'from-rose-mauve/15',
    image: '/assets/ritual/06.png',
  },
]

function RitualImageFrame({
  alt,
  color,
  hint,
  index,
  src,
}: {
  alt: string
  color: string
  hint: string
  index: number
  src: string
}) {
  const frameRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ['start end', 'end start'],
  })
  const rawImageY = useTransform(scrollYProgress, [0, 1], index % 2 === 0 ? ['-1.6%', '1.6%'] : ['1.6%', '-1.6%'])
  const imageY = useSpring(rawImageY, { stiffness: 32, damping: 28, mass: 0.7 })

  return (
    <div
      ref={frameRef}
      className={cn(
        'relative mx-auto aspect-square max-w-sm overflow-hidden rounded-3xl bg-gradient-to-br shadow-editorial',
        color,
        'to-white'
      )}
    >
      <motion.div style={{ y: imageY }} className="absolute -inset-y-[3%] inset-x-0">
        <EditorialMedia
          src={src}
          alt={alt}
          className="absolute inset-0"
          imageClassName="scale-[1.03]"
          sizes="(max-width: 1024px) 100vw, 384px"
          hint={hint}
        />
      </motion.div>
    </div>
  )
}

export function RitualSection() {
  const { locale, dictionary } = useLocale()
  const t = dictionary.home
  const copy = {
    kicker: locale === 'ar' ? 'طريق الجمال الكوري' : locale === 'fr' ? 'La voie K-Beauty' : locale === 'de' ? 'Der K-Beauty Weg' : locale === 'ko' ? 'K-뷰티 방식' : locale === 'tr' ? 'K-Beauty Yolu' : 'The K-Beauty Way',
    title: locale === 'ar' ? 'طقس الجمال الكوري' : locale === 'fr' ? 'Le rituel de la beauté coréenne' : locale === 'de' ? 'Das Ritual koreanischer Schönheit' : locale === 'ko' ? '코리안 뷰티 리추얼' : locale === 'tr' ? 'Kore Güzellik Ritüeli' : 'The Ritual of Korean Beauty',
    description: locale === 'ar' ? 'سيتم نشر خطوات الروتين بعد مراجعة بيانات الموردين.' : locale === 'fr' ? 'Les étapes seront publiées après vérification des données fournisseurs.' : locale === 'de' ? 'Routineschritte erscheinen nach Prüfung der Lieferantendaten.' : locale === 'ko' ? '공급사 자료 검토 후 루틴 단계가 공개됩니다.' : locale === 'tr' ? 'Rutin adımları tedarikçi verileri doğrulandıktan sonra yayınlanacak.' : 'Routine steps will be published after supplier documentation and internal review.',
    step: locale === 'ar' ? 'الخطوة' : locale === 'fr' ? 'Étape' : locale === 'de' ? 'Schritt' : locale === 'ko' ? '단계' : locale === 'tr' ? 'Adım' : 'Step',
  }

  const localizedStep = (step: (typeof ritualSteps)[number]) => {
    const translations: Record<string, Partial<Record<typeof locale, { title: string; description: string }>>> = {
      Cleanse: {
        ar: { title: 'التنظيف', description: 'ابدئي بمنظف موثّق بعد اعتماد مستندات المورد.' },
        fr: { title: 'Nettoyer', description: 'Commencez par un nettoyant vérifié après validation des documents fournisseur.' },
        de: { title: 'Reinigen', description: 'Starte mit einem verifizierten Reiniger, sobald die Lieferantendokumente freigegeben sind.' },
        ko: { title: '클렌징', description: '공급사 문서 승인 후 검증된 클렌저로 시작하세요.' },
        tr: { title: 'Temizle', description: 'Tedarikçi belgeleri onaylandıktan sonra doğrulanmış bir temizleyiciyle başlayın.' },
      },
      'Tone & Prep': {
        ar: { title: 'التونر والتحضير', description: 'استخدمي التونر أو خطوة التحضير فقط بعد مراجعة التركيبة والاستخدام وقائمة المكونات.' },
        fr: { title: 'Tonifier & préparer', description: 'Utilisez le tonique ou la préparation après validation finale de la formule, de l’usage et de l’INCI.' },
        de: { title: 'Tonen & vorbereiten', description: 'Toner oder Prep-Schritte folgen erst nach finaler Formel-, Anwendungs- und INCI-Prüfung.' },
        ko: { title: '토닝 & 준비', description: '최종 포뮬러, 사용법, INCI 검토 후 토너 또는 준비 단계를 사용하세요.' },
        tr: { title: 'Tonikle & hazırla', description: 'Tonik veya hazırlık adımı yalnızca formül, kullanım ve INCI incelemesinden sonra kullanılır.' },
      },
      Treat: {
        ar: { title: 'المعالجة', description: 'سيتم ترتيب خطوات المعالجة حسب الاحتياجات المؤكدة والادعاءات المعتمدة.' },
        fr: { title: 'Traiter', description: 'Les étapes de traitement seront organisées par besoins confirmés et promesses approuvées.' },
        de: { title: 'Behandeln', description: 'Treatment-Schritte werden nach bestätigten Anliegen und freigegebenen Aussagen geordnet.' },
        ko: { title: '집중 케어', description: '트리트먼트 단계는 확인된 고민과 승인된 표현에 맞춰 정리됩니다.' },
        tr: { title: 'Bakım uygula', description: 'Bakım adımları doğrulanmış ihtiyaçlara ve onaylı ifadelere göre düzenlenecek.' },
      },
      Moisturize: {
        ar: { title: 'الترطيب', description: 'سيتم وصف الكريمات والزيوت بنص محايد بعد توثيق المورد.' },
        fr: { title: 'Hydrater', description: 'Les crèmes et huiles seront décrites avec un texte neutre après vérification fournisseur.' },
        de: { title: 'Befeuchten', description: 'Cremes und Öle werden nach Lieferantenprüfung neutral beschrieben.' },
        ko: { title: '보습', description: '크림과 오일은 공급사 검증 후 중립적인 문구로 설명됩니다.' },
        tr: { title: 'Nemlendir', description: 'Kremler ve yağlar tedarikçi doğrulamasından sonra nötr metinle anlatılacak.' },
      },
      Protect: {
        ar: { title: 'الحماية', description: 'ستُنشر إرشادات العناية الشمسية فقط بعد مراجعة الامتثال الإقليمي.' },
        fr: { title: 'Protéger', description: 'Les conseils solaires seront publiés après vérification réglementaire régionale.' },
        de: { title: 'Schützen', description: 'Sonnenpflege-Hinweise erscheinen erst nach konformer regionaler Prüfung.' },
        ko: { title: '보호', description: '선 케어 안내는 지역별 컴플라이언스 검토 후 게시됩니다.' },
        tr: { title: 'Koru', description: 'Güneş bakımı rehberi bölgesel uygunluk incelemesinden sonra yayımlanacak.' },
      },
      Glow: {
        ar: { title: 'الإشراق', description: 'اختتمي بلحظة طقس متوازنة: ملمس هادئ، ضوء ناعم، وثقة يومية.' },
        fr: { title: 'Éclat', description: 'Terminez par un moment rituel composé: texture calme, lumière douce et confiance quotidienne.' },
        de: { title: 'Glow', description: 'Schließe mit einem ruhigen Ritualmoment ab: sanfte Textur, weiches Licht und tägliches Vertrauen.' },
        ko: { title: '광채', description: '차분한 텍스처, 부드러운 빛, 일상의 자신감으로 리추얼을 마무리하세요.' },
        tr: { title: 'Işıltı', description: 'Sakin doku, yumuşak ışık ve günlük güvenle ritüeli tamamlayın.' },
      },
    }
    return { ...step, ...(translations[step.title]?.[locale] ?? {}) }
  }

  return (
    <AtmosphereSection atmosphere="ivory" withAtmosphereOverlay={false} className="py-24 lg:py-32">
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 opacity-75">
          <div className="absolute top-1/4 -left-32 h-64 w-64 rounded-full bg-blush-pink/14 blur-2xl" />
          <div className="absolute bottom-1/4 -right-32 h-72 w-72 rounded-full bg-rose-mauve/8 blur-2xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 lg:px-6">
          <ChapterHeading
            kicker={copy.kicker}
            title={copy.title}
            description={copy.description}
            align="center"
            className="mx-auto mb-16 max-w-4xl lg:mb-24"
          />

          <div className="relative">
            <div className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-gradient-to-b from-blush-pink via-rose-mauve to-plum opacity-30 lg:block" />

            <div className="space-y-16 lg:space-y-24">
              {ritualSteps.map((step, index) => (
                <div
                  key={step.number}
                  className={cn(
                    'relative grid items-center gap-8 lg:grid-cols-2 lg:gap-20',
                    index % 2 === 1 && 'lg:[direction:rtl]'
                  )}
                >
                  <div className={cn('lg:text-left', index % 2 === 1 && 'lg:order-2 lg:text-right')}>
                    <div
                      className={cn(
                        'mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br',
                        step.color,
                        'via-[#e0c196]/35 to-[#f0dec0]/80 border border-[#cfae83]/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.36),0_14px_30px_rgba(70,49,32,0.10)]'
                      )}
                    >
                      <span className="font-serif text-xl font-bold text-charcoal/82">{step.number}</span>
                    </div>

                    <h3 className="mb-4 font-serif text-2xl font-bold text-charcoal lg:text-3xl">
                      {localizedStep(step).title}
                    </h3>

                    <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
                      {localizedStep(step).description}
                    </p>
                  </div>

                  <div className={cn(index % 2 === 1 && 'lg:order-1')}>
                    <RitualImageFrame
                      alt={localizedStep(step).title}
                      color={step.color}
                      hint={`${copy.step} ${step.number}`}
                      index={index}
                      src={step.image}
                    />
                  </div>

                  <div className="absolute left-1/2 top-1/2 z-10 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-warm-ivory bg-rose-mauve lg:block" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 text-center">
            <Link
              href={localizeHref('/shop', locale)}
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-8 py-4',
                'bg-gradient-to-r from-rose-mauve to-[#d3af84] font-medium text-white transition-all duration-300 hover:brightness-105',
                'shadow-lg shadow-rose-mauve/20'
              )}
            >
              {t.shopTheRitual}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </AtmosphereSection>
  )
}
