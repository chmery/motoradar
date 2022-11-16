import styles from './ErrorBox.module.scss';
import { IoCloseOutline } from 'react-icons/io5';
import { IconContext } from 'react-icons';

type Props = {
  text: string;
  closeErrorBox: () => void;
};

const ErrorBox = ({ text, closeErrorBox }: Props) => {
  return (
    <div className={styles.error}>
      <p>{text}</p>
      <IconContext.Provider value={{ className: styles.close }}>
        <IoCloseOutline onClick={closeErrorBox} />
      </IconContext.Provider>
    </div>
  );
};

export default ErrorBox;
