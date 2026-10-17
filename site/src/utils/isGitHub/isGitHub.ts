export const isGitHub = (url: string) => new URL(url).hostname === 'github.com'
