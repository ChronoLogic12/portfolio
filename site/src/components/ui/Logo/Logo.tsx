import { MARK_ARC, MARK_RAYS, MARK_VIEW_BOX, rayRestingOpacity } from './mark'
import styles from './Logo.module.css'

interface LogoProps {
  size?: number
  className?: string
}

export function Logo({ size = 28, className }: LogoProps) {
  return (
    <svg
      className={[styles.logo, className].filter(Boolean).join(' ')}
      width={size}
      height={size}
      viewBox={MARK_VIEW_BOX}
      aria-hidden="true"
    >
      <path className={styles.arc} d={MARK_ARC} />
      {MARK_RAYS.map((ray, index) => (
        <line
          key={`${ray.x2},${ray.y2}`}
          className={styles.ray}
          {...ray}
          style={{ opacity: rayRestingOpacity(index) }}
        />
      ))}
    </svg>
  )
}
