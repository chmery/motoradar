import { useRouter } from 'next/router';
import styles from './ProfilePage.module.scss';

import Wrapper from '../../components/UI/Wrapper/Wrapper';
import Image from 'next/image';
import { useUser } from '../../hooks/useUser';
import { getNumberWithSpaces } from '../../utils/getNumberWithSpaces';
import Listings from '../../components/Profile/Listings/Listings';

const ProfilePage = () => {
  const router = useRouter();
  const uid = router.query.uid;

  const user = useUser(uid as string);

  return (
    <Wrapper>
      <div className={styles.main}>
        <section className={styles.user}>
          <div className={styles['user-container']}>
            <div className={styles['image-container']}>
              {user?.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt='profile picture'
                  width={80}
                  height={80}
                  priority
                  className={styles.image}
                />
              ) : (
                <div className={styles['image-placeholder']}></div>
              )}
            </div>
            <div>
              <h3 className={styles.name}>{user?.displayName}</h3>
              <p className={styles.text}>{user?.email}</p>
              <p className={styles.text}>
                {user?.phoneNumber && getNumberWithSpaces(user?.phoneNumber)}
              </p>
              <p className={styles.text}>{user?.location}</p>
            </div>
          </div>
        </section>
        <section className={styles.listings}>
          <h2 className={styles.header}>Listings</h2>
          <Listings uid={uid} />
        </section>
      </div>
    </Wrapper>
  );
};

export default ProfilePage;
