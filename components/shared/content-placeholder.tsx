'use client'

import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { useLocale } from '@/components/providers/locale-provider'
import { localizeHref } from '@/lib/i18n'

interface PlaceholderAction {
  label: string
  href: string
}

export function ContentPlaceholder({
  title,
  description,
  actions,
}: {
  title: string
  description: string
  actions?: PlaceholderAction[]
}) {
  const { locale } = useLocale()

  return (
    <main className="min-h-screen bg-warm-ivory">
      <Header />
      <section className="pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="max-w-3xl mx-auto px-4 lg:px-6 text-center">
          <p className="text-xs uppercase tracking-[0.26em] text-rose-mauve mb-4">JISOO Experience</p>
          <h1 className="font-serif text-4xl lg:text-5xl text-charcoal mb-5">{title}</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">{description}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {actions?.map(action => (
              <Button key={action.href} asChild className="rounded-full px-6">
                <Link href={localizeHref(action.href, locale)}>{action.label}</Link>
              </Button>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
