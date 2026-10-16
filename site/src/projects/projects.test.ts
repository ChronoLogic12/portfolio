import type { Project } from 'content-collections'
import { describe, expect, it } from 'vitest'
import { projectsIn } from './projects'

const project = (slug: string, section: Project['section'], order: number) => ({ slug, section, order }) as Project

describe('projectsIn', () => {
  const projects = [
    project('b', 'featured', 2),
    project('archived', 'archive', 1),
    project('a', 'featured', 1),
    project('tinker', 'tinkering', 1),
  ]

  it('keeps only the projects in the section, in order', () => {
    expect(projectsIn('featured', projects).map(({ slug }) => slug)).toEqual(['a', 'b'])
  })

  it('does not reorder the original list', () => {
    projectsIn('featured', projects)
    expect(projects[0].slug).toBe('b')
  })

  it('reads the real content when no list is given', () => {
    expect(projectsIn('featured').length).toBeGreaterThan(0)
  })
})
