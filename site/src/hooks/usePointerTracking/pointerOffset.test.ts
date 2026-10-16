import { describe, expect, it } from 'vitest'
import { pointerOffset } from './pointerOffset'

describe('pointerOffset', () => {
  it('measures the pointer from the top left of the element', () => {
    expect(pointerOffset({ clientX: 300, clientY: 150 }, { left: 100, top: 50 })).toEqual({ x: 200, y: 100 })
  })

  it('goes negative when the element has scrolled below the pointer', () => {
    expect(pointerOffset({ clientX: 10, clientY: 10 }, { left: 0, top: 40 })).toEqual({ x: 10, y: -30 })
  })
})
