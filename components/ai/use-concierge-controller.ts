'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { generateConciergeTurn, type ConciergeAction, type ConciergeTurn } from '@/lib/ai/conversation-engine'
import { createVoiceMode } from '@/lib/ai/voice/factory'
import type { VoiceModeType } from '@/lib/ai/voice/types'
import type { Region } from '@/lib/types'

export interface ConciergeUIMessage extends ConciergeTurn {
  actions?: ConciergeAction[]
  suggestions?: string[]
}

const STORAGE_KEY = 'jisoo_concierge_memory_v2'

export function useConciergeController({ locale, region, defaultVoiceMode = 'browser' }: { locale: string; region: Region; defaultVoiceMode?: VoiceModeType }) {
  const [messages, setMessages] = useState<ConciergeUIMessage[]>([
    {
      id: 'intro',
      role: 'assistant',
      content:
        'Welcome to JISOO Beauty Concierge. I can help with products, routines, ingredients, region availability, policies, and order support.',
      suggestions: ['Recommend a glow routine', 'Shipping & return policy', 'Help with an order issue'],
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [listening, setListening] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [voiceModeType, setVoiceModeType] = useState<VoiceModeType>(defaultVoiceMode)
  const voiceModeRef = useRef<ReturnType<typeof createVoiceMode> | null>(null)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const parsed: ConciergeUIMessage[] = JSON.parse(raw)
      if (parsed.length > 0) setMessages(parsed)
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-20)))
    } catch {
      // ignore
    }
  }, [messages])

  useEffect(() => {
    voiceModeRef.current?.dispose?.()

    voiceModeRef.current = createVoiceMode(
      voiceModeType,
      {
        onTranscript: transcript => {
          setInput(transcript)
          send(transcript)
        },
        onListeningChange: setListening,
      },
      locale,
    )

    return () => voiceModeRef.current?.dispose?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voiceModeType, locale, region])

  const send = (text?: string) => {
    const q = (text ?? input).trim()
    if (!q || loading) return

    voiceModeRef.current?.interrupt()
    setSpeaking(false)

    const userTurn: ConciergeUIMessage = { id: `${Date.now()}-u`, role: 'user', content: q }
    const history = [...messages, userTurn]

    setMessages(history)
    setInput('')
    setLoading(true)

    window.setTimeout(() => {
      const response = generateConciergeTurn({ query: q, region, history })
      const assistantTurn: ConciergeUIMessage = {
        id: `${Date.now()}-a`,
        role: 'assistant',
        content: response.answer,
        actions: response.actions,
        suggestions: response.suggestions,
      }

      setMessages(prev => [...prev, assistantTurn])
      setLoading(false)

      if (voiceEnabled) {
        setSpeaking(true)
        voiceModeRef.current?.speak(response.answer, voiceEnabled, locale)
        window.setTimeout(() => setSpeaking(false), Math.min(4000, Math.max(1200, response.answer.length * 24)))
      }
    }, 380)
  }

  const toggleListening = () => {
    const mode = voiceModeRef.current
    if (!mode || !mode.supported) return

    if (listening) {
      mode.stopListening()
      return
    }

    mode.interrupt()
    setSpeaking(false)
    mode.startListening()
  }

  const reset = () => {
    voiceModeRef.current?.interrupt()
    setMessages([
      {
        id: 'intro',
        role: 'assistant',
        content:
          'Welcome to JISOO Beauty Concierge. I can help with products, routines, ingredients, region availability, policies, and order support.',
        suggestions: ['Recommend a glow routine', 'Shipping & return policy', 'Help with an order issue'],
      },
    ])
  }

  return {
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
    reset,
    voiceModeType,
    setVoiceModeType,
    voiceSupported: voiceModeRef.current?.supported ?? false,
  }
}
