import { readFile, mkdir } from 'node:fs/promises'
import { createServer } from 'node:http'
import type { Server } from 'node:http'
import { extname, join, normalize } from 'node:path'
import { chromium } from 'playwright-core'
import { allProjects } from '../.content-collections/generated/index.js'

const OUTPUT_DIR = 'content/projects/covers'
const LOCAL_BUILD_DIR = 'dist/client'
const LOCAL_PORT = 4174
const VIEWPORT = { width: 1440, height: 900 }
const SETTLE_MS = 2500
const LOAD_TIMEOUT_MS = 120_000

const CONTENT_TYPES: Record<string, string> = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json',
}

const serveLocalBuild = () =>
  new Promise<Server>((resolve, reject) => {
    const server = createServer(async (request, response) => {
      const path = normalize(decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname))
      const file = join(LOCAL_BUILD_DIR, extname(path) ? path : join(path, 'index.html'))
      try {
        const body = await readFile(file)
        response.writeHead(200, { 'content-type': CONTENT_TYPES[extname(file)] ?? 'application/octet-stream' })
        response.end(body)
      } catch {
        response.writeHead(404).end()
      }
    })
    server.once('error', reject)
    server.listen(LOCAL_PORT, () => resolve(server))
  })

const only = process.argv.slice(2)
const targets = allProjects.filter(
  (project) => project.screenshot && (only.length === 0 || only.includes(project.slug)),
)

await mkdir(OUTPUT_DIR, { recursive: true })
const server = await serveLocalBuild()
const browser = await chromium.launch({ channel: 'chrome' })
const page = await browser.newPage({ viewport: VIEWPORT, colorScheme: 'dark', reducedMotion: 'reduce' })

try {
  for (const project of targets) {
    console.log(`${project.slug}: ${project.screenshot}`)
    await page.goto(project.screenshot!, { waitUntil: 'networkidle', timeout: LOAD_TIMEOUT_MS })
    await page.waitForFunction(() => !document.body.innerText.includes('SERVICE WAKING UP'), null, {
      timeout: LOAD_TIMEOUT_MS,
      polling: 1000,
    })
    await page.waitForLoadState('networkidle', { timeout: LOAD_TIMEOUT_MS })
    await page.waitForTimeout(SETTLE_MS)
    await page.screenshot({ path: join(OUTPUT_DIR, `${project.slug}.png`) })
  }
} finally {
  await browser.close()
  server.close()
}
