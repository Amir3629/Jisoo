'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { useLocale } from '@/components/providers/locale-provider'
import { localizeHref } from '@/lib/i18n'

const storyImages = [
  '/assets/about/ritual-lab.png',
  '/assets/about/care-model.png',
  '/assets/about/formula-detail.png',
  '/assets/about/korean-heritage.png',
  '/assets/about/story-campaign.png',
]

const chapters = [
  {
    kicker: 'Origin',
    title: 'A quiet Korean ritual, made cinematic.',
    body: 'Rice water, botanical patience, fermented texture, and the soft discipline of daily care shape the JISOO standard.',
  },
  {
    kicker: 'Formula',
    title: 'Soft layers. Bright skin. Less noise.',
    body: 'Each formula is selected for comfort first, then glow: breathable finishes, calm ingredients, and a polished sensorial rhythm.',
  },
  {
    kicker: 'Promise',
    title: 'Beauty that feels personal before it feels public.',
    body: 'JISOO is built for the morning mirror: precise, warm, modern Korean care that makes ordinary days feel considered.',
  },
]

type AboutExperimentPageProps = {
  variant: 'gallery' | 'atelier' | 'cinema'
}

export function AboutExperimentPage({ variant }: AboutExperimentPageProps) {
  const { locale } = useLocale()
  const { scrollYProgress } = useScroll()
  const drift = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const lift = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])

  if (variant === 'atelier') {
    return (
      <main className="min-h-screen bg-[#f7ece3] text-charcoal">
        <Header transparentOnTop />
        <section className="relative min-h-screen overflow-hidden px-4 pt-28 lg:px-8 lg:pt-36">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(214,168,186,0.28),transparent_30%),linear-gradient(145deg,#f4e5dc_0%,#f2dfd4_100%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.article initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="self-center py-10">
              <p className="text-kicker text-rose-mauve">Atelier Study</p>
              <h1 className="mt-5 max-w-[11ch] font-serif text-4xl leading-tight text-charcoal lg:text-6xl">The Ritual Room</h1>
              <p className="mt-8 max-w-xl text-base leading-8 text-charcoal/68">
                A warmer, editorial concept for JISOO: product memory, Korean craft, and soft visual rhythm arranged like an intimate beauty atelier.
              </p>
              <Link href={localizeHref('/shop', locale)} className="mt-9 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#cfac7f] to-[#d9bd97] px-6 py-3 text-sm font-medium text-white shadow-luxury transition hover:brightness-105">
                Shop the ritual <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.article>
            <div className="grid min-h-[620px] grid-cols-12 grid-rows-12 gap-4">
              <motion.div style={{ y: lift }} className="relative col-span-7 col-start-1 row-span-7 row-start-2 overflow-hidden rounded-[2rem] shadow-editorial">
                <Image src={storyImages[4]} alt="" fill priority sizes="50vw" className="object-cover" />
              </motion.div>
              <motion.div style={{ y: drift }} className="relative col-span-5 col-start-8 row-span-5 row-start-1 overflow-hidden rounded-[1.5rem] shadow-luxury">
                <Image src={storyImages[1]} alt="" fill sizes="34vw" className="object-cover" />
              </motion.div>
              <div className="col-span-5 col-start-7 row-span-4 row-start-8 rounded-[1.5rem] border border-[#cfae83]/24 bg-[#f4e5dc]/78 p-6 shadow-luxury backdrop-blur">
                <p className="text-kicker text-rose-mauve">JISOO Standard</p>
                <p className="mt-4 text-2xl font-serif leading-tight">Gentle formulas, precise textures, modern Seoul calm.</p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  if (variant === 'cinema') {
    return (
      <main className="min-h-screen bg-charcoal text-warm-ivory">
        <Header transparentOnTop lightOnTop />
        <section className="relative h-screen overflow-hidden">
          <Image src={storyImages[0]} alt="" fill priority sizes="100vw" className="object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/52 to-transparent" />
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 flex h-full max-w-7xl items-center px-5 lg:mx-auto lg:px-8">
            <article className="max-w-3xl">
              <p className="text-kicker text-[#d9bd97]">Cinematic Scroll</p>
              <h1 className="mt-5 font-serif text-4xl leading-tight lg:text-6xl">Seoul Memory, Modern Glow.</h1>
              <p className="mt-8 max-w-xl text-base leading-8 text-warm-ivory/72">
                A more immersive campaign-style version: darker, more dramatic, built around atmosphere and the feeling of stepping into a brand film.
              </p>
            </article>
          </motion.div>
        </section>
        <section className="grid min-h-screen lg:grid-cols-3">
          {chapters.map((chapter, index) => (
            <article key={chapter.title} className="group relative min-h-[520px] overflow-hidden border-t border-white/10 lg:border-l lg:border-t-0">
              <Image src={storyImages[index + 1]} alt="" fill sizes="33vw" className="object-cover opacity-58 transition duration-700 group-hover:scale-105 group-hover:opacity-78" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/38 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <p className="text-kicker text-[#d9bd97]">{chapter.kicker}</p>
                <h2 className="mt-4 font-serif text-4xl leading-tight">{chapter.title}</h2>
                <p className="mt-5 text-sm leading-7 text-warm-ivory/70">{chapter.body}</p>
              </div>
            </article>
          ))}
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f4e5dc] text-charcoal">
      <Header />
      <section className="relative overflow-hidden px-4 pt-32 lg:px-8 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr]">
            <motion.article initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} className="sticky top-28 h-fit">
              <p className="text-kicker text-rose-mauve">Gallery Concept</p>
              <h1 className="mt-5 max-w-[10ch] font-serif text-4xl leading-tight lg:text-6xl">The JISOO Archive</h1>
              <p className="mt-8 max-w-lg text-base leading-8 text-charcoal/66">
                A cleaner gallery version for comparing: less slide behavior, more museum-like panels, still premium and emotional.
              </p>
            </motion.article>
            <div className="space-y-6 pb-24">
              {chapters.map((chapter, index) => (
                <motion.article
                  key={chapter.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-15%' }}
                  className="grid overflow-hidden rounded-[2rem] border border-[#cfae83]/22 bg-[linear-gradient(155deg,#f4e5dc_0%,#f8efe7_100%)] shadow-editorial md:grid-cols-[0.92fr_1.08fr]"
                >
                  <div className="relative min-h-[320px]">
                    <Image src={storyImages[index]} alt="" fill sizes="50vw" className="object-cover" />
                  </div>
                  <div className="flex min-h-[320px] flex-col justify-center p-8 lg:p-10">
                    <p className="text-kicker text-rose-mauve">{chapter.kicker}</p>
                    <h2 className="mt-4 font-serif text-4xl leading-tight text-charcoal lg:text-5xl">{chapter.title}</h2>
                    <p className="mt-5 text-sm leading-7 text-charcoal/68">{chapter.body}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
