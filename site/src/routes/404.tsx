import { createFileRoute } from '@tanstack/react-router'
import { NotFound } from '../components/layout/NotFound/NotFound'
import { site } from '../content/site'
import { pageTitle } from '../utils/pageTitle/pageTitle'

export const Route = createFileRoute('/404')({
  head: () => ({
    meta: [{ title: pageTitle(site.notFound.title) }, { name: 'robots', content: 'noindex' }],
  }),
  component: NotFound,
})
