import type { VoiceHandlers, VoiceMode } from './types'

interface SpeechRecognitionResult {
  isFinal: boolean
  0: { transcript: string }
}

interface SpeechRecognitionEventLike {
  results: ArrayLike<SpeechRecognitionResult>
  resultIndex: number
}

type SpeechRecognitionLike = {
  continuous: boolean
  interimResults: boolean
  lang: string
  onresult: ((event: SpeechRecognitionEventLike) => void) | null
  onend: (() => void) | null
  onerror: ((event: { error: string }) => void) | null
  start: () => void
  stop: () => void
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike

export class BrowserVoiceMode implements VoiceMode {
  type: VoiceMode['type'] = 'browser'
  supported = false
  private recognition: SpeechRecognitionLike | null = null
  private silenceTimer: ReturnType<typeof globalThis.setTimeout> | null = null

  constructor(private handlers: VoiceHandlers, private locale: string) {
    if (typeof window === 'undefined') return

    const RecognitionCtor = (window as Window & { SpeechRecognition?: SpeechRecognitionConstructor; webkitSpeechRecognition?: SpeechRecognitionConstructor }).SpeechRecognition
      ?? (window as Window & { webkitSpeechRecognition?: SpeechRecognitionConstructor }).webkitSpeechRecognition

    if (!RecognitionCtor) return

    this.supported = true
    this.recognition = new RecognitionCtor()
    this.recognition.continuous = true
    this.recognition.interimResults = true
    this.recognition.lang = locale === 'ar' ? 'ar-AE' : 'en-US'

    this.recognition.onresult = (event: SpeechRecognitionEventLike) => {
      let interimTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const result = event.results[i]
        const transcript = result[0]?.transcript?.trim() ?? ''
        if (!transcript) continue

        if (result.isFinal) {
          this.handlers.onFinalTranscript(transcript)
        } else {
          interimTranscript += ` ${transcript}`
        }
      }

      if (interimTranscript.trim()) {
        this.handlers.onVoiceActivity('speech_detected')
        this.handlers.onPartialTranscript(interimTranscript.trim())
      }

      this.resetSilenceTimer()
    }

    this.recognition.onend = () => {
      this.handlers.onListeningChange(false)
      this.handlers.onVoiceActivity('idle')
      this.clearSilenceTimer()
    }

    this.recognition.onerror = (event: { error: string }) => {
      this.handlers.onError?.(`Browser speech error: ${event.error}`)
      this.handlers.onListeningChange(false)
      this.clearSilenceTimer()
    }
  }

  private resetSilenceTimer() {
    this.clearSilenceTimer()
    this.silenceTimer = globalThis.setTimeout(() => {
      this.handlers.onVoiceActivity('pause_detected')
      this.stopListening()
    }, 1100)
  }

  private clearSilenceTimer() {
    if (!this.silenceTimer) return
    globalThis.clearTimeout(this.silenceTimer)
    this.silenceTimer = null
  }

  startListening() {
    if (!this.recognition) return
    this.handlers.onListeningChange(true)
    this.handlers.onVoiceActivity('listening')
    this.recognition.start()
    this.resetSilenceTimer()
  }

  stopListening() {
    if (!this.recognition) return
    this.recognition.stop()
    this.handlers.onListeningChange(false)
    this.handlers.onVoiceActivity('idle')
    this.clearSilenceTimer()
  }

  async speak(text: string, voiceEnabled: boolean, locale: string): Promise<void> {
    if (!voiceEnabled || typeof window === 'undefined' || !window.speechSynthesis) return

    await new Promise<void>(resolve => {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1
      utterance.pitch = 1.02
      utterance.lang = locale === 'ar' ? 'ar' : 'en-US'
      utterance.onend = () => resolve()
      utterance.onerror = () => resolve()
      window.speechSynthesis.speak(utterance)
    })
  }

  interrupt() {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
    this.stopListening()
  }

  dispose() {
    this.clearSilenceTimer()
    this.stopListening()
  }
}
