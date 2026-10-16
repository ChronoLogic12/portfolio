export const MARK_VIEW_BOX = '-50 -50 100 100'

export const MARK_ARC = 'M0 -44 A44 44 0 0 0 0 44'

export const MARK_RAYS = [
  { x1: 0, y1: -8, x2: 0, y2: -34 },
  { x1: 4, y1: -7, x2: 19, y2: -33 },
  { x1: 7, y1: -4, x2: 33, y2: -19 },
  { x1: 8, y1: 0, x2: 38, y2: 0 },
  { x1: 7, y1: 4, x2: 33, y2: 19 },
  { x1: 4, y1: 7, x2: 19, y2: 33 },
  { x1: 0, y1: 8, x2: 0, y2: 34 },
] as const

export const rayRestingOpacity = (index: number) => Math.round((1 - index * 0.09) * 100) / 100
