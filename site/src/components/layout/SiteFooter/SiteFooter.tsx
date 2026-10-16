import { site } from '../../../content/site'
import { ExternalLink } from '../../ui/ExternalLink/ExternalLink'
import { Logo } from '../../ui/Logo/Logo'
import { Container } from '../Container/Container'
import styles from './SiteFooter.module.css'

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.bar}>
          <span className={styles.name}>
            <Logo size={20} />
            {site.name}
          </span>
          <ul className={styles.links}>
            {site.profiles.map((profile) => (
              <li key={profile.label}>
                <ExternalLink href={profile.href} className={styles.link}>
                  {profile.label}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  )
}
