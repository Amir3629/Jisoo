'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, PlayCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AtmosphereSection } from '@/components/ui/atmosphere-section'
import { useLocale } from '@/components/providers/locale-provider'
import { localizeHref, type Locale } from '@/lib/i18n'

type HeroConcept = { id: string; name: string }
type HeroMedia = { primary: string; secondary?: string; tertiary?: string; quaternary?: string; video?: string; preferVideo?: boolean }

const heroConcepts: HeroConcept[] = [
  { id: 'image-editorial', name: 'Image Editorial' },
  { id: 'cinematic-type', name: 'Cinematic Type' },
  { id: 'split-stack', name: 'Split Stack' },
  { id: 'minimal-white', name: 'Minimal White' },
  { id: 'campaign-cover', name: 'Campaign Cover' },
  { id: 'video-motion', name: 'Video Motion' },
  { id: 'floating-architecture', name: 'Floating Architecture' },
  { id: 'mist-glass', name: 'Mist Glass' },
  { id: 'magazine-grid', name: 'Magazine Grid' },
  { id: 'commerce-luxe', name: 'Commerce Luxe' },
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

function pickAsset(index: number) {
  return HERO_ASSETS.images[index % HERO_ASSETS.images.length] ?? FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]
}

const conceptMediaMap: Record<string, HeroMedia> = {
  'image-editorial': { primary: pickAsset(0) },
  'cinematic-type': { primary: pickAsset(1), secondary: pickAsset(2) },
  'split-stack': { primary: pickAsset(2), secondary: pickAsset(3), tertiary: pickAsset(4) },
  'minimal-white': { primary: pickAsset(4) },
  'campaign-cover': { primary: pickAsset(5), secondary: pickAsset(0), video: HERO_ASSETS.video, preferVideo: true },
  'video-motion': { primary: pickAsset(1), video: HERO_ASSETS.video, preferVideo: true },
  'floating-architecture': { primary: pickAsset(0), secondary: pickAsset(3), tertiary: pickAsset(5) },
  'mist-glass': { primary: pickAsset(3), secondary: pickAsset(2) },
  'magazine-grid': { primary: pickAsset(5), secondary: pickAsset(4), tertiary: pickAsset(1), quaternary: pickAsset(0) },
  'commerce-luxe': { primary: pickAsset(2), secondary: pickAsset(4) },
}

function getMediaForConcept(id: string): HeroMedia {
  return conceptMediaMap[id] ?? { primary: pickAsset(0) }
}

