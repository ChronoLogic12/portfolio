export interface ProfileLink {
  label: string
  href: string
}

export const site = {
  name: 'Matthew Suttie',
  role: 'Software developer',
  description: 'Matthew Suttie, software developer in the UK. Projects in TypeScript, React and AWS.',
  profiles: [
    { label: 'GitHub', href: 'https://github.com/ChronoLogic12' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/matthew-suttie-756191212/' },
  ] satisfies ProfileLink[],
  cv: {
    label: 'CV',
    unavailable: "My CV isn't on the site yet. If you'd like a copy, get in touch on LinkedIn.",
  },
  projectLinks: {
    live: 'Live site',
    repo: 'Code',
    github: 'GitHub',
  },
  projectPage: {
    back: 'All projects',
    builtWith: 'Built with',
  },
  notFound: {
    title: 'Page not found',
    message: "There's nothing at this address. It may have moved, or never existed.",
    action: 'Back to the home page',
  },
}
