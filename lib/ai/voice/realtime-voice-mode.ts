import type { VoiceHandlers, VoiceMode } from './types'

/**
 * Scaffold for premium realtime voice (WebRTC) mode.
 * Implement provider session creation and bi-directional audio transport when credentials are available.
 */
export class RealtimeVoiceMode implements VoiceMode {
  type: VoiceMode['type'] = 'realtime'
  supported = false

  constructor(_handlers: VoiceHandlers, _locale: string) {
    // TODO: wire realtime provider transport
  }

  startListening() {
    // TODO: start realtime stream capture/send
  }

  stopListening() {
    // TODO: stop realtime stream
  }

  async speak(_text: string, _voiceEnabled: boolean, _locale: string): Promise<void> {
    // TODO: in realtime mode, speech output will be streamed from provider
  }

  interrupt() {
    // TODO: send interruption signal to realtime session
  }
}
