import contentCollections from '@content-collections/vite'
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    contentCollections(),
    imagetools(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: true,
        filter: ({ path }) => !path.includes('#'),
      },
      pages: [{ path: '/404', prerender: { enabled: true, outputPath: '/404.html' } }],
    }),
    viteReact(),
  ],
})
