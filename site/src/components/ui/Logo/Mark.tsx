import { MARK_ARC, MARK_COLOURS, MARK_DISC_RADIUS, MARK_RAYS, MARK_RAY_WIDTH, MARK_VIEW_BOX } from './markGeometry'

interface MarkProps {
  className?: string
  arcClassName?: string
  rayClassName?: string
  size?: number
  disc?: boolean
}

export function Mark({ className, arcClassName, rayClassName, size, disc = true }: MarkProps) {
  return (
    <svg className={className} width={size} height={size} viewBox={MARK_VIEW_BOX} aria-hidden="true">
      {disc && <circle r={MARK_DISC_RADIUS} fill={MARK_COLOURS.disc} />}
      <path
        className={arcClassName}
        d={MARK_ARC.d}
        fill="none"
        stroke={MARK_COLOURS.arc}
        strokeWidth={MARK_ARC.width}
        strokeLinecap="round"
      />
      {MARK_RAYS.map(({ opacity, ...line }) => (
        <line
          key={`${line.x2},${line.y2}`}
          className={rayClassName}
          {...line}
          stroke={MARK_COLOURS.rays}
          strokeWidth={MARK_RAY_WIDTH}
          strokeLinecap="round"
          opacity={opacity}
        />
      ))}
    </svg>
  )
}
