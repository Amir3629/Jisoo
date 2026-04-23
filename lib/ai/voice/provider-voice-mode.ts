import type { VoiceHandlers, VoiceMode } from './types'

/**
 * Provider voice mode scaffold for vendor SDK transport.
 * Use this for non-WebRTC streaming providers.
 */
export class ProviderVoiceMode implements VoiceMode {
  type: VoiceMode['type'] = 'provider'
  supported = false

  constructor(_handlers: VoiceHandlers, _locale: string) {
    // TODO: initialize provider session
  }

  startListening() {
    // TODO: start streaming microphone frames
  }

  stopListening() {
    // TODO: stop streaming microphone frames
  }

  async speak(_text: string, _voiceEnabled: boolean, _locale: string): Promise<void> {
    // TODO: provider handles playback stream
  }

  interrupt() {
    // TODO: signal provider interruption
  }
}
