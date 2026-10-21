import { describe, expect, it } from 'vitest'
import { pagePathsCode } from './pagePaths'

interface Request {
  uri: string
  headers: Record<string, { value: string }>
  querystring: Record<string, { value: string; multiValue?: { value: string }[] }>
}

type Handler = (event: {
  request: Request
}) => Request | { statusCode: number; headers: Record<string, { value: string }> }

const handler = new Function(`${pagePathsCode('example.com')}; return handler`)() as Handler

const request = (uri: string, querystring: Request['querystring'] = {}, host = 'example.com') => ({
  request: { uri, querystring, headers: { host: { value: host } } },
})

describe('page paths CloudFront Function', () => {
  it('serves the home page from index.html', () => {
    expect(handler(request('/'))).toMatchObject({ uri: '/index.html' })
  })

  it('maps a page path to its prerendered index.html', () => {
    expect(handler(request('/projects/yggdramor'))).toMatchObject({ uri: '/projects/yggdramor/index.html' })
  })

  it('leaves files alone', () => {
    expect(handler(request('/assets/index-abc123.js'))).toMatchObject({ uri: '/assets/index-abc123.js' })
    expect(handler(request('/favicon.png'))).toMatchObject({ uri: '/favicon.png' })
    expect(handler(request('/404.html'))).toMatchObject({ uri: '/404.html' })
  })

  it('redirects a trailing slash to the canonical path, keeping the query', () => {
    expect(handler(request('/projects/yggdramor/', { ref: { value: 'cv' } }))).toEqual({
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: { location: { value: '/projects/yggdramor?ref=cv' } },
    })
  })

  it('keeps repeated query parameters when redirecting', () => {
    const response = handler(request('/a/', { tag: { value: 'x', multiValue: [{ value: 'x' }, { value: 'y' }] } }))
    expect(response).toMatchObject({ headers: { location: { value: '/a?tag=x&tag=y' } } })
  })

  it('sends www and other host names to the site domain, keeping the path and query', () => {
    expect(handler(request('/projects/yggdramor', { ref: { value: 'cv' } }, 'www.example.com'))).toEqual({
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: { location: { value: 'https://example.com/projects/yggdramor?ref=cv' } },
    })
    expect(handler(request('/', {}, 'd111111abcdef8.cloudfront.net'))).toMatchObject({
      headers: { location: { value: 'https://example.com/' } },
    })
  })
})
