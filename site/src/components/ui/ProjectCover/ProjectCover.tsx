import type { Picture } from '../../../projects/covers'
import styles from './ProjectCover.module.css'

interface ProjectCoverProps {
  picture: Picture
  alt: string
  sizes: string
  priority?: boolean
}

export function ProjectCover({ picture, alt, sizes, priority = false }: ProjectCoverProps) {
  return (
    <picture className={styles.picture}>
      {Object.entries(picture.sources).map(([format, srcSet]) => (
        <source key={format} type={`image/${format}`} srcSet={srcSet} sizes={sizes} />
      ))}
      <img
        className={styles.image}
        src={picture.img.src}
        width={picture.img.w}
        height={picture.img.h}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
      />
    </picture>
  )
}
