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
    unavailable:
      "An up to date version of my CV isn't currently available. If you would like any additional information please get in touch with me on LinkedIn.",
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
