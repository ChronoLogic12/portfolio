import type { CSSProperties } from 'react'
import { MARK_ARC, MARK_RAYS, MARK_VIEW_BOX, rayRestingOpacity } from '../Logo/mark'
import styles from './Dial.module.css'

export function Dial({ className }: { className?: string }) {
  return (
    <svg className={[styles.dial, className].filter(Boolean).join(' ')} viewBox={MARK_VIEW_BOX} aria-hidden="true">
      <path className={styles.arc} d={MARK_ARC} />
      {MARK_RAYS.map((ray, index) => (
        <line
          key={`${ray.x2},${ray.y2}`}
          className={styles.ray}
          {...ray}
          style={{ '--step': index, '--resting-opacity': rayRestingOpacity(index) } as CSSProperties}
        />
      ))}
    </svg>
  )
}
