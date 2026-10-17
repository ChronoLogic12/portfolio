---
title: Yggdramor
summary: Spell search for Dungeons & Dragons 5th edition, built for the combined filters other apps struggle with, such as wizard spells from two schools between levels 1 and 4. Also covers monsters, conditions and feats, using Open5e data.
year: 2024
section: featured
order: 2
stack: [React, React Router, webpack, Jest, Open5e API]
links:
  live: https://yggdramor.netlify.app/
  repo: https://github.com/ChronoLogic12/dnd-5e
---

Yggdramor started as an excuse to practise React, and as a fix for a problem my D&D group kept running into. Most spell apps are fine if you want "all wizard spells". They fall apart when you need something like every wizard spell from the enchantment or illusion schools, between levels 1 and 4, that can be cast as a ritual.

I still use it at the table.

## Search and filters

The spells page is built around one search box and a set of filters that all combine:

- Any number of **levels, classes, schools and casting times**
- Whether to include **concentration** and **ritual** spells
- A free-text search across every field, case-insensitive

Results match _all_ the active filters, and the count updates live as you change them. Each spell expands in place to show components, casting time, range, duration, the higher-level effects where they exist, which classes can use it and the source book.

Monsters, conditions and feats get their own pages with the same search-then-browse pattern. Long result lists are paginated.

## Data

Yggdramor originally fetched everything from the [Open5e API](https://open5e.com/). Later I switched the spells to a JSON file saved from the API, filling a few gaps the API had along the way. That made the app faster and stopped it depending on a third-party service being up mid-session.

## Built with

React and React Router, bundled with webpack, tested with Jest and Testing Library, and deployed on Netlify. The design is dark with a single red accent, keeping long lists of rules text easy to scan.
