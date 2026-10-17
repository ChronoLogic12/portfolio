import { Link } from '@tanstack/react-router'
import type { Project } from 'content-collections'
import { site } from '../../../content/site'
import { projectCover } from '../../../projects/covers'
import { Container } from '../../layout/Container/Container'
import { ProjectCover } from '../../ui/ProjectCover/ProjectCover'
import { ProjectLinks } from '../../ui/ProjectLinks/ProjectLinks'
import { StackTags } from '../../ui/StackTags/StackTags'
import { Prose } from '../Prose/Prose'
import styles from './ProjectPage.module.css'

export function ProjectPage({ project }: { project: Project }) {
  const cover = projectCover(project.slug)

  return (
    <article className={styles.page}>
      <Container>
        <div className={styles.column}>
          <Link to="/" hash="projects" className={styles.back}>
            ← {site.projectPage.back}
          </Link>
          <header className={styles.header}>
            <p className={styles.eyebrow}>
              {project.year}
              {project.role && ` · ${project.role}`}
            </p>
            <h1 className={styles.title}>{project.title}</h1>
            <p className={styles.summary}>{project.summary}</p>
            <div className={styles.meta}>
              <StackTags stack={project.stack} />
              <ProjectLinks project={project} />
            </div>
          </header>
          {cover && (
            <div className={styles.cover}>
              <ProjectCover
                picture={cover}
                alt={`Screenshot of ${project.title}`}
                sizes="(max-width: 760px) 100vw, 72ch"
                priority
              />
            </div>
          )}
          <Prose html={project.html} />
        </div>
      </Container>
    </article>
  )
}
