'use client'

import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center bg-warm-ivory overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero/main.jpg"
          alt="Premium JISOO Cosmetic Hero"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/20"></div>
      </div>
      <div className="relative z-10 text-center px-4">
        <p className="text-sm tracking-widest text-gray-600">JISOO EDITORIAL</p>
        <h1 className="text-5xl font-serif font-bold text-gray-900 mt-2">
          Discover the Rose Light Experience
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Expertly curated Korean beauty essentials, chosen to elevate your daily ritual and inspire confidence with every application.
        </p>
        <Link
          href="/shop/new-arrivals"
          className="mt-6 inline-block px-6 py-3 bg-gradient-to-r from-pink-300 to-orange-300 text-white font-medium rounded-lg"
        >
          Explore Collection
        </Link>
      </div>
    </section>
  )
}
