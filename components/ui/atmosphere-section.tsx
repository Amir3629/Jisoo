'use client'

import { cn } from '@/lib/utils'

interface AtmosphereSectionProps {
  children: React.ReactNode
  className?: string
  atmosphere?: 'ivory' | 'blush' | 'champagne'
  withVeilTop?: boolean
  withAtmosphereOverlay?: boolean
}

export function AtmosphereSection({
  children,
  className,
  atmosphere = 'ivory',
  withVeilTop = false,
  withAtmosphereOverlay = true,
}: AtmosphereSectionProps) {
  const overlayClass =
    atmosphere === 'blush'
      ? 'bg-[radial-gradient(80%_90%_at_0%_18%,rgba(246,226,234,0.10),transparent_72%)]'
      : atmosphere === 'champagne'
        ? 'bg-[radial-gradient(84%_90%_at_100%_18%,rgba(201,164,106,0.07),transparent_74%)]'
        : 'bg-[radial-gradient(76%_86%_at_100%_12%,rgba(246,226,234,0.06),transparent_76%)]'

  return (
    <section className={cn('chapter-shell bg-transparent', !withAtmosphereOverlay && 'shared-background-section', className)}>
      {withAtmosphereOverlay && <div className={cn('absolute inset-0 pointer-events-none', overlayClass)} />}
      {withVeilTop && <div className="transition-veil absolute inset-x-0 top-0 z-10" />}
      <div className="relative z-10">{children}</div>
    </section>
  )
}
