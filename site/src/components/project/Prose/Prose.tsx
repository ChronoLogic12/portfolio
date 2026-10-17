import styles from './Prose.module.css'

export function Prose({ html }: { html: string }) {
  return <div className={styles.prose} dangerouslySetInnerHTML={{ __html: html }} />
}
