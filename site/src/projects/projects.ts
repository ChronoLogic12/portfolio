import { allProjects } from 'content-collections'
import type { Project } from 'content-collections'

export type ProjectSection = Project['section']

export const projectsIn = (section: ProjectSection, projects: Project[] = allProjects) =>
  projects.filter((project) => project.section === section).toSorted((a, b) => a.order - b.order)

export const findProjectPage = (slug: string, projects: Project[] = allProjects) =>
  projects.find((project) => project.slug === slug && project.hasPage)
