import { describe, expect, it } from 'vitest'
import { isGitHub } from './isGitHub'

describe('isGitHub', () => {
  it('recognises GitHub profile and repo URLs', () => {
    expect(isGitHub('https://github.com/ChronoLogic12')).toBe(true)
    expect(isGitHub('https://github.com/ChronoLogic12/portfolio')).toBe(true)
  })

  it('does not match other sites or GitHub Pages', () => {
    expect(isGitHub('https://www.linkedin.com/in/someone')).toBe(false)
    expect(isGitHub('https://chronologic12.github.io/spaceman/')).toBe(false)
  })
})
