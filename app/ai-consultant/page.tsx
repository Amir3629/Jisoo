'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Bot, Mic, MicOff, RotateCcw, Send, Sparkles, Volume2, VolumeX, Waves, Radio } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRegion } from '@/components/providers/region-provider'
import { useLocale } from '@/components/providers/locale-provider'
import { localizeHref } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { useConciergeController } from '@/components/ai/use-concierge-controller'
import { Header } from '@/components/layout/header'
import { HeroSection } from '@/components/home/hero-section'

const actionAccent: Record<string, string> = {
  product: 'border-plum/25 bg-plum/5',
  policy: 'border-rose-mauve/25 bg-rose-mauve/5',
  support: 'border-champagne-gold/40 bg-champagne-gold/10',
  navigation: 'border-border bg-white',
}

export default function AIConsultantPage() {
  const { locale } = useLocale()
  const { region } = useRegion()
  const scrollRef = useRef<HTMLDivElement>(null)

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
    <main className="min-h-screen bg-background">
      <Header transparentOnTop lightOnTop />
      <HeroSection forcedConceptId="design-11-video-signature" showConceptPicker={false} />
      <div className="pt-8 pb-10 px-4">
      <div className="max-w-5xl mx-auto rounded-3xl border border-rose-mauve/20 bg-card overflow-hidden shadow-editorial">
        <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-plum to-rose-mauve text-white">
          <div className="flex items-center gap-3">
            <div className={cn('h-10 w-10 rounded-full bg-white/20 grid place-items-center', speaking && 'animate-pulse')}>
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h1 className="font-serif text-lg">JISOO Beauty Concierge</h1>
              <p className="text-xs text-white/80">{region} · JISOO-only knowledge</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" onClick={() => setVoiceModeType(voiceModeType === 'browser' ? 'realtime' : voiceModeType === 'realtime' ? 'provider' : 'browser')}>
              {voiceModeType}
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" onClick={() => setVoiceEnabled(prev => !prev)}>
              {voiceEnabled ? <Volume2 className="h-4 w-4 mr-2" /> : <VolumeX className="h-4 w-4 mr-2" />} Voice
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" onClick={reset}>
              <RotateCcw className="h-4 w-4 mr-2" />Reset
            </Button>
          </div>
        </div>

        <div className="px-4 py-2 border-b text-[11px] text-muted-foreground flex items-center gap-2">
          {listening ? <Radio className="h-3.5 w-3.5 text-rose-mauve animate-pulse" /> : speaking ? <Waves className="h-3.5 w-3.5 text-plum" /> : <Bot className="h-3.5 w-3.5" />}
          <span>{listening ? 'Listening…' : speaking ? 'Speaking…' : 'Ready for your question'}</span>
        </div>

        <div ref={scrollRef} className="p-4 space-y-4 max-h-[62vh] overflow-auto">
          {partialTranscript && (
            <div className="rounded-xl border border-dashed border-rose-mauve/25 bg-rose-mauve/5 px-3 py-2 text-xs text-muted-foreground">
              Live transcript: {partialTranscript}
            </div>
          )}
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : ''}`}>
              <div className={`rounded-2xl px-4 py-3 text-sm max-w-[88%] ${message.role === 'user' ? 'bg-charcoal text-white' : 'bg-muted border border-rose-mauve/15'}`}>
                <p>{message.content}</p>

                {message.actions && message.actions.length > 0 && (
                  <div className="mt-3 grid sm:grid-cols-2 gap-2">
                    {message.actions.map((action) => (
                      <Link key={action.id} href={localizeHref(action.href, locale)} className={cn('rounded-xl border p-2 block', actionAccent[action.type])}>
                        <p className="font-medium text-xs">{action.title}</p>
                        <p className="text-xs text-muted-foreground">{action.description}</p>
                      </Link>
                    ))}
                  </div>
                )}

                {message.suggestions && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {message.suggestions.map((suggestion) => (
                      <button key={suggestion} onClick={() => send(suggestion)} className="text-xs px-2 py-1 rounded-full border hover:bg-secondary">
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && <p className="text-xs text-muted-foreground">Concierge is preparing your recommendation...</p>}
        </div>

        <div className="border-t p-3 flex gap-2">
          <Button type="button" variant="outline" size="icon" disabled={!voiceSupported} className={listening ? 'bg-rose-mauve text-white' : ''} onClick={toggleListening}>
            {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') send()
            }}
            placeholder="Ask about products, ingredients, routines, policies, or order support"
            className="flex-1 rounded-full border px-4 py-2 bg-background"
          />
          <Button onClick={() => send()} className="rounded-full"><Send className="h-4 w-4" /></Button>
        </div>

        <div className="px-3 pb-3 text-[11px] text-muted-foreground">
          This concierge is limited to JISOO support and beauty topics. Realtime mode is scaffolded and falls back to browser voice when unavailable.
        </div>
      </div>
      </div>
    </main>
  )
}
