import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMarkdown } from '@content-collections/markdown'
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
    screenshot: z.url().optional(),
    content: z.string(),
  }),
  transform: async (project, context) => {
    const { content, ...rest } = project
    return {
      ...rest,
      slug: project._meta.path,
      hasPage: content.trim().length > 0,
      html: await compileMarkdown(context, project),
    }
  },
})

export default defineConfig({
  content: [projects],
})
