export interface Picture {
  sources: Record<string, string>
  img: { src: string; w: number; h: number }
}

const covers = import.meta.glob<Picture>('/content/projects/covers/*.png', {
  eager: true,
  import: 'default',
  query: { w: '640;1280', format: 'avif;webp', as: 'picture' },
})

export const projectCover = (slug: string): Picture | undefined => covers[`/content/projects/covers/${slug}.png`]
