import { describe, expect, it } from 'vitest'
import { followStep, hasArrived } from './follow'

const origin = { x: 0, y: 0 }
const target = { x: 100, y: 50 }

describe('followStep', () => {
  it('covers the given share of the gap in one 60fps frame', () => {
    const step = followStep(origin, target, 0.2, 1000 / 60)
    expect(step.x).toBeCloseTo(20)
    expect(step.y).toBeCloseTo(10)
  })

  it('jumps straight to the target at a rate of 1', () => {
    expect(followStep(origin, target, 1, 1000 / 60)).toEqual(target)
  })

  it('moves the same distance over time whatever the frame rate', () => {
    const atSixty = followStep(followStep(origin, target, 0.2, 1000 / 60), target, 0.2, 1000 / 60)
    const atThirty = followStep(origin, target, 0.2, 1000 / 30)
    expect(atThirty.x).toBeCloseTo(atSixty.x)
    expect(atThirty.y).toBeCloseTo(atSixty.y)
  })
})

describe('hasArrived', () => {
  it('counts anything within half a pixel as arrived', () => {
    expect(hasArrived({ x: 99.7, y: 50.2 }, target)).toBe(true)
    expect(hasArrived({ x: 98, y: 50 }, target)).toBe(false)
  })
})
