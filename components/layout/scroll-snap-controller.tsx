'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const snapExcludedSegments = ['/account', '/admin', '/checkout', '/cart', '/about', '/our-story']

function normalizePath(pathname: string) {
  return pathname.replace(/^\/(en|fr|de|ar|ko|tr)(?=\/|$)/, '') || '/'
}

function getSnapSections() {
  return Array.from(document.querySelectorAll<HTMLElement>('.snap-page-flow > section, .snap-page-flow > .snap-section, .snap-page-flow > footer'))
}

function getScrollMarginTop(element: HTMLElement) {
  const value = window.getComputedStyle(element).scrollMarginTop
  return Number.parseFloat(value) || 0
}

function getCurrentSectionIndex(sections: HTMLElement[]) {
  const anchor = window.innerHeight * 0.34
  const activeIndex = sections.findIndex((section) => {
    const rect = section.getBoundingClientRect()
    return rect.top <= anchor && rect.bottom > anchor
  })

  if (activeIndex >= 0) return activeIndex

  return sections.reduce((closestIndex, section, index) => {
    const closest = sections[closestIndex]
    return Math.abs(section.getBoundingClientRect().top) < Math.abs(closest.getBoundingClientRect().top) ? index : closestIndex
  }, 0)
}

function animateScrollTo(target: number, duration = 980) {
  const start = window.scrollY
  const distance = target - start
  const startedAt = window.performance.now()
  const ease = (time: number) => 1 - Math.pow(1 - time, 3)

  const frame = (now: number) => {
    const progress = Math.min(1, (now - startedAt) / duration)
    window.scrollTo(0, start + distance * ease(progress))
    if (progress < 1) window.requestAnimationFrame(frame)
  }

  window.requestAnimationFrame(frame)
}

export function ScrollSnapController() {
  const pathname = usePathname()

  useEffect(() => {
    const normalizedPath = normalizePath(pathname)
    const shouldWatchHeader = !snapExcludedSegments.some((segment) => normalizedPath === segment || normalizedPath.startsWith(`${segment}/`))
    const shouldUseGentleSnap = normalizedPath === '/' || normalizedPath === '/tips' || normalizedPath === '/shop/new-arrivals' || normalizedPath === '/ai-consultant'
    document.documentElement.classList.toggle('site-scroll-snap', shouldUseGentleSnap)

    const updateHeaderTheme = () => {
      const storySection = document.querySelector('[data-header-theme="story-gold"]')
      if (!shouldWatchHeader || !storySection) {
        document.documentElement.classList.remove('story-gold-header')
        return
      }

      const rect = storySection.getBoundingClientRect()
      const isActive = rect.top < window.innerHeight * 0.42 && rect.bottom > window.innerHeight * 0.32
      document.documentElement.classList.toggle('story-gold-header', isActive)
    }

    window.addEventListener('scroll', updateHeaderTheme, { passive: true })
    updateHeaderTheme()

    let isAnimating = false

    const snapTo = (target: number) => {
      isAnimating = true
      animateScrollTo(target)
      window.setTimeout(() => {
        isAnimating = false
      }, 1050)
    }

    const onWheel = (event: WheelEvent) => {
      if (!shouldUseGentleSnap || event.defaultPrevented || Math.abs(event.deltaY) < 8) return
      if (isAnimating) {
        event.preventDefault()
        return
      }

      const sections = getSnapSections()
      if (sections.length < 2) return

      const viewportHeight = window.innerHeight
      const currentIndex = getCurrentSectionIndex(sections)
      const current = sections[currentIndex]
      const rect = current.getBoundingClientRect()
      const atSectionTop = rect.top >= -24 && rect.top <= viewportHeight * 0.22
      const atSectionBottom = rect.bottom <= viewportHeight * 1.08

      if (event.deltaY < 0 && currentIndex > 0 && atSectionTop) {
        event.preventDefault()
        snapTo(0)
        return
      }

      if (event.deltaY > 0 && currentIndex >= 0 && currentIndex < sections.length - 1 && atSectionBottom) {
        const next = sections[currentIndex + 1]
        event.preventDefault()
        snapTo(window.scrollY + next.getBoundingClientRect().top - getScrollMarginTop(next))
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      document.documentElement.classList.remove('site-scroll-snap')
      document.documentElement.classList.remove('story-gold-header')
      window.removeEventListener('scroll', updateHeaderTheme)
      window.removeEventListener('wheel', onWheel)
    }
  }, [pathname])

  return null
}
