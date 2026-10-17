import { Link } from '@tanstack/react-router'
import { home } from '../../../content/home'
import { site } from '../../../content/site'
import { Container } from '../../layout/Container/Container'
import { Dial } from '../../ui/Dial/Dial'
import { ExternalLink } from '../../ui/ExternalLink/ExternalLink'
import { usePointerTracking } from '../../../hooks/usePointerTracking/usePointerTracking'
import styles from './Hero.module.css'

export function Hero() {
  const { eyebrow, tagline, intro, primaryAction } = home.hero
  const heroRef = usePointerTracking<HTMLElement>()

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
                <Link to="/" hash={primaryAction.hash} className={`${styles.button} ${styles.primary}`}>
                  {primaryAction.label} →
                </Link>
              </li>
              {site.profiles.map((profile) => (
                <li key={profile.label}>
                  <ExternalLink href={profile.href} className={styles.button}>
                    {profile.label}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>
          <Dial className={styles.dial} />
        </div>
      </Container>
    </section>
  )
}
