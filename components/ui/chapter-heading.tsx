'use client'

import { cn } from '@/lib/utils'

interface ChapterHeadingProps {
  kicker: string
  title: string
  description?: string
  align?: 'left' | 'center'
  ghostLabel?: string
  className?: string
  as?: 'h1' | 'h2'
}

export function ChapterHeading({
  kicker,
  title,
  description,
  align = 'left',
  ghostLabel,
  className,
  as = 'h2',
}: ChapterHeadingProps) {
  const TitleTag = as
  return (
    <div className={cn('relative z-10', align === 'center' ? 'text-center' : 'text-left', className)}>
      {ghostLabel && (
        <p
          aria-hidden
          className={cn(
            'pointer-events-none select-none font-serif text-6xl md:text-7xl lg:text-8xl text-plum/[0.06] absolute -top-10',
            align === 'center' ? 'left-1/2 -translate-x-1/2' : 'left-0'
          )}
        >
          {ghostLabel}
        </p>
      )}
      <p className="text-kicker text-rose-mauve">{kicker}</p>
      <TitleTag className="mt-4 font-serif editorial-display text-4xl md:text-5xl lg:text-6xl text-charcoal">{title}</TitleTag>
      {description && (
        <p className={cn('mt-5 text-charcoal/72 leading-relaxed max-w-2xl', align === 'center' && 'mx-auto')}>
          {description}
        </p>
      )}
    </div>
  )
}
