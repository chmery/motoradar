import styles from './Header.module.scss';
import Link from 'next/link';
import { AuthType, useAuth } from '../../../store/AuthContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { BiMenu } from 'react-icons/bi';

const Header = () => {
  const { user } = useAuth() as AuthType;
  const { pathname } = useRouter();

  const [headerClass, setHeaderClass] = useState(styles.header);

  useEffect(() => {
    pathname !== '/'
      ? setHeaderClass(`${styles.header} ${styles['header-dark']}`)
      : setHeaderClass(styles.header);
  }, []);

  return (
    <header className={headerClass}>
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
        <div className={styles.hamburger}>
          <BiMenu />
        </div>
      </nav>
    </header>
  );
};

export default Header;
