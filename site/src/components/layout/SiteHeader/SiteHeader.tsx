import { Link } from '@tanstack/react-router'
import { site } from '../../../content/site'
import { Container } from '../Container/Container'
import styles from './SiteHeader.module.css'

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.bar}>
          <Link to="/" className={styles.brand}>
            {site.name}
          </Link>
          <nav aria-label="Main">
            <ul className={styles.nav}>
              {site.nav.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} hash={item.hash} className={styles.navLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  )
}
