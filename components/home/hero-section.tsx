'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, PlayCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLocale } from '@/components/providers/locale-provider'
import { localizeHref, type Locale } from '@/lib/i18n'

type HeroConcept = { id: string; name: string }
type HeroMedia = { primary: string; secondary?: string; tertiary?: string; quaternary?: string; video?: string; preferVideo?: boolean }

const heroConcepts: HeroConcept[] = [
  { id: 'image-editorial', name: 'Image Editorial' },
  { id: 'campaign-cover', name: 'Campaign Cover' },
  { id: 'split-stack', name: 'Split Stack' },
  { id: 'minimal-white', name: 'Minimal White' },
  { id: 'cinematic-type', name: 'Cinematic Type' },
  { id: 'video-motion', name: 'Video Motion' },
  { id: 'floating-architecture', name: 'Floating Architecture' },
  { id: 'mist-glass', name: 'Mist Glass' },
  { id: 'magazine-grid', name: 'Magazine Grid' },
  { id: 'commerce-luxe', name: 'Commerce Luxe' },
  { id: 'design-11-video-signature', name: 'Design 11 Video Signature' },
]

const HERO_ASSETS = {
  images: [
    '/first slide example/ChatGPT Image Apr 23, 2026, 08_14_40 PM.png',
    '/first slide example/ChatGPT Image Apr 23, 2026, 08_15_52 PM.png',
    '/first slide example/ChatGPT Image Apr 23, 2026, 08_19_23 PM.png',
    '/first slide example/ChatGPT Image Apr 23, 2026, 08_20_39 PM.png',
    '/first slide example/ChatGPT Image Apr 23, 2026, 08_23_22 PM.png',
    '/first slide example/ChatGPT Image Apr 23, 2026, 08_29_09 PM.png',
  ],
  video: '/first slide example/Video first slide.mp4',
}

const FALLBACK_IMAGES = ['/products/luminous-glow-serum-1.jpg', '/products/glass-skin-essence-1.jpg']
const HERO_ONE_EDITORIAL_IMAGE = '/first slide example/ChatGPT Image Apr 24, 2026, 10_47_39 PM.png'
const CINEMATIC_HERO_GALLERY_IMAGES = [
  '/desing hero 2/ChatGPT Image Apr 24, 2026, 12_30_22 PM.png',
  '/desing hero 2/ChatGPT Image Apr 24, 2026, 12_23_16 PM.png',
  '/desing hero 2/ChatGPT Image Apr 24, 2026, 12_25_15 PM.png',
  '/desing hero 2/ChatGPT Image Apr 24, 2026, 12_16_05 PM.png',
  '/desing hero 2/ChatGPT Image Apr 24, 2026, 12_31_29 PM.png',
]
const FLOATING_ARCHITECTURE_BACKGROUND = '/hero7/Untitled design (32).png'
const MAGAZINE_GRID_IMAGES = [
  '/first slide example/ChatGPT Image Apr 23, 2026, 08_14_40 PM.png',
  '/first slide example/ChatGPT Image Apr 23, 2026, 08_15_52 PM.png',
  '/first slide example/ChatGPT Image Apr 23, 2026, 08_19_23 PM.png',
  '/first slide example/ChatGPT Image Apr 23, 2026, 08_20_39 PM.png',
]

function pickAsset(index: number) {
  return HERO_ASSETS.images[index % HERO_ASSETS.images.length] ?? FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]
}

const conceptMediaMap: Record<string, HeroMedia> = {
  'image-editorial': { primary: HERO_ONE_EDITORIAL_IMAGE },
  'cinematic-type': { primary: pickAsset(1), secondary: pickAsset(2) },
  'split-stack': { primary: pickAsset(2), secondary: pickAsset(3), tertiary: pickAsset(4) },
  'minimal-white': { primary: pickAsset(4) },
  'campaign-cover': { primary: pickAsset(5), secondary: pickAsset(0), video: HERO_ASSETS.video, preferVideo: true },
  'video-motion': { primary: pickAsset(1) },
  'floating-architecture': { primary: pickAsset(0), secondary: pickAsset(3), tertiary: pickAsset(5) },
  'mist-glass': { primary: pickAsset(3), secondary: pickAsset(2) },
  'magazine-grid': { primary: pickAsset(5), secondary: pickAsset(4), tertiary: pickAsset(1), quaternary: pickAsset(0) },
  'commerce-luxe': { primary: pickAsset(2), secondary: pickAsset(4) },
  'design-11-video-signature': { primary: pickAsset(0), video: '/video.mp4' },
}

