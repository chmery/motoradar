import styles from './header.module.scss'
import Link from 'next/link'
import { AuthType, useAuth } from '@/store/AuthContext'

const Header = () => {
  const { user } = useAuth() as AuthType

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href='/'>MOTORADAR</Link>
        <div className={styles.links}>
          {user && (
            <>
              <Link href='/saved'>Saved</Link>
              <Link href='/dashboard'>Dashboard</Link>
            </>
          )}
          <div className={styles.button}>
            {user && <Link href='/new-listing'>New Listing</Link>}
            {!user && <Link href='/sign-in'>Sign In</Link>}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
