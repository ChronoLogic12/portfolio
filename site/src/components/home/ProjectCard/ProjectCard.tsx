import { Link } from '@tanstack/react-router'
import type { Project } from 'content-collections'
import { ProjectLinks } from '../../ui/ProjectLinks/ProjectLinks'
import { StackTags } from '../../ui/StackTags/StackTags'
import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  project: Project
  wide?: boolean
}

export function ProjectCard({ project, wide = false }: ProjectCardProps) {
  const classNames = [styles.card, wide && styles.wide, project.hasPage && styles.linked].filter(Boolean).join(' ')

  return (
    <article className={classNames}>
      <div className={styles.cover} aria-hidden="true">
        <span>{project.slug}</span>
      </div>
      <div className={styles.body}>
        {wide && <p className={styles.eyebrow}>Featured · {project.year}</p>}
        <h3 className={styles.title}>
          {project.hasPage ? (
            <Link to="/projects/$slug" params={{ slug: project.slug }} className={styles.cardLink}>
              {project.title}
            </Link>
          ) : (
            project.title
          )}
        </h3>
        <p className={styles.summary}>{project.summary}</p>
        <StackTags stack={project.stack} />
        <div className={styles.links}>
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  )
}
