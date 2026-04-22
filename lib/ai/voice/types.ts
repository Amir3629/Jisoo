export type VoiceModeType = 'browser' | 'realtime'

export interface VoiceHandlers {
  onTranscript: (transcript: string) => void
  onListeningChange: (listening: boolean) => void
}

export interface VoiceMode {
  type: VoiceModeType
  supported: boolean
  startListening: () => void
  stopListening: () => void
  speak: (text: string, voiceEnabled: boolean, locale: string) => void
  interrupt: () => void
  dispose?: () => void
}
