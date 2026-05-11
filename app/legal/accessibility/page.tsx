'use client'

import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { useLocale } from '@/components/providers/locale-provider'
import { localizeHref } from '@/lib/i18n'
import { getLegalDocument } from '@/lib/legal-content'

export default function AccessibilityPage() {
  const { locale } = useLocale()
  const { document, ui } = getLegalDocument('accessibility', locale)

  return (
    <main className="min-h-screen bg-warm-ivory text-charcoal">
      <Header />
      <section className="pt-32 pb-20 lg:pt-40">
        <div className="mx-auto max-w-5xl px-4 lg:px-6">
          <p className="text-kicker text-rose-mauve">{document.eyebrow}</p>
          <h1 className="mt-4 font-serif text-4xl text-charcoal lg:text-6xl">{document.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-charcoal/72">{document.summary}</p>
          <div className="mt-8 rounded-3xl border border-[#cfae83]/24 bg-[var(--card)] p-5 shadow-editorial">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-charcoal/54">{ui.updated}</p>
            <p className="mt-1 font-medium">{document.updated}</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-charcoal/54">{ui.region}</p>
            <p className="mt-1 leading-7 text-charcoal/72">{document.regionNotice}</p>
          </div>
          <div className="mt-10 space-y-5">
            {document.sections.map((section) => (
              <article key={section.title} className="rounded-3xl border border-[#cfae83]/22 bg-white/24 p-6 shadow-[0_16px_36px_rgba(44,37,40,0.07)] backdrop-blur-xl">
                <h2 className="font-serif text-2xl text-charcoal">{section.title}</h2>
                <div className="mt-4 space-y-3">
                  {section.body.map((paragraph) => <p key={paragraph} className="leading-7 text-charcoal/72">{paragraph}</p>)}
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={localizeHref('/', locale)} className="rounded-full border border-[#cfae83]/30 bg-white/26 px-5 py-3 text-sm font-medium text-charcoal transition hover:bg-white/45">{ui.home}</Link>
            <Link href={localizeHref('/help/contact', locale)} className="rounded-full bg-gradient-to-r from-rose-mauve to-[#d3af84] px-5 py-3 text-sm font-medium text-white transition hover:brightness-105">{ui.contact}</Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
