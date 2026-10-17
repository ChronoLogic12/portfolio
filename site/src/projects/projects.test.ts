import type { Project } from 'content-collections'
import { describe, expect, it } from 'vitest'
import { findProjectPage, projectsIn } from './projects'

const project = (slug: string, section: Project['section'], order: number, hasPage = false) =>
  ({ slug, section, order, hasPage }) as Project

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

describe('findProjectPage', () => {
  const projects = [project('written-up', 'featured', 1, true), project('no-write-up', 'tinkering', 1)]

  it('finds a project that has a write-up', () => {
    expect(findProjectPage('written-up', projects)?.slug).toBe('written-up')
  })

  it('treats a project without a write-up as having no page', () => {
    expect(findProjectPage('no-write-up', projects)).toBeUndefined()
  })

  it('returns nothing for an unknown slug', () => {
    expect(findProjectPage('missing', projects)).toBeUndefined()
  })
})
