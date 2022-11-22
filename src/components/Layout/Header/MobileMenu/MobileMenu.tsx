import styles from './MobileMenu.module.scss';

import { IoClose } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import { AuthType, useAuth } from 'store/AuthContext';
import Authorized from './Authorized/Authorized';
import Unauthorized from './Unathorized/Unauthorized';

type Props = {
  closeMenu: () => void;
};

const MobileMenu = ({ closeMenu }: Props) => {
  const { user } = useAuth() as AuthType;

  return (
    <div className={styles.container}>
      <nav className={styles.menu}>
        <IconContext.Provider value={{ className: styles.close }}>
          <IoClose onClick={closeMenu} />
        </IconContext.Provider>
        {user ? (
          <Authorized closeMenu={closeMenu} />
        ) : (
          <Unauthorized closeMenu={closeMenu} />
        )}
      </nav>
    </div>
  );
};

export default MobileMenu;
