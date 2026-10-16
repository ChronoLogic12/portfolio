import { useEffect, useRef } from 'react'
import { pointerOffset } from './pointerOffset'

export function usePointerTracking<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let frame = 0

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const { x, y } = pointerOffset(event, element.getBoundingClientRect())
        element.style.setProperty('--pointer-x', `${x}px`)
        element.style.setProperty('--pointer-y', `${y}px`)
        element.dataset.pointer = 'inside'
      })
    }

    const handleLeave = () => {
      cancelAnimationFrame(frame)
      delete element.dataset.pointer
    }

    element.addEventListener('pointermove', handleMove)
    element.addEventListener('pointerleave', handleLeave)

    return () => {
      cancelAnimationFrame(frame)
      element.removeEventListener('pointermove', handleMove)
      element.removeEventListener('pointerleave', handleLeave)
    }
  }, [])

  return ref
}
