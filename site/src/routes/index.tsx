import { createFileRoute } from '@tanstack/react-router'
import { ArchiveList } from '../components/home/ArchiveList/ArchiveList'
import { FeaturedProjects } from '../components/home/FeaturedProjects/FeaturedProjects'
import { Hero } from '../components/home/Hero/Hero'
import { TinkeringList } from '../components/home/TinkeringList/TinkeringList'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <TinkeringList />
      <ArchiveList />
    </>
  )
}
