import { AuthType, useAuth } from 'store/AuthContext';
import { createRandomUsername } from 'utils/createRandomUsername';
import styles from './Authorized.module.scss';

type Props = {
  closeMenu: () => void;
};

const Authorized = ({ closeMenu }: Props) => {
  const { user } = useAuth() as AuthType;

  return (
    <>
      <div className={styles.user}>{user?.displayName}</div>
    </>
  );
};

export default Authorized;
