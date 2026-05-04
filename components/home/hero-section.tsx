'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Playfair_Display, Cormorant_Garamond, Lora, Merriweather, Libre_Baskerville, Montserrat, Poppins, Inter, Roboto, Nunito_Sans } from 'next/font/google'
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
    '/assets/editorial/rose-layering.png',
    '/assets/editorial/serum-ritual.png',
    '/assets/editorial/eye-care.png',
    '/assets/editorial/sun-care.png',
    '/assets/editorial/night-routine.png',
    '/assets/editorial/soft-cheek-glow.png',
  ],
  video: '/assets/video/signature-motion.mp4',
}

const FALLBACK_IMAGES = ['/assets/products/luminous-glow-serum.jpg', '/assets/products/glass-skin-essence.jpg']
const HERO_ONE_EDITORIAL_IMAGE = '/assets/hero/tips.png'
const HOME_EDITORIAL_IMAGE = '/assets/hero/home-desktop.png'
const HOME_EDITORIAL_MOBILE_IMAGE = '/assets/hero/home-mobile.png?v=20260503-2358'
const CINEMATIC_HERO_GALLERY_IMAGES = [
  '/assets/editorial/serum-dropper.png',
  '/assets/editorial/cream-ritual.png',
  '/assets/editorial/tone-up-sun-cream.png',
  '/assets/editorial/cream-texture.png',
  '/assets/editorial/cream-still-life.png',
]
const FLOATING_ARCHITECTURE_BACKGROUND = '/assets/editorial/product-table.png'
const MIST_GLASS_BACKGROUND = '/assets/hero/mist-glass.png'
const MAGAZINE_GRID_IMAGES = [
  '/assets/editorial/rose-layering.png',
  '/assets/editorial/serum-ritual.png',
  '/assets/editorial/eye-care.png',
  '/assets/editorial/sun-care.png',
]
const playfairDisplay = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'] })
const cormorantGaramond = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '600', '700'] })
const lora = Lora({ subsets: ['latin'], weight: ['400', '600', '700'] })
const merriweather = Merriweather({ subsets: ['latin'], weight: ['400', '700'], variable: '--hero-font-merriweather' })
const libreBaskerville = Libre_Baskerville({ subsets: ['latin'], weight: ['400', '700'] })
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '600', '700'] })
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] })
const interFont = Inter({ subsets: ['latin'], weight: ['400', '600', '700'] })
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })
const nunitoSans = Nunito_Sans({ subsets: ['latin'], weight: ['400', '600', '700'] })

const HOMEPAGE_FONT_CHOICES = [
  { id: 1, name: 'Playfair Display', className: playfairDisplay.className, fontFamily: playfairDisplay.style.fontFamily },
  { id: 2, name: 'Cormorant Garamond', className: cormorantGaramond.className, fontFamily: cormorantGaramond.style.fontFamily },
  { id: 3, name: 'Lora', className: lora.className, fontFamily: lora.style.fontFamily },
  { id: 4, name: 'Merriweather', className: merriweather.className, fontFamily: merriweather.style.fontFamily },
  { id: 5, name: 'Libre Baskerville', className: libreBaskerville.className, fontFamily: libreBaskerville.style.fontFamily },
  { id: 6, name: 'Montserrat', className: montserrat.className, fontFamily: montserrat.style.fontFamily },
  { id: 7, name: 'Poppins', className: poppins.className, fontFamily: poppins.style.fontFamily },
  { id: 8, name: 'Inter', className: interFont.className, fontFamily: interFont.style.fontFamily },
  { id: 9, name: 'Nunito Sans', className: nunitoSans.className, fontFamily: nunitoSans.style.fontFamily },
  { id: 10, name: 'Roboto', className: roboto.className, fontFamily: roboto.style.fontFamily },
] as const

const selectedSurface = {
  base: '#ead6b8',
  card: '#f2e2c8',
  secondary: '#dec49b',
  border: '#cdae7d',
}

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
  'design-11-video-signature': { primary: pickAsset(0), video: '/assets/video/signature-motion.mp4' },
}

