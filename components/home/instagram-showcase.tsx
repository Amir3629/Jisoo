import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, ChevronLeft, ChevronRight, Clapperboard, Copy, Heart, Instagram, MessageCircle } from 'lucide-react'

const INSTAGRAM_URL = 'https://www.instagram.com/'

const feed = [
  {
    id: 1,
    src: '/first slide example/ChatGPT Image Apr 23, 2026, 08_14_40 PM.png',
    caption: 'Rose-light layering for luminous skin.',
    likes: '1,842',
    comments: '48',
    type: 'carousel' as const,
  },
  {
    id: 2,
    src: '/desing hero 2/ChatGPT Image Apr 24, 2026, 12_16_05 PM.png',
    caption: 'Texture focus: soft cream melt ritual.',
    likes: '2,106',
    comments: '61',
    type: 'reel' as const,
  },
  {
    id: 3,
    src: '/hero7/Untitled design (32).png',
    caption: 'Seoul studio visual direction.',
    likes: '1,507',
    comments: '33',
    type: 'carousel' as const,
  },
  {
    id: 4,
    src: '/desing hero 2/ChatGPT Image Apr 24, 2026, 12_25_15 PM.png',
    caption: 'Hydration with a clean editorial finish.',
    likes: '1,928',
    comments: '54',
    type: 'reel' as const,
  },
  {
    id: 5,
    src: '/first slide example/ChatGPT Image Apr 23, 2026, 08_20_39 PM.png',
    caption: 'Morning SPF ritual, polished and light.',
    likes: '1,673',
    comments: '39',
    type: 'carousel' as const,
  },
  {
    id: 6,
    src: '/desing hero 2/ChatGPT Image Apr 24, 2026, 12_23_16 PM.png',
    caption: 'Dropper precision with glass-skin glow.',
    likes: '2,241',
    comments: '72',
    type: 'reel' as const,
  },
  {
    id: 7,
    src: '/first slide example/ChatGPT Image Apr 23, 2026, 08_23_22 PM.png',
    caption: 'Night barrier support and calm finish.',
    likes: '1,492',
    comments: '30',
    type: 'carousel' as const,
  },
  {
    id: 8,
    src: '/desing hero 2/ChatGPT Image Apr 24, 2026, 12_31_29 PM.png',
    caption: 'Signature cream ritual by JISOO Seoul.',
    likes: '2,011',
    comments: '58',
    type: 'reel' as const,
  },
]

export function InstagramShowcase() {
  return (
    <section className="mx-auto w-full max-w-[1500px] px-4 py-16 lg:px-6">
      <div className="relative overflow-hidden rounded-[2rem] border border-[#e8d9cf] bg-[#fffdfb] p-4 shadow-[0_20px_60px_rgba(42,32,35,0.08)] sm:p-5 lg:p-6">
        <div className="mb-4 flex items-start justify-between gap-4 border-b border-[#eee1d8] pb-4">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex min-w-0 items-center gap-3">
            <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-rose-mauve/40 ring-offset-2 ring-offset-white">
              <Image src="/hero7/Untitled design (32).png" alt="JISOO Seoul Edition profile" fill className="object-cover" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="truncate text-lg font-semibold text-charcoal">JISOO Seoul Edition</h3>
                <CheckCircle2 className="h-4 w-4 fill-[#3897f0] text-white" />
              </div>
              <p className="text-sm text-charcoal/60">@jisooseoul</p>
            </div>
          </a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-black/85"
          >
            <Instagram className="h-4 w-4" />
            Follow
          </a>
        </div>

        <div className="mb-4 grid grid-cols-3 gap-2 text-center text-sm sm:gap-3">
          {[
            { label: 'Posts', value: '248' },
            { label: 'Followers', value: '128K' },
            { label: 'Following', value: '108' },
          ].map(stat => (
            <a
              key={stat.label}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-[#eee1d8] bg-white px-2 py-2"
            >
              <p className="font-semibold text-charcoal">{stat.value}</p>
              <p className="text-charcoal/60">{stat.label}</p>
            </a>
          ))}
        </div>

        <div className="relative">
          <button
            type="button"
            aria-label="Previous posts"
            className="absolute left-2 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/90 text-charcoal shadow-sm md:flex"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next posts"
            className="absolute right-2 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/90 text-charcoal shadow-sm md:flex"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {feed.map(post => (
              <a
                key={post.id}
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-lg bg-[#f7f2ee]"
              >
                <div className="relative aspect-[4/5]">
                  <Image src={post.src} alt={post.caption} fill className="object-cover transition duration-500 group-hover:scale-105" />
                </div>

                <div className="absolute right-2 top-2 z-10 rounded-full bg-black/45 p-1.5 text-white">
                  {post.type === 'carousel' ? <Copy className="h-3.5 w-3.5" /> : <Clapperboard className="h-3.5 w-3.5" />}
                </div>

                <div className="absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/10 to-transparent p-2 opacity-0 transition group-hover:opacity-100">
                  <div className="mb-1 flex items-center gap-3 text-[11px] font-medium text-white">
                    <span className="inline-flex items-center gap-1"><Heart className="h-3 w-3" />{post.likes}</span>
                    <span className="inline-flex items-center gap-1"><MessageCircle className="h-3 w-3" />{post.comments}</span>
                  </div>
                  <p className="line-clamp-2 text-[11px] leading-4 text-white/95">{post.caption}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <Link href={INSTAGRAM_URL} target="_blank" className="mt-4 inline-flex text-sm font-medium text-charcoal/70 hover:text-charcoal">
          View full profile on Instagram →
        </Link>
      </div>
    </section>
  )
}
