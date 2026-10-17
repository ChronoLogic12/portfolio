import type { Project } from 'content-collections'
import { site } from '../../../content/site'
import { isGitHub } from '../../../utils/isGitHub/isGitHub'
import { buttonClass } from '../Button/buttonClass'
import { ExternalLink } from '../ExternalLink/ExternalLink'
import { GitHubIcon } from '../icons/GitHubIcon'
import styles from './ProjectLinks.module.css'

interface ProjectLinksProps {
  project: Project
  size?: 'default' | 'small'
}

export function ProjectLinks({ project, size = 'small' }: ProjectLinksProps) {
  const { live, repo } = project.links
  if (!live && !repo) return null
  const repoLabel = repo && isGitHub(repo) ? site.projectLinks.github : site.projectLinks.repo

  return (
    <ul className={styles.links}>
      {live && (
        <li>
          <ExternalLink
            href={live}
            className={buttonClass({ variant: 'accent', size })}
            aria-label={`${project.title}: ${site.projectLinks.live}`}
          >
            {site.projectLinks.live} ↗
          </ExternalLink>
        </li>
      )}
      {repo && (
        <li>
          <ExternalLink
            href={repo}
            className={buttonClass({ variant: 'strong', size })}
            aria-label={`${project.title}: ${repoLabel}`}
          >
            {isGitHub(repo) && <GitHubIcon size={size === 'small' ? 12 : 14} />}
            {repoLabel}
          </ExternalLink>
        </li>
      )}
    </ul>
  )
}
