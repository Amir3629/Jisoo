import { NextResponse } from 'next/server'
import { authProvider } from '@/lib/services/auth'

export async function GET(request: Request) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '')
  const session = await authProvider.getSession(token)
  return NextResponse.json({ session })
}
