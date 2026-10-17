import { readFileSync } from 'node:fs'

export const pagePathsCode = readFileSync(new URL('./page-paths.function.js', import.meta.url), 'utf8')
