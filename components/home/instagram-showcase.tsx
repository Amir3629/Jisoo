'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, Clapperboard, Copy, Facebook, Heart, Instagram, MessageCircle, PlayCircle, Share2 } from 'lucide-react'
import { useLocale } from '@/components/providers/locale-provider'
import type { Locale } from '@/lib/i18n'

type SocialTab = 'instagram' | 'tiktok' | 'facebook'

const SOCIAL_LINKS: Record<SocialTab, string> = {
  instagram: 'https://www.instagram.com/jisoocosmetics/',
  tiktok: 'https://www.tiktok.com/@jisoocosmetics',
  facebook: 'https://www.facebook.com/jisoocosmetics',
}

const LOCAL_SOCIAL_MEDIA = [
  '/first slide example/ChatGPT Image Apr 23, 2026, 08_14_40 PM.png',
  '/skincare-ingredients-featured.jpg',
  '/black-skincare-expert-recommended-products-295961-1635525452337-square-1200-80.jpg',
  '/desing hero 2/ChatGPT Image Apr 24, 2026, 12_25_15 PM.png',
  '/first slide example/ChatGPT Image Apr 23, 2026, 08_20_39 PM.png',
  '/hero7/Untitled design (32).png',
  '/first slide example/ChatGPT Image Apr 23, 2026, 08_23_22 PM.png',
  '/desing hero 2/ChatGPT Image Apr 24, 2026, 12_23_16 PM.png',
]

const INSTAGRAM_POSTS = [
  ['Rose-light layering ritual.', '1,842', '48', 'carousel'],
  ['Soft cream texture focus.', '2,106', '61', 'reel'],
  ['Studio Seoul signature edit.', '1,507', '33', 'carousel'],
  ['Hydration with editorial finish.', '1,928', '54', 'reel'],
  ['AM SPF with cloud-light skin.', '1,673', '39', 'carousel'],
  ['Dropper precision and glow.', '2,241', '72', 'reel'],
  ['Night barrier support routine.', '1,492', '30', 'carousel'],
  ['JISOO cream ritual moment.', '2,011', '58', 'reel'],
] as const

const TIKTOK_POSTS = [
  ['Morning glow routine in 12s.', '24.1K', '486'],
  ['Texture check: cloud cream.', '19.8K', '350'],
  ['Seoul studio BTS visuals.', '31.2K', '740'],
  ['Dropper ritual transition.', '22.7K', '511'],
  ['AM SPF finish test.', '17.4K', '296'],
  ['Before/after hydration clip.', '28.3K', '623'],
  ['Barrier-care bedtime ritual.', '16.9K', '280'],
  ['Signature cream spotlight.', '26.6K', '555'],
] as const

const FACEBOOK_POSTS = [
  ['New ritual launch highlights.', '3.8K', '217', '74'],
  ['Skincare tips from Seoul team.', '2.9K', '148', '63'],
  ['Community spotlight this week.', '4.1K', '202', '88'],
  ['Hydration guide article.', '2.4K', '131', '44'],
  ['SPF daily reminder campaign.', '3.2K', '167', '56'],
  ['Product texture deep dive.', '2.7K', '140', '48'],
  ['Weekend routine checklist.', '3.0K', '159', '51'],
  ['Editor picks for spring.', '3.6K', '190', '66'],
] as const

const SOCIAL_COPY: Record<
  Locale,
  {
    stats: { posts: string; followers: string; following: string; likes: string }
    cta: { follow: string; likeFollow: string }
    viewProfile: string
  }
> = {
  en: {
    stats: { posts: 'Posts', followers: 'Followers', following: 'Following', likes: 'Likes' },
    cta: { follow: 'Follow', likeFollow: 'Like / Follow' },
    viewProfile: 'View full profile →',
  },
  ar: {
    stats: { posts: 'المنشورات', followers: 'المتابعون', following: 'يتابع', likes: 'الإعجابات' },
    cta: { follow: 'متابعة', likeFollow: 'إعجاب / متابعة' },
    viewProfile: 'عرض الملف الكامل ←',
  },
  fr: {
    stats: { posts: 'Publications', followers: 'Abonnés', following: 'Abonnements', likes: 'Mentions J’aime' },
    cta: { follow: 'Suivre', likeFollow: 'Aimer / Suivre' },
    viewProfile: 'Voir le profil complet →',
  },
  de: {
    stats: { posts: 'Beiträge', followers: 'Follower', following: 'Folgt', likes: 'Gefällt mir' },
    cta: { follow: 'Folgen', likeFollow: 'Gefällt mir / Folgen' },
    viewProfile: 'Vollständiges Profil anzeigen →',
  },
  ko: {
    stats: { posts: '게시물', followers: '팔로워', following: '팔로잉', likes: '좋아요' },
    cta: { follow: '팔로우', likeFollow: '좋아요 / 팔로우' },
    viewProfile: '전체 프로필 보기 →',
  },
  tr: {
    stats: { posts: 'Gönderi', followers: 'Takipçi', following: 'Takip', likes: 'Beğeni' },
    cta: { follow: 'Takip Et', likeFollow: 'Beğen / Takip Et' },
    viewProfile: 'Tam profili görüntüle →',
  },
}

