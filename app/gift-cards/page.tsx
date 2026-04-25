'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { useLocale } from '@/components/providers/locale-provider'
import type { Locale } from '@/lib/i18n'

const copy: Record<Locale, { title: string; digital: string; digitalBody: string; premium: string; premiumBody: string }> = {
  en: { title: 'Gift Cards & Gift Boxes', digital: 'Digital Gift Card', digitalBody: 'Choose amount, add message, schedule delivery. No payment integration yet (scaffold).', premium: 'Premium Gift Box', premiumBody: 'Curated packaging options for skincare sets with elegant add-on note.' },
  ar: { title: 'بطاقات الهدايا وصناديق الهدايا', digital: 'بطاقة هدية رقمية', digitalBody: 'اختاري المبلغ، أضيفي رسالة، وحددي موعد الإرسال. لا يوجد ربط دفع بعد (نسخة أولية).', premium: 'صندوق هدايا فاخر', premiumBody: 'خيارات تغليف منسّقة لمجموعات العناية بالبشرة مع بطاقة ملاحظة أنيقة.' },
  fr: { title: 'Cartes Cadeaux & Coffrets', digital: 'Carte Cadeau Numérique', digitalBody: 'Choisissez le montant, ajoutez un message et planifiez l’envoi. Intégration de paiement non finalisée (scaffold).', premium: 'Coffret Cadeau Premium', premiumBody: 'Options d’emballage soignées pour sets skincare avec note élégante.' },
  de: { title: 'Geschenkkarten & Geschenkboxen', digital: 'Digitale Geschenkkarte', digitalBody: 'Betrag wählen, Nachricht hinzufügen, Lieferung planen. Noch keine Zahlungsintegration (Scaffold).', premium: 'Premium Geschenkbox', premiumBody: 'Kuratiertes Packaging für Skincare-Sets mit eleganter Grußnotiz.' },
  ko: { title: '기프트 카드 & 기프트 박스', digital: '디지털 기프트 카드', digitalBody: '금액 선택, 메시지 추가, 발송 예약이 가능합니다. 결제 연동은 아직 준비 중입니다(스캐폴드).', premium: '프리미엄 기프트 박스', premiumBody: '스킨케어 세트를 위한 큐레이션 패키징과 고급 메모 옵션을 제공합니다.' },
  tr: { title: 'Hediye Kartları ve Hediye Kutuları', digital: 'Dijital Hediye Kartı', digitalBody: 'Tutarı seçin, mesaj ekleyin, teslimatı planlayın. Ödeme entegrasyonu henüz hazır değil (iskelet).', premium: 'Premium Hediye Kutusu', premiumBody: 'Cilt bakım setleri için zarif not seçeneğiyle hazırlanmış paketleme seçenekleri.' },
}

export default function GiftCardsPage() {
  const { locale } = useLocale()
  const t = copy[locale]
  return <main className='min-h-screen bg-warm-ivory'><Header /><section className='pt-36 pb-16 px-4 max-w-5xl mx-auto'><h1 className='font-serif text-5xl'>{t.title}</h1><div className='mt-8 grid md:grid-cols-2 gap-6'><div className='rounded-2xl border border-rose-mauve/25 bg-white/80 p-6'><h2 className='font-serif text-2xl'>{t.digital}</h2><p className='mt-2 text-charcoal/70'>{t.digitalBody}</p></div><div className='rounded-2xl border border-rose-mauve/25 bg-white/80 p-6'><h2 className='font-serif text-2xl'>{t.premium}</h2><p className='mt-2 text-charcoal/70'>{t.premiumBody}</p></div></div></section><Footer /></main>
}
