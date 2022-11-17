import styles from './MobileMenu.module.scss';

import { IoClose } from 'react-icons/io5';
import { IconContext } from 'react-icons';

type Props = {
  closeMenu: () => void;
};

const MobileMenu = ({ closeMenu }: Props) => {
  return (
    <div className={styles.container}>
      <nav className={styles.menu}>
        <IconContext.Provider value={{ className: styles.close }}>
          <IoClose onClick={closeMenu} />
        </IconContext.Provider>
      </nav>
    </div>
  );
};

export default MobileMenu;
