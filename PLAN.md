# Portfolio rebuild: plan

Living document. Draft written 16 Oct 2026 while planning; it moves into the new repo once that exists.

## Goal

Replace the 2022 Materialize site at matthewsuttie.com with a dark-first, polished site that introduces me as a developer and shows a few good projects. Audience is broad: recruiters, people I work with, and a general online presence. Running cost close to zero, and hosted the same way as gridtracker.uk so there is one way of doing things.

Out of scope for now: reviving Tippy and the other dead Heroku/Render apps, and polishing mortgage-tracker. Those can join the site later.

## Where things stand

| Thing             | State                                                                                                                                                            |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| matthewsuttie.com | Registered with Name.com, very likely through Netlify (registered 10 Mar 2022, **expires 10 Mar 2027**). DNS on Netlify (NS1). Apex redirects to `www`. No email |
| Live site         | `ms-portfolio-site` (v1): static HTML + Materialize on Netlify. Out-of-date About text and CV; Light Up (Heroku) is 404, Tippy (Render) times out                |
| `ms-portfolio-v2` | Unfinished Django + React prototype from Oct 2024. Never deployed. Nothing worth carrying over                                                                   |
| gridtracker.uk    | Route 53 domain and hosted zone, CloudFront flat-rate Free plan, CDK in `eu-west-2`, deployed by GitHub Actions with OIDC. The template for this site            |

## Decisions

| Area      | Choice                                                    | Notes                                                                                                                                                                                                                                            |
| --------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Repo      | New repo `portfolio`, npm workspaces `site/` + `infra/`   | Archive `ms-portfolio-site` and `ms-portfolio-v2` on GitHub after cutover                                                                                                                                                                        |
| Build     | Vite, React 19, TypeScript                                | Same toolchain and conventions as uk-grid-tracker (Prettier, oxlint, strict TS, Vitest, no comments)                                                                                                                                             |
| Rendering | TanStack Start, static prerender                          | Every route is rendered to HTML at build time, so each project page has its own title and Open Graph tags and shared links get proper previews. Uses TanStack Router, as in grid tracker. No server at runtime: the output is plain files for S3 |
| Branding  | ChronoLogic logo for favicon and social images            | Name on the page is Matthew Suttie                                                                                                                                                                                                               |
| Contact   | No email address for now                                  | GitHub and LinkedIn only. Email on the domain is a separate learning exercise for later                                                                                                                                                          |
| UI        | Radix Primitives (`radix-ui`) + Radix Colors              | Headless; the same look as grid tracker. Dialog, Tooltip, NavigationMenu, Tabs, etc.                                                                                                                                                             |
| Carousel  | Embla (`embla-carousel-react`)                            | Headless, small, the standard choice (shadcn's carousel is built on it). For screenshot galleries on project pages                                                                                                                               |
| Motion    | Motion (`motion`)                                         | Page transitions, scroll reveals, hover states. This is most of what makes it feel slick. Respect `prefers-reduced-motion`                                                                                                                       |
| Styling   | CSS Modules + design tokens, Inter variable               | No Tailwind, matching grid tracker. Dark first; light theme later as a second token block                                                                                                                                                        |
| Content   | Content kept apart from layout, in files in the repo      | No backend or CMS. See "Content model" below                                                                                                                                                                                                     |
| Hosting   | S3 + CloudFront (flat-rate Free plan) + Route 53, via CDK | Same AWS account and region as grid tracker. Cert in `us-east-1` requested via CLI, pinned like `site-domain.ts`                                                                                                                                 |
| Deploy    | GitHub Actions, OIDC role                                 | Copy grid tracker's `github-deploy-stack` pattern                                                                                                                                                                                                |
| Analytics | GoatCounter, cookie-free                                  | Same as grid tracker; no consent banner                                                                                                                                                                                                          |

## Design

Direction A, "Instrument", chosen 16 Oct 2026. Sketch: `design/directions.html` (A with toggles; C kept for reference).

- **Palette:** near-black `#0c0d0f` background, Radix slate for surfaces, borders and text, Radix teal as the one accent (teal-9 fills, teal-11 text and lines). Teal ties together the logo, grid tracker and this site
- **Type:** Inter for everything; JetBrains Mono for small labels (eyebrow, section heads, tags, years)
- **Layout:** wide max width (~1120px). Hero with intro and links on the left, the dial on the right. Selected work as a card grid with one wide featured card. Tinkering as small dashed rows. Archive as a plain list
- **The ChronoLogic dial is the signature.** The logo (no disc) with a clock hand sweeping round it: a masked, brighter copy of the mark rotates with a fading trail, lighting the rays and then the arc. Static under `prefers-reduced-motion`. The disc is kept for the favicon and app icons
- **Grid with a mouse glow:** faint grid lines behind the hero, faded at the edges. Under the mouse the lines (plus a very faint fill) light up teal in a ~220px circle. Mouse only; touch devices just see the static grid
- **Not doing:** the blinking cursor (too much alongside the rest), the static glow. Possible later: a subtle cursor that types in the subheading

## Content model

Content stays separate from layout so the prose and what appears where can change without touching components.

- **Projects:** one file per project with frontmatter (title, slug, summary, year, stack, links, cover image, `section: featured | tinkering | archive`, `order`) and a Markdown/MDX body for the write-up
- **Site copy:** hero eyebrow, headline, intro, link list, section titles and notes in one typed content file
- Components only read this content; changing placement is a frontmatter edit
- Schema validated at build time (zod), so a typo fails the build instead of shipping a broken page

## Site shape (first version)

- **Home:** no site header. The hero carries the name, a one-line intro, links (projects, GitHub, LinkedIn) and the dial; then Selected work, Tinkering and Archive. About content (bio, CV) becomes a section on the home page, not a separate page
- **Project pages** (`/projects/<slug>`): what it is, why I built it, how it works, stack, screenshots (Embla gallery), live and repo links
- **Archive:** older projects as a compact list, no screenshots
- **CV:** updated PDF, linked from the hero and the About section
- 404 page

Project cards in a grid rather than a homepage carousel: a carousel hides all but one project and looks dated. Embla still earns its place inside project pages.

## Candidate projects

| Project             | Repo    | Status                 | Placement                                                         |
| ------------------- | ------- | ---------------------- | ----------------------------------------------------------------- |
| UK grid tracker     | private | Live at gridtracker.uk | Featured, the flagship. Link to the live site; repo stays private |
| This site           | public  | —                      | Featured (infra write-up)                                         |
| Green Lawns Kennels | other   | Live client site       | Featured. Description needs confirming                            |
| daisy-reverb        | private | Hardware/firmware      | Tinkering. AI-assisted experiments, not a focus                   |
| pico-2-clock        | public  | Hardware               | Tinkering                                                         |
| BookMarks           | public  | Live on Render         | Featured, fourth. Live and updated in 2026                        |
| Yggdramor (dnd-5e)  | public  | Live on Netlify        | Featured. Still in use; may want some polish                      |
| EDF6 countdown      | public  | Live on Netlify        | Archive                                                           |
| Spaceman, Volume    | public  | Live on GitHub Pages   | Archive                                                           |
| Tippy, Light Up     | public  | Down                   | Archive with repo link only, until revived                        |
| mortgage-tracker    | public  | Local only             | Later                                                             |

## Domain migration

No email on the domain, so the only risk is a few minutes of mixed DNS answers.

1. Create a Route 53 hosted zone for matthewsuttie.com and a `us-east-1` cert for apex + `www`; validate it with CNAMEs added in Netlify DNS first, so the cert is ready before the move
2. Deploy the new site to CloudFront and test it on its `*.cloudfront.net` address
3. Point the domain's nameservers at Route 53 (from Netlify's domain settings, or after transferring)
4. Transfer registration from Netlify/Name.com to Route 53 so both domains are managed in one place. Do it well before **10 Mar 2027**; a transfer adds a year
5. Decide apex vs `www` as the canonical host (grid tracker uses the apex; recommend the same) and 301 the other
6. Remove the site from Netlify. Leave the other Netlify sites (Yggdramor, EDF6) alone for now

