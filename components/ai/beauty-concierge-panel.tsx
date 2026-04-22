'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, Mic, MicOff, Send, Sparkles, Volume2, VolumeX, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useLocale } from '@/components/providers/locale-provider'
import { useRegion } from '@/components/providers/region-provider'
import { localizeHref } from '@/lib/i18n'
import { products, formatPrice } from '@/lib/data'
import { generateConciergeReply, type ConciergeMessage } from '@/lib/ai/concierge'

interface SpeechRecognitionResult {
  results: ArrayLike<{ 0: { transcript: string } }>
}

type SpeechRecognitionLike = {
  continuous: boolean
  interimResults: boolean
  lang: string
  onresult: ((event: SpeechRecognitionResult) => void) | null
  onend: (() => void) | null
  start: () => void
  stop: () => void
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike

type AssistantMessage = ConciergeMessage & {
  slugs?: string[]
  suggestions?: string[]
}

const STORAGE_KEY = 'jisoo_concierge_memory_v1'

export function BeautyConciergePanel() {
  const { locale, dictionary } = useLocale()
  const { region } = useRegion()
  const copy = dictionary.ai

  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [listening, setListening] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'intro',
      role: 'assistant',
      content:
        'Welcome to JISOO Beauty Concierge. Ask me about products, ingredients, routines, shipping, returns, and order support.',
      suggestions: ['Recommend a glow routine', 'What is shipping policy?', 'Help with an order question'],
    },
  ])

  const scrollRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const parsed: AssistantMessage[] = JSON.parse(raw)
      if (parsed.length > 0) setMessages(parsed)
    } catch {
      // ignore recovery errors
    }
  }, [])

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-16)))
    } catch {
      // ignore storage errors
    }
  }, [messages])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  const bySlug = useMemo(() => new Map(products.map(product => [product.slug, product])), [])

  const speak = (text: string) => {
    if (!voiceEnabled || typeof window === 'undefined' || !window.speechSynthesis) return
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1
    utterance.pitch = 1.02
    utterance.lang = locale === 'ar' ? 'ar' : 'en-US'
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }

  const send = (value?: string) => {
    const q = (value ?? input).trim()
    if (!q || loading) return

    setInput('')
    setLoading(true)

    const userMessage: AssistantMessage = {
      id: `${Date.now()}-u`,
      role: 'user',
      content: q,
    }

    setMessages(prev => [...prev, userMessage])

    window.setTimeout(() => {
      const response = generateConciergeReply({ query: q, region, history: messages })
      const assistantMessage: AssistantMessage = {
        id: `${Date.now()}-a`,
        role: 'assistant',
        content: response.answer,
        slugs: response.productSlugs,
        suggestions: response.suggestions,
      }

      setMessages(prev => [...prev, assistantMessage])
      setLoading(false)
      speak(response.answer)
    }, 450)
  }

  const toggleListening = () => {
    if (typeof window === 'undefined') return

    const SpeechCtor = (window as Window & { SpeechRecognition?: SpeechRecognitionConstructor; webkitSpeechRecognition?: SpeechRecognitionConstructor }).SpeechRecognition
      ?? (window as Window & { webkitSpeechRecognition?: SpeechRecognitionConstructor }).webkitSpeechRecognition

    if (!SpeechCtor) return

    if (!recognitionRef.current) {
      const recognition = new SpeechCtor()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = locale === 'ar' ? 'ar-AE' : 'en-US'

      recognition.onresult = (event: SpeechRecognitionResult) => {
        const transcript = event.results[0]?.[0]?.transcript ?? ''
        if (transcript) {
          setInput(transcript)
          send(transcript)
        }
      }

      recognition.onend = () => setListening(false)
      recognitionRef.current = recognition
    }

    if (listening) {
      recognitionRef.current.stop()
      setListening(false)
      return
    }

    recognitionRef.current.start()
    setListening(true)
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {open && (
          <motion.section
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 w-[92vw] max-w-[390px] overflow-hidden rounded-3xl border border-rose-mauve/25 bg-white/92 shadow-[0_30px_70px_rgba(89,34,72,0.22)] backdrop-blur-xl"
          >
            <header className="flex items-center justify-between border-b border-rose-mauve/15 bg-gradient-to-r from-plum to-rose-mauve px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-white/20">
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

            <div ref={scrollRef} className="max-h-[56vh] space-y-3 overflow-auto px-3 py-3">
              {messages.map(message => (
                <div key={message.id} className={cn('flex', message.role === 'user' ? 'justify-end' : 'justify-start')}>
                  <div
                    className={cn(
                      'max-w-[86%] rounded-2xl px-3 py-2.5 text-sm',
                      message.role === 'user' ? 'bg-charcoal text-white' : 'border border-rose-mauve/15 bg-secondary/70 text-charcoal'
                    )}
                  >
                    <div className="mb-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                      {message.role === 'assistant' ? <Bot className="h-3.5 w-3.5 text-plum" /> : null}
                      <span>{message.role === 'assistant' ? 'Concierge' : 'You'}</span>
                    </div>
                    <p className="leading-relaxed">{message.content}</p>

                    {message.slugs && message.slugs.length > 0 && (
                      <div className="mt-2 grid gap-2">
                        {message.slugs.map(slug => {
                          const product = bySlug.get(slug)
                          if (!product) return null
                          return (
                            <Link key={slug} href={localizeHref(`/product/${slug}`, locale)} className="rounded-xl border bg-white px-2.5 py-2 text-xs hover:border-rose-mauve/40">
                              <p className="font-medium">{product.name}</p>
                              <p className="text-muted-foreground">{formatPrice(product.price)}</p>
                            </Link>
                          )
                        })}
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

              {loading && <p className="text-xs text-muted-foreground">{copy.typing}</p>}
            </div>

            <footer className="border-t border-rose-mauve/15 p-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleListening}
                  className={cn(
                    'grid h-10 w-10 place-items-center rounded-full border transition-colors',
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
                  placeholder={copy.inputPlaceholder}
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

              <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                <p>Limited to JISOO catalog, policy, and support guidance.</p>
                <button
                  type="button"
                  onClick={() => setVoiceEnabled(prev => !prev)}
                  className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 hover:text-foreground"
                >
                  {voiceEnabled ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
                  Voice
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
