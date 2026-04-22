'use client'

import { useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { Bot, Mic, MicOff, RotateCcw, Send, Sparkles, User, Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { products, formatPrice } from '@/lib/data'
import { useRegion } from '@/components/providers/region-provider'
import { useLocale } from '@/components/providers/locale-provider'
import { localizeHref } from '@/lib/i18n'
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

interface Message extends ConciergeMessage {
  slugs?: string[]
  suggestions?: string[]
}

export default function AIConsultantPage() {
  const { locale, dictionary } = useLocale()
  const { region } = useRegion()
  const copy = dictionary.ai

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'a1',
      role: 'assistant',
      content:
        'Welcome to JISOO Beauty Concierge. I can help with product guidance, ingredients, routines, shipping, returns, and order support.',
      suggestions: ['Recommend a glow routine', 'What is shipping policy?', 'Order support help'],
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [listening, setListening] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null)

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

  const send = (text?: string) => {
    const q = (text ?? input).trim()
    if (!q || loading) return

    const userMessage: Message = { id: `${Date.now()}-u`, role: 'user', content: q }
    const history = [...messages, userMessage]
    setMessages(history)
    setInput('')
    setLoading(true)

    window.setTimeout(() => {
      const result = generateConciergeReply({ query: q, region, history })
      const assistantMessage: Message = {
        id: `${Date.now()}-a`,
        role: 'assistant',
        content: result.answer,
        slugs: result.productSlugs,
        suggestions: result.suggestions,
      }
      setMessages(prev => [...prev, assistantMessage])
      setLoading(false)
      speak(result.answer)
    }, 420)
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
    <div className="min-h-screen bg-background pt-24 pb-10 px-4">
      <div className="max-w-5xl mx-auto rounded-3xl border border-rose-mauve/20 bg-card overflow-hidden shadow-editorial">
        <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-plum to-rose-mauve text-white">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/20 grid place-items-center"><Sparkles className="h-4 w-4" /></div>
            <div>
              <h1 className="font-serif text-lg">{copy.title}</h1>
              <p className="text-xs text-white/80">{region} · JISOO-only knowledge</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" onClick={() => setVoiceEnabled(prev => !prev)}>
              {voiceEnabled ? <Volume2 className="h-4 w-4 mr-2" /> : <VolumeX className="h-4 w-4 mr-2" />} Voice
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" onClick={() => setMessages([{ id: 'a1', role: 'assistant', content: copy.subtitle }])}>
              <RotateCcw className="h-4 w-4 mr-2" />{copy.startOver}
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-4 max-h-[62vh] overflow-auto">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : ''}`}>
              {message.role === 'assistant' && <Bot className="h-5 w-5 text-plum mt-1" />}
              <div className={`rounded-2xl px-4 py-3 text-sm max-w-[85%] ${message.role === 'user' ? 'bg-charcoal text-white' : 'bg-muted border border-rose-mauve/15'}`}>
                <p>{message.content}</p>

                {message.slugs && (
                  <div className="mt-3 grid sm:grid-cols-2 gap-2">
                    {message.slugs.map(slug => {
                      const product = bySlug.get(slug)
                      if (!product) return null
                      return (
                        <Link key={slug} href={localizeHref(`/product/${slug}`, locale)} className="rounded-xl border bg-background p-2 block">
                          <p className="font-medium text-xs">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{formatPrice(product.price)}</p>
                        </Link>
                      )
                    })}
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
              {message.role === 'user' && <User className="h-5 w-5 mt-1" />}
            </div>
          ))}

          {loading && <p className="text-xs text-muted-foreground">{copy.typing}</p>}
        </div>

        <div className="border-t p-3 flex gap-2">
          <Button type="button" variant="outline" size="icon" className={listening ? 'bg-rose-mauve text-white' : ''} onClick={toggleListening}>
            {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') send()
            }}
            placeholder={copy.inputPlaceholder}
            className="flex-1 rounded-full border px-4 py-2 bg-background"
          />
          <Button onClick={() => send()} className="rounded-full"><Send className="h-4 w-4" /></Button>
        </div>

        <div className="px-3 pb-3 text-[11px] text-muted-foreground">
          This concierge is limited to JISOO products, skincare guidance, shipping/returns, policies, FAQ, and order support.
        </div>
      </div>
    </div>
  )
}
