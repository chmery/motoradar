import { useState } from 'react';
import { IconContext } from 'react-icons';
import { IoClose } from 'react-icons/io5';
import { getActiveSortingOption } from '../../../utils/getActiveSortingOption';
import styles from './SortMenu.module.scss';

type Props = {
  closeMenu: () => void;
  options: string[];
  handleSortOptions: (selected: string) => void;
  sortOption: string;
  sortDirection: string;
};

const SortMenu = ({
  closeMenu,
  options,
  handleSortOptions,
  sortOption,
  sortDirection,
}: Props) => {
  const [isClosing, setIsClosing] = useState(false);

  const activeOption = getActiveSortingOption(sortOption, sortDirection);

  const handleClose = () => {
    setIsClosing(true);

    setTimeout(() => {
      setIsClosing(false);
      closeMenu();
    }, 500);
  };

  return (
    <div className={`${styles.container} ${isClosing && styles.hide}`}>
      <section className={`${styles.sort} ${isClosing && styles['hide-menu']}`}>
        <IconContext.Provider value={{ className: styles.close }}>
          <IoClose onClick={handleClose} />
        </IconContext.Provider>
        <h3 className={styles.header}>Sort By</h3>
        <ul>
          {options.map((option, index) => {
            return (
              <li
                key={index}
                className={`${styles.option} ${
                  activeOption === option && styles.active
                }`}
                onClick={() => {
                  handleClose();
                  handleSortOptions(option);
                }}
              >
                {option}
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default SortMenu;
