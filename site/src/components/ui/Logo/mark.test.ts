import { describe, expect, it } from 'vitest'
import { MARK_RAYS, rayRestingOpacity } from './mark'

describe('rayRestingOpacity', () => {
  it('fades from fully opaque at the top ray', () => {
    expect(rayRestingOpacity(0)).toBe(1)
  })

  it('gives clean two-decimal values for every ray', () => {
    expect(MARK_RAYS.map((_, index) => rayRestingOpacity(index))).toEqual([1, 0.91, 0.82, 0.73, 0.64, 0.55, 0.46])
  })
})
