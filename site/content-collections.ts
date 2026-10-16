import { defineCollection, defineConfig } from '@content-collections/core'
import { z } from 'zod'

const projects = defineCollection({
  name: 'projects',
  directory: 'content/projects',
  include: '*.md',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.number().int().min(2015).max(2100),
    section: z.enum(['featured', 'tinkering', 'archive']),
    order: z.number().int(),
    role: z.string().optional(),
    stack: z.array(z.string()).default([]),
    links: z
      .object({
        live: z.url().optional(),
        repo: z.url().optional(),
      })
      .default({}),
    content: z.string(),
  }),
  transform: (project) => ({
    ...project,
    slug: project._meta.path,
  }),
})

export default defineConfig({
  content: [projects],
})
