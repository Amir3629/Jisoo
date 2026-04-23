'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { generateConciergeTurn, type ConciergeAction, type ConciergeTurn } from '@/lib/ai/conversation-engine'
import type { VoiceModeType, VoiceActivityState } from '@/lib/ai/voice/types'
import type { Region } from '@/lib/types'
import { deriveRuntimeState } from '@/lib/ai/voice/state-machine'
import { VoiceSessionManager } from '@/lib/ai/voice/voice-session-manager'

export interface ConciergeUIMessage extends ConciergeTurn {
  actions?: ConciergeAction[]
  suggestions?: string[]
}

const STORAGE_KEY = 'jisoo_concierge_memory_v3'

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
  const [partialTranscript, setPartialTranscript] = useState('')
  const [loading, setLoading] = useState(false)
  const [listening, setListening] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [interrupted, setInterrupted] = useState(false)
  const [errored, setErrored] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [voiceModeType, setVoiceModeType] = useState<VoiceModeType>(defaultVoiceMode)
  const [voiceActivity, setVoiceActivity] = useState<VoiceActivityState>('idle')
  const managerRef = useRef<VoiceSessionManager | null>(null)

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
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-25)))
    } catch {
      // ignore
    }
  }, [messages])

  const send = (text?: string) => {
    const q = (text ?? input).trim()
    if (!q || loading) return

    const interruptionSeq = managerRef.current?.interrupt() ?? 0
    setInterrupted(true)
    setSpeaking(false)

    const userTurn: ConciergeUIMessage = { id: `${Date.now()}-u`, role: 'user', content: q }
    const history = [...messages, userTurn]

    setMessages(history)
    setInput('')
    setPartialTranscript('')
    setLoading(true)
    setErrored(false)

    window.setTimeout(async () => {
      if (managerRef.current?.isStale(interruptionSeq)) return

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
      setInterrupted(false)

      if (voiceEnabled) {
        setSpeaking(true)
        await managerRef.current?.speak(response.answer, voiceEnabled, locale)
        setSpeaking(false)
      }
    }, 320)
  }

  useEffect(() => {
    managerRef.current?.dispose()

    managerRef.current = new VoiceSessionManager(
      {
        onPartialTranscript: transcript => {
          setPartialTranscript(transcript)
          setInput(transcript)
        },
        onFinalTranscript: transcript => {
          setPartialTranscript('')
          setInput(transcript)
          send(transcript)
        },
        onListeningChange: setListening,
        onVoiceActivity: setVoiceActivity,
        onError: () => {
          setErrored(true)
          setListening(false)
        },
      },
      locale,
      voiceModeType,
    )

    return () => managerRef.current?.dispose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voiceModeType, locale, region])

  const toggleListening = () => {
    if (!managerRef.current?.isSupported()) return

    if (listening) {
      managerRef.current.stopListening()
      return
    }

    managerRef.current.interrupt()
    setInterrupted(true)
    setSpeaking(false)
    managerRef.current.startListening()
  }

  const reset = () => {
    managerRef.current?.interrupt()
    managerRef.current?.clearTranscript()
    setPartialTranscript('')
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

  const runtimeState = useMemo(
    () => deriveRuntimeState({ listening, speaking, loading, interrupted, errored }),
    [listening, speaking, loading, interrupted, errored],
  )

  return {
    messages,
    input,
    setInput,
    partialTranscript,
    send,
    loading,
    listening,
    speaking,
    interrupted,
    runtimeState,
    voiceActivity,
    voiceEnabled,
    setVoiceEnabled,
    toggleListening,
    reset,
    voiceModeType,
    setVoiceModeType,
    voiceSupported: managerRef.current?.isSupported() ?? false,
  }
}
