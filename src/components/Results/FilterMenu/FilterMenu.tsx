import { useState } from 'react';
import { IconContext } from 'react-icons';
import { IoClose } from 'react-icons/io5';
import Filter from '../../Filter/Filter';
import styles from './FilterMenu.module.scss';

type Props = {
  closeMenu: () => void;
};

const FilterMenu = ({ closeMenu }: Props) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);

    setTimeout(() => {
      setIsClosing(false);
      closeMenu();
    }, 500);
  };

  return (
    <div className={`${styles.container} ${isClosing && styles.hide}`}>
      <section
        className={`${styles.filter} ${isClosing && styles['hide-menu']}`}
      >
        <IconContext.Provider value={{ className: styles.close }}>
          <IoClose onClick={handleClose} />
        </IconContext.Provider>
        <Filter closeMenu={handleClose} />
      </section>
    </div>
  );
};

export default FilterMenu;
