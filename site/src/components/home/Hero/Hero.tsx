import { Link } from '@tanstack/react-router'
import { home } from '../../../content/home'
import { site } from '../../../content/site'
import { Container } from '../../layout/Container/Container'
import { Dial } from '../../ui/Dial/Dial'
import { ExternalLink } from '../../ui/ExternalLink/ExternalLink'
import styles from './Hero.module.css'

export function Hero() {
  const { eyebrow, headline, intro, primaryAction } = home.hero

  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.layout}>
          <div>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h1 className={styles.headline}>{headline}</h1>
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
