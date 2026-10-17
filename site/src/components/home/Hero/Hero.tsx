import { Link } from '@tanstack/react-router'
import { home } from '../../../content/home'
import { site } from '../../../content/site'
import { Container } from '../../layout/Container/Container'
import { buttonClass } from '../../ui/Button/buttonClass'
import { Dial } from '../../ui/Dial/Dial'
import { ExternalLink } from '../../ui/ExternalLink/ExternalLink'
import { GitHubIcon } from '../../ui/icons/GitHubIcon'
import { Tooltip } from '../../ui/Tooltip/Tooltip'
import { usePointerTracking } from '../../../hooks/usePointerTracking/usePointerTracking'
import { isGitHub } from '../../../utils/isGitHub/isGitHub'
import styles from './Hero.module.css'

const GLOW_FOLLOW_RATE = 0.12

export function Hero() {
  const { eyebrow, tagline, intro, primaryAction } = home.hero
  const heroRef = usePointerTracking<HTMLElement>({ followRate: GLOW_FOLLOW_RATE })

  return (
    <section ref={heroRef} className={styles.hero}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />
      <Container>
        <div className={styles.layout}>
          <div>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h1 className={styles.headline}>
              {site.name}. <span className={styles.tagline}>{tagline}</span>
            </h1>
            <p className={styles.intro}>{intro}</p>
            <ul className={styles.actions}>
              <li>
                <Link to="/" hash={primaryAction.hash} className={buttonClass({ variant: 'primary' })}>
                  {primaryAction.label} →
                </Link>
              </li>
              {site.profiles.map((profile) => (
                <li key={profile.label}>
                  <ExternalLink href={profile.href} className={buttonClass()}>
                    {isGitHub(profile.href) && <GitHubIcon />}
                    {profile.label}
                  </ExternalLink>
                </li>
              ))}
              <li>
                <Tooltip content={site.cv.unavailable}>
                  <button type="button" aria-disabled="true" className={buttonClass({ variant: 'unavailable' })}>
                    {site.cv.label}
                  </button>
                </Tooltip>
              </li>
            </ul>
          </div>
          <Dial className={styles.dial} />
        </div>
      </Container>
    </section>
  )
}
