import { home } from '../../../content/home'
import { projectsIn } from '../../../projects/projects'
import { Container } from '../../layout/Container/Container'
import { ProjectCard } from '../ProjectCard/ProjectCard'
import { SectionHeading } from '../SectionHeading/SectionHeading'
import styles from './FeaturedProjects.module.css'

export function FeaturedProjects() {
  const [lead, ...rest] = projectsIn('featured')
  if (!lead) return null

  return (
    <section className={styles.section}>
      <Container>
        <SectionHeading {...home.sections.featured} />
        <div className={styles.grid}>
          <ProjectCard project={lead} wide />
          {rest.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  )
}
