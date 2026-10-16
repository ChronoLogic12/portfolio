import styles from './Logo.module.css'

const RAYS = [
  [0, -8, 0, -34],
  [4, -7, 19, -33],
  [7, -4, 33, -19],
  [8, 0, 38, 0],
  [7, 4, 33, 19],
  [4, 7, 19, 33],
  [0, 8, 0, 34],
] as const

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
      viewBox="-50 -50 100 100"
      aria-hidden="true"
    >
      <path className={styles.arc} d="M0 -44 A44 44 0 0 0 0 44" />
      {RAYS.map(([x1, y1, x2, y2], index) => (
        <line
          key={`${x2},${y2}`}
          className={styles.ray}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          style={{ opacity: 1 - index * 0.09 }}
        />
      ))}
    </svg>
  )
}
