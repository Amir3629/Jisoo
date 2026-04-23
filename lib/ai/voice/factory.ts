import { BrowserVoiceMode } from './browser-voice-mode'
import { ProviderVoiceMode } from './provider-voice-mode'
import { RealtimeVoiceMode } from './realtime-voice-mode'
import type { VoiceHandlers, VoiceMode, VoiceModeType } from './types'

export function createVoiceMode(mode: VoiceModeType, handlers: VoiceHandlers, locale: string): VoiceMode {
  if (mode === 'realtime') {
    const realtime = new RealtimeVoiceMode(handlers, locale)
    if (realtime.supported) return realtime
  }

  if (mode === 'provider') {
    const provider = new ProviderVoiceMode(handlers, locale)
    if (provider.supported) return provider
  }

  return new BrowserVoiceMode(handlers, locale)
}
