import { createFileRoute, notFound } from '@tanstack/react-router'
import { ProjectPage } from '../../components/project/ProjectPage/ProjectPage'
import { findProjectPage } from '../../projects/projects'
import { pageTitle } from '../../utils/pageTitle/pageTitle'

export const Route = createFileRoute('/projects/$slug')({
  loader: ({ params }) => {
    const project = findProjectPage(params.slug)
    if (!project) throw notFound()
    return project
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: pageTitle(loaderData.title) },
          { name: 'description', content: loaderData.summary },
          { property: 'og:title', content: loaderData.title },
          { property: 'og:description', content: loaderData.summary },
          { property: 'og:type', content: 'article' },
        ]
      : [],
  }),
  component: Project,
})

function Project() {
  const project = Route.useLoaderData()
  return <ProjectPage project={project} />
}
