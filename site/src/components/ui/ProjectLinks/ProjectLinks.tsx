import type { Project } from 'content-collections'
import { site } from '../../../content/site'
import { buttonClass } from '../Button/buttonClass'
import { ExternalLink } from '../ExternalLink/ExternalLink'
import styles from './ProjectLinks.module.css'

interface ProjectLinksProps {
  project: Project
  size?: 'default' | 'small'
}

export function ProjectLinks({ project, size = 'small' }: ProjectLinksProps) {
  const { live, repo } = project.links
  if (!live && !repo) return null
  const className = buttonClass({ size })

  return (
    <ul className={styles.links}>
      {live && (
        <li>
          <ExternalLink href={live} className={className} aria-label={`${project.title}: ${site.projectLinks.live}`}>
            {site.projectLinks.live} ↗
          </ExternalLink>
        </li>
      )}
      {repo && (
        <li>
          <ExternalLink href={repo} className={className} aria-label={`${project.title}: ${site.projectLinks.repo}`}>
            {site.projectLinks.repo} ↗
          </ExternalLink>
        </li>
      )}
    </ul>
  )
}
