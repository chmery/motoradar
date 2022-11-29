import { MouseEvent, ReactElement } from 'react';
import RadialLoader from '../Loaders/RadialLoader/RadialLoader';
import styles from './Button.module.scss';

type Props = {
  text: string;
  icon?: ReactElement;
  active?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({
  text,
  type,
  icon,
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
      {isLoading && <RadialLoader />}
      {!isLoading && icon && icon}
      {!isLoading && text}
    </button>
  );
};
export default Button;
