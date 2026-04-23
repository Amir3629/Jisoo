export type VoiceModeType = 'browser' | 'realtime' | 'provider'
export type VoiceActivityState = 'idle' | 'listening' | 'speech_detected' | 'pause_detected'

export interface VoiceHandlers {
  onPartialTranscript: (transcript: string) => void
  onFinalTranscript: (transcript: string) => void
  onListeningChange: (listening: boolean) => void
  onVoiceActivity: (activity: VoiceActivityState) => void
  onError?: (message: string) => void
}

export interface VoiceMode {
  type: VoiceModeType
  supported: boolean
  startListening: () => void
  stopListening: () => void
  speak: (text: string, voiceEnabled: boolean, locale: string) => Promise<void>
  interrupt: () => void
  dispose?: () => void
}
