export type ConciergeRuntimeState = 'idle' | 'listening' | 'thinking' | 'speaking' | 'interrupted' | 'error'

export function deriveRuntimeState({
  listening,
  speaking,
  loading,
  interrupted,
  errored,
}: {
  listening: boolean
  speaking: boolean
  loading: boolean
  interrupted: boolean
  errored: boolean
}): ConciergeRuntimeState {
  if (errored) return 'error'
  if (interrupted) return 'interrupted'
  if (listening) return 'listening'
  if (speaking) return 'speaking'
  if (loading) return 'thinking'
  return 'idle'
}
