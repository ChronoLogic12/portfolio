import type { ReactNode } from 'react'
import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import { NotFound } from '../components/layout/NotFound/NotFound'
import { SiteFooter } from '../components/layout/SiteFooter/SiteFooter'
import { TooltipProvider } from '../components/ui/Tooltip/Tooltip'
import { site } from '../content/site'
import { pageTitle } from '../utils/pageTitle/pageTitle'
import '../styles/global.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'color-scheme', content: 'dark' },
      { name: 'theme-color', content: '#0c0d0f' },
      { title: pageTitle() },
      { name: 'description', content: site.description },
    ],
    links: [
      { rel: 'icon', type: 'image/png', sizes: '64x64', href: '/favicon.png' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/manifest.webmanifest' },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
})

function RootComponent() {
  return (
    <RootDocument>
      <TooltipProvider delayDuration={200}>
        <main>
          <Outlet />
        </main>
        <SiteFooter />
      </TooltipProvider>
    </RootDocument>
  )
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
