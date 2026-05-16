'use client'

import { useEffect, useMemo, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Bot,
  FileText,
  LockKeyhole,
  Mic,
  MicOff,
  PackageSearch,
  Radio,
  RotateCcw,
  Send,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Volume2,
  VolumeX,
  Waves,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRegion } from '@/components/providers/region-provider'
import { useLocale } from '@/components/providers/locale-provider'
import { localizeHref } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { products } from '@/lib/data'
import { resolveImageSrc } from '@/lib/image-fallbacks'
import { useConciergeController } from '@/components/ai/use-concierge-controller'
import { Header } from '@/components/layout/header'
import { HeroSection } from '@/components/home/hero-section'

const actionAccent: Record<string, string> = {
  product: 'border-plum/25 bg-plum/5 hover:bg-plum/10',
  policy: 'border-rose-mauve/25 bg-rose-mauve/5 hover:bg-rose-mauve/10',
  support: 'border-champagne-gold/40 bg-champagne-gold/10 hover:bg-champagne-gold/20',
  navigation: 'border-border bg-white/55 hover:bg-white/80',
}

const policyCards = [
  { href: '/help/shipping', title: 'Shipping & returns', body: 'Delivery timing, return windows, regional availability.', icon: PackageSearch },
  { href: '/legal/privacy', title: 'Privacy & data', body: 'How JISOO handles account, order, and concierge data.', icon: LockKeyhole },
  { href: '/legal/terms', title: 'Terms & policies', body: 'Store rules, payment, support, and safe-use guidance.', icon: FileText },
]

