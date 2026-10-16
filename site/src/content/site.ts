import type { FileRouteTypes } from '../routeTree.gen'

export interface NavItem {
  label: string
  to: FileRouteTypes['to']
  hash?: string
}

export interface ProfileLink {
  label: string
  href: string
}

export const site = {
  name: 'Matthew Suttie',
  role: 'Software developer',
  nav: [
    { label: 'Projects', to: '/', hash: 'projects' },
    { label: 'About', to: '/about' },
  ] satisfies NavItem[],
  profiles: [
    { label: 'GitHub', href: 'https://github.com/ChronoLogic12' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/matthew-suttie-756191212/' },
  ] satisfies ProfileLink[],
}
