import { describe, expect, it } from 'vitest'
import { pageTitle } from './pageTitle'

describe('pageTitle', () => {
  it('is the site name on its own when there is no page', () => {
    expect(pageTitle()).toBe('Matthew Suttie')
  })

  it('puts the page name before the site name', () => {
    expect(pageTitle('About')).toBe('About · Matthew Suttie')
  })
})
