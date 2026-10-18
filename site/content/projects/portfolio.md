---
title: Personal portfolio (this site)
summary: Prerendered to static HTML with TanStack Start and deployed to S3 and CloudFront with CDK.
year: 2026
section: featured
order: 3
stack: [TanStack Start, React, TypeScript, AWS CDK]
screenshot: http://localhost:4174/
links:
  repo: https://github.com/ChronoLogic12/portfolio
---

The site you're looking at. It replaced a 2022 version built with Materialize that I'd outgrown. I also wanted my hosting and domains in one place, on AWS alongside my other projects.

## Static, but not a single-page app

It's built with TanStack Start and **prerendered**: at build time every page is rendered to its own HTML file, with its own title and description. Link previews and search engines get real content, and visitors see the page before any JavaScript loads. React then takes over in the browser, so moving between pages doesn't reload. There's no server at runtime, just files on S3 behind CloudFront.

## Content separate from layout

Each project is a Markdown file with frontmatter for its title, summary, stack, links and which section it belongs in. A schema checks every file at build time, so a typo fails the build instead of shipping a broken page. Moving a project from the archive to the front page is a one-line change.

## Design

Dark first, built on Radix's slate and teal colour scales, with the ChronoLogic logo as the one decorative element: the dial in the header sweeps like a clock hand, and the grid behind it lights up around your mouse. All of it stops for visitors who've asked their system for reduced motion.
