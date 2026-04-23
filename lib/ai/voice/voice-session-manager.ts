import { createVoiceMode } from './factory'
import { InterruptionManager } from './interruption-manager'
import { TranscriptManager } from './transcript-manager'
import type { VoiceHandlers, VoiceModeType } from './types'

export class VoiceSessionManager {
  private mode = createVoiceMode('browser', this.handlers, this.locale)
  private transcript = new TranscriptManager()
  private interruptions = new InterruptionManager()

  constructor(private handlers: VoiceHandlers, private locale: string, initialMode: VoiceModeType = 'browser') {
    this.switchMode(initialMode)
  }

  switchMode(modeType: VoiceModeType) {
    this.mode.dispose?.()
    this.mode = createVoiceMode(modeType, {
      ...this.handlers,
      onPartialTranscript: transcript => {
        this.handlers.onPartialTranscript(this.transcript.setPartial(transcript).partial)
      },
      onFinalTranscript: transcript => {
        this.handlers.onFinalTranscript(transcript)
        this.transcript.pushFinal(transcript)
      },
    }, this.locale)
  }

  getModeType() {
    return this.mode.type
  }

  isSupported() {
    return this.mode.supported
  }

  startListening() {
    this.mode.startListening()
  }

  stopListening() {
    this.mode.stopListening()
  }

  async speak(text: string, voiceEnabled: boolean, locale: string) {
    return this.mode.speak(text, voiceEnabled, locale)
  }

  interrupt() {
    const seq = this.interruptions.interrupt()
    this.mode.interrupt()
    return seq
  }

  isStale(sequence: number) {
    return this.interruptions.isStale(sequence)
  }

  clearTranscript() {
    this.transcript.clear()
  }

  dispose() {
    this.mode.dispose?.()
  }
}
