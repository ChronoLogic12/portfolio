import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <main>
      <h1>Matthew Suttie</h1>
      <p>Software developer.</p>
      <Link to="/about">About</Link>
    </main>
  )
}
