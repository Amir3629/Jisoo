'use client'

import { useEffect } from 'react'

const DEFAULT_PREFIX = '/assets/products/productnewnew-final/jisoo-product-final-'
const SECOND_PREFIX = '/assets/products/product-second-mode-final/jisoo-second-mode-product-'

function numberToSecondModePath(value: string) {
  const match = value.match(/jisoo-product-final-(0[1-6])\.png/)
  if (!match) return value
  return `${SECOND_PREFIX}${match[1]}.png`
}

function numberToDefaultPath(value: string) {
  const match = value.match(/jisoo-second-mode-product-(0[1-6])\.png/)
  if (!match) return value
  return `${DEFAULT_PREFIX}${match[1]}.png`
}

function decodeNextImageUrl(value: string) {
  try {
    const url = new URL(value, window.location.origin)
    const imageUrl = url.searchParams.get('url')
    return imageUrl ? decodeURIComponent(imageUrl) : value
  } catch {
    return value
  }
}

function toNextImageUrl(path: string, width = '750', quality = '75') {
  return `/_next/image?url=${encodeURIComponent(path)}&w=${width}&q=${quality}`
}

function rewriteOneUrl(value: string, elegant: boolean) {
  if (!value) return value
  const decoded = decodeNextImageUrl(value)
  if (!decoded.includes('/assets/products/')) return value
  const nextPath = elegant ? numberToSecondModePath(decoded) : numberToDefaultPath(decoded)
  if (nextPath === decoded) return value

  if (value.includes('/_next/image?')) {
    let width = '750'
    let quality = '75'
    try {
      const url = new URL(value, window.location.origin)
      width = url.searchParams.get('w') || width
      quality = url.searchParams.get('q') || quality
    } catch {}
    return toNextImageUrl(nextPath, width, quality)
  }
  return nextPath
}

function rewriteSrcset(value: string, elegant: boolean) {
  if (!value) return value
  return value
    .split(',')
    .map((entry) => {
      const trimmed = entry.trim()
      const [url, descriptor] = trimmed.split(/\s+/, 2)
      const rewritten = rewriteOneUrl(url, elegant)
      return descriptor ? `${rewritten} ${descriptor}` : rewritten
    })
    .join(', ')
}

function applyProductImageMode() {
  const elegant = document.documentElement.dataset.siteMode === 'elegant'

  document.querySelectorAll<HTMLImageElement>('img').forEach((img) => {
    const src = img.getAttribute('src') || ''
    const srcset = img.getAttribute('srcset') || ''

    if (!src.includes('/assets/products/') && !src.includes('%2Fassets%2Fproducts%2F') && !srcset.includes('/assets/products/') && !srcset.includes('%2Fassets%2Fproducts%2F')) {
      return
    }

    const nextSrc = rewriteOneUrl(src, elegant)
    const nextSrcset = rewriteSrcset(srcset, elegant)
    if (nextSrc !== src) img.setAttribute('src', nextSrc)
    if (nextSrcset !== srcset) img.setAttribute('srcset', nextSrcset)
  })
}

export function ProductImageModeSwitcher() {
  useEffect(() => {
    applyProductImageMode()
    const observer = new MutationObserver(applyProductImageMode)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-site-mode'] })
    observer.observe(document.body, { childList: true, subtree: true })
    window.addEventListener('jisoo-site-mode', applyProductImageMode)
    return () => {
      observer.disconnect()
      window.removeEventListener('jisoo-site-mode', applyProductImageMode)
    }
  }, [])

  // Keep the image-mode system active, but do not render the old floating testing button.
  return null
}
