# Portfolio rebuild: plan

Living document. Draft written 16 Oct 2026 while planning; it moves into the new repo once that exists.

## Goal

Replace the 2022 Materialize site at matthewsuttie.com with a dark-first, polished site that introduces me as a developer and shows a few good projects. Audience is broad: recruiters, people I work with, and a general online presence. Running cost close to zero, and hosted the same way as gridtracker.uk so there is one way of doing things.

Out of scope for now: reviving Tippy and the other dead Heroku/Render apps, and polishing mortgage-tracker. Those can join the site later.

## Where things stand

| Thing                 | State                                                                                                                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| matthewsuttie.com     | Registered with Name.com, very likely through Netlify (registered 10 Mar 2022, **expires 10 Mar 2027**). DNS on Netlify (NS1). Apex redirects to `www`. No email                            |
| Live site             | `ms-portfolio-site` (v1): static HTML + Materialize on Netlify. Out-of-date About text and CV; Light Up (Heroku) is 404, Tippy (Render) times out                                           |
| `ms-portfolio-v2`     | Unfinished Django + React prototype from Oct 2024. Never deployed. Nothing worth carrying over                                                                                               |
| gridtracker.uk        | Route 53 domain and hosted zone, CloudFront flat-rate Free plan, CDK in `eu-west-2`, deployed by GitHub Actions with OIDC. The template for this site                                        |

## Decisions

| Area        | Choice                                                     | Notes                                                                                                                                                                                                   |
| ----------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repo        | New repo `portfolio`, npm workspaces `site/` + `infra/`    | Archive `ms-portfolio-site` and `ms-portfolio-v2` on GitHub after cutover                                                                                                                                |
| Build       | Vite, React 19, TypeScript                                 | Same toolchain and conventions as uk-grid-tracker (Prettier, oxlint, strict TS, Vitest, no comments)                                                                                                    |
| Rendering   | TanStack Start, static prerender                           | Every route is rendered to HTML at build time, so each project page has its own title and Open Graph tags and shared links get proper previews. Uses TanStack Router, as in grid tracker. No server at runtime: the output is plain files for S3 |
| Branding    | ChronoLogic logo for favicon and social images             | Name on the page is Matthew Suttie                                                                                                                                                                      |
| Contact     | No email address for now                                   | GitHub and LinkedIn only. Email on the domain is a separate learning exercise for later                                                                                                                |
| UI          | Radix Primitives (`radix-ui`) + Radix Colors               | Headless; the same look as grid tracker. Dialog, Tooltip, NavigationMenu, Tabs, etc.                                                                                                                    |
| Carousel    | Embla (`embla-carousel-react`)                             | Headless, small, the standard choice (shadcn's carousel is built on it). For screenshot galleries on project pages                                                                                       |
| Motion      | Motion (`motion`)                                          | Page transitions, scroll reveals, hover states. This is most of what makes it feel slick. Respect `prefers-reduced-motion`                                                                              |
| Styling     | CSS Modules + design tokens, Inter variable                | No Tailwind, matching grid tracker. Dark first; light theme later as a second token block                                                                                                               |
| Content     | Projects as MDX or Markdown + frontmatter in the repo       | No backend or CMS. Each project: title, one-liner, year, stack, links, cover image, write-up                                                                                                            |
| Hosting     | S3 + CloudFront (flat-rate Free plan) + Route 53, via CDK  | Same AWS account and region as grid tracker. Cert in `us-east-1` requested via CLI, pinned like `site-domain.ts`                                                                                         |
| Deploy      | GitHub Actions, OIDC role                                  | Copy grid tracker's `github-deploy-stack` pattern                                                                                                                                                         |
| Analytics   | GoatCounter, cookie-free                                   | Same as grid tracker; no consent banner                                                                                                                                                                 |

## Site shape (first version)

- **Home:** name, one-line intro, short About, links (GitHub, LinkedIn, CV), then a grid of featured projects
- **Project pages** (`/projects/<slug>`): what it is, why I built it, how it works, stack, screenshots (Embla gallery), live and repo links
- **Archive:** older projects as a compact list, no screenshots
- **CV:** updated PDF, plus maybe an `/about` page with experience
- 404 page

Project cards in a grid rather than a homepage carousel: a carousel hides all but one project and looks dated. Embla still earns its place inside project pages.

## Candidate projects

| Project             | Repo    | Status                     | Placement                                                                     |
| ------------------- | ------- | -------------------------- | ----------------------------------------------------------------------------- |
| UK grid tracker     | private | Live at gridtracker.uk     | Featured, the flagship. Link to the live site; repo stays private              |
| daisy-reverb        | private | Hardware/firmware          | Featured if you're happy to write it up; photos of the pedal would carry it   |
| pico-2-clock        | public  | Hardware                   | Featured or archive                                                            |
| This site           | public  | —                          | Featured (infra write-up)                                                      |
| Green Lawns Kennels | other   | Live client site           | Featured or archive                                                            |
| BookMarks           | public  | Live on Render             | Archive                                                                        |
| Yggdramor (dnd-5e)  | public  | Live on Netlify            | Archive                                                                        |
| EDF6 countdown      | public  | Live on Netlify            | Archive                                                                        |
| Spaceman, Volume    | public  | Live on GitHub Pages       | Archive                                                                        |
| Tippy, Light Up     | public  | Down                       | Archive with repo link only, until revived                                     |
| mortgage-tracker    | public  | Local only                 | Later                                                                          |

## Domain migration

No email on the domain, so the only risk is a few minutes of mixed DNS answers.

1. Create a Route 53 hosted zone for matthewsuttie.com and a `us-east-1` cert for apex + `www`; validate it with CNAMEs added in Netlify DNS first, so the cert is ready before the move
2. Deploy the new site to CloudFront and test it on its `*.cloudfront.net` address
3. Point the domain's nameservers at Route 53 (from Netlify's domain settings, or after transferring)
4. Transfer registration from Netlify/Name.com to Route 53 so both domains are managed in one place. Do it well before **10 Mar 2027**; a transfer adds a year
5. Decide apex vs `www` as the canonical host (grid tracker uses the apex; recommend the same) and 301 the other
6. Remove the site from Netlify. Leave the other Netlify sites (Yggdramor, EDF6) alone for now

