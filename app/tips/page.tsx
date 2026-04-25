import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
const guides = [
  { slug: 'skin', title: 'Skin', blurb: 'Hydration-first routines for resilient, radiant 피부.' },
  { slug: 'face', title: 'Face', blurb: 'Daily cleansing, serum layering, and glow-preserving 광채 tips.' },
  { slug: 'eye', title: 'Eye', blurb: 'Gentle application and moisture-sealing eye care techniques.' },
  { slug: 'hair', title: 'Hair', blurb: 'Scalp hydration and lightweight nourishment for shine.' },
  { slug: 'beard', title: 'Beard', blurb: 'Softening and barrier-friendly beard maintenance.' },
  { slug: 'sun-care', title: 'Sun Care', blurb: 'Elegant sunscreen habits for cosmetic daily protection.' },
]
export default function TipsPage(){return <main className='min-h-screen bg-warm-ivory'><Header /><section className='pt-36 pb-16 px-4 max-w-6xl mx-auto'><h1 className='font-serif text-5xl text-charcoal'>JISOO Tips & Care Guide</h1><p className='mt-4 text-charcoal/70 max-w-2xl'>Subtle Korean ritual guidance — 수분, 광채, 피부 — with gentle links to JISOO formulas.</p><div className='mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5'>{guides.map(g=><Link key={g.slug} href={`/tips/${g.slug}`} className='rounded-2xl border border-rose-mauve/20 bg-white/80 p-6 hover:border-rose-mauve/45 transition-colors'><h2 className='font-serif text-2xl text-charcoal'>{g.title}</h2><p className='mt-2 text-charcoal/65'>{g.blurb}</p><p className='mt-4 text-sm text-rose-mauve'>Open guide →</p></Link>)}</div></section><Footer /></main>}
