import { Link } from '@tanstack/react-router'
import { site } from '../../../content/site'
import { Dial } from '../../ui/Dial/Dial'
import { Container } from '../Container/Container'
import styles from './NotFound.module.css'

export function NotFound() {
  return (
    <section className={styles.notFound}>
      <Container>
        <div className={styles.layout}>
          <Dial className={styles.dial} />
          <div>
            <p className={styles.code}>404</p>
            <h1 className={styles.title}>{site.notFound.title}</h1>
            <p className={styles.message}>{site.notFound.message}</p>
            <Link to="/" className={styles.action}>
              {site.notFound.action} →
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
