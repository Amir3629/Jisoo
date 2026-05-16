'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const snapExcludedSegments = ['/account', '/admin', '/checkout', '/cart', '/about', '/our-story']
const snapEnabledPaths = ['/', '/tips', '/shop/new-arrivals', '/ai-consultant']
const DEBUG_SNAP = false
const SNAP_ANIMATION_DURATION = 1180
const SNAP_DELTA_THRESHOLD = 14
const LONG_SECTION_TOLERANCE = 12
const WHEEL_GESTURE_RESET_MS = 180
const POST_ANIMATION_LOCK_MS = 120

type SnapDirection = 1 | -1

type SnapTarget = {
  blockedByLongSection: boolean
  currentIndex: number
  currentIsLong: boolean
  targetElement: HTMLElement
  targetIndex: number
  targetTop: number
}

function normalizePath(pathname: string) {
  return pathname.replace(/^\/(en|fr|de|ar|ko|tr)(?=\/|$)/, '') || '/'
}

function getSnapSections() {
  const flow = document.querySelector<HTMLElement>('.snap-page-flow')
  if (!flow) return []

  const sections: HTMLElement[] = []
  const seen = new Set<HTMLElement>()

  const addSection = (element: HTMLElement) => {
    if (seen.has(element)) return
    seen.add(element)
    sections.push(element)
  }

  Array.from(flow.children).forEach((child) => {
    if (!(child instanceof HTMLElement)) return

    if (child.dataset.snapFreeScroll === 'true') {
      addSection(child)
      return
    }

    if (child.matches('footer') || child.classList.contains('snap-section')) {
      addSection(child)
      return
    }

    const nestedSnapSections = Array.from(child.querySelectorAll<HTMLElement>('.snap-section')).filter((section) => {
      return section.parentElement?.closest('.snap-section') === null
    })

    if (nestedSnapSections.length > 0) {
      nestedSnapSections.forEach(addSection)
      return
    }

    if (child.matches('section')) {
      addSection(child)
    }
  })

  return sections
}

function getScrollMarginTop(element: HTMLElement) {
  const value = window.getComputedStyle(element).scrollMarginTop
  return Number.parseFloat(value) || 0
}

function getTargetTop(element: HTMLElement) {
  return Math.max(0, Math.round(window.scrollY + element.getBoundingClientRect().top - getScrollMarginTop(element)))
}

function getActiveSectionIndex(sections: HTMLElement[]) {
  const viewportHeight = window.innerHeight
  const anchor = viewportHeight * 0.42
  const activeIndex = sections.findIndex((section) => {
    const rect = section.getBoundingClientRect()
    return rect.top <= anchor && rect.bottom > anchor
  })

  if (activeIndex >= 0) return activeIndex

  return sections.reduce((closestIndex, section, index) => {
    const closest = sections[closestIndex]
    const sectionDistance = Math.abs(section.getBoundingClientRect().top - getScrollMarginTop(section))
    const closestDistance = Math.abs(closest.getBoundingClientRect().top - getScrollMarginTop(closest))
    return sectionDistance < closestDistance ? index : closestIndex
  }, 0)
}

function getLongSectionState(section: HTMLElement) {
  const rect = section.getBoundingClientRect()
  const viewportHeight = window.innerHeight
  const isLong = rect.height > viewportHeight + LONG_SECTION_TOLERANCE
  const edgeTolerance = section.dataset.snapFreeScroll === 'true' ? Math.max(240, viewportHeight * 0.4) : LONG_SECTION_TOLERANCE

  return {
    atBottom: rect.bottom <= viewportHeight + edgeTolerance,
    atTop: rect.top >= -edgeTolerance,
    isLong,
  }
}

function getSnapTargetForDirection(sections: HTMLElement[], direction: SnapDirection): SnapTarget | null {
  const currentIndex = getActiveSectionIndex(sections)
  const current = sections[currentIndex]
  const targetIndex = currentIndex + direction

  if (!current || targetIndex < 0 || targetIndex >= sections.length) return null

  const longSection = getLongSectionState(current)
  const blockedByLongSection = longSection.isLong && (direction > 0 ? !longSection.atBottom : !longSection.atTop)
  const targetElement = sections[targetIndex]

  return {
    blockedByLongSection,
    currentIndex,
    currentIsLong: longSection.isLong,
    targetElement,
    targetIndex,
    targetTop: getTargetTop(targetElement),
  }
}

