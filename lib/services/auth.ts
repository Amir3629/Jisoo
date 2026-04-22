import type { Region } from '@/lib/types'

export type UserRole = 'customer' | 'admin'

export interface AuthSession {
  userId: string
  email: string
  role: UserRole
  region?: Region
  issuedAt: string
}

export interface AuthProvider {
  getSession(token?: string): Promise<AuthSession | null>
}

class MockAuthProvider implements AuthProvider {
  async getSession(token?: string): Promise<AuthSession | null> {
    if (!token) return null

    if (token.startsWith('admin_')) {
      return {
        userId: 'admin-1',
        email: 'admin@jisoo.com',
        role: 'admin',
        issuedAt: new Date().toISOString(),
      }
    }

    return {
      userId: 'cust-demo-1',
      email: 'noura@example.com',
      role: 'customer',
      region: 'UAE',
      issuedAt: new Date().toISOString(),
    }
  }
}

export const authProvider: AuthProvider = new MockAuthProvider()

export function assertAdmin(session: AuthSession | null): session is AuthSession {
  return Boolean(session && session.role === 'admin')
}
