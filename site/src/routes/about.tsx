import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [{ title: 'About · Matthew Suttie' }],
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
