import { describe, expect, it } from 'vitest'
import { MARK_RAYS } from './markGeometry'

describe('MARK_RAYS', () => {
  it('runs clockwise from the top, so the dial sweeps in order', () => {
    expect(MARK_RAYS[0].y2).toBeLessThan(0)
    expect(MARK_RAYS[3].y2).toBe(0)
    expect(MARK_RAYS.at(-1)?.y2).toBeGreaterThan(0)
  })

  it('fades as it goes round, matching the logo', () => {
    const opacities = MARK_RAYS.map(({ opacity }) => opacity)
    expect(opacities).toEqual(opacities.toSorted((a, b) => b - a))
  })
})
