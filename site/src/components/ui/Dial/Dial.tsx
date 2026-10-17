import { Mark } from '../Logo/Mark'
import styles from './Dial.module.css'

export function Dial({ className }: { className?: string }) {
  return (
    <div className={[styles.dial, className].filter(Boolean).join(' ')} aria-hidden="true">
      <Mark className={styles.face} disc={false} />
      <Mark className={styles.hand} arcClassName={styles.handArc} rayClassName={styles.handRay} disc={false} />
    </div>
  )
}
