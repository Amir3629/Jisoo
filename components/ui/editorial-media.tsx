'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { resolveImageSrc } from '@/lib/image-fallbacks'

interface EditorialMediaProps {
  src?: string
  alt: string
  className?: string
  priority?: boolean
  hint?: string
  overlayClassName?: string
}

export function EditorialMedia({
  src,
  alt,
  className,
  priority,
  hint,
  overlayClassName,
}: EditorialMediaProps) {
  const [imageError, setImageError] = useState(false)
  const safeSrc = resolveImageSrc(src)
  const showImage = Boolean(safeSrc) && !imageError

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {showImage ? (
        <Image
          src={safeSrc}
          alt={alt}
          fill
          priority={priority}
          onError={() => setImageError(true)}
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 mesh-luxury" />
      )}

      <div className={cn('absolute inset-0 bg-gradient-to-t from-charcoal/50 via-charcoal/10 to-transparent', overlayClassName)} />

      {hint && (
        <div className="absolute left-4 bottom-4 rounded-full border border-white/35 bg-white/25 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
          {hint}
        </div>
      )}
    </div>
  )
}