## Infrastructure design (draft, 17 Oct 2026)

Same AWS account (797286749899) and region (eu-west-2) as grid tracker, following its patterns. New npm workspace `infra/` with a CDK app in TypeScript.

**Stacks**

- **`PortfolioSite`**: private S3 bucket (no public access; CloudFront reads it through Origin Access Control), a CloudFront distribution on the flat-rate **Free** plan (the account allows three; grid tracker uses one), and two `BucketDeployment`s: hashed `assets/` cached for a year, pages revalidated on every request and invalidated on deploy
- **`PortfolioGitHubDeploy`**: an IAM role that only `main` of `ChronoLogic12/portfolio` can assume from GitHub Actions (immutable OIDC subject), and which can only assume the CDK deploy roles. No AWS keys in GitHub

**Serving prerendered pages from S3.** S3 doesn't know that `/projects/yggdramor` means `projects/yggdramor/index.html`. A small CloudFront Function on viewer requests rewrites any path without a file extension to `<path>/index.html` (dropping a trailing slash). Missing files come back from S3 as 403, which CloudFront turns into the prerendered 404 page with a 404 status.

**Shared account set-up (agreed in principle 17 Oct 2026)**

The default CDK bootstrap runs CloudFormation with `UkGridTrackerCfnExecution`, a policy limited to grid tracker's resources, so it would refuse to create portfolio resources. And AWS allows one GitHub OIDC provider per account, which `UkGridTrackerGitHubDeploy` currently owns. Rather than solve both inside one project, a small **account repo** (`aws-account-management`, private) owns everything shared:

