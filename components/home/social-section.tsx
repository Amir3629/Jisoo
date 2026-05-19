'use client'

import Link from 'next/link'
import { Instagram, Play, Heart, MessageCircle, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EditorialMedia } from '@/components/ui/editorial-media'
import { ChapterHeading } from '@/components/ui/chapter-heading'
import { AtmosphereSection } from '@/components/ui/atmosphere-section'
import { useLocale } from '@/components/providers/locale-provider'

const socialPosts = [
  {
    id: 1,
    type: 'instagram',
    image: '/assets/editorial/rose-layering.png',
    likes: '12.4K',
    comments: '234',
    caption: 'Editorial care moodboard',
  },
  {
    id: 2,
    type: 'tiktok',
    image: '/assets/editorial/cream-ritual.png',
    views: '2.1M',
    caption: 'Care routine planning',
  },
  {
    id: 3,
    type: 'instagram',
    image: '/assets/editorial/sun-care.png',
    likes: '8.9K',
    comments: '156',
    caption: 'Verified results framework',
  },
  {
    id: 4,
    type: 'instagram',
    image: '/assets/editorial/product-table.png',
    likes: '15.2K',
    comments: '342',
    caption: 'Packaging direction study',
  },
  {
    id: 5,
    type: 'tiktok',
    image: '/assets/editorial/serum-dropper.png',
    views: '890K',
    caption: 'Supplier review workflow',
  },
  {
    id: 6,
    type: 'instagram',
    image: '/assets/editorial/soft-cheek-glow.png',
    likes: '11.1K',
    comments: '198',
    caption: 'Care texture reference',
  },
]

export function SocialSection() {
  const { locale, dictionary } = useLocale()
  const t = dictionary.home
  const socialDescription = locale === 'ar'
    ? 'تابعي استوديو عناية JISOO لملاحظات التوريد واتجاهات التغليف وتحديثات المنتجات الموثقة.'
    : locale === 'fr'
      ? 'Suivez le studio de soin JISOO pour les notes de sourcing, les orientations packaging et les mises à jour produits vérifiées.'
      : locale === 'de'
        ? 'Folge dem JISOO Care Studio für Sourcing-Notizen, Packaging-Richtung und verifizierte Produktupdates.'
        : locale === 'ko'
          ? '소싱 노트, 패키징 방향, 검증된 제품 업데이트를 JISOO 케어 스튜디오에서 확인하세요.'
          : locale === 'tr'
            ? 'Tedarik notları, ambalaj yönü ve doğrulanmış ürün güncellemeleri için JISOO bakım stüdyosunu takip edin.'
            : 'Follow the JISOO care studio for sourcing notes, packaging direction, and verified product updates.'
  const viewsLabel = locale === 'ar' ? 'مشاهدة' : locale === 'fr' ? 'vues' : locale === 'de' ? 'Aufrufe' : locale === 'ko' ? '조회' : locale === 'tr' ? 'görüntüleme' : 'views'
  const ugcCopy = locale === 'ar' ? 'اذكري' : locale === 'fr' ? 'Mentionnez' : locale === 'de' ? 'Markiere' : locale === 'ko' ? '태그하고' : locale === 'tr' ? 'Etiketleyin' : 'Tag'
  const ugcAndUse = locale === 'ar' ? 'واستخدمي' : locale === 'fr' ? 'et utilisez' : locale === 'de' ? 'und nutze' : locale === 'ko' ? '사용해 소개될 기회를 얻으세요' : locale === 'tr' ? 've kullanın' : 'and use'
  const ugcFeatured = locale === 'ar' ? 'ليتم عرضك!' : locale === 'fr' ? 'pour être mis en avant !' : locale === 'de' ? 'um vorgestellt zu werden!' : locale === 'ko' ? '' : locale === 'tr' ? 'öne çıkmak için!' : 'to be featured!'
  const localizedCaption = (caption: string) => {
    const translations: Record<string, Partial<Record<typeof locale, string>>> = {
      'Editorial care moodboard': { ar: 'لوحة مزاجية للعناية التحريرية', fr: 'Moodboard soin éditorial', de: 'Editoriales Pflege-Moodboard', ko: '에디토리얼 케어 무드보드', tr: 'Editoryal bakım panosu' },
      'Care routine planning': { ar: 'تخطيط روتين العناية', fr: 'Planification de routine soin', de: 'Planung der Pflegeroutine', ko: '케어 루틴 플래닝', tr: 'Bakım rutini planlama' },
      'Verified results framework': { ar: 'إطار النتائج الموثقة', fr: 'Cadre de résultats vérifiés', de: 'Rahmen für verifizierte Ergebnisse', ko: '검증 결과 프레임워크', tr: 'Doğrulanmış sonuç çerçevesi' },
      'Packaging direction study': { ar: 'دراسة اتجاه التغليف', fr: 'Étude direction packaging', de: 'Studie zur Packaging-Richtung', ko: '패키징 방향 연구', tr: 'Ambalaj yönü çalışması' },
      'Supplier review workflow': { ar: 'سير مراجعة الموردين', fr: 'Flux de revue fournisseur', de: 'Workflow zur Lieferantenprüfung', ko: '공급사 검토 워크플로', tr: 'Tedarikçi inceleme akışı' },
      'Care texture reference': { ar: 'مرجع ملمس العناية', fr: 'Référence texture soin', de: 'Referenz für Pflegetextur', ko: '케어 텍스처 레퍼런스', tr: 'Bakım dokusu referansı' },
    }
    return translations[caption]?.[locale] ?? caption
  }
  return (
    <AtmosphereSection atmosphere="blush" className="pb-10 pt-32 lg:pb-12 lg:pt-44" data-snap-target="community">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <ChapterHeading
          kicker="@JISOOBeauty"
          title={t.joinCommunity}
          description={socialDescription}
          align="center"
          className="mb-12 lg:mb-16 max-w-4xl mx-auto"
        />

        {/* Social Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
          {socialPosts.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
            >
              <EditorialMedia
                src={post.image}
                alt={localizedCaption(post.caption)}
                className="absolute inset-0"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                overlayClassName="bg-gradient-to-t from-charcoal/60 to-charcoal/10"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/60 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-white p-4">
                  {post.type === 'instagram' ? (
                    <div className="flex items-center justify-center gap-4">
                      <div className="flex items-center gap-1">
                        <Heart className="w-5 h-5" />
                        <span className="text-sm">{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm">{post.comments}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Play className="w-5 h-5" />
                      <span className="text-sm">{post.views} {viewsLabel}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Type Badge */}
              <div className="absolute top-2 right-2">
                {post.type === 'tiktok' && (
                  <div className="w-8 h-8 rounded-full bg-charcoal flex items-center justify-center">
                    <Play className="w-4 h-4 text-white fill-white" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-full',
              'bg-gradient-to-r from-rose-mauve to-[#d3af84] text-white font-medium',
              'hover:brightness-105 transition-all'
            )}
          >
            <Instagram className="w-5 h-5" />
            <span>{t.followInstagram}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-full',
              'bg-gradient-to-r from-[#cfac7f] to-[#d9bd97] text-white font-medium shadow-luxury',
              'hover:brightness-105 transition-colors'
            )}
          >
            <Play className="w-5 h-5" />
            <span>{t.followTiktok}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* UGC CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            {ugcCopy} <strong className="text-plum">@JISOOBeauty</strong> {ugcAndUse}{' '}
            <strong className="text-plum">#JISOOGlow</strong> {ugcFeatured}
          </p>
        </div>
      </div>
    </AtmosphereSection>
  )
}
