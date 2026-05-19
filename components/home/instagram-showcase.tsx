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
  '/assets/editorial/rose-layering.png',
  '/assets/editorial/skincare-ingredients.jpg',
  '/assets/editorial/care-expert.jpg',
  '/assets/editorial/tone-up-sun-cream.png',
  '/assets/editorial/sun-care.png',
  '/assets/editorial/product-table.png',
  '/assets/editorial/night-routine.png',
  '/assets/editorial/cream-ritual.png',
  '/assets/editorial/eye-care.png',
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
  ['Eye care texture close-up.', '1,764', '42', 'carousel'],
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
    profileAlt: string
  }
> = {
  en: {
    stats: { posts: 'Posts', followers: 'Followers', following: 'Following', likes: 'Likes' },
    cta: { follow: 'Follow', likeFollow: 'Like / Follow' },
    viewProfile: 'View full profile →', profileAlt: 'JISOO Cosmetics profile',
  },
  ar: {
    stats: { posts: 'المنشورات', followers: 'المتابعون', following: 'يتابع', likes: 'الإعجابات' },
    cta: { follow: 'متابعة', likeFollow: 'إعجاب / متابعة' },
    viewProfile: 'عرض الملف الكامل ←', profileAlt: 'ملف JISOO Cosmetics',
  },
  fr: {
    stats: { posts: 'Publications', followers: 'Abonnés', following: 'Abonnements', likes: 'Mentions J’aime' },
    cta: { follow: 'Suivre', likeFollow: 'Aimer / Suivre' },
    viewProfile: 'Voir le profil complet →', profileAlt: 'Profil JISOO Cosmetics',
  },
  de: {
    stats: { posts: 'Beiträge', followers: 'Follower', following: 'Folgt', likes: 'Gefällt mir' },
    cta: { follow: 'Folgen', likeFollow: 'Gefällt mir / Folgen' },
    viewProfile: 'Vollständiges Profil anzeigen →', profileAlt: 'JISOO Cosmetics Profil',
  },
  ko: {
    stats: { posts: '게시물', followers: '팔로워', following: '팔로잉', likes: '좋아요' },
    cta: { follow: '팔로우', likeFollow: '좋아요 / 팔로우' },
    viewProfile: '전체 프로필 보기 →', profileAlt: 'JISOO Cosmetics 프로필',
  },
  tr: {
    stats: { posts: 'Gönderi', followers: 'Takipçi', following: 'Takip', likes: 'Beğeni' },
    cta: { follow: 'Takip Et', likeFollow: 'Beğen / Takip Et' },
    viewProfile: 'Tam profili görüntüle →', profileAlt: 'JISOO Cosmetics profili',
  },
}

