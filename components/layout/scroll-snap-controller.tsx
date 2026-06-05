'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const SNAP_ANIMATION_DURATION = 900
const SNAP_DELTA_THRESHOLD = 18
const POST_ANIMATION_LOCK_MS = 180
const GESTURE_RESET_MS = 180

type SnapDirection = 1 | -1

type HeroSnapPair = {
  hero: HTMLElement
  next: HTMLElement
}

function normalizePath(pathname: string) {
  return pathname.replace(/^\/(en|fr|de|ar|ko|tr)(?=\/|$)/, '') || '/'
}

function animateScrollTo(target: number, onDone: () => void, duration = SNAP_ANIMATION_DURATION) {
  const start = window.scrollY
  const distance = target - start
  const startedAt = window.performance.now()
  let frameId = 0
  const ease = (time: number) => 1 - Math.pow(1 - time, 4)

  const frame = (now: number) => {
    const progress = Math.min(1, (now - startedAt) / duration)
    const nextTop = Math.round(start + distance * ease(progress))

    window.scrollTo(0, nextTop)

    if (progress < 1) {
      frameId = window.requestAnimationFrame(frame)
      return
    }

    window.scrollTo(0, target)
    onDone()
  }

  frameId = window.requestAnimationFrame(frame)

  return () => {
    window.cancelAnimationFrame(frameId)
  }
}

function getTargetTop(element: HTMLElement) {
  const value = window.getComputedStyle(element).scrollMarginTop
  const margin = Number.parseFloat(value) || 0
  return Math.max(0, Math.round(window.scrollY + element.getBoundingClientRect().top - margin))
}

function getHeroSnapPair(): HeroSnapPair | null {
  const flow = document.querySelector<HTMLElement>('.snap-page-flow')
  if (!flow) return null

  const children = Array.from(flow.children).filter((child): child is HTMLElement => child instanceof HTMLElement)
  const hero = children.find((child) => child.tagName.toLowerCase() === 'section')
  if (!hero) return null

  const heroIndex = children.indexOf(hero)
  const next = children.slice(heroIndex + 1).find((child) => {
    if (child.tagName.toLowerCase() === 'header') return false
    return child.offsetHeight > 0
  })

  if (!next) return null
  return { hero, next }
}

function isInsideHero(hero: HTMLElement) {
  const rect = hero.getBoundingClientRect()
  return rect.top <= 24 && rect.bottom > window.innerHeight * 0.38
}

function isNearFirstSection(next: HTMLElement) {
  const targetTop = getTargetTop(next)
  return window.scrollY > 8 && window.scrollY <= targetTop + Math.max(120, window.innerHeight * 0.22)
}

export function ScrollSnapController() {
  const pathname = usePathname()

  useEffect(() => {
    const normalizedPath = normalizePath(pathname)
    const shouldUseHeroSnap = normalizedPath === '/'

    document.documentElement.classList.toggle('site-scroll-snap', shouldUseHeroSnap)

    let isAnimating = false
    let cancelAnimation: (() => void) | undefined
    let unlockTimer = 0
    let gestureTimer = 0
    let wheelDelta = 0
    let previousOverscrollBehavior = ''
    let touchStartY: number | null = null

    const releaseInputLock = () => {
      unlockTimer = window.setTimeout(() => {
        isAnimating = false
        wheelDelta = 0
        document.documentElement.style.overscrollBehavior = previousOverscrollBehavior
        document.documentElement.classList.remove('site-scroll-snapping')
      }, POST_ANIMATION_LOCK_MS)
    }

    const snapToElement = (element: HTMLElement) => {
      cancelAnimation?.()
      window.clearTimeout(unlockTimer)

      const targetTop = getTargetTop(element)
      if (Math.abs(targetTop - window.scrollY) < 2) return

      isAnimating = true
      previousOverscrollBehavior = document.documentElement.style.overscrollBehavior
      document.documentElement.style.overscrollBehavior = 'none'
      document.documentElement.classList.add('site-scroll-snapping')

      cancelAnimation = animateScrollTo(targetTop, () => {
        cancelAnimation = undefined
        releaseInputLock()
      })
    }

    const snapForDirection = (direction: SnapDirection) => {
      if (!shouldUseHeroSnap) return false

      const pair = getHeroSnapPair()
      if (!pair) return false

      if (direction > 0 && isInsideHero(pair.hero)) {
        snapToElement(pair.next)
        return true
      }

      if (direction < 0 && isNearFirstSection(pair.next)) {
        snapToElement(pair.hero)
        return true
      }

      return false
    }

    const resetGesture = () => {
      wheelDelta = 0
    }

    const onWheel = (event: WheelEvent) => {
      if (!shouldUseHeroSnap || event.defaultPrevented || event.ctrlKey || Math.abs(event.deltaY) < 1) return

      if (isAnimating) {
        event.preventDefault()
        event.stopPropagation()
        return
      }

      window.clearTimeout(gestureTimer)
      gestureTimer = window.setTimeout(resetGesture, GESTURE_RESET_MS)
      wheelDelta += event.deltaY

      if (Math.abs(wheelDelta) < SNAP_DELTA_THRESHOLD) return

      const direction: SnapDirection = wheelDelta > 0 ? 1 : -1
      const snapped = snapForDirection(direction)

      if (snapped) {
        event.preventDefault()
        event.stopPropagation()
      }

      resetGesture()
    }

    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? null
    }

    const onTouchMove = (event: TouchEvent) => {
      if (!shouldUseHeroSnap || touchStartY === null) return

      if (isAnimating) {
        event.preventDefault()
        event.stopPropagation()
        return
      }

      const touchY = event.touches[0]?.clientY
      if (touchY === undefined) return

      const deltaY = touchStartY - touchY
      if (Math.abs(deltaY) < SNAP_DELTA_THRESHOLD) return

      const direction: SnapDirection = deltaY > 0 ? 1 : -1
      const snapped = snapForDirection(direction)

      if (snapped) {
        event.preventDefault()
        event.stopPropagation()
        touchStartY = null
      }
    }

    const onTouchEnd = () => {
      touchStartY = null
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('touchcancel', onTouchEnd, { passive: true })

    return () => {
      document.documentElement.classList.remove('site-scroll-snap')
      document.documentElement.classList.remove('site-scroll-snapping')
      cancelAnimation?.()
      window.clearTimeout(unlockTimer)
      window.clearTimeout(gestureTimer)
      document.documentElement.style.overscrollBehavior = previousOverscrollBehavior
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [pathname])

  return null
}
