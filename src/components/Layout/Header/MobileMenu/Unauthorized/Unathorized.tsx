import Link from 'next/link';
import styles from './Unathorized.module.scss';

import { FiLogIn } from 'react-icons/fi';
import { RiUserAddLine } from 'react-icons/ri';

type Props = {
  closeMenu: () => void;
};

const Unauthorized = ({ closeMenu }: Props) => {
  return (
    <>
      <Link href='/sign-in' className={styles.element} onClick={closeMenu}>
        <FiLogIn /> Sign In
      </Link>
      <Link href='/sign-up' className={styles.element} onClick={closeMenu}>
        <RiUserAddLine /> Create Account
      </Link>
    </>
  );
};

export default Unauthorized;
