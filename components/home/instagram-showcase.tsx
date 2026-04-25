import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { CheckCircle2, Instagram } from 'lucide-react'

const INSTAGRAM_URL = 'https://www.instagram.com/jisoocosmetics/'

export function InstagramShowcase() {
  return (
    <section className="mx-auto w-full max-w-[1500px] px-4 py-16 lg:px-6">
      <Script id="elfsight-platform" src="https://elfsightcdn.com/platform.js" strategy="afterInteractive" />
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

        <div className="rounded-2xl border border-[#eee1d8] bg-white p-2 sm:p-3 lg:p-4">
          <div className="elfsight-app-c1e1c5fb-090c-44f4-8806-944402444301" data-elfsight-app-lazy />
        </div>

        <Link href={INSTAGRAM_URL} target="_blank" className="mt-4 inline-flex text-sm font-medium text-charcoal/70 hover:text-charcoal">
          View full profile on Instagram →
        </Link>
      </div>
    </section>
  )
}
