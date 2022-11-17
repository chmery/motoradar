import RadialLoader from '../Loaders/RadialLoader/RadialLoader';
import styles from './Button.module.scss';

type Props = {
  text: string;
  active?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
};

const Button = ({
  text,
  type,
  active,
  onClick,
  isLoading,
  disabled,
}: Props) => {
  return (
    <button
      className={`${styles.button} ${active ? styles.active : ''}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? <RadialLoader /> : text}
    </button>
  );
};

export default Button;
