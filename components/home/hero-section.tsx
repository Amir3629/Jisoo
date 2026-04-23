'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, PlayCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EditorialMedia } from '@/components/ui/editorial-media'
import { AtmosphereSection } from '@/components/ui/atmosphere-section'
import { useLocale } from '@/components/providers/locale-provider'
import { localizeHref, type Locale } from '@/lib/i18n'
import { resolveImageSrc } from '@/lib/image-fallbacks'

type HeroConcept = {
  id: string
  name: string
  subtitle: string
  mood: string
}

type HeroMedia = {
  primary: string
  secondary?: string
  tertiary?: string
  video?: string
  preferVideo?: boolean
}

const heroConcepts: HeroConcept[] = [
  { id: 'editorial-rose', name: 'Editorial Rose', subtitle: 'Magazine-led layered storytelling', mood: 'Editorial luxury hero' },
  { id: 'modern-minimal', name: 'Modern Minimal', subtitle: 'Whitespace + sharp hierarchy', mood: 'Minimal premium hero' },
  { id: 'product-spotlight', name: 'Product Spotlight', subtitle: 'Cinematic single-formula stage', mood: 'Cinematic product spotlight hero' },
  { id: 'soft-campaign', name: 'Soft Campaign', subtitle: 'Romantic blush diffusion', mood: 'Soft romantic rose-blush hero' },
  { id: 'ivory-lab', name: 'Ivory Lab', subtitle: 'Clinical credibility with beauty softness', mood: 'Clean skincare science hero' },
  { id: 'film-frame', name: 'Film Frame', subtitle: 'Video-first art direction mock', mood: 'Video-ready hero concept' },
  { id: 'image-led', name: 'Image-Led Luxe', subtitle: 'Immersive full-bleed atmosphere', mood: 'Full-background-image hero concept' },
  { id: 'commerce-split', name: 'Commerce Split', subtitle: 'Conversion-forward split layout', mood: 'Split-layout commerce-focused hero' },
  { id: 'mist-glass', name: 'Mist Glass', subtitle: 'Frosted glass + haze overlays', mood: 'Glass / mist / luxury fade hero' },
  { id: 'campaign-cover', name: 'Campaign Cover', subtitle: 'Fashion issue cover composition', mood: 'Fashion-magazine / campaign style hero' },
]

/**
 * Swap filenames here when you add assets under /public/hero.
 * If some files are missing, UI gracefully falls back through resolveImageSrc.
 */
const HERO_MEDIA_FILES = {
  images: ['/hero/hero-1.jpg', '/hero/hero-2.jpg', '/hero/hero-3.jpg'],
  video: '/hero/hero-video.mp4',
}

const FALLBACK_IMAGES = [
  '/products/luminous-glow-serum-1.jpg',
  '/products/glass-skin-essence-1.jpg',
]

const conceptMediaMap: Record<string, HeroMedia> = {
  'editorial-rose': { primary: pickImage(0), secondary: pickImage(1) },
  'modern-minimal': { primary: pickImage(1) },
  'product-spotlight': { primary: pickImage(0) },
  'soft-campaign': { primary: pickImage(2) },
  'ivory-lab': { primary: pickImage(0) },
  'film-frame': { primary: pickImage(0), video: HERO_MEDIA_FILES.video, preferVideo: true },
  'image-led': { primary: pickImage(1) },
  'commerce-split': { primary: pickImage(0), secondary: pickImage(2) },
  'mist-glass': { primary: pickImage(2) },
  'campaign-cover': { primary: pickImage(0), video: HERO_MEDIA_FILES.video, preferVideo: true },
}

const accentClasses = 'bg-gradient-to-r from-rose-mauve to-[#d7b58e] text-white'

function pickImage(index: number) {
  const image = HERO_MEDIA_FILES.images[index]
  const fallback = FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]
  return image ?? fallback
}

function getMediaForConcept(id: string): HeroMedia {
  return conceptMediaMap[id] ?? { primary: pickImage(0) }
}

