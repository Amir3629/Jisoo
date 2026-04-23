export interface Repository<T extends { id: string }> {
  list(): Promise<T[]>
  getById(id: string): Promise<T | null>
  upsert(entity: T): Promise<T>
  delete(id: string): Promise<void>
}

export class InMemoryRepository<T extends { id: string }> implements Repository<T> {
  private readonly map = new Map<string, T>()

  constructor(seed: T[] = []) {
    seed.forEach(item => this.map.set(item.id, item))
  }

  async list(): Promise<T[]> {
    return Array.from(this.map.values())
  }

  async getById(id: string): Promise<T | null> {
    return this.map.get(id) ?? null
  }

  async upsert(entity: T): Promise<T> {
    this.map.set(entity.id, entity)
    return entity
  }

  async delete(id: string): Promise<void> {
    this.map.delete(id)
  }
}
