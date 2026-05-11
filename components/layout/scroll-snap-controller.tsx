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

function animateScrollTo(target: number, onDone: () => void, duration = 1180) {
  const start = window.scrollY
  const distance = target - start
  const startedAt = window.performance.now()
  let frameId = 0
  const ease = (time: number) => 1 - Math.pow(1 - time, 4)

  const frame = (now: number) => {
    const progress = Math.min(1, (now - startedAt) / duration)
    window.scrollTo({ top: start + distance * ease(progress), behavior: 'auto' })
    if (progress < 1) {
      frameId = window.requestAnimationFrame(frame)
      return
    }
    onDone()
  }

  frameId = window.requestAnimationFrame(frame)
  return () => window.cancelAnimationFrame(frameId)
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
    let cancelAnimation: (() => void) | undefined
    let releaseTimer = 0

    const snapTo = (target: number) => {
      cancelAnimation?.()
      window.clearTimeout(releaseTimer)
      isAnimating = true
      cancelAnimation = animateScrollTo(target, () => {
        isAnimating = false
        cancelAnimation = undefined
      })
      releaseTimer = window.setTimeout(() => {
        isAnimating = false
        cancelAnimation = undefined
      }, 1300)
    }

    const onWheel = (event: WheelEvent) => {
      if (!shouldUseGentleSnap || event.defaultPrevented || event.ctrlKey || Math.abs(event.deltaY) < 12) return
      if (isAnimating) {
        cancelAnimation?.()
        window.clearTimeout(releaseTimer)
        isAnimating = false
        cancelAnimation = undefined
        return
      }

      const sections = getSnapSections()
      if (sections.length < 2) return

      const viewportHeight = window.innerHeight
      const currentIndex = getCurrentSectionIndex(sections)
      const current = sections[currentIndex]
      const rect = current.getBoundingClientRect()
      const atSectionTop = rect.top >= -34 && rect.top <= viewportHeight * 0.18
      const atSectionBottom = rect.bottom <= viewportHeight * 1.04

      if (event.deltaY < 0 && currentIndex > 0 && atSectionTop) {
        const previous = sections[currentIndex - 1]
        event.preventDefault()
        snapTo(Math.max(0, window.scrollY + previous.getBoundingClientRect().top - getScrollMarginTop(previous)))
        return
      }

      if (event.deltaY > 0 && currentIndex >= 0 && currentIndex < sections.length - 1 && atSectionBottom) {
        const next = sections[currentIndex + 1]
        event.preventDefault()
        snapTo(Math.max(0, window.scrollY + next.getBoundingClientRect().top - getScrollMarginTop(next)))
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      document.documentElement.classList.remove('site-scroll-snap')
      document.documentElement.classList.remove('story-gold-header')
      cancelAnimation?.()
      window.clearTimeout(releaseTimer)
      window.removeEventListener('scroll', updateHeaderTheme)
      window.removeEventListener('wheel', onWheel)
    }
  }, [pathname])

  return null
}
