import { copyFile, rm } from 'node:fs/promises'
import sharp from 'sharp'
import {
  MARK_ARC,
  MARK_COLOURS,
  MARK_DISC_RADIUS,
  MARK_RAYS,
  MARK_RAY_WIDTH,
} from '../src/components/ui/Logo/markGeometry.ts'

const FAVICON_SOURCE = 'D:/Pictures/ChronoLogic/chronologic-favicon.png'

const markPaths = () =>
  [
    `<circle r="${MARK_DISC_RADIUS}" fill="${MARK_COLOURS.disc}"/>`,
    `<path d="${MARK_ARC.d}" fill="none" stroke="${MARK_COLOURS.arc}" stroke-width="${MARK_ARC.width}" stroke-linecap="round"/>`,
    ...MARK_RAYS.map(
      ({ x1, y1, x2, y2, opacity }) =>
        `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${MARK_COLOURS.rays}" stroke-width="${MARK_RAY_WIDTH}" stroke-linecap="round" opacity="${opacity}"/>`,
    ),
  ].join('')

const squareIcon = (markScale: number) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 100 100"><rect x="-50" y="-50" width="100" height="100" fill="${MARK_COLOURS.disc}"/><g transform="scale(${markScale})">${markPaths()}</g></svg>`

const png = (svg: string, size: number, file: string) =>
  sharp(Buffer.from(svg), { density: 600 }).resize(size, size).png().toFile(file)

await copyFile(FAVICON_SOURCE, 'public/favicon.png')
await rm('public/favicon.svg', { force: true })
await png(squareIcon(0.94), 180, 'public/apple-touch-icon.png')
await png(squareIcon(0.8), 192, 'public/icon-192.png')
await png(squareIcon(0.8), 512, 'public/icon-512.png')
