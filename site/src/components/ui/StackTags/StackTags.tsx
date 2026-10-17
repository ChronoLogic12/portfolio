import { site } from '../../../content/site'
import styles from './StackTags.module.css'

export function StackTags({ stack }: { stack: string[] }) {
  if (stack.length === 0) return null

  return (
    <ul className={styles.tags} aria-label={site.projectPage.builtWith}>
      {stack.map((item) => (
        <li key={item} className={styles.tag}>
          {item}
        </li>
      ))}
    </ul>
  )
}