export function HeroSection() {
  const { locale } = useLocale()
  const [activeId, setActiveId] = useState(heroConcepts[0].id)
  const media = useMemo(() => getMediaForConcept(activeId), [activeId])

  return (
    <AtmosphereSection atmosphere="ivory" className="relative overflow-hidden pt-[8.5rem] pb-8 lg:pt-[9.25rem]">
      <div className="relative mx-auto max-w-[1500px] px-3 lg:px-6">
        <div className="relative min-h-[68vh] lg:min-h-[72vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, scale: 1.015, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.992, y: -10 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              {activeId === 'image-editorial' && <ImageEditorialHero locale={locale} media={media} />}
              {activeId === 'cinematic-type' && <CinematicTypographyHero locale={locale} media={media} />}
              {activeId === 'split-stack' && <SplitStackHero locale={locale} media={media} />}
              {activeId === 'minimal-white' && <MinimalWhiteHero locale={locale} media={media} />}
              {activeId === 'campaign-cover' && <CampaignCoverHero locale={locale} media={media} />}
              {activeId === 'video-motion' && <VideoMotionHero locale={locale} media={media} />}
              {activeId === 'floating-architecture' && <FloatingArchitectureHero locale={locale} media={media} />}
              {activeId === 'mist-glass' && <MistGlassHero locale={locale} media={media} />}
              {activeId === 'magazine-grid' && <MagazineGridHero locale={locale} media={media} />}
              {activeId === 'commerce-luxe' && <CommerceLuxeHero locale={locale} media={media} />}
            </motion.div>
          </AnimatePresence>

          <div className="absolute right-3 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
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

          <div className="mt-4 flex flex-wrap gap-2 px-1 lg:hidden">
            {heroConcepts.map((concept, index) => (
              <button
                key={concept.id}
                onClick={() => setActiveId(concept.id)}
                className={cn(
                  'h-8 w-8 rounded-full text-xs font-semibold transition-all',
                  activeId === concept.id
                    ? 'bg-gradient-to-r from-rose-mauve to-[#d8b894] text-white'
                    : 'border border-rose-mauve/20 bg-white/85 text-charcoal/70'
                )}
                aria-label={`Switch hero concept ${index + 1}`}
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

function HeroImage({ src, alt, className, priority }: { src: string; alt: string; className?: string; priority?: boolean }) {
  const [failed, setFailed] = useState(false)
  const fallback = FALLBACK_IMAGES[0]

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Image
        src={failed ? fallback : src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover"
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
      Explore Collection
      <ArrowRight className="h-4 w-4" />
    </Link>
  )
}

function ImageEditorialHero({ locale, media }: { locale: Locale; media: HeroMedia }) {
  return (
    <section className="relative h-[68vh] overflow-hidden">
      <HeroImage src={media.primary} alt="Editorial background" className="absolute inset-0" priority />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/62 via-charcoal/30 to-charcoal/10" />
      <div className="absolute bottom-10 left-8 max-w-2xl lg:bottom-14 lg:left-14">
        <p className="text-kicker text-white/85">JISOO Editorial</p>
        <h1 className="mt-3 font-serif text-5xl text-white lg:text-7xl">The Rose Light Standard</h1>
        <p className="mt-4 text-white/82">A full-bleed image direction built for premium campaign storytelling.</p>
        <div className="mt-7"><PrimaryCta locale={locale} /></div>
      </div>
    </section>
  )
}

function CinematicTypographyHero({ locale, media }: { locale: Locale; media: HeroMedia }) {
  return (
    <section className="relative flex h-[68vh] flex-col justify-between overflow-hidden bg-[radial-gradient(circle_at_50%_24%,#fbeff4_0%,#fffaf6_48%,#f8efe7_100%)] px-6 pb-7 pt-10 text-center lg:px-14 lg:pb-9">
      <div className="mx-auto max-w-5xl">
        <motion.h1 initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-serif text-6xl leading-[0.9] text-charcoal lg:text-[7.4rem]">
          Cinematic
          <span className="block text-rose-mauve">Beauty Narrative</span>
        </motion.h1>
        <p className="mx-auto mt-4 max-w-2xl text-charcoal/65">Typography-first hero concept with an open editorial composition and gallery rhythm.</p>
      </div>

      <div className="mx-auto grid w-full max-w-6xl translate-y-3 grid-cols-3 gap-2 lg:translate-y-4 lg:grid-cols-5 lg:gap-3">
        <HeroImage src={media.primary} alt="Editorial tile 1" className="aspect-[4/5]" />
        <HeroImage src={media.secondary ?? media.primary} alt="Editorial tile 2" className="aspect-[4/5]" />
        <HeroImage src={media.primary} alt="Editorial tile 3" className="aspect-[4/5]" />
        <HeroImage src={media.secondary ?? media.primary} alt="Editorial tile 4" className="hidden aspect-[4/5] lg:block" />
        <HeroImage src={media.primary} alt="Editorial tile 5" className="hidden aspect-[4/5] lg:block" />
      </div>

      <div className="absolute left-1/2 top-[52%] -translate-x-1/2 lg:top-[55%]"><PrimaryCta locale={locale} subtle /></div>
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
        <HeroImage src={media.primary} alt="Minimal hero visual" className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/28 via-transparent to-charcoal/8" />
      </div>
    </section>
  )
}

function CampaignCoverHero({ locale, media }: { locale: Locale; media: HeroMedia }) {
  return (
    <section className="relative h-[68vh] overflow-hidden">
      <HeroVideo media={media} className="absolute inset-0" />
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
    <section className="relative h-[68vh] overflow-hidden rounded-[2rem] bg-charcoal">
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
    </section>
  )
}

function FloatingArchitectureHero({ locale, media }: { locale: Locale; media: HeroMedia }) {
  return (
    <section className="relative h-[68vh] overflow-hidden rounded-[2rem] bg-[linear-gradient(160deg,#fff8f4_0%,#faeef3_52%,#f8efe5_100%)]">
      <div className="absolute left-1/2 top-1/2 h-[410px] w-[290px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[2.2rem] shadow-[0_28px_70px_rgba(186,138,153,0.28)] lg:h-[520px] lg:w-[360px]">
        <HeroImage src={media.primary} alt="Floating main" className="h-full" />
      </div>
      <div className="absolute left-[18%] top-[22%] h-44 w-32 overflow-hidden rounded-2xl shadow-xl lg:h-56 lg:w-44"><HeroImage src={media.secondary ?? media.primary} alt="Floating secondary" className="h-full" /></div>
      <div className="absolute right-[16%] bottom-[20%] h-44 w-32 overflow-hidden rounded-2xl shadow-xl lg:h-56 lg:w-44"><HeroImage src={media.tertiary ?? media.primary} alt="Floating tertiary" className="h-full" /></div>
      <div className="absolute left-8 top-8 max-w-xl lg:left-12 lg:top-12">
        <h1 className="font-serif text-4xl text-charcoal lg:text-6xl">Floating Product Architecture</h1>
        <p className="mt-3 text-charcoal/65">Asymmetric, object-led visual concept with sculptural campaign rhythm.</p>
        <div className="mt-6"><PrimaryCta locale={locale} subtle /></div>
      </div>
    </section>
  )
}

function MistGlassHero({ locale, media }: { locale: Locale; media: HeroMedia }) {
  return (
    <section className="relative h-[68vh] overflow-hidden rounded-[2rem]">
      <HeroImage src={media.primary} alt="Mist background" className="absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.65),transparent_46%),linear-gradient(145deg,rgba(251,239,245,0.48),rgba(248,238,230,0.44))]" />
      <div className="absolute left-8 top-10 max-w-xl rounded-[2rem] border border-white/65 bg-white/34 p-7 backdrop-blur-xl lg:left-12 lg:top-12 lg:p-9">
        <p className="text-kicker text-[#b79263]">Glass Fade Direction</p>
        <h1 className="mt-3 font-serif text-4xl text-charcoal lg:text-6xl">Mist, Glow, Precision</h1>
        <p className="mt-4 text-charcoal/68">Luxury glassmorphism hero with diffused overlays and premium softness.</p>
        <div className="mt-7"><PrimaryCta locale={locale} /></div>
      </div>
      <div className="absolute right-10 bottom-10 h-64 w-48 overflow-hidden rounded-[1.6rem] border border-white/55 shadow-xl"><HeroImage src={media.secondary ?? media.primary} alt="Mist detail" className="h-full" /></div>
    </section>
  )
}

function MagazineGridHero({ locale, media }: { locale: Locale; media: HeroMedia }) {
  return (
    <section className="grid min-h-[68vh] grid-cols-2 gap-3 rounded-[2rem] bg-[#fffaf6] p-3 lg:grid-cols-12 lg:grid-rows-6 lg:gap-4 lg:p-4">
      <div className="col-span-2 lg:col-span-7 lg:row-span-6">
        <HeroImage src={media.primary} alt="Magazine main" className="h-full min-h-[320px] rounded-[1.6rem]" />
      </div>
      <div className="col-span-1 lg:col-span-5 lg:row-span-3"><HeroImage src={media.secondary ?? media.primary} alt="Magazine secondary" className="h-full min-h-[160px] rounded-[1.2rem]" /></div>
      <div className="col-span-1 lg:col-span-2 lg:row-span-3"><HeroImage src={media.tertiary ?? media.primary} alt="Magazine tertiary" className="h-full min-h-[160px] rounded-[1.2rem]" /></div>
      <div className="col-span-1 lg:col-span-3 lg:row-span-3"><HeroImage src={media.quaternary ?? media.primary} alt="Magazine quaternary" className="h-full min-h-[160px] rounded-[1.2rem]" /></div>
      <div className="col-span-2 flex items-center rounded-[1.2rem] border border-rose-mauve/18 bg-white/86 p-5 lg:col-span-5 lg:row-span-3 lg:p-7">
        <div>
          <h1 className="font-serif text-3xl text-charcoal lg:text-5xl">Editorial Layout Mosaic</h1>
          <p className="mt-2 text-charcoal/64">Magazine-inspired spatial rhythm with modular media storytelling.</p>
          <div className="mt-5"><PrimaryCta locale={locale} subtle /></div>
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
