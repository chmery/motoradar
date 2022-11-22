import Link from 'next/link';
import { useState } from 'react';
import { IconContext } from 'react-icons';
import { FiLogIn } from 'react-icons/fi';
import ChangeEmail from '../../components/Dashboard/ChangeEmail/ChangeEmail';
import EditProfile from '../../components/Dashboard/EditProfile/EditProfile';
import UserInfo from '../../components/Dashboard/UserInfo/UserInfo';
import Button from '../../components/UI/Button/Button';
import Wrapper from '../../components/UI/Wrapper/Wrapper';
import { AuthType, useAuth } from '../../store/AuthContext';
import styles from './index.module.scss';

const DashboardPage = () => {
  const { signOut } = useAuth() as AuthType;

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isChangeEmailOpen, setIsChangeEmailOpen] = useState(false);

  const handleEditProfileOpen = () => {
    if (isChangeEmailOpen) {
      handleChangeEmailOpen();
    }

    setIsEditProfileOpen(!isEditProfileOpen);
  };

  const handleChangeEmailOpen = () => {
    if (isEditProfileOpen) {
      handleEditProfileOpen();
    }

    setIsChangeEmailOpen(!isChangeEmailOpen);
  };

  return (
    <Wrapper>
      <div className={styles.main}>
        <section className={styles.options}>
          <UserInfo />
          {!isEditProfileOpen && (
            <Button
              text='Edit Profile'
              type='button'
              onClick={handleEditProfileOpen}
            />
          )}
          {isEditProfileOpen && (
            <EditProfile handleEditProfileOpen={handleEditProfileOpen} />
          )}
          {!isChangeEmailOpen && (
            <Button
              text='Change E-mail'
              type='button'
              onClick={handleChangeEmailOpen}
            />
          )}
          {isChangeEmailOpen && (
            <ChangeEmail handleChangeEmailOpen={handleChangeEmailOpen} />
          )}
          <Link
            href='/'
            className={styles.link}
            onClick={() => {
              signOut();
            }}
          >
            <IconContext.Provider value={{ className: styles.logout }}>
              <FiLogIn />
            </IconContext.Provider>{' '}
            Sign Out
          </Link>
        </section>
        <section className={styles.listings}>listings</section>
      </div>
    </Wrapper>
  );
};

export default DashboardPage;
