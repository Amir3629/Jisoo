'use client'

import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, PlayCircle, SlidersHorizontal, Type } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLocale } from '@/components/providers/locale-provider'
import { localizeHref, type Locale } from '@/lib/i18n'

type HeroConcept = { id: string; name: string }
type HeroMedia = { primary: string; secondary?: string; tertiary?: string; quaternary?: string; video?: string; preferVideo?: boolean }
type HomepageFontChoice = { id: number; name: string; fontFamily: string }

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

const FALLBACK_IMAGES = ['/assets/products/productnewnew-final/jisoo-product-final-02.png', '/assets/products/productnewnew-final/jisoo-product-final-03.png']
const HERO_ONE_EDITORIAL_IMAGE = '/assets/hero/tips.png'
const HOME_EDITORIAL_IMAGE = '/assets/hero/home-desktop.png?v=20260509-1453'
const HOME_EDITORIAL_MOBILE_IMAGE = '/assets/hero/home-mobile.png?v=20260509-1453'
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
const HOMEPAGE_FONT_CHOICES: readonly HomepageFontChoice[] = [
  { id: 1, name: 'Georgia', fontFamily: 'Georgia, serif' },
  { id: 2, name: 'Baskerville', fontFamily: 'Baskerville, "Libre Baskerville", Georgia, serif' },
  { id: 3, name: 'Didot', fontFamily: 'Didot, "Bodoni 72", "Times New Roman", serif' },
  { id: 4, name: 'Bodoni', fontFamily: '"Bodoni 72", Didot, Georgia, serif' },
  { id: 5, name: 'Avenir', fontFamily: '"Avenir Next", Avenir, Helvetica, Arial, sans-serif' },
  { id: 6, name: 'Optima', fontFamily: 'Optima, Candara, "Noto Sans", sans-serif' },
  { id: 7, name: 'Futura', fontFamily: 'Futura, "Trebuchet MS", Arial, sans-serif' },
  { id: 8, name: 'Palatino', fontFamily: '"Palatino Linotype", Palatino, Georgia, serif' },
  { id: 9, name: 'Gill Sans', fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, sans-serif' },
  { id: 10, name: 'Helvetica', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' },
  { id: 11, name: 'Times', fontFamily: '"Times New Roman", Times, serif' },
  { id: 12, name: 'Garamond', fontFamily: 'Garamond, "EB Garamond", Georgia, serif' },
  { id: 13, name: 'Cormorant', fontFamily: '"Cormorant Garamond", Garamond, Georgia, serif' },
  { id: 14, name: 'Playfair', fontFamily: '"Playfair Display", Didot, Georgia, serif' },
  { id: 15, name: 'Libre', fontFamily: '"Libre Baskerville", Baskerville, Georgia, serif' },
  { id: 16, name: 'Canela', fontFamily: 'Canela, Didot, Georgia, serif' },
  { id: 17, name: 'Neue Haas', fontFamily: '"Neue Haas Grotesk Text Pro", "Helvetica Neue", Arial, sans-serif' },
  { id: 18, name: 'Inter', fontFamily: 'Inter, "Avenir Next", Arial, sans-serif' },
  { id: 19, name: 'Seravek', fontFamily: 'Seravek, Optima, Arial, sans-serif' },
  { id: 20, name: 'Iowan', fontFamily: '"Iowan Old Style", Palatino, Georgia, serif' },
  { id: 21, name: 'Roboto', fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif' },
]

const heroProductHotspots = [
  { label: 'Cream ritual', href: '/shop?category=creams', className: 'left-[2%] bottom-0 h-[30%] w-[23%] md:left-[4%] md:h-[34%] md:w-[18%]' },
  { label: 'Serum ritual', href: '/shop?category=oils', className: 'left-[25%] bottom-0 h-[47%] w-[18%] md:left-[27%] md:h-[50%] md:w-[13%]' },
  { label: 'Daily lotion', href: '/shop?category=face', className: 'left-[43%] bottom-0 h-[56%] w-[18%] md:left-[43%] md:h-[58%] md:w-[15%]' },
  { label: 'Moisture cream', href: '/shop?category=creams', className: 'left-[62%] bottom-0 h-[42%] w-[20%] md:left-[63%] md:h-[44%] md:w-[17%]' },
  { label: 'Barrier cream', href: '/shop/best-sellers', className: 'right-[2%] bottom-0 h-[37%] w-[23%] md:right-[3%] md:h-[40%] md:w-[18%]' },
]

const selectedSurface = {
  base: '#ead6b8',
  card: '#f2e2c8',
  secondary: '#dec49b',
  border: '#cdae7d',
}

const elegantSurface = {
  base: '#e8e1d4',
  card: '#f7f2e9',
  secondary: '#cfd8cf',
  border: '#9d8f77',
  plum: '#42534a',
  rose: '#9c7f6d',
  blush: '#e9dfd2',
  gold: '#b59a6d',
  charcoal: '#202826',
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
  const normalized = Math.max(-72, Math.min(72, strength + extra)) / 100
  const brightAnchor = '#fff4df'
  const deepAnchor = '#d5b27b'
  return normalized >= 0 ? mixHex(base, brightAnchor, normalized) : mixHex(base, deepAnchor, Math.abs(normalized))
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
  void showConceptPicker
  const [activeId, setActiveId] = useState(heroConcepts[0].id)
  const [surfaceTone, setSurfaceTone] = useState(50)
  const [heroTone, setHeroTone] = useState(12)
  const [siteMode, setSiteMode] = useState<'soft' | 'elegant'>('soft')
  const [activeFontChoice, setActiveFontChoice] = useState(1)
  const [heroStyle, setHeroStyle] = useState<1 | 2>(1)
  const [isToolOpen, setIsToolOpen] = useState(false)
  const selectedFont = HOMEPAGE_FONT_CHOICES.find((font) => font.id === activeFontChoice) ?? HOMEPAGE_FONT_CHOICES[0]
  const renderId = forcedConceptId ?? (locale === 'en' ? activeId : 'image-editorial')
  const media = useMemo(() => getMediaForConcept(renderId, heroImageSrc ?? (renderId === 'image-editorial' ? HOME_EDITORIAL_IMAGE : undefined)), [renderId, heroImageSrc])
  const isMistGlass = renderId === 'mist-glass'
  const isFullBleed = renderId === 'image-editorial' || isMistGlass || renderId === 'design-11-video-signature'

  useEffect(() => {
    const root = document.documentElement
    const palette = siteMode === 'elegant' ? elegantSurface : selectedSurface
    root.dataset.surfaceTheme = siteMode === 'elegant' ? 'elegant-sage' : 'champagne-cream'
    root.dataset.surfaceEffect = 'on'
    root.dataset.siteMode = siteMode
    window.localStorage.setItem('jisoo-site-mode', siteMode)
    root.style.setProperty('--surface-tone-overlay-color', siteMode === 'elegant' ? '210 216 206' : '234 214 184')
    root.style.setProperty('--surface-tone-overlay-opacity', siteMode === 'elegant' ? '0.24' : '0')
    root.style.setProperty('--warm-ivory', toneColor(palette.base, surfaceTone))
    root.style.setProperty('--background', toneColor(palette.base, surfaceTone))
    root.style.setProperty('--card', toneColor(palette.card, surfaceTone, -2))
    root.style.setProperty('--popover', toneColor(palette.card, surfaceTone, -2))
    root.style.setProperty('--secondary', toneColor(palette.secondary, surfaceTone, 4))
    root.style.setProperty('--muted', toneColor(palette.secondary, surfaceTone, 4))
    root.style.setProperty('--border', toneColor(palette.border, surfaceTone, 6))
    root.style.setProperty('--input', toneColor(palette.border, surfaceTone, 6))
    root.style.setProperty('--plum', siteMode === 'elegant' ? elegantSurface.plum : '#9e7b8a')
    root.style.setProperty('--rose-mauve', siteMode === 'elegant' ? elegantSurface.rose : '#d6a8ba')
    root.style.setProperty('--blush-pink', siteMode === 'elegant' ? elegantSurface.blush : '#f6e2ea')
    root.style.setProperty('--champagne-gold', siteMode === 'elegant' ? elegantSurface.gold : '#cfae84')
    root.style.setProperty('--charcoal', siteMode === 'elegant' ? elegantSurface.charcoal : '#2c2528')
    window.dispatchEvent(new CustomEvent('jisoo-site-mode', { detail: siteMode }))
  }, [surfaceTone, siteMode])

  useEffect(() => {
    const onModeChange = (event: Event) => {
      const mode = (event as CustomEvent<'soft' | 'elegant'>).detail
      if (mode === 'soft' || mode === 'elegant') setSiteMode(mode)
    }

    window.addEventListener('jisoo-site-mode', onModeChange)
    return () => window.removeEventListener('jisoo-site-mode', onModeChange)
  }, [])

  useEffect(() => {
    document.documentElement.style.setProperty('--jisoo-preview-font', selectedFont.fontFamily)
  }, [selectedFont.fontFamily])

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
            {renderId === 'image-editorial' && <ImageEditorialHero locale={locale} media={media} showCategoryNav={showCategoryNav} heroTone={heroTone} selectedFont={selectedFont} heroStyle={heroStyle} />}
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

        <div className="hidden">
          <button
            type="button"
            onClick={() => setIsToolOpen((open) => !open)}
            className="grid h-11 w-11 place-items-center rounded-full border border-[#cfae83]/32 bg-warm-ivory/78 text-charcoal shadow-editorial backdrop-blur-xl transition hover:-translate-x-0.5 hover:bg-warm-ivory"
            aria-label="Open design testing tools"
            aria-expanded={isToolOpen}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
          <AnimatePresence>
            {isToolOpen && (
              <motion.div
                initial={{ opacity: 0, x: 18, scale: 0.96, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: 14, scale: 0.98, filter: 'blur(6px)' }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-14 top-1/2 w-64 -translate-y-1/2 rounded-xl border border-[#cfae83]/28 bg-warm-ivory/82 p-2.5 text-charcoal shadow-editorial backdrop-blur-xl"
              >
                <div className="space-y-2">
                  <label className="block">
                    <span className="flex items-center gap-2 text-[10px] text-charcoal/72">
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-white/30">C</span>
                      <span>Background</span>
                      <span className="ml-auto w-7 text-right">{surfaceTone}</span>
                    </span>
                    <input type="range" min="-72" max="72" value={surfaceTone} onChange={(event) => setSurfaceTone(Number(event.target.value))} className="mt-0.5 w-full accent-[#cfae83]" />
                  </label>
                  <label className="block">
                    <span className="flex items-center gap-2 text-[10px] text-charcoal/72">
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-white/30">H</span>
                      <span>Hero gold</span>
                      <span className="ml-auto w-7 text-right">{heroTone}</span>
                    </span>
                    <input type="range" min="0" max="58" value={heroTone} onChange={(event) => setHeroTone(Number(event.target.value))} className="mt-0.5 w-full accent-[#cfae83]" />
                  </label>
                  <div>
                    <span className="mb-1 flex items-center gap-2 text-[10px] text-charcoal/64"><Type className="h-3 w-3" /> Fonts</span>
                    <div className="grid max-h-40 grid-cols-1 gap-1 overflow-y-auto pr-1">
                      {HOMEPAGE_FONT_CHOICES.map((font) => (
                        <button
                          key={font.id}
                          type="button"
                          onClick={() => setActiveFontChoice(font.id)}
                          className={cn(
                            'flex min-h-7 items-center gap-2 rounded-full border px-2 text-left text-[10px] font-semibold transition',
                            activeFontChoice === font.id ? 'border-[#b9935f]/80 bg-gradient-to-r from-rose-mauve to-[#d3af84] text-white' : 'border-charcoal/20 bg-white/40 text-charcoal/74 hover:bg-white/70'
                          )}
                          title={`${font.id}. ${font.name}`}
                          style={{ fontFamily: font.fontFamily }}
                        >
                          <span className="grid h-4 w-4 flex-none place-items-center rounded-full bg-white/24 text-[8px]">{font.id}</span>
                          <span className="truncate">{font.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {[1, 2].map((style) => (
                      <button
                        key={style}
                        type="button"
                        onClick={() => setHeroStyle(style as 1 | 2)}
                        className={cn('rounded-full border px-2 py-0.5 text-[10px] transition', heroStyle === style ? 'border-[#b9935f]/80 bg-gradient-to-r from-rose-mauve to-[#d3af84] text-white' : 'border-[#cfae83]/30 bg-warm-ivory/70 text-charcoal')}
                      >
                        Hero {style}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <button type="button" onClick={() => { setSurfaceTone(50); setHeroTone(12); setSiteMode('soft'); setActiveFontChoice(1); setHeroStyle(1) }} className="rounded-full border border-[#cfae83]/30 bg-warm-ivory/70 px-2 py-0.5 text-[10px] transition hover:bg-[#d5bc9b]/35">Reset</button>
                    <button type="button" onClick={() => { setSurfaceTone(50); setHeroTone(12) }} className="rounded-full bg-gradient-to-r from-rose-mauve to-[#d3af84] px-2 py-0.5 text-[10px] font-medium text-white transition hover:brightness-105">Clear</button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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

function ImageEditorialHero({
  locale,
  media,
  showCategoryNav,
  heroTone,
  selectedFont,
  heroStyle,
}: {
  locale: Locale
  media: HeroMedia
  showCategoryNav: boolean
  heroTone: number
  selectedFont: HomepageFontChoice
  heroStyle: 1 | 2
}) {
  const categoryNav = [
    { label: locale === 'ar' ? 'الوجه' : locale === 'fr' ? 'VISAGE' : locale === 'de' ? 'GESICHT' : locale === 'ko' ? '페이스' : locale === 'tr' ? 'YÜZ' : 'FACE', image: '/assets/icons/face.png', href: '/shop?category=face' },
    { label: locale === 'ar' ? 'شفاه' : locale === 'fr' ? 'Lèvres' : locale === 'de' ? 'Lippen' : locale === 'ko' ? '립' : locale === 'tr' ? 'Dudak' : 'Lips', image: '/assets/icons/lips.png', href: '/shop?category=lips-cheeks' },
    { label: locale === 'ar' ? 'العيون' : locale === 'fr' ? 'YEUX' : locale === 'de' ? 'AUGEN' : locale === 'ko' ? '아이' : locale === 'tr' ? 'GÖZLER' : 'EYES', image: '/assets/icons/eyes.png', href: '/shop?category=eyes' },
    { label: locale === 'ar' ? 'مجموعات' : locale === 'fr' ? 'Sets' : locale === 'de' ? 'Sets' : locale === 'ko' ? '세트' : locale === 'tr' ? 'Setler' : 'Sets', image: '/assets/icons/sets.png', href: '/shop?category=bundles-sets' },
    { label: locale === 'ar' ? 'المنتجات' : locale === 'fr' ? 'Produits' : locale === 'de' ? 'Produkte' : locale === 'ko' ? '제품' : locale === 'tr' ? 'Ürünler' : 'Products', image: '/assets/icons/products.png', href: '/shop' },
  ]
  const heading = locale === 'ar' ? 'جمال مختار بعناية' : locale === 'fr' ? 'La beauté choisie avec soin' : locale === 'de' ? 'Schönheit, sorgfältig ausgewählt' : locale === 'ko' ? '정성껏 고른 아름다움' : locale === 'tr' ? 'Özenle Seçilmiş Güzellik' : 'Beauty, Carefully Chosen'
  const mobileHeadingLineOne = locale === 'ar' ? 'جمال مختار' : locale === 'fr' ? 'Beauté choisie' : locale === 'de' ? 'Schönheit' : locale === 'ko' ? '정성껏 고른' : locale === 'tr' ? 'Özenli Güzellik' : 'Beauty, Carefully'
  const mobileHeadingLineTwo = locale === 'ar' ? 'بعناية' : locale === 'fr' ? 'avec soin' : locale === 'de' ? 'mit Sorgfalt' : locale === 'ko' ? '아름다움' : locale === 'tr' ? 'Seçildi' : 'Chosen'
  const kicker = locale === 'ar' ? 'افتتاحية JISOO' : locale === 'fr' ? 'ÉDITORIAL JISOO' : locale === 'de' ? 'JISOO EDITORIAL' : locale === 'ko' ? 'JISOO 에디토리얼' : locale === 'tr' ? 'JISOO EDİTÖRYAL' : 'JISOO EDITORIAL'
  const body = locale === 'ar' ? 'جمال كوري منسّق بعناية لطقسك اليومي.' : locale === 'fr' ? 'La beauté coréenne sélectionnée avec soin pour votre rituel quotidien.' : locale === 'de' ? 'Korean Beauty, sorgfältig für dein tägliches Ritual ausgewählt.' : locale === 'ko' ? '매일의 리추얼을 위해 세심하게 고른 한국 뷰티.' : locale === 'tr' ? 'Günlük ritüeliniz için özenle seçilmiş Kore güzelliği.' : 'Curated Korean beauty, selected with care for your daily ritual.'
  const heroProductsLabel = locale === 'ar' ? 'تسوّقي منتجات الواجهة' : locale === 'fr' ? 'Acheter les produits du héros' : locale === 'de' ? 'Hero-Produkte shoppen' : locale === 'ko' ? '히어로 제품 쇼핑' : locale === 'tr' ? 'Ana ürünleri satın al' : 'Shop hero products'
  const shopHotspotLabel = (label: string) => locale === 'ar' ? `تسوّقي ${label}` : locale === 'fr' ? `Acheter ${label}` : locale === 'de' ? `${label} shoppen` : locale === 'ko' ? `${label} 쇼핑` : locale === 'tr' ? `${label} satın al` : `Shop ${label}`
  const lightText = showCategoryNav
  const mobileImage = showCategoryNav ? media.primary : HOME_EDITORIAL_MOBILE_IMAGE
  const headlineFontStyle = {
    fontFamily: selectedFont.fontFamily,
    '--homepage-hero-font-family': selectedFont.fontFamily,
  } as CSSProperties
  const heroToneOpacity = Math.max(0, Math.min(58, heroTone)) / 100
  const { scrollYProgress } = useScroll()
  const logoScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.24])
  const logoX = useTransform(scrollYProgress, [0, 0.08], ['0%', '-156%'])
  const logoY = useTransform(scrollYProgress, [0, 0.08], ['0%', '-42%'])
  const logoOpacity = useTransform(scrollYProgress, [0, 0.09], [0.84, 0])

  return (
    <section className="bg-transparent">
      <div className="relative h-screen min-h-[680px] overflow-hidden">
        <HeroImage src={media.primary} alt="Editorial background" className="absolute inset-0 hidden md:block" imageClassName={cn('object-cover transform-gpu', showCategoryNav ? 'object-top scale-[1.08]' : 'object-center scale-[1.015]')} priority />
        <HeroImage src={mobileImage} alt="Editorial background mobile" className="absolute inset-0 block md:hidden" imageClassName={cn('transform-gpu', showCategoryNav ? 'object-cover object-top scale-[1.08]' : 'object-cover object-bottom')} priority />
        <div className="absolute inset-0 bg-[#d9bb83] mix-blend-multiply" style={{ opacity: heroToneOpacity }} />
        {lightText && <div className="absolute inset-0 bg-gradient-to-r from-charcoal/36 via-charcoal/14 to-transparent" />}
        {!showCategoryNav && (
          <div className="absolute inset-0 z-[2]" aria-label={heroProductsLabel}>
            {heroProductHotspots.map((hotspot) => (
              <Link
                key={hotspot.label}
                href={localizeHref(hotspot.href, locale)}
                aria-label={shopHotspotLabel(hotspot.label)}
                title={shopHotspotLabel(hotspot.label)}
                className={cn('absolute rounded-[2rem] transition hover:bg-white/5 focus-visible:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cfae83]/70', hotspot.className)}
              />
            ))}
          </div>
        )}
        {heroStyle === 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 18, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ scale: logoScale, x: logoX, y: logoY, opacity: logoOpacity }}
            className="pointer-events-none absolute right-[10vw] top-[12vh] hidden w-[min(25vw,330px)] origin-top-right lg:block"
          >
            <Image
              src="/assets/LOGO/image.png"
              alt=""
              width={680}
              height={340}
              priority
              className="h-auto w-full opacity-80 brightness-0 drop-shadow-[0_20px_34px_rgba(44,37,40,0.12)]"
            />
          </motion.div>
        )}
        <div className="absolute left-6 top-[6.9rem] z-20 max-w-2xl sm:left-8 sm:top-[7.4rem] md:top-[7.2rem] lg:left-14 lg:top-[8.2rem]" style={headlineFontStyle}>
          <p className={cn('text-kicker', lightText ? 'text-white/85' : 'text-charcoal/74')}>{kicker}</p>
          {/* This is the visible /en homepage headline; keep font-family inline so no font utility can override the selected choice. */}
          <h1
            key={`desktop-${selectedFont.id}`}
            data-hero-headline="homepage-image-editorial"
            data-selected-font={selectedFont.name}
            className={cn('mt-3 hidden text-[clamp(1.8rem,4.6vw,3.6rem)] leading-[1.08] md:block', lightText ? 'text-white' : 'text-charcoal')}
          >
            {heading}
          </h1>
          <h1
            key={`mobile-${selectedFont.id}`}
            data-hero-headline="homepage-image-editorial-mobile"
            data-selected-font={selectedFont.name}
            className={cn('mt-3 block max-w-[12ch] text-[2.05rem] leading-[1.02] md:hidden', lightText ? 'text-white' : 'text-charcoal')}
          >
            <span className="block">{mobileHeadingLineOne}</span>
            <span className="block text-[2.7rem] leading-[0.96]">{mobileHeadingLineTwo}</span>
          </h1>
          <p className={cn('mt-4 max-w-[19rem] text-base leading-6 sm:text-lg md:max-w-xl', lightText ? 'text-white/84' : 'text-charcoal/72')}>
            <span className="md:hidden">{body}</span>
            <span className="hidden md:inline">{body}</span>
          </p>
          <div className="mt-10 md:mt-7"><PrimaryCta locale={locale} /></div>
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
