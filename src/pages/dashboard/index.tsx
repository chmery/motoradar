import EditProfile from 'components/Dashboard/EditProfile/EditProfile';
import UserInfo from 'components/Dashboard/UserInfo/UserInfo';
import Button from 'components/UI/Button/Button';
import Wrapper from 'components/UI/Wrapper/Wrapper';
import { useState } from 'react';
import styles from './index.module.scss';

const DashboardPage = () => {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const handleEditProfileOpen = () => {
    setIsEditProfileOpen(!isEditProfileOpen);
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
              disabled={false}
              onClick={handleEditProfileOpen}
            />
          )}
          {isEditProfileOpen && (
            <EditProfile handleEditProfileOpen={handleEditProfileOpen} />
          )}
        </section>
        <section className={styles.listings}>listings</section>
      </div>
    </Wrapper>
  );
};

export default DashboardPage;
