import { Link, createFileRoute } from '@tanstack/react-router'
import { pageTitle } from '../utils/pageTitle/pageTitle'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [{ title: pageTitle('About') }],
  }),
  component: About,
})

function About() {
  return (
    <main>
      <h1>About</h1>
      <Link to="/">Home</Link>
    </main>
  )
}
