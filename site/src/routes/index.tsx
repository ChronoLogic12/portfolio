import { createFileRoute } from '@tanstack/react-router'
import { Container } from '../components/layout/Container/Container'
import { site } from '../content/site'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <Container>
      <h1>{site.name}</h1>
      <p>{site.role}</p>
    </Container>
  )
}
