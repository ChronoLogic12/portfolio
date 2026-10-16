const SITE_NAME = 'Matthew Suttie'

export const pageTitle = (page?: string) => (page ? `${page} · ${SITE_NAME}` : SITE_NAME)
