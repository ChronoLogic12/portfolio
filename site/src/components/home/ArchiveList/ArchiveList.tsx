import { home } from '../../../content/home'
import { projectsIn } from '../../../projects/projects'
import { Container } from '../../layout/Container/Container'
import { ProjectLinks } from '../../ui/ProjectLinks/ProjectLinks'
import { SectionHeading } from '../SectionHeading/SectionHeading'
import styles from './ArchiveList.module.css'

export function ArchiveList() {
  const projects = projectsIn('archive')
  if (projects.length === 0) return null

  return (
    <section className={styles.section}>
      <Container>
        <SectionHeading {...home.sections.archive} />
        <ul className={styles.list}>
          {projects.map((project) => (
            <li key={project.slug} className={styles.row}>
              <span className={styles.year}>{project.year}</span>
              <div>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.summary}>
                  {project.summary}
                  {project.role && <span className={styles.role}> · {project.role}</span>}
                </p>
              </div>
              <ProjectLinks project={project} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
