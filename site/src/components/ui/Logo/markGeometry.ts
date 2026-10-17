export const MARK_VIEW_BOX = '-50 -50 100 100'

export const MARK_COLOURS = {
  disc: '#212121',
  arc: '#41aea9',
  rays: '#a6f6f1',
} as const

export const MARK_DISC_RADIUS = 50

export const MARK_ARC = {
  d: 'M0 44.81 C-24.42 44.57 -44.37 24.52 -44.5 0.24 C-44.65 -24.22 -24.61 -44.6 0 -44.84',
  width: 3.1,
} as const

export const MARK_RAY_WIDTH = 1.16

export const MARK_RAYS = [
  { x1: 0.05, y1: -5.74, x2: 0.05, y2: -38.8, opacity: 1 },
  { x1: 2.99, y1: -4.96, x2: 19.16, y2: -33.65, opacity: 0.92 },
  { x1: 4.85, y1: -3.06, x2: 33.03, y2: -19.59, opacity: 0.83 },
  { x1: 5.59, y1: 0, x2: 38.13, y2: 0, opacity: 0.75 },
  { x1: 4.85, y1: 2.9, x2: 33.04, y2: 19.41, opacity: 0.67 },
  { x1: 2.92, y1: 4.93, x2: 19.18, y2: 33.56, opacity: 0.56 },
  { x1: 0.05, y1: 5.77, x2: 0.05, y2: 38.83, opacity: 0.5 },
] as const
