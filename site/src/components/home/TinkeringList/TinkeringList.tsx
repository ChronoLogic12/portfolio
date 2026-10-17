import { home } from '../../../content/home'
import { projectsIn } from '../../../projects/projects'
import { Container } from '../../layout/Container/Container'
import { ProjectLinks } from '../../ui/ProjectLinks/ProjectLinks'
import { SectionHeading } from '../SectionHeading/SectionHeading'
import styles from './TinkeringList.module.css'

export function TinkeringList() {
  const projects = projectsIn('tinkering')
  if (projects.length === 0) return null

  return (
    <section className={styles.section}>
      <Container>
        <SectionHeading {...home.sections.tinkering} />
        <ul className={styles.list}>
          {projects.map((project) => (
            <li key={project.slug} className={styles.item}>
              <div>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.summary}>{project.summary}</p>
              </div>
              <ProjectLinks project={project} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
