import type { Project } from 'content-collections'
import { site } from '../../../content/site'
import { ExternalLink } from '../ExternalLink/ExternalLink'
import styles from './ProjectLinks.module.css'

export function ProjectLinks({ project }: { project: Project }) {
  const { live, repo } = project.links
  if (!live && !repo) return null

  return (
    <ul className={styles.links}>
      {live && (
        <li>
          <ExternalLink href={live} className={styles.link} aria-label={`${project.title}: ${site.projectLinks.live}`}>
            {site.projectLinks.live} ↗
          </ExternalLink>
        </li>
      )}
      {repo && (
        <li>
          <ExternalLink href={repo} className={styles.link} aria-label={`${project.title}: ${site.projectLinks.repo}`}>
            {site.projectLinks.repo} ↗
          </ExternalLink>
        </li>
      )}
    </ul>
  )
}
