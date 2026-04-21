'use client'

import { useState } from 'react'
import { MessageCircle, Send } from 'lucide-react'
import { runCustomerAssistant } from '@/lib/ai/customer-ai'
import { useRegion } from '@/components/providers/region-provider'

export function FloatingAssistant() {
  const { region } = useRegion()
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [answer, setAnswer] = useState('')

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-3 w-80 rounded-2xl border bg-card shadow-editorial p-3">
          <p className="text-xs text-muted-foreground mb-2">AI assistant · {region}</p>
          <div className="text-sm rounded-xl bg-secondary p-2 min-h-14">{answer || 'Ask for availability, concerns, or product comparisons.'}</div>
          <div className="mt-2 flex gap-2">
            <input className="flex-1 border rounded-full px-3 py-1.5 text-sm" value={q} onChange={(e) => setQ(e.target.value)} />
            <button className="h-8 w-8 rounded-full bg-plum text-white grid place-items-center" onClick={() => setAnswer(runCustomerAssistant(q, region).answer)}><Send className="h-3 w-3" /></button>
          </div>
        </div>
      )}
      <button onClick={() => setOpen((v) => !v)} className="h-12 w-12 rounded-full bg-plum text-white grid place-items-center shadow-xl">
        <MessageCircle className="h-5 w-5" />
      </button>
    </div>
  )
}
