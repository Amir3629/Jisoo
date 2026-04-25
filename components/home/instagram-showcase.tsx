'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Script from 'next/script'

export function InstagramShowcase() {
  const widgetRef = useRef<HTMLDivElement | null>(null)
  const [showFallback, setShowFallback] = useState(true)

  useEffect(() => {
    const container = widgetRef.current
    if (!container) return

    const updateState = () => {
      const text = (container.textContent ?? '').toLowerCase()
      const hasErrorText = text.includes('error') || text.includes('failed')
      const hasWidgetNodes = container.childElementCount > 0
      setShowFallback(hasErrorText || !hasWidgetNodes)
    }

    const observer = new MutationObserver(updateState)
    observer.observe(container, { childList: true, subtree: true, characterData: true })
    updateState()

    const timeout = window.setTimeout(updateState, 6000)

    return () => {
      observer.disconnect()
      window.clearTimeout(timeout)
    }
  }, [])

  return (
    <section className="w-full px-4 py-10 lg:px-6">
      <Script id="elfsight-platform" src="https://elfsightcdn.com/platform.js" strategy="afterInteractive" />
      <div className="mx-auto w-full max-w-[1500px] rounded-[1.5rem] border border-[#e8d9cf] bg-[#fffdfb] p-2 shadow-[0_12px_40px_rgba(42,32,35,0.07)] sm:p-3">
        <div ref={widgetRef} className="w-full">
          <div className="elfsight-app-c1e1c5fb-090c-44f4-8806-944402444301" data-elfsight-app-lazy />
        </div>
        {showFallback && (
          <p className="mt-3 text-center text-sm text-charcoal/70">
            Instagram feed is loading.{' '}
            <Link href="https://www.instagram.com/jisoocosmetics/" target="_blank" rel="noopener noreferrer" className="font-medium text-charcoal underline decoration-charcoal/40 underline-offset-4 hover:decoration-charcoal">
              View @jisoocosmetics on Instagram.
            </Link>
          </p>
        )}
      </div>
    </section>
  )
}
