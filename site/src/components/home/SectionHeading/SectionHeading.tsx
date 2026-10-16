import styles from './SectionHeading.module.css'

interface SectionHeadingProps {
  id: string
  title: string
  note?: string
}

export function SectionHeading({ id, title, note }: SectionHeadingProps) {
  return (
    <div className={styles.heading}>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {note && <p className={styles.note}>{note}</p>}
    </div>
  )
}
