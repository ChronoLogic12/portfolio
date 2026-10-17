import { Mark } from '../Logo/Mark'
import styles from './Dial.module.css'

export function Dial({ className }: { className?: string }) {
  return (
    <Mark
      className={[styles.dial, className].filter(Boolean).join(' ')}
      arcClassName={styles.arc}
      rayClassName={styles.ray}
      disc={false}
    />
  )
}
