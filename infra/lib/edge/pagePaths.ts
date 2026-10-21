import { readFileSync } from 'node:fs'

const source = readFileSync(new URL('./page-paths.function.js', import.meta.url), 'utf8')

export const pagePathsCode = (siteHost: string) => source.replace('__SITE_HOST__', siteHost)
