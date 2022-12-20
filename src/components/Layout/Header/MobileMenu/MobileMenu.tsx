import styles from './MobileMenu.module.scss';

import { IoClose } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import Unauthorized from './Unauthorized/Unathorized';
import { AuthType, useAuth } from '../../../../store/AuthContext';
import { useState } from 'react';
import Authorized from './Authorized/Authorized';

type Props = {
  closeMenu: () => void;
};

const MobileMenu = ({ closeMenu }: Props) => {
  const [isClosing, setIsClosing] = useState(false);

  const { userData } = useAuth() as AuthType;

  const handleClose = () => {
    setIsClosing(true);

    setTimeout(() => {
      setIsClosing(false);
      closeMenu();
    }, 500);
  };

  return (
    <div className={`${styles.container} ${isClosing && styles.hide}`}>
      <nav className={`${styles.menu} ${isClosing && styles['hide-menu']}`}>
        <IconContext.Provider value={{ className: styles.close }}>
          <IoClose onClick={handleClose} />
        </IconContext.Provider>
        {userData ? (
          <Authorized closeMenu={handleClose} />
        ) : (
          <Unauthorized closeMenu={handleClose} />
        )}
      </nav>
    </div>
  );
};

export default MobileMenu;
