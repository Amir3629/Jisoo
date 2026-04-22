export interface AIProvider {
  chat(prompt: string): Promise<string>
  recommendProducts(context: string): Promise<string[]>
  draftTranslation(sourceText: string, targetLocale: string): Promise<string>
}

class MockAIProvider implements AIProvider {
  async chat(prompt: string): Promise<string> {
    return `AI assistant response (mock): ${prompt.slice(0, 120)}`
  }

  async recommendProducts(_context: string): Promise<string[]> {
    return ['prod-1', 'prod-2']
  }

  async draftTranslation(sourceText: string, targetLocale: string): Promise<string> {
    return `[${targetLocale}] ${sourceText}`
  }
}

export const aiProvider: AIProvider = new MockAIProvider()
