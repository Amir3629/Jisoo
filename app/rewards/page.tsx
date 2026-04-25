'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import { useLocale } from '@/components/providers/locale-provider'
import { localizeHref, type Locale } from '@/lib/i18n'

const copy: Record<Locale, { title: string; bodyOne: string; bodyTwo: string; cta: string }> = {
  en: { title: 'JISOO Rewards', bodyOne: 'Registered members earn points on every order and can track rewards history.', bodyTwo: 'Guest checkout is supported. Create an account after checkout to start saving future points.', cta: 'Go to account →' },
  ar: { title: 'مكافآت JISOO', bodyOne: 'الأعضاء المسجّلون يكسبون نقاطًا مع كل طلب ويمكنهم تتبع سجل المكافآت.', bodyTwo: 'يدعم الطلب كضيف. أنشئي حسابًا بعد الدفع لبدء تجميع النقاط للطلبات القادمة.', cta: 'الانتقال إلى الحساب ←' },
  fr: { title: 'Récompenses JISOO', bodyOne: 'Les membres inscrits gagnent des points à chaque commande et peuvent suivre leur historique.', bodyTwo: 'La commande en invité est disponible. Créez un compte après paiement pour cumuler des points.', cta: 'Aller au compte →' },
  de: { title: 'JISOO Prämien', bodyOne: 'Registrierte Mitglieder sammeln bei jeder Bestellung Punkte und können den Verlauf verfolgen.', bodyTwo: 'Gast-Checkout ist verfügbar. Erstelle nach dem Checkout ein Konto, um künftig Punkte zu sammeln.', cta: 'Zum Konto →' },
  ko: { title: 'JISOO 리워드', bodyOne: '회원은 모든 주문에서 포인트를 적립하고 리워드 내역을 확인할 수 있습니다.', bodyTwo: '비회원 주문도 가능합니다. 결제 후 계정을 만들어 다음 주문부터 포인트를 적립하세요.', cta: '계정으로 이동 →' },
  tr: { title: 'JISOO Ödülleri', bodyOne: 'Kayıtlı üyeler her siparişte puan kazanır ve ödül geçmişini takip edebilir.', bodyTwo: 'Misafir ödeme desteklenir. Gelecek siparişlerde puan biriktirmek için ödeme sonrası hesap oluşturun.', cta: 'Hesaba git →' },
}

export default function RewardsPage() {
  const { locale } = useLocale()
  const t = copy[locale]
  return <main className='min-h-screen bg-warm-ivory'><Header /><section className='pt-36 pb-16 px-4 max-w-4xl mx-auto'><h1 className='font-serif text-5xl'>{t.title}</h1><div className='mt-8 space-y-4'><div className='rounded-xl border border-rose-mauve/20 bg-white/80 p-5'>{t.bodyOne}</div><div className='rounded-xl border border-rose-mauve/20 bg-white/80 p-5'>{t.bodyTwo}</div></div><Link href={localizeHref('/account', locale)} className='mt-6 inline-block text-rose-mauve'>{t.cta}</Link></section><Footer /></main>
}
