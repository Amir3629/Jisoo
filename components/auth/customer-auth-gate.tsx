'use client'

import { FormEvent, ReactNode, useEffect, useState } from 'react'
import { Mail, LockKeyhole, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

const STORAGE_KEY = 'jisoo-customer-session'

export function CustomerAuthGate({
  children,
  reason = 'dashboard',
}: {
  children: ReactNode
  reason?: 'dashboard' | 'rewards'
}) {
  const [isAuthed, setIsAuthed] = useState(false)
  const [mode, setMode] = useState<'login' | 'create'>('login')
  const [email, setEmail] = useState('customer@jisoo.com')
  const [password, setPassword] = useState('')

  useEffect(() => {
    setIsAuthed(window.localStorage.getItem(STORAGE_KEY) === 'yes')
  }, [])

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    window.localStorage.setItem(STORAGE_KEY, 'yes')
    setIsAuthed(true)
  }

  if (isAuthed) return <>{children}</>

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-[2rem] border border-[#cfae83]/24 bg-warm-ivory/82 p-6 shadow-luxury backdrop-blur-xl sm:p-8">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-rose-mauve to-[#d3af84] text-white">
            <Sparkles className="h-6 w-6" />
          </div>
          <h2 className="font-serif text-3xl text-charcoal">Sign in to JISOO</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-charcoal/65">
            {reason === 'rewards'
              ? 'Sign in or create an account to view rewards, points, and member benefits.'
              : 'Sign in or create an account to view your dashboard, orders, wishlist, addresses, and settings.'}
          </p>
        </div>

        <div className="mb-6 grid grid-cols-2 rounded-full border border-[#cfae83]/25 bg-white/35 p-1">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={mode === 'login' ? 'rounded-full bg-gradient-to-r from-rose-mauve to-[#d3af84] px-4 py-2 text-sm font-medium text-white' : 'rounded-full px-4 py-2 text-sm text-charcoal/70'}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode('create')}
            className={mode === 'create' ? 'rounded-full bg-gradient-to-r from-rose-mauve to-[#d3af84] px-4 py-2 text-sm font-medium text-white' : 'rounded-full px-4 py-2 text-sm text-charcoal/70'}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.16em] text-charcoal/58">Email</span>
            <div className="flex items-center gap-3 rounded-2xl border border-[#cfae83]/24 bg-white/55 px-4 py-3">
              <Mail className="h-4 w-4 text-rose-mauve" />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full bg-transparent text-sm outline-none placeholder:text-charcoal/35"
                placeholder="customer@jisoo.com"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.16em] text-charcoal/58">Password</span>
            <div className="flex items-center gap-3 rounded-2xl border border-[#cfae83]/24 bg-white/55 px-4 py-3">
              <LockKeyhole className="h-4 w-4 text-rose-mauve" />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full bg-transparent text-sm outline-none placeholder:text-charcoal/35"
                placeholder="Password"
              />
            </div>
          </label>

          <Button type="submit" className="h-12 w-full rounded-full bg-gradient-to-r from-rose-mauve to-[#d3af84] text-white hover:brightness-105">
            {mode === 'login' ? 'Continue to Dashboard' : 'Create Account'}
          </Button>

          <p className="text-center text-xs text-charcoal/48">
            Demo login for now. Real authentication can be connected later.
          </p>
        </form>
      </div>
    </div>
  )
}

export function signOutCustomer() {
  window.localStorage.removeItem(STORAGE_KEY)
  window.location.reload()
}
