import type { Project } from 'content-collections'
import { home } from '../../../content/home'
import { ExternalLink } from '../../ui/ExternalLink/ExternalLink'
import styles from './ProjectLinks.module.css'

export function ProjectLinks({ project }: { project: Project }) {
  const { live, repo } = project.links
  if (!live && !repo) return null

  return (
    <ul className={styles.links}>
      {live && (
        <li>
          <ExternalLink href={live} className={styles.link} aria-label={`${project.title}: ${home.projectLinks.live}`}>
            {home.projectLinks.live} ↗
          </ExternalLink>
        </li>
      )}
      {repo && (
        <li>
          <ExternalLink href={repo} className={styles.link} aria-label={`${project.title}: ${home.projectLinks.repo}`}>
            {home.projectLinks.repo} ↗
          </ExternalLink>
        </li>
      )}
    </ul>
  )
}