export default function AIConsultantPage() {
  const { locale } = useLocale()
  const { region } = useRegion()
  const scrollRef = useRef<HTMLDivElement>(null)
  const featuredRecommendations = useMemo(() => products.slice(0, 3), [])

  const {
    messages,
    input,
    setInput,
    send,
    loading,
    listening,
    speaking,
    partialTranscript,
    voiceEnabled,
    setVoiceEnabled,
    toggleListening,
    reset,
    voiceModeType,
    setVoiceModeType,
    voiceSupported,
  } = useConciergeController({ locale, region })

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  return (
    <main className="snap-page-flow min-h-screen bg-background">
      <Header transparentOnTop lightOnTop />
      <HeroSection forcedConceptId="design-11-video-signature" showConceptPicker={false} />

      <section className="relative isolate min-h-[130vh] overflow-hidden px-4 py-28 lg:py-36">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[-10rem] top-24 h-96 w-96 rounded-full bg-rose-mauve/18 blur-3xl" />
          <div className="absolute right-[-12rem] top-[34rem] h-[32rem] w-[32rem] rounded-full bg-champagne-gold/16 blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-warm-ivory/70 to-transparent" />
        </div>

        <div className="mx-auto mb-10 max-w-4xl text-center">
          <p className="text-kicker text-charcoal/56">JISOO AI</p>
          <h1 className="mt-3 text-4xl leading-tight text-charcoal lg:text-6xl">A private concierge for JISOO care.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-charcoal/66">
            Ask about routines, ingredients, product pairing, region availability, shipping, returns, or order support. The concierge stays inside JISOO catalog and policy information.
          </p>
        </div>

        <div className="mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
          <div className="overflow-hidden rounded-[2rem] border border-[#cfae83]/28 bg-[linear-gradient(155deg,color-mix(in_srgb,var(--card)_92%,white)_0%,color-mix(in_srgb,var(--background)_88%,white)_100%)] shadow-[0_28px_90px_rgba(70,49,32,0.14),inset_0_1px_0_rgba(255,255,255,0.48)] lg:rounded-[2.75rem]">
            <div className="flex flex-col gap-4 border-b border-[#cfae83]/22 bg-[linear-gradient(135deg,rgba(44,37,40,0.94),rgba(158,123,138,0.86))] p-5 text-white sm:flex-row sm:items-center sm:justify-between lg:p-6">
              <div className="flex items-center gap-4">
                <div className={cn('grid h-12 w-12 place-items-center rounded-2xl bg-white/16 ring-1 ring-white/20', speaking && 'animate-pulse')}>
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-2xl leading-none">Beauty Concierge Chat</h2>
                  <p className="mt-1 text-xs text-white/72">{region} · JISOO catalog, policy, order, and routine guidance only</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="ghost" size="sm" className="rounded-full text-white hover:bg-white/16" onClick={() => setVoiceModeType(voiceModeType === 'browser' ? 'realtime' : voiceModeType === 'realtime' ? 'provider' : 'browser')}>
                  {voiceModeType}
                </Button>
                <Button variant="ghost" size="sm" className="rounded-full text-white hover:bg-white/16" onClick={() => setVoiceEnabled(prev => !prev)}>
                  {voiceEnabled ? <Volume2 className="mr-2 h-4 w-4" /> : <VolumeX className="mr-2 h-4 w-4" />} Voice
                </Button>
                <Button variant="ghost" size="sm" className="rounded-full text-white hover:bg-white/16" onClick={reset}>
                  <RotateCcw className="mr-2 h-4 w-4" /> Reset
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#cfae83]/18 px-5 py-3 text-xs text-charcoal/60 lg:px-6">
              <span className="inline-flex items-center gap-2">
                {listening ? <Radio className="h-3.5 w-3.5 animate-pulse text-rose-mauve" /> : speaking ? <Waves className="h-3.5 w-3.5 text-plum" /> : <Bot className="h-3.5 w-3.5" />}
                {listening ? 'Listening…' : speaking ? 'Speaking…' : 'Ready with JISOO website guidance'}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#cfae83]/24 bg-white/35 px-3 py-1 text-[11px] text-charcoal/64">
                <ShieldCheck className="h-3.5 w-3.5 text-rose-mauve" /> No outside-brand recommendations
              </span>
            </div>

            <div ref={scrollRef} className="h-[68vh] min-h-[620px] space-y-5 overflow-auto p-5 scroll-smooth lg:h-[78vh] lg:min-h-[760px] lg:p-7">
              {partialTranscript && (
                <div className="rounded-2xl border border-dashed border-rose-mauve/28 bg-rose-mauve/7 px-4 py-3 text-xs text-charcoal/62">
                  Live transcript: {partialTranscript}
                </div>
              )}

              {messages.map((message) => (
                <div key={message.id} className={cn('flex gap-3', message.role === 'user' ? 'justify-end' : 'justify-start')}>
                  {message.role !== 'user' && <div className="mt-1 hidden h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-rose-mauve to-[#d3af84] text-white sm:grid"><Sparkles className="h-4 w-4" /></div>}
                  <div className={cn(
                    'max-w-[92%] rounded-[1.35rem] px-4 py-3 text-sm leading-6 shadow-[0_12px_34px_rgba(70,49,32,0.06)] sm:max-w-[78%]',
                    message.role === 'user'
                      ? 'rounded-br-md bg-charcoal text-white'
                      : 'rounded-bl-md border border-[#cfae83]/18 bg-white/58 text-charcoal backdrop-blur'
                  )}>
                    <p>{message.content}</p>

                    {message.actions && message.actions.length > 0 && (
                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        {message.actions.map((action) => (
                          <Link key={action.id} href={localizeHref(action.href, locale)} className={cn('block rounded-2xl border p-3 transition hover:-translate-y-0.5', actionAccent[action.type])}>
                            <p className="text-xs font-semibold text-charcoal">{action.title}</p>
                            <p className="mt-1 text-xs leading-5 text-charcoal/58">{action.description}</p>
                          </Link>
                        ))}
                      </div>
                    )}

                    {message.suggestions && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion) => (
                          <button key={suggestion} onClick={() => send(suggestion)} className="rounded-full border border-[#cfae83]/28 bg-warm-ivory/60 px-3 py-1.5 text-xs text-charcoal/75 transition hover:bg-white/70">
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <div className="ml-0 rounded-[1.5rem] border border-[#cfae83]/22 bg-warm-ivory/42 p-4 sm:ml-12">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/52">Smooth recommendations</p>
                  <ShoppingBag className="h-4 w-4 text-rose-mauve" />
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {featuredRecommendations.map(product => (
                    <Link key={product.id} href={localizeHref(`/product/${product.slug}`, locale)} className="group overflow-hidden rounded-2xl border border-[#cfae83]/18 bg-white/45 transition hover:-translate-y-1 hover:bg-white/70">
                      <div className="relative aspect-[4/3] overflow-hidden bg-warm-ivory">
                        <Image src={resolveImageSrc(product.images?.[0]?.src)} alt={product.name} fill sizes="(max-width: 768px) 80vw, 220px" className="object-cover transition duration-500 group-hover:scale-105" />
                      </div>
                      <div className="p-3">
                        <p className="line-clamp-1 text-sm font-medium text-charcoal">{product.name}</p>
                        <p className="mt-1 text-xs text-charcoal/55">Ask why it fits your routine</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {loading && <p className="pl-2 text-xs text-charcoal/56">Concierge is preparing JISOO guidance for you...</p>}
            </div>

            <div className="border-t border-[#cfae83]/18 bg-card/72 p-3 backdrop-blur lg:p-4">
              <div className="flex gap-2">
                <Button type="button" variant="outline" size="icon" disabled={!voiceSupported} className={cn('rounded-full border-[#cfae83]/30 bg-white/50', listening && 'bg-rose-mauve text-white')} onClick={toggleListening}>
                  {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') send()
                  }}
                  placeholder="Ask about JISOO products, policy, orders, ingredients, or region availability"
                  className="min-h-12 flex-1 rounded-full border border-[#cfae83]/30 bg-background px-5 text-sm outline-none transition focus:border-rose-mauve"
                />
                <Button onClick={() => send()} className="min-h-12 rounded-full bg-gradient-to-r from-rose-mauve to-[#d3af84] px-5 text-white"><Send className="h-4 w-4" /></Button>
              </div>
              <p className="mt-3 px-2 text-[11px] leading-5 text-charcoal/52">
                Guidance is informational, limited to JISOO website/catalog/policy data, and does not replace professional medical advice.
              </p>
            </div>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-28">
            <div className="rounded-[2rem] border border-[#cfae83]/24 bg-white/36 p-5 shadow-[0_18px_54px_rgba(70,49,32,0.08)] backdrop-blur-xl">
              <div className="mb-4 inline-flex rounded-full bg-charcoal px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white">Website bounded</div>
              <h2 className="text-2xl leading-tight text-charcoal">Answers stay inside JISOO.</h2>
              <p className="mt-3 text-sm leading-7 text-charcoal/62">
                The concierge can recommend JISOO products, explain JISOO routines, and open JISOO policy cards—without sending shoppers to another brand.
              </p>
            </div>

            <div className="grid gap-3">
              {policyCards.map(card => {
                const Icon = card.icon
                return (
                  <Link key={card.href} href={localizeHref(card.href, locale)} className="group rounded-3xl border border-[#cfae83]/22 bg-card/68 p-4 transition hover:-translate-y-1 hover:bg-white/55 hover:shadow-luxury">
                    <div className="mb-3 grid h-10 w-10 place-items-center rounded-2xl bg-rose-mauve/12 text-rose-mauve transition group-hover:bg-rose-mauve group-hover:text-white">
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="font-medium text-charcoal">{card.title}</p>
                    <p className="mt-1 text-xs leading-5 text-charcoal/58">{card.body}</p>
                  </Link>
                )
              })}
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