function logSnap(message: string, target: SnapTarget | null) {
  if (!DEBUG_SNAP) return

  console.info('[snap]', {
    message,
    currentIndex: target?.currentIndex,
    targetIndex: target?.targetIndex,
    targetElement: target ? `${target.targetElement.tagName.toLowerCase()}.${target.targetElement.className}` : null,
    targetLabel: target?.targetElement.dataset.snapLabel,
    currentScrollY: window.scrollY,
    targetScrollY: target?.targetTop,
    currentIsLong: target?.currentIsLong,
    blockedByLongSection: target?.blockedByLongSection,
  })
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

export function ScrollSnapController() {
  const pathname = usePathname()

  useEffect(() => {
    const normalizedPath = normalizePath(pathname)
    const shouldWatchHeader = !snapExcludedSegments.some((segment) => normalizedPath === segment || normalizedPath.startsWith(`${segment}/`))
    const shouldUseSnap = snapEnabledPaths.includes(normalizedPath)

    document.documentElement.classList.toggle('site-scroll-snap', shouldUseSnap)

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
    let unlockTimer = 0
    let wheelGestureTimer = 0
    let wheelDelta = 0
    let previousOverscrollBehavior = ''
    let lastScrollY = window.scrollY
    let scrollDirection: SnapDirection = 1
    let scrollSettleTimer = 0
    let touchStartY: number | null = null

    const releaseInputLock = () => {
      unlockTimer = window.setTimeout(() => {
        isAnimating = false
        wheelDelta = 0
        document.documentElement.style.overscrollBehavior = previousOverscrollBehavior
        document.documentElement.classList.remove('site-scroll-snapping')
      }, POST_ANIMATION_LOCK_MS)
    }

    const snapTo = (target: SnapTarget) => {
      cancelAnimation?.()
      window.clearTimeout(unlockTimer)

      if (Math.abs(target.targetTop - window.scrollY) < 2) {
        logSnap('target already reached', target)
        return
      }

      logSnap('snap start', target)
      isAnimating = true
      previousOverscrollBehavior = document.documentElement.style.overscrollBehavior
      document.documentElement.style.overscrollBehavior = 'none'
      document.documentElement.classList.add('site-scroll-snapping')

      cancelAnimation = animateScrollTo(target.targetTop, () => {
        logSnap('snap end', target)
        cancelAnimation = undefined
        releaseInputLock()
      })
    }

    const resetWheelGesture = () => {
      wheelDelta = 0
    }

    const maybeSnapFreeScrollBoundary = () => {
      if (!shouldUseSnap || isAnimating) return

      const sections = getSnapSections()
      if (sections.length < 2) return

      const currentIndex = getActiveSectionIndex(sections)
      const current = sections[currentIndex]
      if (!current || current.dataset.snapFreeScroll !== 'true') return

      const longSection = getLongSectionState(current)
      if (scrollDirection > 0 && !longSection.atBottom) return
      if (scrollDirection < 0 && !longSection.atTop) return

      const target = getSnapTargetForDirection(sections, scrollDirection)
      if (!target || target.blockedByLongSection) return

      logSnap('free-scroll boundary settle', target)
      snapTo(target)
    }

    const onScrollSettle = () => {
      const nextScrollY = window.scrollY
      if (Math.abs(nextScrollY - lastScrollY) > 1) {
        scrollDirection = nextScrollY > lastScrollY ? 1 : -1
        lastScrollY = nextScrollY
      }

      window.clearTimeout(scrollSettleTimer)
      scrollSettleTimer = window.setTimeout(maybeSnapFreeScrollBoundary, 140)
    }

    const onWheel = (event: WheelEvent) => {
      if (!shouldUseSnap || event.defaultPrevented || event.ctrlKey || Math.abs(event.deltaY) < 1) return

      if (isAnimating) {
        event.preventDefault()
        event.stopPropagation()
        return
      }

      const sections = getSnapSections()
      if (sections.length < 2) return

      const direction: SnapDirection = event.deltaY > 0 ? 1 : -1
      const target = getSnapTargetForDirection(sections, direction)

      window.clearTimeout(wheelGestureTimer)
      wheelGestureTimer = window.setTimeout(resetWheelGesture, WHEEL_GESTURE_RESET_MS)

      if (!target) {
        resetWheelGesture()
        return
      }

      if (target.blockedByLongSection) {
        logSnap('natural long-section scroll', target)
        return
      }

      event.preventDefault()
      event.stopPropagation()

      wheelDelta += event.deltaY
      if (Math.abs(wheelDelta) < SNAP_DELTA_THRESHOLD) return

      resetWheelGesture()
      snapTo(target)
    }

    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? null
    }

    const onTouchMove = (event: TouchEvent) => {
      if (!shouldUseSnap || touchStartY === null) return

      if (isAnimating) {
        event.preventDefault()
        event.stopPropagation()
        return
      }

      const touchY = event.touches[0]?.clientY
      if (touchY === undefined) return

      const deltaY = touchStartY - touchY
      if (Math.abs(deltaY) < SNAP_DELTA_THRESHOLD) return

      const sections = getSnapSections()
      if (sections.length < 2) return

      const direction: SnapDirection = deltaY > 0 ? 1 : -1
      const target = getSnapTargetForDirection(sections, direction)
      if (!target) return

      if (target.blockedByLongSection) {
        logSnap('natural long-section touch scroll', target)
        return
      }

      event.preventDefault()
      event.stopPropagation()
      touchStartY = null
      snapTo(target)
    }

    const onTouchEnd = () => {
      touchStartY = null
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('scroll', onScrollSettle, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('touchcancel', onTouchEnd, { passive: true })

    return () => {
      document.documentElement.classList.remove('site-scroll-snap')
      document.documentElement.classList.remove('site-scroll-snapping')
      document.documentElement.classList.remove('story-gold-header')
      cancelAnimation?.()
      window.clearTimeout(unlockTimer)
      window.clearTimeout(wheelGestureTimer)
      window.clearTimeout(scrollSettleTimer)
      document.documentElement.style.overscrollBehavior = previousOverscrollBehavior
      window.removeEventListener('scroll', updateHeaderTheme)
      window.removeEventListener('scroll', onScrollSettle)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [pathname])

  return null
}
