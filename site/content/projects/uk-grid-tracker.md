---
title: UK grid tracker
summary: Live view of Great Britain's electricity grid, with wind generation overlaid on Elexon and NESO forecasts. Scheduled Lambdas archive the forecasts as static JSON, served from CloudFront.
year: 2026
section: featured
order: 1
stack: [React, TypeScript, visx, TanStack, AWS CDK, Lambda, CloudFront]
screenshot: https://gridtracker.uk/
links:
  live: https://gridtracker.uk
---

A live dashboard for Great Britain's electricity grid: what's generating right now, demand, carbon intensity, wholesale prices and the flows through the interconnectors to neighbouring countries. The headline feature is wind. Measured output sits on the same chart as what was forecast a day earlier and NESO's 14-day outlook, so you can see how well the forecasts hold up.

It started from admiring [grid.iamkate.com](https://grid.iamkate.com/) and wanting to dig further into the forecasting side.

## How it works

There's no server answering requests. Everything a visitor loads is a static file or a direct call to a public API:

- **Live data** comes straight from Elexon in the browser. Copying five-minute data through my own storage would only add cost
- **Forecasts** are the interesting part, because NESO doesn't keep old forecast runs. A scheduled Lambda runs every 30 minutes, saves each new run to S3 as static JSON and builds the "what was forecast a day earlier" series from them. That archive is what makes the forecast-versus-actual charts possible
- **History** is rebuilt by a second Lambda each morning into one file per year
- **CloudFront** serves the site and the archive from the same domain, so there's no CORS to deal with

The infrastructure is AWS CDK in TypeScript. GitHub Actions deploys it through an OIDC role, so no AWS keys are stored anywhere. It runs on CloudFront's flat-rate free plan with a rate limit in front, which keeps the running cost close to zero.

## The frontend

React and TypeScript, with TanStack Query for fetching and caching, TanStack Router for URL state, and visx for the charts. Every API response is validated with zod before it's used.

Data moves through three layers: queries fetch and cache raw data, hooks turn it into the values the dashboard shows, and components only format and draw. Every number has one owning hook, so two panels showing the same figure can't disagree.
