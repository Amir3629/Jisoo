import type { VoiceHandlers, VoiceMode } from './types'

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

export class BrowserVoiceMode implements VoiceMode {
  type: VoiceMode['type'] = 'browser'
  supported = false
  private recognition: SpeechRecognitionLike | null = null

  constructor(private handlers: VoiceHandlers, private locale: string) {
    if (typeof window === 'undefined') return

    const RecognitionCtor = (window as Window & { SpeechRecognition?: SpeechRecognitionConstructor; webkitSpeechRecognition?: SpeechRecognitionConstructor }).SpeechRecognition
      ?? (window as Window & { webkitSpeechRecognition?: SpeechRecognitionConstructor }).webkitSpeechRecognition

    if (!RecognitionCtor) return

    this.supported = true
    this.recognition = new RecognitionCtor()
    this.recognition.continuous = false
    this.recognition.interimResults = false
    this.recognition.lang = locale === 'ar' ? 'ar-AE' : 'en-US'
    this.recognition.onresult = (event: SpeechRecognitionResult) => {
      const transcript = event.results[0]?.[0]?.transcript ?? ''
      if (transcript) this.handlers.onTranscript(transcript)
    }
    this.recognition.onend = () => this.handlers.onListeningChange(false)
  }

  startListening() {
    if (!this.recognition) return
    this.handlers.onListeningChange(true)
    this.recognition.start()
  }

  stopListening() {
    if (!this.recognition) return
    this.recognition.stop()
    this.handlers.onListeningChange(false)
  }

  speak(text: string, voiceEnabled: boolean, locale: string) {
    if (!voiceEnabled || typeof window === 'undefined' || !window.speechSynthesis) return
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1
    utterance.pitch = 1.02
    utterance.lang = locale === 'ar' ? 'ar' : 'en-US'
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }

  interrupt() {
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    window.speechSynthesis.cancel()
    this.stopListening()
  }
}