- **`GitHubOidc` stack**: the one GitHub OIDC provider, which every project's deploy role references
- **`ProjectAccess` stack**: for each project, a CloudFormation execution policy and a role boundary, generated from one template function. Every project gets the same base (its own name-prefixed buckets, roles and logs, CloudFront, bootstrap reads, roles that must keep the boundary) plus only the extras it needs: Lambda, schedules and alarms for grid tracker; nothing extra for the portfolio yet; a hosted zone and certificate for each once its domain moves. Adding a project is a few lines here
- Each project bootstraps once with its own qualifier, pointing at its policy: `cdk bootstrap --qualifier <project> --cloudformation-execution-policies <ProjectCfnExecution>`. Grid tracker keeps the default qualifier it already has, so its deploys don't change
- The account repo is deployed by hand with the admin profile. It changes rarely, and it's the only thing with that much access

**Moving grid tracker over safely** (the OIDC provider can't exist twice, and deleting it would break grid tracker's deploys):

1. Grid tracker: set the provider to `RETAIN` and deploy, so removing it from that stack later keeps it in AWS
2. Grid tracker: reference the provider by ARN instead of creating it, and deploy. CloudFormation forgets it, but it stays in AWS
3. Account repo: bring the existing provider under `GitHubOidc` with `cdk import`
4. Move grid tracker's execution policy and boundary, which were created by hand from its scripts, into `ProjectAccess` the same way. `cdk diff` must show no permission changes for grid tracker

**Progress (17 Oct 2026):** steps 1 and the code for 2 are done. `infra/` synthesises with tests. `../aws-account-management` (local, private, not on GitHub yet) has the policy template, tested to reproduce grid tracker's policies exactly, and an `AccountProjectAccess` stack for the portfolio. Nothing is deployed. Waiting on an AWS sign-in.

**Order**

1. Infra workspace, stacks and CDK unit tests (synth only, no AWS needed)
2. Account repo with the policy template; portfolio policies deployed, then `cdk bootstrap --qualifier portfolio` (needs an AWS sign-in). The grid tracker move can follow separately; the portfolio only needs the OIDC provider to exist, not where it lives
3. First deploy from this machine, then subscribe the distribution to the Free plan in the console
4. Check the site on its `*.cloudfront.net` address: pages, project pages, 404, caching headers
5. Deploy role and a deploy job in CI, so every push to `main` goes live
6. Later, with the domain move: Route 53 hosted zone, a us-east-1 certificate, apex and `www` aliases, redirect `www` to the apex

## Phases

1. **Scaffold:** new repo, Vite + React + TS, tokens, layout, prerendering, CI (format, lint, typecheck, test)
   - Done: local repo, npm workspace `site/`, minimal TanStack Start app (`/` and `/about`), prerendering to `site/dist/client`, checked on a plain static server. Prettier, oxlint, typecheck, Vitest, `npm run check`, CLAUDE.md
   - Done: design tokens, fonts, global styles, `content/site.ts`, header, footer, Logo, Container
   - Done: home hero with the live dial, grid backdrop and mouse glow
   - Done: project content collection (14 projects, zod-validated), Selected work, Tinkering and Archive sections
   - Done: project pages (`/projects/$slug`) for any project with a Markdown write-up, starter write-ups for the three featured projects, 404 page, per-page titles and descriptions
   - Done: favicon and app icons generated from the logo geometry, web manifest, CI workflow (format, lint, typecheck, test, build)
   - Done: real ChronoLogic logo and colours, no site header (name in the hero), clock-hand dial, unavailable CV button with tooltip, BookMarks featured, cover screenshots (`npm run screenshots`) optimised to AVIF and WebP at build time
   - Next: Open Graph image, About section (needs Matthew), mobile pass, then the AWS infrastructure. Write-up prose needs a pass from Matthew
2. **Design:** sketch home and one project page; agree the look before building out
3. **Content:** About text, updated CV, write-ups for featured projects, screenshots
4. **Infra:** CDK stack, cert, hosted zone, deploy role; deploy to the CloudFront address
5. **Cutover:** DNS move, then domain transfer, then archive the old repos and the Netlify site

## How we work

Understanding the code matters as much as shipping it. So:

- Build in small steps, one concept at a time, and explain each step's what and why before or as it lands, especially anything new (TanStack Start, prerendering, CDK constructs, CloudFront behaviours, DNS)
- Prefer writing code over adding a library when the code is short and teaches something
- Keep a short `docs/learning-notes.md` of the concepts covered and where they show up in the code, so they can be revisited. It is gitignored, so it stays local
- Stop and check understanding before moving to the next phase

## Later

- Mobile pass: check every page at phone widths (hero, dial, cards, archive rows, project pages) and fix what doesn't work
- Headline colour: try a brighter take on the arc teal for the name

- Email on the domain: how it works (MX records, SPF/DKIM/DMARC), options (SES receiving, forwarding services, Workspace) and cost
- Revive Tippy; polish mortgage-tracker for hosting
- Light theme
