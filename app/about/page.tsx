'use client'

import { useCallback, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { useLocale } from '@/components/providers/locale-provider'
import { localizeHref, type Locale } from '@/lib/i18n'

const images = [
  '/About/ChatGPT Image Apr 23, 2026, 04_44_02 PM.png',
  '/About/ChatGPT Image Apr 23, 2026, 04_46_37 PM.png',
  '/About/ChatGPT Image Apr 23, 2026, 07_28_56 PM.png',
  '/About/ChatGPT Image Apr 23, 2026, 07_31_23 PM.png',
]

const copy: Record<Locale, {
  chapters: { kicker: string; title: string; body: string }[]
  closeTitle: string
  closeBody: string
  cta: string
}> = {
  en: {
    chapters: [
      { kicker: 'Origin', title: 'A Korean family ritual, refined for today.', body: 'JISOO began with the quiet care of grandparents in Korea: rice water, botanical infusions, fermented extracts, and the belief that skin should be treated with patience before polish.' },
      { kicker: 'Ritual', title: 'The kind of glow that does not need to shout.', body: 'Our formulas are built for daily return: soft layers, breathable textures, and ingredients chosen for comfort, clarity, and a luminous finish that feels lived-in.' },
      { kicker: 'Texture', title: 'Editorial outside. Gentle inside.', body: 'The collection is composed with the eye of a campaign and the discipline of a skincare routine: precise, minimal, sensorial, and never careless.' },
      { kicker: 'Promise', title: 'From Seoul memory to your morning mirror.', body: 'Every product carries the same idea: less noise, more care, and a small Korean ritual that makes ordinary days feel considered.' },
    ],
    closeTitle: 'Made from memory. Finished with modern Korean precision.',
    closeBody: 'This is the JISOO standard: heritage held softly, formulas made carefully, and beauty that feels personal before it feels performative.',
    cta: 'Shop the ritual',
  },
  ar: {
    chapters: [
      { kicker: 'الأصل', title: 'طقس عائلي كوري، بصياغة حديثة.', body: 'بدأت JISOO من عناية الأجداد الهادئة في كوريا: ماء الأرز، النباتات، المستخلصات المخمرة، والإيمان بأن البشرة تحتاج الصبر قبل اللمعان.' },
      { kicker: 'الطقس', title: 'إشراقة لا تحتاج إلى ضجيج.', body: 'تركيباتنا مصممة للعودة اليومية: طبقات ناعمة، قوام مريح، ومكونات مختارة للراحة والصفاء واللمسة المضيئة.' },
      { kicker: 'القوام', title: 'تحريري من الخارج. لطيف من الداخل.', body: 'المجموعة مصممة بعين حملة جمالية وانضباط روتين عناية: دقيقة، قليلة، حسية، ولا شيء فيها عشوائي.' },
      { kicker: 'الوعد', title: 'من ذاكرة سيول إلى مرآتك الصباحية.', body: 'كل منتج يحمل الفكرة نفسها: ضجيج أقل، عناية أكثر، وطقس كوري صغير يجعل الأيام العادية أكثر جمالًا.' },
    ],
    closeTitle: 'مصنوعة من الذاكرة. مكتملة بدقة كورية حديثة.',
    closeBody: 'هذا هو معيار JISOO: إرث ناعم، تركيبات دقيقة، وجمال يبدو شخصيًا قبل أن يبدو استعراضيًا.',
    cta: 'تسوقي الطقس',
  },
  fr: {
    chapters: [
      { kicker: 'Origine', title: 'Un rituel familial coréen, affiné pour aujourd’hui.', body: 'JISOO naît des gestes calmes des grands-parents en Corée: eau de riz, plantes, extraits fermentés et patience avant perfection.' },
      { kicker: 'Rituel', title: 'Un éclat qui n’a pas besoin de bruit.', body: 'Des couches douces, des textures respirantes et des ingrédients choisis pour le confort, la clarté et une lumière naturelle.' },
      { kicker: 'Texture', title: 'Éditorial dehors. Doux dedans.', body: 'La collection a l’œil d’une campagne et la discipline d’un rituel: précise, minimale, sensorielle.' },
      { kicker: 'Promesse', title: 'De Séoul à votre miroir du matin.', body: 'Moins de bruit, plus de soin, et un petit rituel coréen pour rendre le quotidien plus intentionnel.' },
    ],
    closeTitle: 'Né de la mémoire. Fini avec précision coréenne.',
    closeBody: 'Le standard JISOO: héritage doux, formules soignées, beauté personnelle.',
    cta: 'Acheter le rituel',
  },
  de: {
    chapters: [
      { kicker: 'Ursprung', title: 'Ein koreanisches Familienritual, modern verfeinert.', body: 'JISOO entstand aus ruhiger Pflege koreanischer Großeltern: Reiswasser, Pflanzen, fermentierte Extrakte und Geduld vor Perfektion.' },
      { kicker: 'Ritual', title: 'Glow, der nicht laut sein muss.', body: 'Sanfte Schichten, atmende Texturen und Inhaltsstoffe für Komfort, Klarheit und einen natürlichen Schimmer.' },
      { kicker: 'Textur', title: 'Editorial außen. Sanft innen.', body: 'Die Kollektion verbindet Kampagnenblick mit Pflegeroutine: präzise, minimal und sinnlich.' },
      { kicker: 'Versprechen', title: 'Von Seoul-Erinnerung zum Morgenspiegel.', body: 'Weniger Lärm, mehr Pflege und ein kleines koreanisches Ritual für den Alltag.' },
    ],
    closeTitle: 'Aus Erinnerung gemacht. Mit koreanischer Präzision vollendet.',
    closeBody: 'Das ist der JISOO-Standard: sanftes Erbe, sorgfältige Formeln, persönliche Beauty.',
    cta: 'Ritual shoppen',
  },
  ko: {
    chapters: [
      { kicker: '시작', title: '오늘에 맞게 다듬은 한국 가족의 리추얼.', body: 'JISOO는 쌀뜨물, 식물, 발효 추출물, 그리고 완성보다 먼저 정성을 믿던 한국의 조부모 세대의 돌봄에서 시작되었습니다.' },
      { kicker: '리추얼', title: '큰 소리 내지 않는 광채.', body: '매일 돌아오고 싶은 부드러운 레이어, 숨 쉬는 텍스처, 편안함과 맑은 빛을 위한 성분을 담았습니다.' },
      { kicker: '텍스처', title: '겉은 에디토리얼, 속은 순하게.', body: '캠페인의 감각과 스킨케어 루틴의 기준으로 정교하고 미니멀하며 감각적으로 구성했습니다.' },
      { kicker: '약속', title: '서울의 기억에서 아침 거울까지.', body: '더 적은 소음, 더 많은 정성, 일상을 조금 더 특별하게 만드는 작은 한국 리추얼입니다.' },
    ],
    closeTitle: '기억에서 시작해 한국적 정밀함으로 완성했습니다.',
    closeBody: 'JISOO의 기준은 부드러운 헤리티지, 세심한 포뮬러, 개인적인 아름다움입니다.',
    cta: '리추얼 쇼핑',
  },
  tr: {
    chapters: [
      { kicker: 'Köken', title: 'Bugün için inceltilmiş Kore aile ritüeli.', body: 'JISOO, Koreli büyüklerin pirinç suyu, bitkiler, fermente özler ve sabırlı bakım anlayışından doğdu.' },
      { kicker: 'Ritüel', title: 'Bağırmaya ihtiyaç duymayan ışıltı.', body: 'Yumuşak katmanlar, nefes alan dokular ve konfor ile berraklık için seçilmiş içerikler.' },
      { kicker: 'Doku', title: 'Dışı editoryal. İçi nazik.', body: 'Koleksiyon kampanya gözüyle ve bakım disipliniyle kurgulandı: hassas, minimal, duyusal.' },
      { kicker: 'Söz', title: 'Seul hafızasından sabah aynana.', body: 'Daha az gürültü, daha çok bakım ve sıradan günleri özenli hissettiren küçük bir Kore ritüeli.' },
    ],
    closeTitle: 'Hafızadan yapıldı. Modern Kore hassasiyetiyle tamamlandı.',
    closeBody: 'JISOO standardı: yumuşak miras, özenli formüller, kişisel güzellik.',
    cta: 'Ritüeli keşfet',
  },
}

type StorySlide =
  | { kind: 'image'; image: string }
  | { kind: 'story'; image: string; chapter: { kicker: string; title: string; body: string } }
  | { kind: 'closing'; image: string; title: string; body: string; cta: string }

export default function AboutPage() {
  const { locale } = useLocale()
  const t = copy[locale]
  const lockUntil = useRef(0)
  const touchStart = useRef<number | null>(null)

  const slides: StorySlide[] = useMemo(() => [
    { kind: 'image', image: images[0] },
    { kind: 'story', image: images[0], chapter: t.chapters[0] },
    { kind: 'story', image: images[0], chapter: t.chapters[1] },
    { kind: 'story', image: images[1], chapter: t.chapters[2] },
    { kind: 'story', image: images[1], chapter: t.chapters[3] },
    { kind: 'closing', image: images[3], title: t.closeTitle, body: t.closeBody, cta: t.cta },
  ], [t])

  const [active, setActive] = useState(0)
  const current = slides[active]

  const go = useCallback((direction: number) => {
    const now = Date.now()
    if (now < lockUntil.current) return
    lockUntil.current = now + 850
    setActive((value) => Math.max(0, Math.min(slides.length - 1, value + direction)))
  }, [slides.length])

  return (
    <main
      className="relative h-screen overflow-hidden bg-[#f8f4f0] text-charcoal"
      onWheel={(event) => {
        if (Math.abs(event.deltaY) < 18) return
        go(event.deltaY > 0 ? 1 : -1)
      }}
      onTouchStart={(event) => {
        touchStart.current = event.touches[0]?.clientY ?? null
      }}
      onTouchEnd={(event) => {
        if (touchStart.current == null) return
        const delta = touchStart.current - (event.changedTouches[0]?.clientY ?? touchStart.current)
        if (Math.abs(delta) > 34) go(delta > 0 ? 1 : -1)
        touchStart.current = null
      }}
    >
      <Header transparentOnTop lightOnTop splitLightOnTop={active > 0} />

      <motion.section
        className="absolute inset-0"
        animate={{ backgroundColor: active === 0 ? '#050405' : '#f8f4f0' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        className="absolute left-0 top-0 z-10 overflow-hidden bg-charcoal shadow-[18px_0_70px_rgba(37,32,43,0.15)]"
        animate={active === 0
          ? { width: '100vw', height: '100vh', borderRadius: '0px' }
          : { width: '52vw', height: '100vh', borderRadius: '0px 48px 48px 0px' }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={current.image}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.015 }}
            transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image src={current.image} alt="" fill sizes={active === 0 ? '100vw' : '52vw'} priority={active < 2} className="object-cover object-center" />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/5" />
      </motion.div>

      <AnimatePresence mode="wait">
        {current.kind !== 'image' && (
          <motion.section
            key={`${current.kind}-${active}`}
            className="absolute right-0 top-0 z-0 flex h-screen w-[48vw] items-center px-8 lg:px-16"
            initial={{ opacity: 0, x: 64, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -24, filter: 'blur(8px)' }}
            transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
          >
            {current.kind === 'story' ? (
              <article>
                <p className="text-[11px] uppercase tracking-[0.32em] text-charcoal/42">{current.chapter.kicker}</p>
                <h1 className="mt-5 max-w-[13ch] font-serif text-[clamp(2.4rem,5.4vw,6.8rem)] leading-[0.92] text-charcoal">{current.chapter.title}</h1>
                <p className="mt-7 max-w-xl text-sm leading-7 text-charcoal/64 md:text-base md:leading-8">{current.chapter.body}</p>
              </article>
            ) : (
              <article>
                <p className="text-[11px] uppercase tracking-[0.32em] text-charcoal/42">JISOO Standard</p>
                <h1 className="mt-5 max-w-[12ch] font-serif text-[clamp(2.6rem,5.8vw,7rem)] leading-[0.9] text-charcoal">{current.title}</h1>
                <p className="mt-7 max-w-xl text-base leading-8 text-charcoal/64">{current.body}</p>
                <Link href={localizeHref('/shop', locale)} className="mt-9 inline-flex items-center gap-2 rounded-full bg-charcoal px-6 py-3 text-sm text-white transition hover:bg-rose-mauve">
                  {current.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  )
}
