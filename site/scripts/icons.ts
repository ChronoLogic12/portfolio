import { writeFile } from 'node:fs/promises'
import sharp from 'sharp'
import { MARK_ARC, MARK_RAYS, rayRestingOpacity } from '../src/components/ui/Logo/mark.ts'

const BACKGROUND = '#0c0d0f'
const ARC = '#12a594'
const RAYS = '#0bd8b6'

const markPaths = () =>
  [
    `<path d="${MARK_ARC}" fill="none" stroke="${ARC}" stroke-width="7" stroke-linecap="round"/>`,
    ...MARK_RAYS.map(
      ({ x1, y1, x2, y2 }, index) =>
        `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${RAYS}" stroke-width="3" stroke-linecap="round" opacity="${rayRestingOpacity(index)}"/>`,
    ),
  ].join('')

const roundIcon = () =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 100 100"><circle r="50" fill="${BACKGROUND}"/><g transform="scale(0.92)">${markPaths()}</g></svg>`

const squareIcon = (markScale: number) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 100 100"><rect x="-50" y="-50" width="100" height="100" fill="${BACKGROUND}"/><g transform="scale(${markScale})">${markPaths()}</g></svg>`

const png = (svg: string, size: number, file: string) =>
  sharp(Buffer.from(svg), { density: 600 }).resize(size, size).png().toFile(file)

await writeFile('public/favicon.svg', `${roundIcon()}\n`)
await png(squareIcon(0.8), 180, 'public/apple-touch-icon.png')
await png(squareIcon(0.7), 192, 'public/icon-192.png')
await png(squareIcon(0.7), 512, 'public/icon-512.png')