export function InstagramShowcase() {
  const [activeTab, setActiveTab] = useState<SocialTab>('instagram')
  const { locale } = useLocale()
  const copy = SOCIAL_COPY[locale]

  return (
    <section className="mx-auto w-full max-w-[1500px] px-4 py-16 lg:px-6">
      <div className="relative overflow-hidden rounded-[2rem] border border-[#e8d9cf] bg-[#fffdfb] p-4 shadow-[0_20px_60px_rgba(42,32,35,0.08)] sm:p-5 lg:p-6">
        <div className="mb-4 flex justify-center gap-2 border-b border-[#eee1d8] pb-4">
          {[
            { id: 'instagram', label: 'Instagram', icon: Instagram },
            { id: 'tiktok', label: 'TikTok', icon: PlayCircle },
            { id: 'facebook', label: 'Facebook', icon: Facebook },
          ].map(tab => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            const activeClass =
              tab.id === 'instagram'
                ? 'border-transparent bg-gradient-to-r from-[#f56040] via-[#d62976] to-[#8a3ab9] text-white shadow-[0_8px_24px_rgba(214,41,118,0.35)]'
                : tab.id === 'tiktok'
                  ? 'border-transparent bg-gradient-to-r from-[#cfac7f] to-[#d9bd97] text-white shadow-[0_10px_24px_rgba(207,172,127,0.35)]'
                  : 'border-transparent bg-[#1877f2] text-white shadow-[0_10px_24px_rgba(24,119,242,0.35)]'

            const inactiveClass =
              tab.id === 'instagram'
                ? 'border-[#e8d9cf] bg-gradient-to-r from-[#fffaf8] to-[#fef8f7] text-charcoal/70 hover:border-[#d8b0bf] hover:bg-[#fff6fa] hover:text-[#b54872]'
                : tab.id === 'tiktok'
                  ? 'border-[#e8d9cf] bg-gradient-to-r from-[#fffaf8] to-[#fef8f7] text-charcoal/70 hover:border-[#d7d7d7] hover:bg-[#fafafa] hover:text-charcoal'
                  : 'border-[#e8d9cf] bg-gradient-to-r from-[#fffaf8] to-[#fef8f7] text-charcoal/70 hover:border-[#b8cff7] hover:bg-[#f5f9ff] hover:text-[#1877f2]'

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as SocialTab)}
                aria-label={tab.label}
                title={tab.label}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-full border text-sm font-medium transition ${isActive ? activeClass : inactiveClass}`}
              >
                <Icon className="h-4 w-4" />
              </button>
            )
          })}
        </div>

        {activeTab === 'instagram' && (
          <SocialPanel
            platform="instagram"
            title="JISOO Cosmetics"
            handle="@jisoocosmetics"
            stats={[
              { label: copy.stats.posts, value: '248' },
              { label: copy.stats.followers, value: '128K' },
              { label: copy.stats.following, value: '108' },
            ]}
            ctaLabel={copy.cta.follow}
            link={SOCIAL_LINKS.instagram}
            viewProfileLabel={copy.viewProfile}
          >
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {INSTAGRAM_POSTS.map((post, index) => (
                <a key={index} href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="group relative block overflow-hidden rounded-lg bg-[#f7f2ee]">
                  <div className="relative aspect-[4/5]">
                    <Image src={LOCAL_SOCIAL_MEDIA[index]} alt={post[0]} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="absolute right-2 top-2 z-10 rounded-full bg-black/45 p-1.5 text-white">
                    {post[3] === 'carousel' ? <Copy className="h-3.5 w-3.5" /> : <Clapperboard className="h-3.5 w-3.5" />}
                  </div>
                  <div className="absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/10 to-transparent p-2 opacity-0 transition group-hover:opacity-100">
                    <div className="mb-1 flex items-center gap-3 text-[11px] font-medium text-white">
                      <span className="inline-flex items-center gap-1"><Heart className="h-3 w-3" />{post[1]}</span>
                      <span className="inline-flex items-center gap-1"><MessageCircle className="h-3 w-3" />{post[2]}</span>
                    </div>
                    <p className="line-clamp-2 text-[11px] leading-4 text-white/95">{post[0]}</p>
                  </div>
                </a>
              ))}
            </div>
          </SocialPanel>
        )}

        {activeTab === 'tiktok' && (
          <SocialPanel
            platform="tiktok"
            title="JISOO Cosmetics"
            handle="@jisoocosmetics"
            stats={[
              { label: copy.stats.posts, value: '148' },
              { label: copy.stats.followers, value: '86.4K' },
              { label: copy.stats.following, value: '39' },
            ]}
            ctaLabel={copy.cta.follow}
            link={SOCIAL_LINKS.tiktok}
            viewProfileLabel={copy.viewProfile}
          >
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {TIKTOK_POSTS.map((post, index) => (
                <a key={index} href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="group relative block overflow-hidden rounded-lg bg-[#f7f2ee]">
                  <div className="relative aspect-[9/16]">
                    <Image src={LOCAL_SOCIAL_MEDIA[index]} alt={post[0]} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="absolute right-2 top-2 z-10 rounded-full bg-black/45 p-1.5 text-white">
                    <PlayCircle className="h-3.5 w-3.5" />
                  </div>
                  <div className="absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-black/75 via-black/10 to-transparent p-2 opacity-0 transition group-hover:opacity-100">
                    <div className="mb-1 flex items-center gap-3 text-[11px] font-medium text-white">
                      <span className="inline-flex items-center gap-1"><Heart className="h-3 w-3" />{post[1]}</span>
                      <span className="inline-flex items-center gap-1"><MessageCircle className="h-3 w-3" />{post[2]}</span>
                    </div>
                    <p className="line-clamp-2 text-[11px] leading-4 text-white/95">{post[0]}</p>
                  </div>
                </a>
              ))}
            </div>
          </SocialPanel>
        )}

        {activeTab === 'facebook' && (
          <SocialPanel
            platform="facebook"
            title="JISOO Cosmetics"
            handle="@jisoocosmetics"
            stats={[
              { label: copy.stats.posts, value: '612' },
              { label: copy.stats.followers, value: '53K' },
              { label: copy.stats.likes, value: '49K' },
            ]}
            ctaLabel={copy.cta.likeFollow}
            link={SOCIAL_LINKS.facebook}
            viewProfileLabel={copy.viewProfile}
          >
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {FACEBOOK_POSTS.map((post, index) => (
                <a key={index} href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="group relative block overflow-hidden rounded-lg bg-[#f7f2ee]">
                  <div className="relative aspect-[4/5]">
                    <Image src={LOCAL_SOCIAL_MEDIA[index]} alt={post[0]} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-black/75 via-black/10 to-transparent p-2 opacity-0 transition group-hover:opacity-100">
                    <div className="mb-1 flex flex-wrap items-center gap-2 text-[11px] font-medium text-white">
                      <span className="inline-flex items-center gap-1"><Heart className="h-3 w-3" />{post[1]}</span>
                      <span className="inline-flex items-center gap-1"><MessageCircle className="h-3 w-3" />{post[2]}</span>
                      <span className="inline-flex items-center gap-1"><Share2 className="h-3 w-3" />{post[3]}</span>
                    </div>
                    <p className="line-clamp-2 text-[11px] leading-4 text-white/95">{post[0]}</p>
                  </div>
                </a>
              ))}
            </div>
          </SocialPanel>
        )}
      </div>
    </section>
  )
}

function SocialPanel({
  platform,
  title,
  handle,
  stats,
  ctaLabel,
  link,
  viewProfileLabel,
  children,
}: {
  platform: SocialTab
  title: string
  handle: string
  stats: Array<{ label: string; value: string }>
  ctaLabel: string
  link: string
  viewProfileLabel: string
  children: React.ReactNode
}) {
  const actionButtonClass =
    platform === 'instagram'
      ? 'bg-gradient-to-r from-[#f56040] via-[#d62976] to-[#8a3ab9] text-white hover:brightness-105'
      : platform === 'tiktok'
        ? 'bg-[#111111] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_0_10px_rgba(37,244,238,0.2),0_0_12px_rgba(254,44,85,0.16)] hover:bg-black'
        : 'bg-[#1877f2] text-white hover:brightness-105'

  return (
    <>
      <div className="mb-4 flex items-start justify-between gap-4 border-b border-[#eee1d8] pb-4">
        <a href={link} target="_blank" rel="noopener noreferrer" className="flex min-w-0 items-center gap-3">
          <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-rose-mauve/40 ring-offset-2 ring-offset-white">
            <Image src="/hero7/Untitled design (32).png" alt={`${title} profile`} fill sizes="56px" className="object-cover" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="truncate text-lg font-semibold text-charcoal">{title}</h3>
              <CheckCircle2 className="h-4 w-4 fill-[#3897f0] text-white" />
            </div>
            <p className="text-sm text-charcoal/60">{handle}</p>
          </div>
        </a>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${actionButtonClass}`}
        >
          {platform === 'instagram' && <Instagram className="h-4 w-4" />}
          {platform === 'tiktok' && <PlayCircle className="h-4 w-4" />}
          {platform === 'facebook' && <Facebook className="h-4 w-4" />}
          {ctaLabel}
        </a>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-2 text-center text-sm sm:gap-3">
        {stats.map(stat => (
          <a
            key={stat.label}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-[#eee1d8] bg-gradient-to-r from-[#fffaf8] to-[#fef8f7] px-2 py-2"
          >
            <p className="font-semibold text-charcoal">{stat.value}</p>
            <p className="text-charcoal/60">{stat.label}</p>
          </a>
        ))}
      </div>

      {children}

      <Link href={link} target="_blank" className="mt-4 inline-flex text-sm font-medium text-charcoal/70 hover:text-charcoal">
        {viewProfileLabel}
      </Link>
    </>
  )
}
