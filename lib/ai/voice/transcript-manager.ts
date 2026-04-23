export interface TranscriptState {
  partial: string
  finals: string[]
}

export class TranscriptManager {
  private state: TranscriptState = { partial: '', finals: [] }

  setPartial(value: string) {
    this.state.partial = value
    return this.snapshot()
  }

  pushFinal(value: string) {
    this.state.finals.push(value)
    this.state.partial = ''
    return this.snapshot()
  }

  clear() {
    this.state = { partial: '', finals: [] }
    return this.snapshot()
  }

  snapshot(): TranscriptState {
    return { partial: this.state.partial, finals: [...this.state.finals] }
  }
}
