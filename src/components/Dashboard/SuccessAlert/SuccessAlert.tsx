import { useEffect } from 'react';
import { IconContext } from 'react-icons';
import { IoCloseOutline } from 'react-icons/io5';
import styles from './SuccessAlert.module.scss';

type Props = {
  text: string;
  handleClose: () => void;
};

const SuccessAlert = ({ text, handleClose }: Props) => {
  useEffect(() => {
    setTimeout(handleClose, 5000);
  }, []);

  return (
    <div className={styles.success}>
      <p>{text}</p>
      <IconContext.Provider value={{ className: styles.close }}>
        <IoCloseOutline onClick={handleClose} />
      </IconContext.Provider>
    </div>
  );
};

export default SuccessAlert;