function getMediaForConcept(id: string, imageOverride?: string): HeroMedia {
  const media = conceptMediaMap[id] ?? { primary: pickAsset(0) }
  return imageOverride ? { ...media, primary: imageOverride } : media
}

function hexToRgb(hex: string) {
  const clean = hex.replace('#', '')
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  }
}

function mixHex(hex: string, mixWith: string, amount: number) {
  const base = hexToRgb(hex)
  const target = hexToRgb(mixWith)
  const channel = (value: number, targetValue: number) => Math.round(value + (targetValue - value) * amount)
  return `#${[channel(base.r, target.r), channel(base.g, target.g), channel(base.b, target.b)]
    .map((value) => value.toString(16).padStart(2, '0'))
    .join('')}`
}

function toneColor(base: string, strength: number, extra = 0) {
  const normalized = Math.max(-42, Math.min(42, strength + extra)) / 100
  const softAnchor = '#f5e6cf'
  const strongAnchor = '#dec196'
  return normalized >= 0 ? mixHex(base, strongAnchor, normalized) : mixHex(base, softAnchor, Math.abs(normalized))
}

export function HeroSection({
  forcedConceptId,
  showConceptPicker = true,
  heroImageSrc,
  showCategoryNav = false,
}: {
  forcedConceptId?: string
  showConceptPicker?: boolean
  heroImageSrc?: string
  showCategoryNav?: boolean
} = {}) {
  const { locale } = useLocale()
  const [activeId, setActiveId] = useState(heroConcepts[0].id)
  const [surfaceTone, setSurfaceTone] = useState(0)
  const [activeFontChoice, setActiveFontChoice] = useState(10)
  const renderId = forcedConceptId ?? (locale === 'en' ? activeId : 'image-editorial')
  const media = useMemo(() => getMediaForConcept(renderId, heroImageSrc ?? (renderId === 'image-editorial' ? HOME_EDITORIAL_IMAGE : undefined)), [renderId, heroImageSrc])
  const isMistGlass = renderId === 'mist-glass'
  const isFullBleed = renderId === 'image-editorial' || isMistGlass || renderId === 'design-11-video-signature'

  useEffect(() => {
    const root = document.documentElement
    root.dataset.surfaceTheme = 'champagne-cream'
    root.dataset.surfaceEffect = 'on'
    root.style.setProperty('--surface-tone-overlay-color', '234 214 184')
    root.style.setProperty('--surface-tone-overlay-opacity', '0')
    root.style.setProperty('--warm-ivory', toneColor(selectedSurface.base, surfaceTone))
    root.style.setProperty('--background', toneColor(selectedSurface.base, surfaceTone))
    root.style.setProperty('--card', toneColor(selectedSurface.card, surfaceTone, -3))
    root.style.setProperty('--popover', toneColor(selectedSurface.card, surfaceTone, -3))
    root.style.setProperty('--secondary', toneColor(selectedSurface.secondary, surfaceTone, 2))
    root.style.setProperty('--muted', toneColor(selectedSurface.secondary, surfaceTone, 2))
    root.style.setProperty('--border', toneColor(selectedSurface.border, surfaceTone, 4))
    root.style.setProperty('--input', toneColor(selectedSurface.border, surfaceTone, 4))
  }, [surfaceTone])

  return (
    <section className={cn('relative w-full overflow-hidden', isFullBleed ? 'pt-0' : 'pt-[4.75rem] lg:pt-[5.5rem]')}>
      <div className={cn('relative w-full', isFullBleed ? 'min-h-screen' : 'min-h-[calc(100vh-4.75rem)] lg:min-h-[calc(100vh-5.5rem)]')}>
        <AnimatePresence mode="wait">
          <motion.div
            key={renderId}
            initial={{ opacity: 0, scale: 1.015, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.992, y: -10 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full"
          >
            {renderId === 'image-editorial' && <ImageEditorialHero locale={locale} media={media} showCategoryNav={showCategoryNav} activeFontChoice={activeFontChoice} onFontChoiceChange={setActiveFontChoice} />}
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
            <div className="rounded-2xl border border-rose-mauve/22 bg-[linear-gradient(160deg,#f4e5dc_0%,#f4e5dc_100%)]/80 p-2 shadow-luxury">
              <div className="grid gap-1.5">
                {heroConcepts.map((concept, index) => (
                  <button
                    key={concept.id}
                    onClick={() => setActiveId(concept.id)}
                    className={cn(
                      'h-8 w-8 rounded-full text-[11px] font-semibold transition-all',
                      activeId === concept.id
                        ? 'bg-gradient-to-r from-rose-mauve to-[#d8b894] text-white shadow-sm'
                        : 'border border-rose-mauve/20 bg-[linear-gradient(160deg,#f4e5dc_0%,#f4e5dc_100%)]/90 text-charcoal/75 hover:border-rose-mauve/45'
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

        {showConceptPicker && <div className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 rounded-[999px] border border-white/30 bg-white/30 px-3 py-4 shadow-luxury backdrop-blur-xl lg:block">
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-52 flex-col items-center gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-charcoal/72">Tone</span>
              <input
                type="range"
                min={-42}
                max={42}
                value={surfaceTone}
                onChange={(event) => setSurfaceTone(Number(event.target.value))}
                aria-label="Adjust champagne cream strength"
                className="h-36 w-2 cursor-pointer accent-[#9f7e56] [writing-mode:vertical-rl]"
              />
              <span className="grid h-8 w-8 place-items-center rounded-full border border-charcoal/15 text-[11px] font-semibold text-charcoal shadow-[0_8px_18px_rgba(44,37,40,0.16)]" style={{ backgroundColor: toneColor(selectedSurface.base, surfaceTone) }}>
                {surfaceTone > 0 ? '+' : ''}{surfaceTone}
              </span>
            </div>
          </div>
        </div>}
      </div>
    </section>
  )
}

function HeroImage({ src, alt, className, imageClassName, priority }: { src: string; alt: string; className?: string; imageClassName?: string; priority?: boolean }) {
  const [failed, setFailed] = useState(false)
  const fallback = FALLBACK_IMAGES[0]
  const imageSrc = failed ? fallback : src

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Image
        src={imageSrc}
        alt={alt}
        fill
        // P0: provide responsive image sizing hints for better bandwidth/LCP behavior.
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 50vw"
        priority={priority}
        unoptimized={imageSrc.includes('?')}
        className={cn('object-cover', imageClassName)}
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
          ? 'border border-rose-mauve/30 bg-[linear-gradient(160deg,#f4e5dc_0%,#f4e5dc_100%)]/80 text-charcoal hover:bg-[linear-gradient(160deg,#f4e5dc_0%,#f4e5dc_100%)]'
          : 'bg-gradient-to-r from-rose-mauve to-[#d3af84] text-white hover:brightness-105'
      )}
    >
      {label}
      <ArrowRight className="h-4 w-4" />
    </Link>
  )
}

function ImageEditorialHero({ locale, media, showCategoryNav, activeFontChoice, onFontChoiceChange }: { locale: Locale; media: HeroMedia; showCategoryNav: boolean; activeFontChoice: number; onFontChoiceChange: (id: number) => void }) {
  const categoryNav = [
    { label: locale === 'ar' ? 'الوجه' : locale === 'fr' ? 'VISAGE' : locale === 'de' ? 'GESICHT' : locale === 'ko' ? '페이스' : locale === 'tr' ? 'YÜZ' : 'FACE', image: '/assets/icons/face.png', href: '/shop?category=face' },
    { label: locale === 'ar' ? 'شفاه' : locale === 'fr' ? 'Lèvres' : locale === 'de' ? 'Lippen' : locale === 'ko' ? '립' : locale === 'tr' ? 'Dudak' : 'Lips', image: '/assets/icons/lips.png', href: '/shop?category=lips-cheeks' },
    { label: locale === 'ar' ? 'العيون' : locale === 'fr' ? 'YEUX' : locale === 'de' ? 'AUGEN' : locale === 'ko' ? '아이' : locale === 'tr' ? 'GÖZLER' : 'EYES', image: '/assets/icons/eyes.png', href: '/shop?category=eyes' },
    { label: locale === 'ar' ? 'مجموعات' : locale === 'fr' ? 'Sets' : locale === 'de' ? 'Sets' : locale === 'ko' ? '세트' : locale === 'tr' ? 'Setler' : 'Sets', image: '/assets/icons/sets.png', href: '/shop?category=bundles-sets' },
    { label: locale === 'ar' ? 'المنتجات' : locale === 'fr' ? 'Produits' : locale === 'de' ? 'Produkte' : locale === 'ko' ? '제품' : locale === 'tr' ? 'Ürünler' : 'Products', image: '/assets/icons/products.png', href: '/shop' },
  ]
  const heading = 'Beauty, Carefully Chosen'
  const body = 'Curated Korean beauty, selected with care for your daily ritual.'
  const lightText = showCategoryNav
  const mobileImage = showCategoryNav ? media.primary : HOME_EDITORIAL_MOBILE_IMAGE
  const selectedFont = HOMEPAGE_FONT_CHOICES.find((font) => font.id === activeFontChoice) ?? HOMEPAGE_FONT_CHOICES[9]

  return (
    <section className="bg-transparent">
      <div className="relative h-screen min-h-[680px] overflow-hidden">
        <HeroImage src={media.primary} alt="Editorial background" className="absolute inset-0 hidden md:block" imageClassName={cn('object-cover transform-gpu', showCategoryNav ? 'object-top scale-[1.08]' : 'object-center scale-[1.015]')} priority />
        <HeroImage src={mobileImage} alt="Editorial background mobile" className="absolute inset-0 block md:hidden" imageClassName={cn('transform-gpu', showCategoryNav ? 'object-cover object-top scale-[1.08]' : 'object-cover object-bottom')} priority />
        <div className={cn('absolute inset-0', lightText ? 'bg-gradient-to-r from-charcoal/30 via-charcoal/10 to-transparent' : 'bg-gradient-to-r from-warm-ivory/28 via-warm-ivory/8 to-transparent')} />
        <div className="absolute left-6 top-[7.2rem] max-w-2xl sm:left-8 lg:left-14 lg:top-[8.2rem]">
          <p className={cn('text-kicker', lightText ? 'text-white/85' : 'text-charcoal/74')}>JISOO EDITORIAL</p>
          {/* P0: normalize headline scaling for mobile/tablet/desktop consistency. */}
          <h1 key={selectedFont.id} style={{ fontFamily: selectedFont.fontFamily }} className={cn('mt-3 text-[clamp(1.8rem,4.6vw,3.6rem)] leading-[1.08]', lightText ? 'text-white' : 'text-charcoal')}>{heading}</h1>
          <p className={cn('mt-4 max-w-xl text-base sm:text-lg', lightText ? 'text-white/84' : 'text-charcoal/72')}>{body}</p>
          <div className="mt-7"><PrimaryCta locale={locale} /></div>
          <div className="mt-5">
            <p className={cn('mb-2 text-[11px] font-semibold uppercase tracking-[0.14em]', lightText ? 'text-white/80' : 'text-charcoal/70')}>Choose Font</p>
            <div className="flex flex-wrap gap-2">
              {HOMEPAGE_FONT_CHOICES.map((font) => (
                <button
                  key={font.id}
                  type="button"
                  onClick={() => onFontChoiceChange(font.id)}
                  className={cn(
                    'inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition-all',
                    activeFontChoice === font.id
                      ? 'border-charcoal/90 bg-charcoal text-white shadow-[0_10px_20px_rgba(44,37,40,0.35)]'
                      : lightText
                        ? 'border-white/45 bg-white/25 text-white hover:bg-white/35'
                        : 'border-charcoal/25 bg-white/80 text-charcoal hover:border-charcoal/45'
                  )}
                  title={`${font.id}. ${font.name}`}
                  aria-label={`Select homepage font ${font.id}: ${font.name}`}
                >
                  {font.id}
                </button>
              ))}
            </div>
            <p className={cn('mt-2 text-xs', lightText ? 'text-white/80' : 'text-charcoal/65')}>Current: {selectedFont.name}</p>
          </div>
        </div>

        {showCategoryNav && <div className="absolute inset-x-0 bottom-7 z-10 px-4 lg:px-14">
          <div className="mx-auto flex max-w-7xl flex-wrap items-start justify-center gap-x-12 gap-y-5 sm:gap-x-16 sm:gap-y-6 lg:gap-x-24 lg:gap-y-5">
          {categoryNav.map(item => (
            <Link
              key={item.label}
              href={localizeHref(item.href, locale)}
              className="group flex w-[134px] flex-col items-center text-center sm:w-[146px]"
            >
              <div className="relative h-20 w-20 overflow-hidden rounded-full border border-charcoal/10 bg-warm-ivory/50 shadow-[0_18px_34px_rgba(44,37,40,0.22),inset_0_2px_6px_rgba(255,255,255,0.42),inset_0_-8px_18px_rgba(44,37,40,0.12)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_24px_42px_rgba(44,37,40,0.28),inset_0_2px_6px_rgba(255,255,255,0.42),inset_0_-8px_18px_rgba(44,37,40,0.12)] sm:h-24 sm:w-24 lg:h-28 lg:w-28">
                <Image src={item.image} alt={item.label} fill sizes="(min-width: 1024px) 112px, (min-width: 640px) 96px, 80px" className="scale-[1.04] object-cover drop-shadow-[0_10px_14px_rgba(44,37,40,0.25)] transition duration-500 group-hover:scale-[1.1]" />
              </div>
              <span className="mt-2 inline-flex items-center whitespace-nowrap rounded-full border border-white/30 bg-white/48 px-4 py-1.5 text-[11px] font-medium tracking-[0.08em] text-charcoal/90 shadow-[0_10px_24px_rgba(44,37,40,0.12)] backdrop-blur-md transition-colors group-hover:bg-white/70 group-hover:text-charcoal">
                {item.label}
              </span>
            </Link>
          ))}
          </div>
        </div>}
      </div>
    </section>
  )
}

function CinematicTypographyHero({ locale }: { locale: Locale }) {
  return (
    <section className="relative flex h-[68vh] flex-col justify-between overflow-hidden bg-[radial-gradient(circle_at_50%_24%,#fbeff4_0%,#fffaf6_48%,#f8efe7_100%)] px-6 pb-7 pt-10 text-center lg:px-14 lg:pb-9">
      <div className="mx-auto max-w-4xl">
        <motion.h1 initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-serif text-3xl leading-[1.08] text-charcoal sm:text-4xl md:text-5xl lg:text-6xl">
          Seoul Glow,
          <span className="mt-1 block text-rose-mauve">Softly Revealed</span>
        </motion.h1>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-charcoal/68 sm:text-base">
          A curated Korean beauty ritual shaped for luminous skin, delicate color, and everyday elegance.
        </p>
        <div className="mt-7">
          <Link
            href={localizeHref('/shop', locale)}
            className="inline-flex items-center gap-2 rounded-full border border-rose-mauve/30 bg-[linear-gradient(160deg,#f4e5dc_0%,#f4e5dc_100%)]/80 px-6 py-3 text-sm font-medium text-charcoal transition-all hover:bg-[linear-gradient(160deg,#f4e5dc_0%,#f4e5dc_100%)]"
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
        <h1 className="font-serif text-4xl text-charcoal lg:text-5xl">Layered Ritual Architecture</h1>
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
          <h1 className="mt-4 font-serif text-4xl text-charcoal lg:text-5xl">Minimal. Elegant. Seoul.</h1>
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
      <HeroImage src="/assets/editorial/campaign-cover.png" alt="Campaign cover background" className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/58 via-charcoal/35 to-charcoal/15" />
      <div className="relative flex h-full items-center px-7 lg:px-14">
        <div className="max-w-2xl text-white">
          <p className="text-kicker text-white/78">Campaign Cover / Vol.04</p>
          <h1 className="mt-4 font-serif text-4xl leading-tight lg:text-6xl">THE GLOW ISSUE</h1>
          <p className="mt-5 max-w-xl text-white/80">Campaign-cover direction with open cinematic media and premium editorial hierarchy.</p>
          <div className="mt-7 flex flex-wrap gap-3"><PrimaryCta locale={locale} /><Link href={localizeHref('/ai-consultant', locale)} className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-[linear-gradient(160deg,#f4e5dc_0%,#f4e5dc_100%)]/15 px-5 py-3 text-sm text-white"><PlayCircle className="h-4 w-4" />Consult</Link></div>
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
            <h1 className="mt-4 font-serif text-4xl lg:text-5xl">A Living Campaign Hero</h1>
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
        sizes="100vw"
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
        src={MIST_GLASS_BACKGROUND}
        alt="Mist glass background"
        fill
        sizes="100vw"
        className="absolute inset-0 h-full w-full scale-[1.015] object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_22%,rgba(255,255,255,0.22),transparent_40%),radial-gradient(circle_at_78%_30%,rgba(248,228,238,0.16),transparent_44%),linear-gradient(145deg,rgba(255,247,242,0.22),rgba(255,247,242,0.06))]" />
      <div className="relative z-10 flex h-full items-start px-8 pt-[7.5rem] lg:px-12 lg:pt-[8.5rem]">
        <div className="max-w-2xl text-charcoal">
          <p className="text-kicker text-charcoal/78">New from our Korean partners</p>
          <h1 className="mt-3 font-serif text-3xl lg:text-5xl">New Rituals, Softly Arrived</h1>
          <p className="mt-4 max-w-xl text-charcoal/72">Fresh skincare and skin-first color selected with care for your daily ritual.</p>
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
      <div className="col-span-2 flex items-center rounded-[2rem] border border-rose-mauve/18 bg-[linear-gradient(142deg,rgba(255,248,246,0.97),rgba(255,237,232,0.9))] p-6 shadow-luxury lg:col-span-5 lg:row-span-3 lg:p-8">
        <div>
          <p className="text-kicker tracking-[0.19em] text-rose-mauve/72">JISOO EDITORIAL</p>
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
      </div>
    </section>
  )
}

function CommerceLuxeHero({ locale, media }: { locale: Locale; media: HeroMedia }) {
  return (
    <section className="grid min-h-[68vh] overflow-hidden rounded-[2rem] lg:grid-cols-[0.95fr_1.05fr]">
      <div className="bg-[#fffaf7] p-8 lg:p-12">
        <p className="text-kicker text-rose-mauve">Luxury Commerce Hero</p>
        <h1 className="mt-3 font-serif text-4xl text-charcoal lg:text-5xl">Shop Signature Essentials</h1>
        <p className="mt-4 max-w-lg text-charcoal/65">Conversion-first direction blending premium styling with direct shopping pathways.</p>
        <div className="mt-7 space-y-3">
          {['Best Sellers', 'Starter Ritual', 'New Arrivals'].map(item => (
            <Link key={item} href={localizeHref('/shop', locale)} className="flex items-center justify-between rounded-xl border border-rose-mauve/20 bg-[linear-gradient(160deg,#f4e5dc_0%,#f4e5dc_100%)] px-4 py-3 text-sm font-medium text-charcoal hover:border-rose-mauve/35">
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
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background media plays once and naturally pauses on its final frame. */}
      <video
        src={media.video}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Readability layer: soft blush/rose gradient that keeps copy legible across devices. */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(33,24,30,0.2)_0%,rgba(33,24,30,0.26)_42%,rgba(33,24,30,0.36)_100%),radial-gradient(circle_at_50%_10%,rgba(255,226,233,0.2)_0%,rgba(255,226,233,0)_50%)]" />

      {/* Foreground content: concise headline/subheading and tappable CTA with motion. */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 pb-10 pt-24 text-center sm:px-8 sm:pb-14 sm:pt-28 lg:px-10 lg:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex w-full max-w-4xl flex-col items-center"
        >
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
    </section>
  )
}


export default HeroSection
