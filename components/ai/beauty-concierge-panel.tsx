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
  product: 'border-plum/25 bg-plum/5',
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
    voiceEnabled,
    setVoiceEnabled,
    toggleListening,
    voiceModeType,
    setVoiceModeType,
    voiceSupported,
  } = useConciergeController({ locale, region })

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
            className="mb-3 w-[94vw] max-w-[420px] overflow-hidden rounded-3xl border border-rose-mauve/25 bg-white/95 shadow-[0_30px_70px_rgba(89,34,72,0.22)] backdrop-blur-xl"
          >
            <header className="flex items-center justify-between border-b border-rose-mauve/15 bg-gradient-to-r from-plum to-rose-mauve px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <div className={cn('grid h-9 w-9 place-items-center rounded-full bg-white/20', speaking && 'animate-pulse')}>
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-serif text-sm">JISOO Beauty Concierge</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/80">{region} · Domain-Locked</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={() => setOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </header>

            <div className="flex items-center justify-between border-b border-rose-mauve/10 px-3 py-2 text-[11px] text-muted-foreground">
              <div className="inline-flex items-center gap-1.5">
                {listening ? <Radio className="h-3.5 w-3.5 text-rose-mauve animate-pulse" /> : speaking ? <Waves className="h-3.5 w-3.5 text-plum" /> : <Bot className="h-3.5 w-3.5" />}
                <span>{listening ? 'Listening...' : speaking ? 'Speaking...' : 'Ready'}</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <button onClick={() => setVoiceModeType(voiceModeType === 'browser' ? 'realtime' : 'browser')} className="rounded-full border px-2 py-0.5 hover:text-foreground">
                  {voiceModeType}
                </button>
                <button onClick={() => setVoiceEnabled(prev => !prev)} className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 hover:text-foreground">
                  {voiceEnabled ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />} Voice
                </button>
              </div>
            </div>

            <div ref={scrollRef} className="max-h-[56vh] space-y-3 overflow-auto px-3 py-3">
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
                            className="rounded-full border border-rose-mauve/25 bg-white px-2 py-1 text-[11px] text-plum hover:bg-rose-mauve/10"
                          >
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

            <footer className="border-t border-rose-mauve/15 p-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleListening}
                  disabled={!voiceSupported}
                  className={cn(
                    'grid h-10 w-10 place-items-center rounded-full border transition-colors disabled:opacity-50',
                    listening ? 'border-rose-mauve bg-rose-mauve text-white' : 'border-border bg-background text-muted-foreground hover:text-plum'
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
                  placeholder="Ask about products, routines, ingredients, shipping, returns, or order support"
                  className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm focus:border-plum focus:outline-none"
                />

                <button
                  type="button"
                  onClick={() => send()}
                  className="grid h-10 w-10 place-items-center rounded-full bg-plum text-white transition-colors hover:bg-plum/90"
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
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-plum to-rose-mauve text-white shadow-[0_16px_35px_rgba(97,34,77,0.32)]"
        aria-label="Open JISOO Beauty Concierge"
      >
        <span className="absolute -inset-0.5 -z-10 rounded-full bg-gradient-to-br from-champagne-gold/50 to-rose-mauve/30 blur-sm opacity-0 transition-opacity group-hover:opacity-100" />
        <Sparkles className="h-5 w-5" />
      </motion.button>
    </div>
  )
}