export function HeroSection() {
  const { locale } = useLocale()
  const [activeId, setActiveId] = useState(heroConcepts[0].id)
  const active = useMemo(() => heroConcepts.find(item => item.id === activeId) ?? heroConcepts[0], [activeId])
  const media = useMemo(() => getMediaForConcept(active.id), [active.id])

  return (
    <AtmosphereSection atmosphere="ivory" className="relative overflow-hidden pt-28 pb-20 lg:pt-32 lg:pb-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 left-[6%] h-72 w-72 rounded-full bg-rose-mauve/16 blur-3xl" />
        <div className="absolute top-[44%] right-[5%] h-80 w-80 rounded-full bg-champagne-gold/12 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-3 flex items-center justify-between pr-0 lg:pr-28">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-rose-mauve">Hero Showcase</p>
            <p className="mt-1 text-sm text-charcoal/65">{active.subtitle}</p>
          </div>
          <span className="hidden rounded-full border border-rose-mauve/20 bg-white/75 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-charcoal/70 lg:inline-flex">
            {active.mood}
          </span>
        </div>

        <div className="relative">
          <div className="min-h-[540px] lg:min-h-[620px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {active.id === 'editorial-rose' && <EditorialRoseHero locale={locale} media={media} />}
                {active.id === 'modern-minimal' && <ModernMinimalHero locale={locale} media={media} />}
                {active.id === 'product-spotlight' && <ProductSpotlightHero locale={locale} media={media} />}
                {active.id === 'soft-campaign' && <SoftCampaignHero locale={locale} media={media} />}
                {active.id === 'ivory-lab' && <IvoryLabHero locale={locale} media={media} />}
                {active.id === 'film-frame' && <FilmFrameHero locale={locale} media={media} />}
                {active.id === 'image-led' && <ImageLedHero locale={locale} media={media} />}
                {active.id === 'commerce-split' && <CommerceSplitHero locale={locale} media={media} />}
                {active.id === 'mist-glass' && <MistGlassHero locale={locale} media={media} />}
                {active.id === 'campaign-cover' && <CampaignCoverHero locale={locale} media={media} />}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="pointer-events-auto absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 lg:flex">
            <div className="rounded-2xl border border-rose-mauve/20 bg-white/72 p-2 shadow-[0_12px_30px_rgba(201,153,166,0.18)] backdrop-blur-sm">
              <div className="grid gap-1.5">
                {heroConcepts.map((concept, index) => (
                  <button
                    key={concept.id}
                    onClick={() => setActiveId(concept.id)}
                    className={cn(
                      'h-8 w-8 rounded-full text-[11px] font-semibold transition-all',
                      activeId === concept.id
                        ? 'bg-gradient-to-r from-rose-mauve to-[#d8b894] text-white shadow-sm'
                        : 'border border-rose-mauve/20 bg-white/85 text-charcoal/75 hover:border-rose-mauve/40'
                    )}
                    title={`${index + 1}. ${concept.name}`}
                    aria-label={`Switch to concept ${index + 1}: ${concept.name}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2 lg:hidden">
            {heroConcepts.map((concept, index) => (
              <button
                key={concept.id}
                onClick={() => setActiveId(concept.id)}
                className={cn(
                  'rounded-full px-3 py-1.5 text-xs font-medium transition-all',
                  activeId === concept.id
                    ? 'bg-gradient-to-r from-rose-mauve to-[#d8b894] text-white'
                    : 'border border-rose-mauve/20 bg-white/80 text-charcoal/70'
                )}
                aria-label={`Switch to concept ${index + 1}: ${concept.name}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </AtmosphereSection>
  )
}

function CtaRow({ locale }: { locale: Locale }) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <Link href={localizeHref('/shop', locale)} className={cn('inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium', accentClasses)}>
        Shop the Edit
        <ArrowRight className="h-4 w-4" />
      </Link>
      <Link href={localizeHref('/ai-consultant', locale)} className="inline-flex items-center gap-2 rounded-full border border-rose-mauve/25 bg-white/80 px-6 py-3 text-sm font-medium text-charcoal">
        <PlayCircle className="h-4 w-4" />
        AI Skin Consult
      </Link>
    </div>
  )
}

function HeroVideoSurface({ media, className }: { media: HeroMedia; className?: string }) {
  const [videoFailed, setVideoFailed] = useState(false)
  const imageSrc = resolveImageSrc(media.primary)
  const shouldRenderVideo = Boolean(media.preferVideo && media.video && !videoFailed)

  if (shouldRenderVideo) {
    return (
      <video
        src={media.video}
        muted
        autoPlay
        loop
        playsInline
        onError={() => setVideoFailed(true)}
        className={cn('h-full w-full object-cover', className)}
      />
    )
  }

  return <EditorialMedia src={imageSrc} alt="Hero visual" className={cn('h-full w-full', className)} />
}

function EditorialRoseHero({ locale, media }: { locale: Locale; media: HeroMedia }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <div>
        <p className="text-kicker text-rose-mauve">Issue 01 · Seoul Editorial</p>
        <h1 className="mt-4 font-serif text-5xl leading-[1.02] text-charcoal lg:text-7xl">Rose-Lit Rituals for Radiant Skin</h1>
        <p className="mt-6 max-w-xl text-charcoal/70">A cinematic beauty story composed with fermented actives, silk textures, and modern Korean finish work.</p>
        <CtaRow locale={locale} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <EditorialMedia src={resolveImageSrc(media.primary)} alt="Luminous serum campaign" className="aspect-[4/5] rounded-[2rem] shadow-editorial" />
        <EditorialMedia src={resolveImageSrc(media.secondary ?? media.primary)} alt="Glass essence campaign" className="aspect-[4/5] rounded-[2rem] shadow-editorial sm:mt-10" />
      </div>
    </div>
  )
}

function ModernMinimalHero({ locale, media }: { locale: Locale; media: HeroMedia }) {
  return (
    <div className="rounded-[2.2rem] border border-[#ecd8ce] bg-white/85 px-6 py-12 lg:px-14">
      <p className="text-kicker text-charcoal/55">JISOO Signature Line</p>
      <div className="mt-4 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h1 className="font-serif text-4xl leading-tight text-charcoal lg:text-6xl">Minimal Formulas. Maximum Glow.</h1>
          <p className="mt-5 max-w-lg text-charcoal/65">A modern premium direction with disciplined typography, white space, and quiet luxury emphasis.</p>
          <CtaRow locale={locale} />
        </div>
        <div className="rounded-3xl border border-rose-mauve/20 bg-gradient-to-b from-white to-[#fcf3ef] p-5">
          <EditorialMedia src={resolveImageSrc(media.primary)} alt="Minimal hero product" className="aspect-[5/6] rounded-2xl" />
        </div>
      </div>
    </div>
  )
}

function ProductSpotlightHero({ locale, media }: { locale: Locale; media: HeroMedia }) {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border border-rose-mauve/20 bg-gradient-to-br from-[#fff7f3] via-[#faedf2] to-[#f7eee6] p-7 lg:p-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(214,168,186,0.28),transparent_40%)]" />
      <div className="relative grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-white/70 bg-white/70 p-3 shadow-elevated">
          <EditorialMedia src={resolveImageSrc(media.primary)} alt="Spotlight product" className="aspect-[4/5] rounded-[1.5rem]" />
        </div>
        <div>
          <p className="text-kicker text-rose-mauve">Spotlight Formula</p>
          <h1 className="mt-3 font-serif text-4xl text-charcoal lg:text-6xl">Luminous Glow Serum</h1>
          <p className="mt-4 max-w-lg text-charcoal/70">Hero bottle centered as a cinematic object, designed for high-impact campaign launch moments.</p>
          <CtaRow locale={locale} />
        </div>
      </div>
    </div>
  )
}

function SoftCampaignHero({ locale, media }: { locale: Locale; media: HeroMedia }) {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border border-rose-mauve/20 bg-white/70 p-8 backdrop-blur-sm lg:p-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(246,226,234,0.9),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(214,168,186,0.38),transparent_45%)]" />
      <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-kicker text-rose-mauve">Romantic Campaign Tone</p>
          <h1 className="mt-3 font-serif text-5xl text-charcoal lg:text-7xl">Soft Rose, Soft Focus, Pure Glow</h1>
          <p className="mt-6 max-w-xl text-charcoal/70">Diffused gradients, delicate typography, and warm finish cues create a feminine, high-end beauty mood.</p>
          <CtaRow locale={locale} />
        </div>
        <div className="rounded-[2rem] bg-white/60 p-3 shadow-elevated">
          <EditorialMedia src={resolveImageSrc(media.primary)} alt="Romantic campaign media" className="aspect-[4/5] rounded-[1.7rem]" />
        </div>
      </div>
    </div>
  )
}

