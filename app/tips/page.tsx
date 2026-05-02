'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { useLocale } from '@/components/providers/locale-provider'
import { localizeHref, type Locale } from '@/lib/i18n'

const copy: Record<Locale, { title: string; intro: string; openGuide: string; guides: Array<{ slug: string; title: string; blurb: string; image: string }> }> = {
  en: { title: 'JISOO Ritual Journal', intro: 'Subtle Korean ritual guidance with gentle links to JISOO formulas.', openGuide: 'Read guide →', guides: [{ slug: 'skin', title: 'Skin', blurb: 'Hydration-first routines for resilient, radiant skin.', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_14_40 PM.png' }, { slug: 'face', title: 'Face', blurb: 'Daily cleansing, serum layering, and glow-preserving tips.', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_15_52 PM.png' }, { slug: 'eye', title: 'Eye', blurb: 'Gentle application and moisture-sealing eye care techniques.', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_19_23 PM.png' }, { slug: 'hair', title: 'Hair', blurb: 'Scalp hydration and lightweight nourishment for shine.', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_20_39 PM.png' }, { slug: 'beard', title: 'Beard', blurb: 'Softening and barrier-friendly beard maintenance.', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_23_22 PM.png' }, { slug: 'sun-care', title: 'Sun Care', blurb: 'Elegant sunscreen habits for cosmetic daily protection.', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_29_09 PM.png' }] },
  ar: { title: 'نصائح JISOO ودليل العناية', intro: 'إرشادات روتين كوري ناعم مع روابط لطيفة إلى تركيبات JISOO.', openGuide: 'فتح الدليل ←', guides: [{ slug: 'skin', title: 'البشرة', blurb: 'روتينات تركّز على الترطيب لبشرة مرنة ومشرقة.', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_14_40 PM.png' }, { slug: 'face', title: 'الوجه', blurb: 'تنظيف يومي مع طبقات السيروم للحفاظ على الإشراقة.', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_15_52 PM.png' }, { slug: 'eye', title: 'العين', blurb: 'تقنيات لطيفة للعناية حول العين وحبس الترطيب.', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_19_23 PM.png' }, { slug: 'hair', title: 'الشعر', blurb: 'ترطيب فروة الرأس وتغذية خفيفة للمعان.', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_20_39 PM.png' }, { slug: 'beard', title: 'اللحية', blurb: 'عناية لتنعيم اللحية ودعم حاجز البشرة.', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_23_22 PM.png' }, { slug: 'sun-care', title: 'العناية بالشمس', blurb: 'عادات واقي شمس أنيقة للحماية اليومية.', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_29_09 PM.png' }] },
  fr: { title: 'Guide Conseils & Soin JISOO', intro: 'Conseils de rituel coréen délicat avec liens vers les formules JISOO.', openGuide: 'Ouvrir le guide →', guides: [{ slug: 'skin', title: 'Peau', blurb: 'Routines axées hydratation pour une peau lumineuse et résistante.', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_14_40 PM.png' }, { slug: 'face', title: 'Visage', blurb: 'Nettoyage quotidien, superposition de sérums et éclat préservé.', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_15_52 PM.png' }, { slug: 'eye', title: 'Yeux', blurb: 'Application douce et techniques de soin contour des yeux.', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_19_23 PM.png' }, { slug: 'hair', title: 'Cheveux', blurb: 'Hydratation du cuir chevelu et nutrition légère.', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_20_39 PM.png' }, { slug: 'beard', title: 'Barbe', blurb: 'Entretien adoucissant et respectueux de la barrière cutanée.', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_23_22 PM.png' }, { slug: 'sun-care', title: 'Solaire', blurb: 'Habitudes élégantes de protection solaire au quotidien.', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_29_09 PM.png' }] },
  de: { title: 'JISOO Tipps & Pflegeguide', intro: 'Subtile koreanische Ritual-Tipps mit sanften Verweisen auf JISOO-Formeln.', openGuide: 'Guide öffnen →', guides: [{ slug: 'skin', title: 'Haut', blurb: 'Feuchtigkeitsfokussierte Routinen für widerstandsfähige, strahlende Haut.', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_14_40 PM.png' }, { slug: 'face', title: 'Gesicht', blurb: 'Tägliche Reinigung, Serum-Layering und Glow-Erhalt.', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_15_52 PM.png' }, { slug: 'eye', title: 'Augen', blurb: 'Sanfte Anwendung und feuchtigkeitsspendende Augenpflege.', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_19_23 PM.png' }, { slug: 'hair', title: 'Haar', blurb: 'Kopfhaut-Hydration und leichte Pflege für Glanz.', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_20_39 PM.png' }, { slug: 'beard', title: 'Bart', blurb: 'Pflegende, barrierefreundliche Bart-Routine.', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_23_22 PM.png' }, { slug: 'sun-care', title: 'Sonnenschutz', blurb: 'Elegante Sonnenschutz-Gewohnheiten für den Alltag.', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_29_09 PM.png' }] },
  ko: { title: 'JISOO 팁 & 케어 가이드', intro: 'JISOO 포뮬러와 함께하는 부드러운 K-뷰티 루틴 가이드.', openGuide: '가이드 열기 →', guides: [{ slug: 'skin', title: '스킨', blurb: '탄력 있고 맑은 피부를 위한 보습 중심 루틴.', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_14_40 PM.png' }, { slug: 'face', title: '페이스', blurb: '매일 클렌징, 세럼 레이어링, 광채 유지 팁.', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_15_52 PM.png' }, { slug: 'eye', title: '아이', blurb: '부드러운 사용법과 수분 잠금 아이 케어.', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_19_23 PM.png' }, { slug: 'hair', title: '헤어', blurb: '두피 보습과 가벼운 영양으로 윤기 케어.', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_20_39 PM.png' }, { slug: 'beard', title: '비어드', blurb: '부드럽고 장벽 친화적인 비어드 관리.', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_23_22 PM.png' }, { slug: 'sun-care', title: '선 케어', blurb: '데일리 자외선 차단을 위한 세련된 습관.', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_29_09 PM.png' }] },
  tr: { title: 'JISOO İpuçları ve Bakım Rehberi', intro: 'JISOO formüllerine nazik bağlantılarla sade Kore ritüel önerileri.', openGuide: 'Rehberi aç →', guides: [{ slug: 'skin', title: 'Cilt', blurb: 'Dirençli ve ışıltılı cilt için nem odaklı rutinler.', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_14_40 PM.png' }, { slug: 'face', title: 'Yüz', blurb: 'Günlük temizleme, serum katmanlama ve ışıltı koruma.', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_15_52 PM.png' }, { slug: 'eye', title: 'Göz', blurb: 'Nazik uygulama ve nemi mühürleyen göz bakım teknikleri.', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_19_23 PM.png' }, { slug: 'hair', title: 'Saç', blurb: 'Parlaklık için saç derisi nemi ve hafif besleme.', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_20_39 PM.png' }, { slug: 'beard', title: 'Sakal', blurb: 'Yumuşatma ve bariyer dostu sakal bakımı.', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_23_22 PM.png' }, { slug: 'sun-care', title: 'Güneş Bakımı', blurb: 'Günlük kozmetik koruma için zarif güneş koruyucu alışkanlıkları.', image: '/first slide example/ChatGPT Image Apr 23, 2026, 08_29_09 PM.png' }] },
}

export default function TipsPage() {
  const { locale } = useLocale()
  const t = copy[locale]

  return (
    <main className="min-h-screen bg-warm-ivory">
      <Header />
      <section className="pt-32 pb-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <h1 className="font-serif text-4xl text-charcoal lg:text-6xl">{t.title}</h1>
          <p className="mt-4 max-w-2xl text-charcoal/70">{t.intro}</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {t.guides.map((g) => (
              <Link key={g.slug} href={localizeHref(`/tips/${g.slug}`, locale)} className="group overflow-hidden rounded-3xl border border-rose-mauve/20 bg-white/80 shadow-[0_12px_26px_rgba(188,143,157,0.12)] transition-all hover:-translate-y-1 hover:border-rose-mauve/45">
                <div className="relative h-48 w-full">
                  <Image src={g.image} alt={`${g.title} guide image`} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h2 className="font-serif text-2xl text-charcoal">{g.title}</h2>
                  <p className="mt-2 text-charcoal/70">{g.blurb}</p>
                  <p className="mt-4 text-sm text-rose-mauve">{t.openGuide}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