export function InstagramShowcase() {
  const [activeTab, setActiveTab] = useState<SocialTab>('instagram')
  const { locale } = useLocale()
  const copy = SOCIAL_COPY[locale]
  const localizedPostText = (text: string) => {
    const translations: Record<string, Partial<Record<typeof locale, string>>> = {
      'Rose-light layering ritual.': { ar: 'طقس طبقات بضوء وردي.', fr: 'Rituel de superposition rose-lumière.', de: 'Rose-Light Layering-Ritual.', ko: '로즈 라이트 레이어링 리추얼.', tr: 'Gül ışığı katmanlama ritüeli.' },
      'Soft cream texture focus.': { ar: 'تركيز على ملمس الكريم الناعم.', fr: 'Focus texture crème douce.', de: 'Fokus auf sanfte Creme-Textur.', ko: '부드러운 크림 텍스처 포커스.', tr: 'Yumuşak krem dokusu odağı.' },
      'Studio Seoul signature edit.': { ar: 'تحرير ستوديو سيول المميز.', fr: 'Sélection signature Studio Séoul.', de: 'Studio-Seoul Signature-Edit.', ko: '스튜디오 서울 시그니처 에디트.', tr: 'Studio Seoul imza seçkisi.' },
      'Hydration with editorial finish.': { ar: 'ترطيب بلمسة تحريرية.', fr: 'Hydratation au fini éditorial.', de: 'Feuchtigkeit mit editorialem Finish.', ko: '에디토리얼 피니시의 수분감.', tr: 'Editoryal bitişli nem.' },
      'AM SPF with cloud-light skin.': { ar: 'واقي صباحي ببشرة خفيفة كالسحاب.', fr: 'SPF du matin, peau légère comme un nuage.', de: 'AM SPF mit wolkenleichter Haut.', ko: '구름처럼 가벼운 아침 SPF.', tr: 'Bulut hafifliğinde AM SPF.' },
      'Dropper precision and glow.': { ar: 'دقة القطّارة والتوهّج.', fr: 'Précision pipette et éclat.', de: 'Pipetten-Präzision und Glow.', ko: '드로퍼의 정밀함과 광채.', tr: 'Damlalık hassasiyeti ve ışıltı.' },
      'Night barrier support routine.': { ar: 'روتين ليلي لدعم الحاجز.', fr: 'Routine nuit soutien barrière.', de: 'Nächtliche Barrier-Support-Routine.', ko: '나이트 장벽 케어 루틴.', tr: 'Gece bariyer destek rutini.' },
      'JISOO cream ritual moment.': { ar: 'لحظة طقس كريم JISOO.', fr: 'Moment rituel crème JISOO.', de: 'JISOO Creme-Ritualmoment.', ko: 'JISOO 크림 리추얼 모먼트.', tr: 'JISOO krem ritüeli anı.' },
      'Eye care texture close-up.': { ar: 'لقطة قريبة لملمس عناية العين.', fr: 'Gros plan texture soin yeux.', de: 'Nahaufnahme der Augenpflege-Textur.', ko: '아이 케어 텍스처 클로즈업.', tr: 'Göz bakım dokusu yakın plan.' },
      'Morning glow routine in 12s.': { ar: 'روتين إشراق صباحي في 12 ثانية.', fr: 'Routine éclat du matin en 12 s.', de: 'Morning-Glow-Routine in 12 s.', ko: '12초 모닝 글로우 루틴.', tr: '12 saniyede sabah ışıltısı rutini.' },
      'Texture check: cloud cream.': { ar: 'فحص الملمس: كريم سحابي.', fr: 'Test texture : crème nuage.', de: 'Texturcheck: Cloud Cream.', ko: '텍스처 체크: 클라우드 크림.', tr: 'Doku kontrolü: bulut krem.' },
      'Seoul studio BTS visuals.': { ar: 'لقطات خلف الكواليس من ستوديو سيول.', fr: 'Visuels coulisses studio Séoul.', de: 'Seoul-Studio BTS-Visuals.', ko: '서울 스튜디오 비하인드 비주얼.', tr: 'Seoul stüdyo kamera arkası görselleri.' },
      'Dropper ritual transition.': { ar: 'انتقال طقس القطّارة.', fr: 'Transition rituel pipette.', de: 'Pipetten-Ritual-Transition.', ko: '드로퍼 리추얼 트랜지션.', tr: 'Damlalık ritüel geçişi.' },
      'AM SPF finish test.': { ar: 'اختبار لمسة واقي الشمس الصباحية.', fr: 'Test fini SPF matin.', de: 'AM SPF Finish-Test.', ko: '아침 SPF 피니시 테스트.', tr: 'AM SPF bitiş testi.' },
      'Before/after hydration clip.': { ar: 'مقطع ترطيب قبل/بعد.', fr: 'Clip hydratation avant/après.', de: 'Vorher/Nachher Feuchtigkeitsclip.', ko: '비포/애프터 수분 클립.', tr: 'Önce/sonra nem klibi.' },
      'Barrier-care bedtime ritual.': { ar: 'طقس نوم للعناية بالحاجز.', fr: 'Rituel coucher soin barrière.', de: 'Barrier-Care Abendritual.', ko: '장벽 케어 취침 리추얼.', tr: 'Bariyer bakımı uyku ritüeli.' },
      'Signature cream spotlight.': { ar: 'تسليط الضوء على الكريم المميز.', fr: 'Focus crème signature.', de: 'Signature-Creme im Fokus.', ko: '시그니처 크림 스포트라이트.', tr: 'İmza krem odağı.' },
      'New ritual launch highlights.': { ar: 'أبرز إطلاق الطقس الجديد.', fr: 'Temps forts lancement rituel.', de: 'Highlights zum neuen Ritual-Launch.', ko: '새 리추얼 론칭 하이라이트.', tr: 'Yeni ritüel lansman öne çıkanları.' },
      'Skincare tips from Seoul team.': { ar: 'نصائح عناية من فريق سيول.', fr: 'Conseils soin de l’équipe Séoul.', de: 'Skincare-Tipps vom Seoul-Team.', ko: '서울 팀의 스킨케어 팁.', tr: 'Seoul ekibinden cilt bakım ipuçları.' },
      'Community spotlight this week.': { ar: 'تسليط الضوء على المجتمع هذا الأسبوع.', fr: 'Communauté à l’honneur cette semaine.', de: 'Community-Spotlight dieser Woche.', ko: '이번 주 커뮤니티 스포트라이트.', tr: 'Bu haftanın topluluk odağı.' },
      'Hydration guide article.': { ar: 'مقال دليل الترطيب.', fr: 'Article guide hydratation.', de: 'Artikel zum Feuchtigkeitsguide.', ko: '수분 가이드 아티클.', tr: 'Nem rehberi yazısı.' },
      'SPF daily reminder campaign.': { ar: 'حملة تذكير يومية بالواقي.', fr: 'Campagne rappel SPF quotidien.', de: 'Tägliche SPF-Erinnerungskampagne.', ko: '데일리 SPF 리마인더 캠페인.', tr: 'Günlük SPF hatırlatma kampanyası.' },
      'Product texture deep dive.': { ar: 'تحليل معمق لملمس المنتج.', fr: 'Analyse texture produit.', de: 'Deep Dive zur Produkttextur.', ko: '제품 텍스처 딥다이브.', tr: 'Ürün dokusu derin inceleme.' },
      'Weekend routine checklist.': { ar: 'قائمة روتين نهاية الأسبوع.', fr: 'Checklist routine week-end.', de: 'Wochenend-Routine-Checkliste.', ko: '주말 루틴 체크리스트.', tr: 'Hafta sonu rutini kontrol listesi.' },
      'Editor picks for spring.': { ar: 'اختيارات المحرر للربيع.', fr: 'Choix éditoriaux printemps.', de: 'Editor Picks für den Frühling.', ko: '봄 에디터 추천.', tr: 'Bahar editör seçkileri.' },
    }
    return translations[text]?.[locale] ?? text
  }

  return (
    <section className="mx-auto w-full max-w-[1500px] px-0 pb-16 pt-16 sm:px-4 lg:px-6 lg:pt-24">
      <div className="relative overflow-hidden border border-transparent bg-transparent p-0 shadow-none sm:border-[#cfae83]/18 sm:bg-warm-ivory/62 sm:p-5 sm:shadow-[0_18px_48px_rgba(70,49,32,0.08)] lg:p-6">
        <div className="mb-4 flex justify-center gap-2 border-b border-[#cfae83]/18 pb-4">
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
                ? 'border-[#e4cfc6] bg-[linear-gradient(160deg,#f4e5dc_0%,#f8efe7_100%)] text-charcoal/70 hover:border-[#d8b0bf] hover:bg-[linear-gradient(160deg,#f4e5dc_0%,#f8e4ec_100%)] hover:text-[#b54872]'
                : tab.id === 'tiktok'
                  ? 'border-[#e4cfc6] bg-[linear-gradient(160deg,#f4e5dc_0%,#f8efe7_100%)] text-charcoal/70 hover:border-[#cfae83]/60 hover:bg-[linear-gradient(160deg,#f8efe7_0%,#ead8cf_100%)] hover:text-charcoal'
                  : 'border-[#e4cfc6] bg-[linear-gradient(160deg,#f4e5dc_0%,#f8efe7_100%)] text-charcoal/70 hover:border-[#cfae83]/55 hover:bg-[linear-gradient(160deg,#f4e5dc_0%,#ead8cf_100%)] hover:text-[#1877f2]'

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
            profileAlt={copy.profileAlt}
          >
            <div className="grid grid-cols-3 gap-[2px] md:grid-cols-4 md:gap-2">
              {INSTAGRAM_POSTS.map((post, index) => (
                <a key={index} href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="group relative block overflow-hidden bg-warm-ivory">
                  <div className="relative aspect-square">
                    <Image src={LOCAL_SOCIAL_MEDIA[index]} alt={localizedPostText(post[0])} fill sizes="(max-width: 768px) 33vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="absolute right-2 top-2 z-10 rounded-full bg-black/45 p-1.5 text-white">
                    {post[3] === 'carousel' ? <Copy className="h-3.5 w-3.5" /> : <Clapperboard className="h-3.5 w-3.5" />}
                  </div>
                  <div className="absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/10 to-transparent p-2 opacity-0 transition group-hover:opacity-100">
                    <div className="mb-1 flex items-center gap-3 text-[11px] font-medium text-white">
                      <span className="inline-flex items-center gap-1"><Heart className="h-3 w-3" />{post[1]}</span>
                      <span className="inline-flex items-center gap-1"><MessageCircle className="h-3 w-3" />{post[2]}</span>
                    </div>
                    <p className="line-clamp-2 text-[11px] leading-4 text-white/95">{localizedPostText(post[0])}</p>
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
            profileAlt={copy.profileAlt}
          >
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {TIKTOK_POSTS.map((post, index) => (
                <a key={index} href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="group relative block overflow-hidden bg-warm-ivory">
                  <div className="relative aspect-square">
                    <Image src={LOCAL_SOCIAL_MEDIA[index]} alt={localizedPostText(post[0])} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="absolute right-2 top-2 z-10 rounded-full bg-black/45 p-1.5 text-white">
                    <PlayCircle className="h-3.5 w-3.5" />
                  </div>
                  <div className="absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-black/75 via-black/10 to-transparent p-2 opacity-0 transition group-hover:opacity-100">
                    <div className="mb-1 flex items-center gap-3 text-[11px] font-medium text-white">
                      <span className="inline-flex items-center gap-1"><Heart className="h-3 w-3" />{post[1]}</span>
                      <span className="inline-flex items-center gap-1"><MessageCircle className="h-3 w-3" />{post[2]}</span>
                    </div>
                    <p className="line-clamp-2 text-[11px] leading-4 text-white/95">{localizedPostText(post[0])}</p>
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
            profileAlt={copy.profileAlt}
          >
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {FACEBOOK_POSTS.map((post, index) => (
                <a key={index} href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="group relative block overflow-hidden bg-warm-ivory">
                  <div className="relative aspect-square">
                    <Image src={LOCAL_SOCIAL_MEDIA[index]} alt={localizedPostText(post[0])} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-black/75 via-black/10 to-transparent p-2 opacity-0 transition group-hover:opacity-100">
                    <div className="mb-1 flex flex-wrap items-center gap-2 text-[11px] font-medium text-white">
                      <span className="inline-flex items-center gap-1"><Heart className="h-3 w-3" />{post[1]}</span>
                      <span className="inline-flex items-center gap-1"><MessageCircle className="h-3 w-3" />{post[2]}</span>
                      <span className="inline-flex items-center gap-1"><Share2 className="h-3 w-3" />{post[3]}</span>
                    </div>
                    <p className="line-clamp-2 text-[11px] leading-4 text-white/95">{localizedPostText(post[0])}</p>
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
  profileAlt,
  children,
}: {
  platform: SocialTab
  title: string
  handle: string
  stats: Array<{ label: string; value: string }>
  ctaLabel: string
  link: string
  viewProfileLabel: string
  profileAlt: string
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
      <div className="mb-4 flex items-start justify-between gap-4 border-b border-[#cfae83]/18 pb-4">
        <a href={link} target="_blank" rel="noopener noreferrer" className="flex min-w-0 items-center gap-3">
          <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-rose-mauve/40 ring-offset-2 ring-offset-[#f4e5dc]">
            <Image src="/assets/editorial/product-table.png" alt={profileAlt} fill sizes="56px" className="object-cover" />
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
            className="border border-[#cfae83]/18 bg-warm-ivory/72 px-2 py-2"
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
