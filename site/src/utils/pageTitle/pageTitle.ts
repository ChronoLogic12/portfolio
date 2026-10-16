import { site } from '../../content/site'

export const pageTitle = (page?: string) => (page ? `${page} · ${site.name}` : site.name)