## Phases

1. **Scaffold:** new repo, Vite + React + TS, tokens, layout, prerendering, CI (format, lint, typecheck, test)
   - Done: local repo, npm workspace `site/`, minimal TanStack Start app (`/` and `/about`), prerendering to `site/dist/client`, checked on a plain static server
   - Next: Prettier, oxlint, `tsc` typecheck, Vitest, CLAUDE.md, then tokens and the base layout. CI waits for the GitHub repo
2. **Design:** sketch home and one project page; agree the look before building out
3. **Content:** About text, updated CV, write-ups for featured projects, screenshots
4. **Infra:** CDK stack, cert, hosted zone, deploy role; deploy to the CloudFront address
5. **Cutover:** DNS move, then domain transfer, then archive the old repos and the Netlify site

## How we work

Understanding the code matters as much as shipping it. So:

- Build in small steps, one concept at a time, and explain each step's what and why before or as it lands, especially anything new (TanStack Start, prerendering, CDK constructs, CloudFront behaviours, DNS)
- Prefer writing code over adding a library when the code is short and teaches something
- Keep a short `docs/learning-notes.md` of the concepts covered and where they show up in the code, so they can be revisited
- Stop and check understanding before moving to the next phase

## Later

- Email on the domain: how it works (MX records, SPF/DKIM/DMARC), options (SES receiving, forwarding services, Workspace) and cost
- Revive Tippy; polish mortgage-tracker for hosting
- Light theme
