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
  sizes?: string
  hint?: string
  overlayClassName?: string
}

export function EditorialMedia({
  src,
  alt,
  className,
  priority,
  sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw',
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
          sizes={sizes}
          onError={() => setImageError(true)}
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 mesh-luxury" />
      )}

      <div className={cn('absolute inset-0 bg-gradient-to-t from-charcoal/50 via-charcoal/10 to-transparent', overlayClassName)} />

      {hint && (
        <div className="absolute left-4 bottom-4 rounded-full border border-white/35 bg-white/35 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/90">
          {hint}
        </div>
      )}
    </div>
  )
}
