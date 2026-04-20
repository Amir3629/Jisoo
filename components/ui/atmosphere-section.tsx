'use client'

import { cn } from '@/lib/utils'

interface AtmosphereSectionProps {
  children: React.ReactNode
  className?: string
  atmosphere?: 'ivory' | 'blush' | 'champagne'
  withVeilTop?: boolean
}

export function AtmosphereSection({
  children,
  className,
  atmosphere = 'ivory',
  withVeilTop = false,
}: AtmosphereSectionProps) {
  const overlayClass =
    atmosphere === 'blush'
      ? 'bg-[radial-gradient(100%_80%_at_15%_15%,rgba(233,199,209,0.14),transparent_55%)]'
      : atmosphere === 'champagne'
        ? 'bg-[radial-gradient(90%_80%_at_86%_25%,rgba(201,164,106,0.14),transparent_58%)]'
        : 'bg-[radial-gradient(110%_80%_at_50%_0%,rgba(243,231,224,0.12),transparent_60%)]'

  return (
    <section className={cn('chapter-shell bg-transparent', className)}>
      <div className={cn('absolute inset-0 pointer-events-none', overlayClass)} />
      {withVeilTop && <div className="transition-veil absolute inset-x-0 top-0 z-10" />}
      <div className="relative z-10">{children}</div>
    </section>
  )
}
