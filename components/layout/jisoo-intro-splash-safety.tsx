'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

const SPLASH_SELECTOR = '[aria-label="JISOO intro splash"]'

function hideSplash() {
  if (typeof document === 'undefined') return

  document.querySelectorAll<HTMLElement>(SPLASH_SELECTOR).forEach((element) => {
    element.style.setProperty('opacity', '0', 'important')
    element.style.setProperty('visibility', 'hidden', 'important')
    element.style.setProperty('pointer-events', 'none', 'important')
    element.style.setProperty('transition', 'opacity 240ms ease, visibility 0s linear 240ms', 'important')
  })
}

export function JisooIntroSplashSafety() {
  const pathname = usePathname()
  const didMount = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const isClientNavigation = didMount.current
    didMount.current = true

    // Fresh homepage load can keep the branded intro briefly.
    // Internal navigation back to homepage must not get trapped behind the intro.
    const delay = isClientNavigation ? 650 : 2100
    let timer = window.setTimeout(hideSplash, delay)
    const hardFailsafe = window.setTimeout(hideSplash, 3200)

    const observer = new MutationObserver(() => {
      if (document.querySelector(SPLASH_SELECTOR)) {
        window.clearTimeout(timer)
        timer = window.setTimeout(hideSplash, delay)
      }
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.clearTimeout(timer)
      window.clearTimeout(hardFailsafe)
      observer.disconnect()
    }
  }, [pathname])

  return null
}
