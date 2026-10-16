interface Point {
  clientX: number
  clientY: number
}

interface Box {
  left: number
  top: number
}

export const pointerOffset = ({ clientX, clientY }: Point, { left, top }: Box) => ({
  x: clientX - left,
  y: clientY - top,
})
