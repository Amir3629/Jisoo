'use client'

import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, Mic, MicOff, Send, Sparkles, Volume2, VolumeX, X, Waves, Radio } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useLocale } from '@/components/providers/locale-provider'
import { useRegion } from '@/components/providers/region-provider'
import { localizeHref } from '@/lib/i18n'
import { useConciergeController } from '@/components/ai/use-concierge-controller'
import { useEffect, useRef, useState } from 'react'

const actionAccent: Record<string, string> = {
  product: 'border-rose-mauve/25 bg-rose-mauve/10',
  policy: 'border-rose-mauve/25 bg-rose-mauve/5',
  support: 'border-champagne-gold/40 bg-champagne-gold/10',
  navigation: 'border-border bg-white',
}

export function BeautyConciergePanel() {
  const { locale } = useLocale()
  const { region } = useRegion()
  const [open, setOpen] = useState(false)
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
    voiceModeType,
    setVoiceModeType,
    voiceSupported,
  } = useConciergeController({ locale, region })
  const copy = {
    statusListening: locale === 'ar' ? 'جارٍ الاستماع...' : locale === 'fr' ? 'Écoute...' : locale === 'de' ? 'Hört zu...' : locale === 'ko' ? '듣는 중...' : locale === 'tr' ? 'Dinleniyor...' : 'Listening...',
    statusSpeaking: locale === 'ar' ? 'يتحدث...' : locale === 'fr' ? 'Parle...' : locale === 'de' ? 'Spricht...' : locale === 'ko' ? '말하는 중...' : locale === 'tr' ? 'Konuşuyor...' : 'Speaking...',
    statusReady: locale === 'ar' ? 'جاهز' : locale === 'fr' ? 'Prêt' : locale === 'de' ? 'Bereit' : locale === 'ko' ? '준비됨' : locale === 'tr' ? 'Hazır' : 'Ready',
    voice: locale === 'ar' ? 'صوت' : locale === 'fr' ? 'Voix' : locale === 'de' ? 'Sprache' : locale === 'ko' ? '음성' : locale === 'tr' ? 'Ses' : 'Voice',
    transcript: locale === 'ar' ? 'النص المباشر:' : locale === 'fr' ? 'Transcription en direct :' : locale === 'de' ? 'Live-Transkript:' : locale === 'ko' ? '실시간 전사:' : locale === 'tr' ? 'Canlı döküm:' : 'Live transcript:',
    loading: locale === 'ar' ? 'جاري إعداد التوصية...' : locale === 'fr' ? 'Le concierge prépare votre recommandation…' : locale === 'de' ? 'Concierge bereitet deine Empfehlung vor…' : locale === 'ko' ? '추천을 준비하고 있습니다…' : locale === 'tr' ? 'Öneriniz hazırlanıyor…' : 'Concierge is preparing your recommendation...',
    placeholder: locale === 'ar' ? 'اسألي عن المنتجات أو الروتين أو المكونات أو الشحن أو الإرجاع أو دعم الطلب' : locale === 'fr' ? 'Demandez produits, routine, ingrédients, livraison, retours ou suivi de commande' : locale === 'de' ? 'Frage zu Produkten, Routine, Inhaltsstoffen, Versand, Rückgabe oder Bestellung' : locale === 'ko' ? '제품/루틴/성분/배송/반품/주문 문의를 입력하세요' : locale === 'tr' ? 'Ürünler, rutinler, içerikler, kargo, iade veya sipariş desteği sorun' : 'Ask about products, routines, ingredients, shipping, returns, or order support',
    openAria: locale === 'ar' ? 'فتح مستشار JISOO' : locale === 'fr' ? 'Ouvrir le Concierge JISOO' : locale === 'de' ? 'JISOO Concierge öffnen' : locale === 'ko' ? 'JISOO 컨시어지 열기' : locale === 'tr' ? 'JISOO Danışmanı aç' : 'Open JISOO Beauty Concierge',
  }

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {open && (
          <motion.section
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 w-[94vw] max-w-[420px] overflow-hidden rounded-3xl border border-rose-mauve/20 bg-white/95 shadow-[0_24px_54px_rgba(198,153,166,0.24)] backdrop-blur-xl"
          >
            <header className="flex items-center justify-between border-b border-rose-mauve/15 bg-gradient-to-r from-[#f9e8ef] via-[#f7edf3] to-[#f4e8de] px-4 py-3 text-charcoal">
              <div className="flex items-center gap-2">
                <div className={cn('grid h-9 w-9 place-items-center rounded-full bg-white/20', speaking && 'animate-pulse')}>
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-serif text-sm">JISOO Beauty Concierge</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-charcoal/60">{region} · Domain-Locked</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-charcoal hover:bg-white/50" onClick={() => setOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </header>

            <div className="flex items-center justify-between border-b border-rose-mauve/10 px-3 py-2 text-[11px] text-muted-foreground">
              <div className="inline-flex items-center gap-1.5">
                {listening ? <Radio className="h-3.5 w-3.5 text-rose-mauve animate-pulse" /> : speaking ? <Waves className="h-3.5 w-3.5 text-[#b79263]" /> : <Bot className="h-3.5 w-3.5" />}
                <span>{listening ? copy.statusListening : speaking ? copy.statusSpeaking : copy.statusReady}</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <button onClick={() => setVoiceModeType(voiceModeType === 'browser' ? 'realtime' : voiceModeType === 'realtime' ? 'provider' : 'browser')} className="rounded-full border px-2 py-0.5 hover:text-foreground">
                  {voiceModeType}
                </button>
                <button onClick={() => setVoiceEnabled(prev => !prev)} className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 hover:text-foreground">
                  {voiceEnabled ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />} {copy.voice}
                </button>
              </div>
            </div>

            <div ref={scrollRef} className="max-h-[56vh] space-y-3 overflow-auto px-3 py-3">
              {partialTranscript && (
                <div className="rounded-xl border border-dashed border-rose-mauve/25 bg-rose-mauve/5 px-3 py-2 text-xs text-muted-foreground">
                  {copy.transcript} {partialTranscript}
                </div>
              )}
              {messages.map(message => (
                <div key={message.id} className={cn('flex', message.role === 'user' ? 'justify-end' : 'justify-start')}>
                  <div
                    className={cn(
                      'max-w-[90%] rounded-2xl px-3 py-2.5 text-sm',
                      message.role === 'user' ? 'bg-charcoal text-white' : 'border border-rose-mauve/15 bg-secondary/70 text-charcoal'
                    )}
                  >
                    <p className="leading-relaxed">{message.content}</p>

                    {message.actions && message.actions.length > 0 && (
                      <div className="mt-2 grid gap-1.5">
                        {message.actions.map(action => (
                          <Link
                            key={action.id}
                            href={localizeHref(action.href, locale)}
                            className={cn('rounded-xl border px-2.5 py-2 text-xs hover:border-rose-mauve/45', actionAccent[action.type])}
                          >
                            <p className="font-medium">{action.title}</p>
                            <p className="text-muted-foreground">{action.description}</p>
                          </Link>
                        ))}
                      </div>
                    )}

                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {message.suggestions.map(suggestion => (
                          <button
                            key={suggestion}
                            onClick={() => send(suggestion)}
                            className="rounded-full border border-rose-mauve/25 bg-white px-2 py-1 text-[11px] text-rose-mauve hover:bg-rose-mauve/10"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {loading && <p className="text-xs text-muted-foreground">{copy.loading}</p>}
            </div>

            <footer className="border-t border-rose-mauve/15 p-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleListening}
                  disabled={!voiceSupported}
                  className={cn(
                    'grid h-10 w-10 place-items-center rounded-full border transition-colors disabled:opacity-50',
                    listening ? 'border-rose-mauve bg-rose-mauve text-white' : 'border-border bg-background text-muted-foreground hover:text-rose-mauve'
                  )}
                  aria-label={listening ? 'Stop listening' : 'Start voice input'}
                >
                  {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </button>

                <input
                  value={input}
                  onChange={event => setInput(event.target.value)}
                  onKeyDown={event => {
                    if (event.key === 'Enter') send()
                  }}
                  placeholder={copy.placeholder}
                  className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm focus:border-rose-mauve focus:outline-none"
                />

                <button
                  type="button"
                  onClick={() => send()}
                  className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-r from-rose-mauve to-[#d5b48d] text-white transition-colors hover:brightness-105"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </footer>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen(prev => !prev)}
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[#e3bccb] to-[#d6b793] text-white shadow-[0_16px_35px_rgba(197,155,168,0.36)]"
        aria-label={copy.openAria}
      >
        <span className="absolute -inset-0.5 -z-10 rounded-full bg-gradient-to-br from-champagne-gold/40 to-rose-mauve/20 blur-sm opacity-0 transition-opacity group-hover:opacity-100" />
        <Sparkles className="h-5 w-5" />
      </motion.button>
    </div>
  )
}