function IvoryLabHero({ locale, media }: { locale: Locale; media: HeroMedia }) {
  return (
    <div className="grid gap-7 lg:grid-cols-[1fr_1fr]">
      <div className="rounded-[2rem] border border-[#e9d8cc] bg-[#fffdfa] p-8">
        <p className="text-kicker text-[#b79263]">Skin Science Narrative</p>
        <h1 className="mt-4 font-serif text-4xl text-charcoal lg:text-6xl">Clinical Precision. Couture Texture.</h1>
        <p className="mt-5 text-charcoal/70">An ivory laboratory aesthetic with soft technical badges and trust-forward composition.</p>
        <div className="mt-7 grid grid-cols-3 gap-3 text-center">
          {['Derm Tested', 'Sensitive Safe', 'Barrier Support'].map(item => (
            <div key={item} className="rounded-xl border border-rose-mauve/20 bg-white px-3 py-2 text-xs uppercase tracking-wide text-charcoal/75">{item}</div>
          ))}
        </div>
        <CtaRow locale={locale} />
      </div>
      <div className="rounded-[2rem] border border-rose-mauve/20 bg-white/70 p-3">
        <EditorialMedia src={resolveImageSrc(media.primary)} alt="Science hero media" className="aspect-[6/5] rounded-[1.6rem]" />
      </div>
    </div>
  )
}

