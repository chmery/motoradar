import Image from 'next/image';
import Link from 'next/link';
import styles from './Authorized.module.scss';

import { BsStack } from 'react-icons/bs';
import { GoPlus } from 'react-icons/go';
import { HiOutlineHeart } from 'react-icons/hi';
import { FiLogIn } from 'react-icons/fi';
import { IconContext } from 'react-icons';
import { AuthType, useAuth } from '../../../../../store/AuthContext';

type Props = {
  closeMenu: () => void;
};

const Authorized = ({ closeMenu }: Props) => {
  const { user, signOut } = useAuth() as AuthType;

  return (
    <>
      <div className={styles.user}>
        <Image
          src={user?.photoURL!}
          alt='profile picture'
          width={50}
          height={50}
          className={styles['profile-pic']}
        />
        <div>
          <h2>{user?.displayName}</h2>
          <p className={styles.email}>{user?.email}</p>
        </div>
      </div>
      <Link href='/dashboard' className={styles.link} onClick={closeMenu}>
        <BsStack /> Dashboard
      </Link>
      <Link href='/new-listing' className={styles.link} onClick={closeMenu}>
        <GoPlus /> New Listing
      </Link>
      <Link href='/saved' className={styles.link} onClick={closeMenu}>
        <HiOutlineHeart /> Saved
      </Link>
      <Link
        href='/'
        className={styles.link}
        onClick={() => {
          closeMenu();
          signOut();
        }}
      >
        <IconContext.Provider value={{ className: styles.logout }}>
          <FiLogIn />
        </IconContext.Provider>{' '}
        Sign Out
      </Link>
    </>
  );
};

export default Authorized;
