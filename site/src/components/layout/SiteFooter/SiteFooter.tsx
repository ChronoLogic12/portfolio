import { site } from '../../../content/site'
import { ExternalLink } from '../../ui/ExternalLink/ExternalLink'
import { Container } from '../Container/Container'
import styles from './SiteFooter.module.css'

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.bar}>
          <span className={styles.name}>
            <img src="/favicon.png" width={20} height={20} alt="" />
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
