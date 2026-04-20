'use client'

import { cn } from '@/lib/utils'

interface AtmosphereSectionProps {
  children: React.ReactNode
  className?: string
  atmosphere?: 'ivory' | 'blush' | 'plum'
  withVeilTop?: boolean
}

export function AtmosphereSection({
  children,
  className,
  atmosphere = 'ivory',
  withVeilTop = false,
}: AtmosphereSectionProps) {
  const atmosphereClass =
    atmosphere === 'plum' ? 'mesh-plum' : atmosphere === 'blush' ? 'mesh-blush' : 'mesh-ivory'

  return (
    <section className={cn('chapter-shell', atmosphereClass, className)}>
      {withVeilTop && <div className="transition-veil absolute inset-x-0 top-0 z-10" />}
      {children}
    </section>
  )
}

