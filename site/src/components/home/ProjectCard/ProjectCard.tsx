import type { Project } from 'content-collections'
import { ProjectLinks } from '../ProjectLinks/ProjectLinks'
import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  project: Project
  wide?: boolean
}

export function ProjectCard({ project, wide = false }: ProjectCardProps) {
  return (
    <article className={wide ? `${styles.card} ${styles.wide}` : styles.card}>
      <div className={styles.cover} aria-hidden="true">
        <span>{project.slug}</span>
      </div>
      <div className={styles.body}>
        {wide && <p className={styles.eyebrow}>Featured · {project.year}</p>}
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.summary}>{project.summary}</p>
        {project.stack.length > 0 && (
          <ul className={styles.stack} aria-label="Built with">
            {project.stack.map((item) => (
              <li key={item} className={styles.tag}>
                {item}
              </li>
            ))}
          </ul>
        )}
        <ProjectLinks project={project} />
      </div>
    </article>
  )
}
