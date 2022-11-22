import styles from './Header.module.scss';
import Link from 'next/link';
import { AuthType, useAuth } from '../../../store/AuthContext';
import { useRouter } from 'next/router';

import { HiOutlineMenu } from 'react-icons/hi';
import { useState } from 'react';
import MobileMenu from './MobileMenu/MobileMenu';

const Header = () => {
  const { user } = useAuth() as AuthType;
  const { pathname } = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuOpen = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header
        className={`${styles.header} ${
          pathname !== '/' ? styles['header-dark'] : ''
        }`}
      >
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
            <HiOutlineMenu onClick={handleMobileMenuOpen} />
          </div>
        </nav>
      </header>
      {isMobileMenuOpen && <MobileMenu closeMenu={handleMobileMenuOpen} />}
    </>
  );
};

export default Header;