function FilmFrameHero({ locale, media }: { locale: Locale; media: HeroMedia }) {
  return (
    <div className="overflow-hidden rounded-[2.4rem] border border-rose-mauve/25 bg-[#fff9f5] p-6 lg:p-8">
      <div className="rounded-[1.8rem] border border-[#e8d7c8] bg-gradient-to-br from-[#fef8f4] to-[#f7ece3] p-4">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[1.3rem] border border-white/70 bg-charcoal/90">
          <HeroVideoSurface media={media} className="absolute inset-0 opacity-75" />
          <div className="absolute inset-0 grid place-items-center">
            <div className="rounded-full border border-white/45 bg-white/20 p-5 backdrop-blur-sm">
              <PlayCircle className="h-10 w-10 text-white" />
            </div>
          </div>
          <div className="absolute left-5 top-5 rounded-full bg-white/15 px-4 py-1 text-xs uppercase tracking-[0.18em] text-white">Video-ready Layout</div>
        </div>
      </div>
      <h1 className="mt-6 font-serif text-4xl text-charcoal lg:text-5xl">Campaign Film Hero With Commerce Layer</h1>
      <p className="mt-3 max-w-2xl text-charcoal/68">Built to receive reel/loop assets later while keeping premium typography and conversion CTAs live today.</p>
      <CtaRow locale={locale} />
    </div>
  )
}

function ImageLedHero({ locale, media }: { locale: Locale; media: HeroMedia }) {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem]">
      <EditorialMedia src={resolveImageSrc(media.primary)} alt="Full background hero image" className="aspect-[16/9] min-h-[460px]" overlayClassName="bg-gradient-to-r from-charcoal/62 via-charcoal/30 to-charcoal/18" />
      <div className="absolute inset-0 p-8 lg:p-14">
        <div className="max-w-2xl">
          <p className="text-kicker text-white/85">Immersive Visual Direction</p>
          <h1 className="mt-3 font-serif text-4xl text-white lg:text-6xl">High-Impact Full-Bleed Beauty Story</h1>
          <p className="mt-5 text-white/85">Image-led hero concept for campaign periods that prioritize visual emotion and atmosphere.</p>
          <div className="mt-8"><CtaRow locale={locale} /></div>
        </div>
      </div>
    </div>
  )
}

