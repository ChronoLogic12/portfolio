import { useEffect, useRef } from 'react'
import { followStep, hasArrived, type Point } from './follow'
import { pointerOffset } from './pointerOffset'

interface PointerTrackingOptions {
  followRate?: number
}

export function usePointerTracking<T extends HTMLElement>({ followRate = 1 }: PointerTrackingOptions = {}) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const rate = reducedMotion ? 1 : followRate

    let target: Point | null = null
    let current: Point | null = null
    let frame = 0
    let lastTime = 0

    const write = ({ x, y }: Point) => {
      element.style.setProperty('--pointer-x', `${x}px`)
      element.style.setProperty('--pointer-y', `${y}px`)
    }

    const render = (time: number) => {
      if (!target) {
        frame = 0
        return
      }
      const elapsed = lastTime ? time - lastTime : 1000 / 60
      lastTime = time
      current = current ? followStep(current, target, rate, elapsed) : target
      write(current)
      if (hasArrived(current, target)) {
        write(target)
        current = target
        frame = 0
        lastTime = 0
        return
      }
      frame = requestAnimationFrame(render)
    }

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      target = pointerOffset(event, element.getBoundingClientRect())
      element.dataset.pointer = 'inside'
      if (!frame) frame = requestAnimationFrame(render)
    }

    const handleLeave = () => {
      cancelAnimationFrame(frame)
      frame = 0
      lastTime = 0
      target = null
      current = null
      delete element.dataset.pointer
    }

    element.addEventListener('pointermove', handleMove)
    element.addEventListener('pointerleave', handleLeave)

    return () => {
      cancelAnimationFrame(frame)
      element.removeEventListener('pointermove', handleMove)
      element.removeEventListener('pointerleave', handleLeave)
    }
  }, [followRate])

  return ref
}
