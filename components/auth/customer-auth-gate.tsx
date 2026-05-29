'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Clock, LockKeyhole, Sparkles } from 'lucide-react'
import { useLocale } from '@/components/providers/locale-provider'
import { localizeHref } from '@/lib/i18n'

export function CustomerAuthGate({
  reason = 'dashboard',
}: {
  children: ReactNode
  reason?: 'dashboard' | 'rewards'
}) {
  const { locale } = useLocale()

  const copy = {
    eyebrow:
      locale === 'ar' ? 'منطقة الأعضاء' :
      locale === 'fr' ? 'Espace membre' :
      locale === 'de' ? 'Mitgliederbereich' :
      locale === 'ko' ? '멤버 영역' :
      locale === 'tr' ? 'Üye alanı' :
      'Member Area',
    title:
      locale === 'ar' ? 'الخادم قيد التطوير' :
      locale === 'fr' ? 'Le serveur est en développement' :
      locale === 'de' ? 'Der Server ist in Entwicklung' :
      locale === 'ko' ? '서버 개발 중' :
      locale === 'tr' ? 'Sunucu geliştirme aşamasında' :
      'Server is in development',
    body:
      reason === 'rewards'
        ? 'Rewards and member benefits are currently locked while we finish the customer account server.'
        : 'The customer dashboard is currently locked while we finish the account server, login system, orders, rewards, and customer data connection.',
    cta:
      locale === 'ar' ? 'العودة إلى المتجر' :
      locale === 'fr' ? 'Retour à la boutique' :
      locale === 'de' ? 'Zurück zum Shop' :
      locale === 'ko' ? '스토어로 돌아가기' :
      locale === 'tr' ? 'Mağazaya dön' :
      'Back to Shop',
  }

  return (
    <div className="mx-auto max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[2rem] border border-[#cfae83]/28 bg-warm-ivory/82 p-8 text-center shadow-luxury backdrop-blur-xl sm:p-10"
      >
        <motion.div
          aria-hidden="true"
          className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-rose-mauve/20 blur-3xl"
          animate={{ x: [0, 18, 0], y: [0, 12, 0], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute -bottom-28 -right-20 h-64 w-64 rounded-full bg-[#d3af84]/24 blur-3xl"
          animate={{ x: [0, -18, 0], y: [0, -10, 0], opacity: [0.28, 0.5, 0.28] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative">
          <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-rose-mauve to-[#d3af84] text-white shadow-[0_18px_44px_rgba(186,130,154,0.28)]">
            <LockKeyhole className="h-7 w-7" />
          </div>

          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#cfae83]/28 bg-white/40 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-charcoal/62">
            <Sparkles className="h-3.5 w-3.5 text-rose-mauve" />
            {copy.eyebrow}
          </p>

          <h2 className="font-serif text-3xl leading-tight text-charcoal sm:text-4xl">
            {copy.title}
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-charcoal/68">
            {copy.body}
          </p>

          <div className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full border border-[#cfae83]/24 bg-white/35 px-4 py-2 text-xs text-charcoal/58">
            <Clock className="h-4 w-4 text-rose-mauve" />
            Customer access will be enabled after backend setup.
          </div>

          <Link
            href={localizeHref('/shop', locale)}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-rose-mauve to-[#d3af84] px-7 py-3 text-sm font-medium text-white transition hover:brightness-105"
          >
            {copy.cta}
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export function signOutCustomer() {
  window.localStorage.removeItem('jisoo-customer-session')
  window.location.reload()
}