function getMediaForConcept(id: string): HeroMedia {
  return conceptMediaMap[id] ?? { primary: pickAsset(0) }
}

export function HeroSection({ forcedConceptId, showConceptPicker = true }: { forcedConceptId?: string; showConceptPicker?: boolean } = {}) {
  const { locale } = useLocale()
  const [activeId, setActiveId] = useState(heroConcepts[0].id)
  const renderId = forcedConceptId ?? (locale === 'en' ? activeId : 'image-editorial')
  const media = useMemo(() => getMediaForConcept(renderId), [renderId])
  const isMistGlass = renderId === 'mist-glass'

  return (
    <section className={cn('relative w-full overflow-hidden', isMistGlass ? 'pt-0' : 'pt-[7.5rem] lg:pt-[8.5rem]')}>
      <div className={cn('relative w-full', isMistGlass ? 'min-h-screen' : 'min-h-[calc(100vh-7.5rem)] lg:min-h-[calc(100vh-8.5rem)]')}>
        <AnimatePresence mode="wait">
          <motion.div
            key={renderId}
            initial={{ opacity: 0, scale: 1.015, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.992, y: -10 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full"
          >
            {renderId === 'image-editorial' && <ImageEditorialHero locale={locale} media={media} />}
            {renderId === 'cinematic-type' && <CinematicTypographyHero locale={locale} />}
            {renderId === 'split-stack' && <SplitStackHero locale={locale} media={media} />}
            {renderId === 'minimal-white' && <MinimalWhiteHero locale={locale} media={media} />}
            {renderId === 'campaign-cover' && <CampaignCoverHero locale={locale} media={media} />}
            {renderId === 'video-motion' && <VideoMotionHero locale={locale} media={media} />}
            {renderId === 'floating-architecture' && <FloatingArchitectureHero locale={locale} />}
            {renderId === 'mist-glass' && <MistGlassHero locale={locale} />}
            {renderId === 'magazine-grid' && <MagazineGridHero locale={locale} />}
            {renderId === 'commerce-luxe' && <CommerceLuxeHero locale={locale} media={media} />}
            {renderId === 'design-11-video-signature' && <Design11Hero locale={locale} media={media} />}
          </motion.div>
        </AnimatePresence>

        {false && (
          <div className="hidden sm:block absolute md:right-2 lg:right-3 top-1/2 z-40 -translate-y-1/2">
            {/* P0: hide selector on extra-small screens and nudge tablet placement to avoid overlap with hero copy. */}
            <div className="rounded-2xl border border-rose-mauve/22 bg-white/70 p-2 backdrop-blur-sm shadow-[0_18px_35px_rgba(197,153,166,0.22)]">
              <div className="grid gap-1.5">
                {heroConcepts.map((concept, index) => (
                  <button
                    key={concept.id}
                    onClick={() => setActiveId(concept.id)}
                    className={cn(
                      'h-8 w-8 rounded-full text-[11px] font-semibold transition-all',
                      activeId === concept.id
                        ? 'bg-gradient-to-r from-rose-mauve to-[#d8b894] text-white shadow-sm'
                        : 'border border-rose-mauve/20 bg-white/90 text-charcoal/75 hover:border-rose-mauve/45'
                    )}
                    aria-label={`Switch hero concept ${index + 1}`}
                    title={`${index + 1}. ${concept.name}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function HeroImage({ src, alt, className, priority }: { src: string; alt: string; className?: string; priority?: boolean }) {
  const [failed, setFailed] = useState(false)
  const fallback = FALLBACK_IMAGES[0]

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Image
        src={failed ? fallback : src}
        alt={alt}
        fill
        // P0: provide responsive image sizing hints for better bandwidth/LCP behavior.
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 50vw"
        priority={priority}
        className="object-cover object-[center_36%]"
        onError={() => setFailed(true)}
      />
    </div>
  )
}

function HeroVideo({ media, className }: { media: HeroMedia; className?: string }) {
  const [failed, setFailed] = useState(false)
  if (!media.video || failed) {
    return <HeroImage src={media.primary} alt="Hero fallback visual" className={className} />
  }

  return (
    <video
      src={media.video}
      autoPlay
      muted
      loop
      playsInline
      onError={() => setFailed(true)}
      className={cn('h-full w-full object-cover', className)}
    />
  )
}

function PrimaryCta({ locale, subtle }: { locale: Locale; subtle?: boolean }) {
  const label = locale === 'ar' ? 'اكتشف التشكيلة' : locale === 'fr' ? 'Découvrir la collection' : locale === 'de' ? 'Kollektion entdecken' : locale === 'ko' ? '컬렉션 보기' : locale === 'tr' ? 'Koleksiyonu Keşfet' : 'Explore Collection'
  return (
    <Link
      href={localizeHref('/shop', locale)}
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all',
        subtle
          ? 'border border-rose-mauve/30 bg-white/80 text-charcoal hover:bg-white'
          : 'bg-gradient-to-r from-rose-mauve to-[#d3af84] text-white hover:brightness-105'
      )}
    >
      {label}
      <ArrowRight className="h-4 w-4" />
    </Link>
  )
}

function ImageEditorialHero({ locale, media }: { locale: Locale; media: HeroMedia }) {
  const categoryNav = [
    { label: locale === 'ar' ? 'الوجه' : locale === 'fr' ? 'VISAGE' : locale === 'de' ? 'GESICHT' : locale === 'ko' ? '페이스' : locale === 'tr' ? 'YÜZ' : 'FACE', image: '/desing hero 2/ChatGPT Image Apr 24, 2026, 12_25_15 PM.png', href: '/shop?category=face' },
    { label: locale === 'ar' ? 'الشفاه والخدود' : locale === 'fr' ? 'LÈVRES & JOUES' : locale === 'de' ? 'LIPPEN & WANGEN' : locale === 'ko' ? '립 & 치크' : locale === 'tr' ? 'DUDAK & YANAK' : 'LIPS & CHEEKS', image: '/lip.jpg', href: '/shop?category=lips-cheeks' },
    { label: locale === 'ar' ? 'العيون' : locale === 'fr' ? 'YEUX' : locale === 'de' ? 'AUGEN' : locale === 'ko' ? '아이' : locale === 'tr' ? 'GÖZLER' : 'EYES', image: '/stunning-blue-eye-stockcake.jpg.webp', href: '/shop?category=eyes' },
    { label: locale === 'ar' ? 'الباقات والمجموعات' : locale === 'fr' ? 'COFFRETS & SETS' : locale === 'de' ? 'BUNDLES & SETS' : locale === 'ko' ? '번들 & 세트' : locale === 'tr' ? 'BUNDLE & SETLER' : 'BUNDLES & SETS', image: '/hero7/Untitled design (32).png', href: '/shop?category=bundles-sets' },
    { label: locale === 'ar' ? 'كل المنتجات' : locale === 'fr' ? 'TOUS LES PRODUITS' : locale === 'de' ? 'ALLE PRODUKTE' : locale === 'ko' ? '전체 제품' : locale === 'tr' ? 'TÜM ÜRÜNLER' : 'ALL PRODUCTS', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_14_40 PM.png', href: '/shop' },
  ]
  const heading = locale === 'ar' ? 'معيار توهج الورد' : locale === 'fr' ? 'Le Standard Rose Lumière' : locale === 'de' ? 'Der Rose-Light Standard' : locale === 'ko' ? '로즈 라이트 스탠다드' : locale === 'tr' ? 'Gül Işığı Standardı' : 'The Rose Light Standard'
  const body = locale === 'ar' ? 'اتجاه بصري كامل الشاشة لسرد حملات فاخرة.' : locale === 'fr' ? 'Une direction visuelle plein écran pour un récit de campagne premium.' : locale === 'de' ? 'Eine Full-Bleed-Bildrichtung für premium Kampagnen-Storytelling.' : locale === 'ko' ? '프리미엄 캠페인 스토리텔링을 위한 풀블리드 비주얼 방향.' : locale === 'tr' ? 'Premium kampanya anlatımı için tam ekran görsel yön.' : 'A full-bleed image direction built for premium campaign storytelling.'

  return (
    <section className="bg-[#fdf8f5]">
      {/* P0: safer mobile hero height to reduce copy crowding on short viewports. */}
      <div className="relative h-[62vh] min-h-[520px] sm:h-[68vh] overflow-hidden">
        <HeroImage src={media.primary} alt="Editorial background" className="absolute inset-0 [&_img]:object-[center_9%]" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/48 via-charcoal/20 to-charcoal/5" />
        <div className="absolute left-8 top-10 max-w-2xl lg:left-14 lg:top-14">
          <p className="text-kicker text-white/85">JISOO Editorial</p>
          {/* P0: normalize headline scaling for mobile/tablet/desktop consistency. */}
          <h1 className="mt-3 font-serif text-[clamp(2rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.02em] text-white">{heading}</h1>
          <p className="mt-4 text-white/82">{body}</p>
          <div className="mt-7"><PrimaryCta locale={locale} /></div>
        </div>
      </div>

      <div className="px-4 pb-8 pt-2 -mt-2 lg:px-14 lg:pb-10 lg:pt-7">
        <div className="mx-auto flex max-w-6xl flex-wrap items-start justify-center gap-x-8 gap-y-5 py-2 sm:gap-x-10 sm:gap-y-6 lg:gap-x-12 lg:gap-y-5">
          {categoryNav.map(item => (
            <Link
              key={item.label}
              href={localizeHref(item.href, locale)}
              className="group flex w-[134px] flex-col items-center text-center sm:w-[146px]"
            >
              <div className="relative h-20 w-20 overflow-hidden rounded-full ring-1 ring-rose-mauve/30 transition group-hover:ring-rose-mauve/55 lg:h-24 lg:w-24">
                <Image src={item.image} alt={item.label} fill className="object-cover" />
              </div>
              <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium tracking-[0.08em] text-charcoal/80 transition-colors group-hover:text-charcoal">
                {item.label}
                <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function CinematicTypographyHero({ locale }: { locale: Locale }) {
  return (
    <section className="relative flex h-[68vh] flex-col justify-between overflow-hidden bg-[radial-gradient(circle_at_50%_24%,#fbeff4_0%,#fffaf6_48%,#f8efe7_100%)] px-6 pb-7 pt-10 text-center lg:px-14 lg:pb-9">
      <div className="mx-auto max-w-4xl">
        <motion.h1 initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-serif text-4xl leading-[1.02] tracking-[-0.01em] text-charcoal sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
          Seoul Glow,
          <span className="mt-1 block text-rose-mauve">Softly Revealed</span>
        </motion.h1>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-charcoal/68 sm:text-base">
          A curated Korean beauty ritual shaped for luminous skin, delicate color, and everyday elegance.
        </p>
        <div className="mt-7">
          <Link
            href={localizeHref('/shop', locale)}
            className="inline-flex items-center gap-2 rounded-full border border-rose-mauve/30 bg-white/80 px-6 py-3 text-sm font-medium text-charcoal transition-all hover:bg-white"
          >
            Discover the Collection
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-6xl translate-y-5 grid-cols-5 items-end gap-1 lg:translate-y-6 lg:gap-1.5">
        <HeroImage src={CINEMATIC_HERO_GALLERY_IMAGES[0]} alt="Editorial tile 1" className="h-36 sm:h-44 lg:h-52" />
        <HeroImage src={CINEMATIC_HERO_GALLERY_IMAGES[1]} alt="Editorial tile 2" className="h-36 sm:h-44 lg:h-52" />
        <HeroImage src={CINEMATIC_HERO_GALLERY_IMAGES[2]} alt="Editorial tile 3" className="h-36 sm:h-44 lg:h-52" />
        <HeroImage src={CINEMATIC_HERO_GALLERY_IMAGES[3]} alt="Editorial tile 4" className="h-36 sm:h-44 lg:h-52" />
        <HeroImage src={CINEMATIC_HERO_GALLERY_IMAGES[4]} alt="Editorial tile 5" className="h-36 sm:h-44 lg:h-52" />
      </div>
    </section>
  )
}

function SplitStackHero({ locale, media }: { locale: Locale; media: HeroMedia }) {
  return (
    <section className="grid min-h-[68vh] overflow-hidden lg:grid-cols-[1.05fr_0.95fr]">
      <div className="relative bg-[#fff9f6] p-8 lg:p-14">
        <h1 className="font-serif text-5xl text-charcoal lg:text-7xl">Layered Ritual Architecture</h1>
        <p className="mt-5 max-w-lg text-charcoal/68">Commerce-meets-editorial split direction with stacked visual ingredients.</p>
        <div className="mt-8"><PrimaryCta locale={locale} /></div>
        <div className="mt-10 grid max-w-lg grid-cols-2 gap-4">
          <HeroImage src={media.secondary ?? media.primary} alt="Stack media 1" className="aspect-[4/5] rounded-2xl" />
          <HeroImage src={media.tertiary ?? media.primary} alt="Stack media 2" className="aspect-[4/5] rounded-2xl" />
        </div>
      </div>
      <HeroImage src={media.primary} alt="Split hero" className="h-full min-h-[68vh]" />
    </section>
  )
}

function MinimalWhiteHero({ locale, media }: { locale: Locale; media: HeroMedia }) {
  return (
    <section className="grid h-[68vh] overflow-hidden lg:grid-cols-[1.05fr_0.95fr]">
      <div className="flex items-center bg-gradient-to-br from-[#fffdfb] to-[#f9f0ea] px-7 lg:px-14">
        <div className="max-w-xl">
          <p className="text-kicker text-charcoal/48">Quiet Luxury Formula House</p>
          <h1 className="mt-4 font-serif text-5xl text-charcoal lg:text-7xl">Minimal. Elegant. Seoul.</h1>
          <p className="mt-4 max-w-lg text-charcoal/62">A modern minimal direction with balanced editorial typography and a premium visual anchor.</p>
          <div className="mt-7"><PrimaryCta locale={locale} subtle /></div>
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-0 overflow-hidden rounded-[2rem] lg:translate-x-[-2%]">
          <HeroImage src={media.primary} alt="Minimal hero visual" className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/28 via-transparent to-charcoal/8" />
        </div>
      </div>
    </section>
  )
}

function CampaignCoverHero({ locale, media }: { locale: Locale; media: HeroMedia }) {
  return (
    <section className="relative h-[68vh] overflow-hidden">
      <HeroImage src="/ChatGPT Image Apr 24, 2026, 10_47_39 PM.png" alt="Campaign cover background" className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/58 via-charcoal/35 to-charcoal/15" />
      <div className="relative flex h-full items-center px-7 lg:px-14">
        <div className="max-w-2xl text-white">
          <p className="text-kicker text-white/78">Campaign Cover / Vol.04</p>
          <h1 className="mt-4 font-serif text-6xl leading-[0.9] lg:text-8xl">THE GLOW ISSUE</h1>
          <p className="mt-5 max-w-xl text-white/80">Campaign-cover direction with open cinematic media and premium editorial hierarchy.</p>
          <div className="mt-7 flex flex-wrap gap-3"><PrimaryCta locale={locale} /><Link href={localizeHref('/ai-consultant', locale)} className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-3 text-sm text-white backdrop-blur-sm"><PlayCircle className="h-4 w-4" />Consult</Link></div>
        </div>
      </div>
      <div className="absolute bottom-6 right-6 hidden h-48 w-36 overflow-hidden rounded-2xl border border-white/45 shadow-xl lg:block">
        <HeroImage src={media.secondary ?? media.primary} alt="Campaign detail visual" className="h-full" />
      </div>
    </section>
  )
}

function VideoMotionHero({ locale, media }: { locale: Locale; media: HeroMedia }) {
  return (
    <section className="px-4 lg:px-8">
      <div className="relative mx-auto h-[68vh] max-w-[92rem] overflow-hidden rounded-[2rem] bg-charcoal">
        <HeroVideo media={media} className="absolute inset-0 opacity-88" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/56 via-charcoal/28 to-charcoal/44" />
        <div className="relative flex h-full items-center px-8 lg:px-14">
          <div className="max-w-2xl text-white">
            <p className="text-kicker text-white/75">Motion Editorial</p>
            <h1 className="mt-4 font-serif text-5xl lg:text-7xl">A Living Campaign Hero</h1>
            <p className="mt-5 text-white/80">Video-led immersive concept for launches, seasonal campaigns, and cinematic storytelling.</p>
            <div className="mt-8"><PrimaryCta locale={locale} /></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FloatingArchitectureHero({ locale }: { locale: Locale }) {
  return (
    <section className="relative h-full min-h-[calc(100vh-7.5rem)] w-full overflow-hidden lg:min-h-[calc(100vh-8.5rem)]">
      <Image
        src={FLOATING_ARCHITECTURE_BACKGROUND}
        alt="Floating architecture background"
        fill
        className="absolute inset-0 h-full w-full object-cover object-bottom"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/48 via-charcoal/24 to-charcoal/38" />
      <div className="relative z-10 flex h-full items-start px-8 pt-10 lg:px-12 lg:pt-12">
        <div className="max-w-2xl text-white">
          <h1 className="font-serif text-4xl lg:text-6xl">Floating Product Architecture</h1>
          <p className="mt-3 max-w-xl text-white/84">Asymmetric, object-led visual concept with sculptural campaign rhythm.</p>
          <div className="mt-6"><PrimaryCta locale={locale} /></div>
        </div>
      </div>
    </section>
  )
}

function MistGlassHero({ locale }: { locale: Locale }) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Image
        src={FLOATING_ARCHITECTURE_BACKGROUND}
        alt="Mist glass background"
        fill
        className="absolute inset-0 h-full w-full object-cover"
        priority
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_22%,rgba(255,255,255,0.35),transparent_42%),radial-gradient(circle_at_78%_30%,rgba(248,228,238,0.26),transparent_46%),linear-gradient(145deg,rgba(26,22,25,0.14),rgba(26,22,25,0.04))]" />
      <div className="relative z-10 flex h-full items-start px-8 pt-[7.5rem] lg:px-12 lg:pt-[8.5rem]">
        <div className="max-w-2xl text-white">
          <p className="text-kicker text-white/78">Glass Fade Direction</p>
          <h1 className="mt-3 font-serif text-4xl lg:text-6xl">Mist, Glow, Precision</h1>
          <p className="mt-4 max-w-xl text-white/82">A cleaner premium mist concept with full-background depth, quiet gradients, and soft editorial typography.</p>
          <div className="mt-7"><PrimaryCta locale={locale} /></div>
        </div>
      </div>
    </section>
  )
}

function MagazineGridHero({ locale }: { locale: Locale }) {
  return (
    <section className="grid min-h-[68vh] grid-cols-2 gap-3 rounded-[2rem] bg-[#fffaf6] p-3 lg:grid-cols-12 lg:grid-rows-6 lg:gap-4 lg:p-4">
      <div className="col-span-2 lg:col-span-7 lg:row-span-6">
        <HeroImage src={MAGAZINE_GRID_IMAGES[0]} alt="Magazine main" className="h-full min-h-[320px] rounded-[1.6rem]" />
      </div>
      <div className="col-span-1 lg:col-span-5 lg:row-span-3"><HeroImage src={MAGAZINE_GRID_IMAGES[1]} alt="Magazine secondary" className="h-full min-h-[160px] rounded-[1.2rem]" /></div>
      <div className="col-span-1 lg:col-span-2 lg:row-span-3"><HeroImage src={MAGAZINE_GRID_IMAGES[2]} alt="Magazine tertiary" className="h-full min-h-[160px] rounded-[1.2rem]" /></div>
      <div className="col-span-1 lg:col-span-3 lg:row-span-3"><HeroImage src={MAGAZINE_GRID_IMAGES[3]} alt="Magazine quaternary" className="h-full min-h-[160px] rounded-[1.2rem]" /></div>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
        className="col-span-2 flex items-center rounded-[2rem] border border-rose-mauve/18 bg-[linear-gradient(142deg,rgba(255,248,246,0.97),rgba(255,237,232,0.9))] p-6 shadow-[0_20px_50px_rgba(176,128,144,0.16)] backdrop-blur-[4px] lg:col-span-5 lg:row-span-3 lg:p-8"
      >
        <div>
          <p className="text-kicker tracking-[0.19em] text-rose-mauve/72">JISOO Editorial</p>
          <h1 className="mt-2 font-serif text-[2.1rem] leading-[1.01] tracking-[-0.022em] text-charcoal lg:text-[3.65rem]">Editorial Layout Mosaic</h1>
          <p className="mt-3 max-w-xl text-[0.96rem] font-light leading-[1.78] text-charcoal/56 lg:text-[1.04rem]">Magazine-inspired spatial rhythm with modular media storytelling in a refined, gallery-led composition.</p>
          <div className="mt-6">
            <Link
              href={localizeHref('/shop', locale)}
              aria-label="Discover the editorial edit"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-mauve via-[#ce9fad] to-[#d9b991] px-6 py-3 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.38),0_12px_30px_rgba(194,147,160,0.3)] transition-all duration-300 hover:scale-[1.02] hover:brightness-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-mauve/45 focus-visible:ring-offset-2"
            >
              Discover the Edit
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function CommerceLuxeHero({ locale, media }: { locale: Locale; media: HeroMedia }) {
  return (
    <section className="grid min-h-[68vh] overflow-hidden rounded-[2rem] lg:grid-cols-[0.95fr_1.05fr]">
      <div className="bg-[#fffaf7] p-8 lg:p-12">
        <p className="text-kicker text-rose-mauve">Luxury Commerce Hero</p>
        <h1 className="mt-3 font-serif text-5xl text-charcoal lg:text-7xl">Shop Signature Essentials</h1>
        <p className="mt-4 max-w-lg text-charcoal/65">Conversion-first direction blending premium styling with direct shopping pathways.</p>
        <div className="mt-7 space-y-3">
          {['Best Sellers', 'Starter Ritual', 'New Arrivals'].map(item => (
            <Link key={item} href={localizeHref('/shop', locale)} className="flex items-center justify-between rounded-xl border border-rose-mauve/20 bg-white px-4 py-3 text-sm font-medium text-charcoal hover:border-rose-mauve/35">
              {item}
              <ArrowRight className="h-4 w-4 text-rose-mauve" />
            </Link>
          ))}
        </div>
        <div className="mt-7"><PrimaryCta locale={locale} /></div>
      </div>
      <div className="relative">
        <HeroImage src={media.primary} alt="Commerce visual" className="absolute inset-0" />
        <div className="absolute bottom-6 right-6 h-40 w-32 overflow-hidden rounded-2xl border border-white/60 shadow-xl lg:h-52 lg:w-40"><HeroImage src={media.secondary ?? media.primary} alt="Commerce detail" className="h-full" /></div>
      </div>
    </section>
  )
}

function Design11Hero({ locale, media }: { locale: Locale; media: HeroMedia }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLooping, setIsLooping] = useState(true)
  const [isFrozen, setIsFrozen] = useState(false)

  useEffect(() => {
    // Design 11: run the intro animation window, then freeze the background to a static frame.
    const timer = window.setTimeout(() => {
      const video = videoRef.current
      if (video) {
        video.pause()
      }
      setIsLooping(false)
      setIsFrozen(true)
    }, 3200)

    return () => window.clearTimeout(timer)
  }, [])

  return (
    <section className="relative h-[56vh] min-h-[460px] overflow-hidden sm:h-[64vh] sm:min-h-[500px] lg:h-[calc(100vh-8.5rem)] lg:min-h-[680px]">
      {/* Background media: autoplay + muted + loop for intro phase, then pause to a static visual frame. */}
      <video
        ref={videoRef}
        src={media.video}
        autoPlay
        muted
        loop={isLooping}
        playsInline
        preload="metadata"
        poster={media.primary}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Readability layer: soft blush/rose gradient that keeps copy legible across devices. */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(33,24,30,0.2)_0%,rgba(33,24,30,0.26)_42%,rgba(33,24,30,0.36)_100%),radial-gradient(circle_at_50%_10%,rgba(255,226,233,0.2)_0%,rgba(255,226,233,0)_50%)]" />

      {/* Foreground content: centered logo, concise headline/subheading, and tappable CTA with motion. */}
      <div className="relative z-10 flex h-full items-center justify-center px-5 pb-10 pt-16 text-center sm:px-8 sm:pb-14 sm:pt-20 lg:px-10 lg:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex w-full max-w-4xl flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-6 h-9 w-36 sm:h-11 sm:w-44 lg:mb-7 lg:h-12 lg:w-52"
          >
            <Image src="/placeholder-logo.svg" alt="JISOO logo" fill sizes="220px" className="object-contain brightness-0 invert" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[clamp(2rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.02em] text-white"
          >
            Signature Light, Quietly Cinematic
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 max-w-2xl text-[0.98rem] leading-relaxed text-white/88 sm:mt-4 sm:text-base"
          >
            A refined hero direction blending editorial motion, soft rose atmosphere, and premium Seoul minimalism.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 sm:mt-7"
          >
            <Link
              href={localizeHref('/shop', locale)}
              aria-label="Explore the signature collection"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-rose-mauve via-[#cc9eac] to-[#d8b894] px-7 py-3 text-sm font-medium text-white shadow-[0_12px_30px_rgba(186,130,154,0.3)] transition-transform duration-300 hover:scale-[1.02] hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal/30 sm:text-[0.95rem]"
            >
              Discover the Signature Edit
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Static-state helper: keeps design deterministic after the intro animation window is finished. */}
      {isFrozen && <span className="sr-only">Background animation complete</span>}
    </section>
  )
}