function CommerceSplitHero({ locale, media }: { locale: Locale; media: HeroMedia }) {
  return (
    <div className="grid gap-0 overflow-hidden rounded-[2.3rem] border border-rose-mauve/20 bg-white lg:grid-cols-2">
      <div className="p-8 lg:p-12">
        <p className="text-kicker text-rose-mauve">Conversion-Led Hero</p>
        <h1 className="mt-4 font-serif text-4xl text-charcoal lg:text-6xl">Build Routine, Add to Cart, Checkout</h1>
        <p className="mt-4 max-w-lg text-charcoal/70">Split architecture for direct commercial action with quick value messaging and stronger CTA stack.</p>
        <div className="mt-7 space-y-3">
          {['Best Sellers', 'Starter Sets', 'Routine Finder'].map(item => (
            <Link key={item} href={localizeHref('/shop', locale)} className="flex items-center justify-between rounded-xl border border-rose-mauve/20 bg-[#fff9f7] px-4 py-3 text-sm font-medium text-charcoal hover:bg-white">
              {item}
              <ArrowRight className="h-4 w-4 text-rose-mauve" />
            </Link>
          ))}
        </div>
        <CtaRow locale={locale} />
      </div>
      <div className="bg-gradient-to-br from-[#fbeef2] to-[#f7ede4] p-4 lg:p-6">
        <EditorialMedia src={resolveImageSrc(media.secondary ?? media.primary)} alt="Commerce split product" className="h-full min-h-[360px] rounded-[1.7rem]" />
      </div>
    </div>
  )
}

function MistGlassHero({ locale, media }: { locale: Locale; media: HeroMedia }) {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-[linear-gradient(135deg,#fffaf7_0%,#fdf2f6_50%,#f8f0e7_100%)] p-8 lg:p-12">
      <div className="pointer-events-none absolute -top-10 right-10 h-44 w-44 rounded-full bg-white/65 blur-2xl" />
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-kicker text-[#b79263]">Glass / Mist Direction</p>
          <h1 className="mt-3 font-serif text-4xl text-charcoal lg:text-6xl">Diffused Light, Frosted Luxury</h1>
          <p className="mt-5 max-w-xl text-charcoal/70">Soft glass cards, mist overlays, and warm ivory gradients with premium restraint.</p>
          <CtaRow locale={locale} />
        </div>
        <div className="rounded-[2rem] border border-white/80 bg-white/42 p-4 backdrop-blur-xl shadow-[0_20px_40px_rgba(203,168,150,0.22)]">
          <EditorialMedia src={resolveImageSrc(media.primary)} alt="Mist glass hero media" className="aspect-[4/5] rounded-[1.5rem]" />
        </div>
      </div>
    </div>
  )
}

function CampaignCoverHero({ locale, media }: { locale: Locale; media: HeroMedia }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-[2rem] border border-rose-mauve/25 bg-white p-7 lg:p-9">
        <p className="text-kicker text-rose-mauve">JISOO CAMPAIGN / VOL. 04</p>
        <h1 className="mt-3 font-serif text-5xl leading-[0.95] text-charcoal lg:text-7xl">The Glow<br />Issue</h1>
        <p className="mt-5 text-charcoal/70">Fashion-magazine treatment with typographic drama, art-directed framing, and campaign cover energy.</p>
        <CtaRow locale={locale} />
      </div>
      <div className="relative rounded-[2rem] border border-rose-mauve/20 bg-gradient-to-b from-[#faeef2] to-[#f7eee5] p-3">
        {media.preferVideo ? (
          <div className="aspect-[4/5] overflow-hidden rounded-[1.6rem]">
            <HeroVideoSurface media={media} className="rounded-[1.6rem]" />
          </div>
        ) : (
          <EditorialMedia src={resolveImageSrc(media.primary)} alt="Campaign cover visual" className="aspect-[4/5] rounded-[1.6rem]" overlayClassName="bg-gradient-to-t from-charcoal/45 via-transparent to-transparent" />
        )}
        <div className="absolute left-7 top-7 rounded-full border border-white/60 bg-white/30 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white backdrop-blur-sm">Cover Shot</div>
      </div>
    </div>
  )
}
