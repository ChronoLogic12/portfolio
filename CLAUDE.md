# Portfolio

Personal site for matthewsuttie.com. Read `PLAN.md` first: it holds the plan, decisions, phases and open work. Keep it up to date as work lands.

## Working together

Understanding the code matters as much as shipping it. Build in small steps, one concept at a time, and explain the what and why of anything new as it lands. Add each concept to `docs/learning-notes.md` with where it shows up in the code. That file is gitignored: it stays on this machine and is never committed. Check in before moving to the next phase.

## Conventions

- Follow uk-grid-tracker's conventions unless this file says otherwise.
- No code comments. Prefer clear names and small functions.
- Prettier formats everything (`.prettierrc.json`: no semicolons, single quotes, 120 columns, LF). oxlint config is `.oxlintrc.json` at the root. Warnings fail lint. TypeScript is strict.
- npm workspaces: `site/` now, `infra/` (CDK) later.
- `site/` is TanStack Start with static prerendering. Only `site/dist/client` is deployed. Code in components runs at build time in Node and in the browser, so browser-only APIs go in effects.
- `site/src/routeTree.gen.ts` is generated; never edit it.
- No Tailwind. CSS Modules plus semantic tokens from `site/src/styles/tokens.css`; never raw colours or sizes in components. Dark first. `global.css` (fonts, tokens, reset) is imported once in `__root.tsx`.
- Copy and placement live in `site/src/content/`, never hard-coded in components. Projects are Markdown files in `site/content/projects/`, validated by the zod schema in `site/content-collections.ts`; read them through `site/src/projects/`, not `allProjects` directly in components.
- Components go in `components/layout/` (page structure), `components/ui/` (reusable pieces) or `components/<page>/` (used by one page, e.g. `components/home/`). Links to other sites use `ExternalLink`.
- Headless UI from `radix-ui`; carousels with Embla; animation with Motion (respect `prefers-reduced-motion`).
- Group code in folders that hold a module and its tests together (`utils/<name>/`, `hooks/<name>/`, `components/<name>/`). No catch-all `lib/` or `types/`.
- Light Vitest tests alongside changes, colocated as `*.test.ts(x)`.
- Page titles go through `pageTitle()`.

## Commands

Run from the repo root:

- `npm run dev` (http://localhost:3000)
- `npm run build` (prerendered output in `site/dist/client`)
- `npm run check` (format check, lint, typecheck, tests)
- `npm run format`
