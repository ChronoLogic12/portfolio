import { createFileRoute } from '@tanstack/react-router'
import { Container } from '../components/layout/Container/Container'
import { pageTitle } from '../utils/pageTitle/pageTitle'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [{ title: pageTitle('About') }],
  }),
  component: About,
})

function About() {
  return (
    <Container>
      <h1>About</h1>
    </Container>
  )
}
