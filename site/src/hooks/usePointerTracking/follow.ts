export interface Point {
  x: number
  y: number
}

const FRAME_MS = 1000 / 60

export const followStep = (current: Point, target: Point, ratePerFrame: number, elapsedMs: number): Point => {
  const share = 1 - (1 - ratePerFrame) ** (elapsedMs / FRAME_MS)
  return {
    x: current.x + (target.x - current.x) * share,
    y: current.y + (target.y - current.y) * share,
  }
}

export const hasArrived = (current: Point, target: Point, tolerance = 0.5) =>
  Math.abs(target.x - current.x) < tolerance && Math.abs(target.y - current.y) < tolerance
