'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, Heart, Instagram, MessageCircle, PlayCircle, SquareStack } from 'lucide-react'

const INSTAGRAM_PROFILE_URL = 'https://www.instagram.com/jisoocosmetics/'

type InstagramPost = {
  id: string
  caption: string
  mediaType: string
  mediaUrl: string
  thumbnailUrl?: string
  permalink: string
  timestamp?: string
  likeCount?: number
  commentsCount?: number
}

type InstagramFeedPayload = {
  status: 'ok' | 'not_configured' | 'error'
  message?: string
  profile: {
    name: string
    username: string
    posts?: number
    followers?: number
    following?: number
  }
  posts: InstagramPost[]
}

export function InstagramShowcase() {
  const [payload, setPayload] = useState<InstagramFeedPayload | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadFeed() {
      try {
        const res = await fetch('/api/instagram-feed')
        const json = (await res.json()) as InstagramFeedPayload
        if (!cancelled) {
          setPayload(json)
        }
      } catch {
        if (!cancelled) {
          setPayload({
            status: 'error',
            message: 'Unable to load Instagram feed right now.',
            profile: { name: 'JISOO Seoul Edition', username: 'jisoocosmetics' },
            posts: [],
          })
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadFeed()

    return () => {
      cancelled = true
    }
  }, [])

  const profile = payload?.profile ?? { name: 'JISOO Seoul Edition', username: 'jisoocosmetics' }
  const posts = payload?.posts ?? []

  return (
    <section className="mx-auto w-full max-w-[1500px] px-4 py-16 lg:px-6">
      <div className="relative overflow-hidden rounded-[2rem] border border-[#e8d9cf] bg-[#fffdfb] p-4 shadow-[0_20px_60px_rgba(42,32,35,0.08)] sm:p-5 lg:p-6">
        <div className="mb-4 flex items-start justify-between gap-4 border-b border-[#eee1d8] pb-4">
          <a href={INSTAGRAM_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="flex min-w-0 items-center gap-3">
            <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-rose-mauve/40 ring-offset-2 ring-offset-white">
              <Image src="/hero7/Untitled design (32).png" alt="JISOO Seoul Edition profile" fill className="object-cover" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="truncate text-lg font-semibold text-charcoal">{profile.name}</h3>
                <CheckCircle2 className="h-4 w-4 fill-[#3897f0] text-white" />
              </div>
              <p className="text-sm text-charcoal/60">@{profile.username}</p>
            </div>
          </a>

          <a
            href={INSTAGRAM_PROFILE_URL}
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
            { label: 'Posts', value: profile.posts?.toString() ?? '—' },
            { label: 'Followers', value: profile.followers ? profile.followers.toLocaleString() : '—' },
            { label: 'Following', value: profile.following ? profile.following.toLocaleString() : '—' },
          ].map(stat => (
            <a
              key={stat.label}
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-[#eee1d8] bg-white px-2 py-2"
            >
              <p className="font-semibold text-charcoal">{stat.value}</p>
              <p className="text-charcoal/60">{stat.label}</p>
            </a>
          ))}
        </div>

        {loading && (
          <p className="text-center text-sm text-charcoal/70">Loading Instagram feed…</p>
        )}

        {!loading && payload?.status === 'not_configured' && (
          <p className="text-center text-sm text-charcoal/70">
            Instagram feed is not configured yet. Add <code>INSTAGRAM_ACCESS_TOKEN</code> and <code>INSTAGRAM_BUSINESS_ACCOUNT_ID</code>.
          </p>
        )}

        {!loading && payload?.status === 'error' && (
          <p className="text-center text-sm text-charcoal/70">{payload.message ?? 'Instagram feed is temporarily unavailable.'}</p>
        )}

        {!loading && payload?.status === 'ok' && posts.length === 0 && (
          <p className="text-center text-sm text-charcoal/70">No Instagram posts available right now.</p>
        )}

        {!loading && posts.length > 0 && (
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {posts.map(post => {
              const preview = post.mediaType === 'VIDEO' && post.thumbnailUrl ? post.thumbnailUrl : post.mediaUrl
              return (
                <a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block overflow-hidden rounded-lg bg-[#f7f2ee]"
                >
                  <div className="relative aspect-[4/5]">
                    <Image src={preview} alt={post.caption || 'Instagram post'} fill className="object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="absolute right-2 top-2 z-10 rounded-full bg-black/45 p-1.5 text-white">
                    {post.mediaType === 'VIDEO' ? <PlayCircle className="h-3.5 w-3.5" /> : <SquareStack className="h-3.5 w-3.5" />}
                  </div>
                  <div className="absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/10 to-transparent p-2 opacity-0 transition group-hover:opacity-100">
                    <div className="mb-1 flex items-center gap-3 text-[11px] font-medium text-white">
                      <span className="inline-flex items-center gap-1"><Heart className="h-3 w-3" />{post.likeCount ?? 0}</span>
                      <span className="inline-flex items-center gap-1"><MessageCircle className="h-3 w-3" />{post.commentsCount ?? 0}</span>
                    </div>
                    <p className="line-clamp-2 text-[11px] leading-4 text-white/95">{post.caption || 'View on Instagram'}</p>
                  </div>
                </a>
              )
            })}
          </div>
        )}

        <Link href={INSTAGRAM_PROFILE_URL} target="_blank" className="mt-4 inline-flex text-sm font-medium text-charcoal/70 hover:text-charcoal">
          View full profile on Instagram →
        </Link>
      </div>
    </section>
  )
}
