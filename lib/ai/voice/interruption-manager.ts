export class InterruptionManager {
  private sequence = 0

  interrupt() {
    this.sequence += 1
    return this.sequence
  }

  isStale(sequenceId: number) {
    return sequenceId !== this.sequence
  }

  current() {
    return this.sequence
  }
}
