'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Bot, RotateCcw, Send, Sparkles, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { products, formatPrice } from '@/lib/data'
import { useRegion } from '@/components/providers/region-provider'
import { useLocale } from '@/components/providers/locale-provider'
import { i18nContent } from '@/lib/i18n-content'
import { runCustomerAssistant } from '@/lib/ai/customer-ai'
import { localizeHref } from '@/lib/i18n'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  slugs?: string[]
  suggestions?: string[]
}

export default function AIConsultantPage() {
  const { locale } = useLocale()
  const { region } = useRegion()
  const copy = i18nContent[locale].aiCustomer

  const [messages, setMessages] = useState<Message[]>([{ id: 'a1', role: 'assistant', content: copy.subtitle }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const send = (text?: string) => {
    const q = (text ?? input).trim()
    if (!q) return
    setMessages((prev) => [...prev, { id: `${Date.now()}-u`, role: 'user', content: q }])
    setInput('')
    setLoading(true)
    setTimeout(() => {
      const result = runCustomerAssistant(q, region)
      setMessages((prev) => [...prev, { id: `${Date.now()}-a`, role: 'assistant', content: result.answer, slugs: result.productSlugs, suggestions: result.suggestions }])
      setLoading(false)
    }, 700)
  }

  const bySlug = useMemo(() => new Map(products.map((p) => [p.slug, p])), [])

  return (
    <div className="min-h-screen bg-background pt-24 pb-10 px-4">
      <div className="max-w-4xl mx-auto rounded-3xl border bg-card overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-plum to-rose-mauve text-white grid place-items-center"><Sparkles className="h-4 w-4" /></div>
            <div>
              <h1 className="font-serif text-lg">{copy.title}</h1>
              <p className="text-xs text-muted-foreground">{copy.subtitle}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setMessages([{ id: 'a1', role: 'assistant', content: copy.subtitle }])}>
            <RotateCcw className="h-4 w-4 mr-2" />{copy.startOver}
          </Button>
        </div>

        <div className="p-4 space-y-4 max-h-[60vh] overflow-auto">
          {messages.map((m) => (
            <div key={m.id} className={`flex gap-2 ${m.role === 'user' ? 'justify-end' : ''}`}>
              {m.role === 'assistant' && <Bot className="h-5 w-5 text-plum mt-1" />}
              <div className={`rounded-2xl px-4 py-3 text-sm max-w-[80%] ${m.role === 'user' ? 'bg-charcoal text-white' : 'bg-muted'}`}>
                <p>{m.content}</p>
                {m.slugs && (
                  <div className="mt-3 grid sm:grid-cols-2 gap-2">
                    {m.slugs.map((slug) => {
                      const p = bySlug.get(slug)
                      if (!p) return null
                      return (
                        <Link key={slug} href={localizeHref(`/product/${slug}`, locale)} className="rounded-xl border bg-background p-2 block">
                          <p className="font-medium text-xs">{p.name}</p>
                          <p className="text-xs text-muted-foreground">{formatPrice(p.price)}</p>
                        </Link>
                      )
                    })}
                  </div>
                )}
                {m.suggestions && (
                  <div className="mt-3">
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">{copy.suggested}</p>
                    <div className="flex flex-wrap gap-1">
                      {m.suggestions.map((s) => (
                        <button key={s} onClick={() => send(s)} className="text-xs px-2 py-1 rounded-full border hover:bg-secondary">{s}</button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {m.role === 'user' && <User className="h-5 w-5 mt-1" />}
            </div>
          ))}
          {loading && <p className="text-xs text-muted-foreground">{copy.typing}</p>}
        </div>

        <div className="border-t p-3 flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={copy.inputPlaceholder} className="flex-1 rounded-full border px-4 py-2 bg-background" />
          <Button onClick={() => send()} className="rounded-full"><Send className="h-4 w-4" /></Button>
        </div>
      </div>
    </div>
  )
}
