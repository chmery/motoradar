import { useRouter } from 'next/router';
import styles from './ProfilePage.module.scss';

import Wrapper from '../../components/UI/Wrapper/Wrapper';
import Image from 'next/image';
import { useUser } from '../../hooks/useUser';
import { getNumberWithSpaces } from '../../utils/getNumberWithSpaces';
import Listings from '../../components/Profile/Listings/Listings';
import Head from 'next/head';

const ProfilePage = () => {
  const router = useRouter();
  const uid = router.query.uid;

  const user = useUser(uid as string);

  return (
    <>
      <Head>
        <title>Motoradar - {user?.displayName}</title>
        <link rel='icon' href='/favicon.png' />
        <meta
          name='description'
          content='Car marketplace allowing people to list or search for new or used cars.'
        />
        <meta
          name='keywords'
          content='car marketplace, car, cars, new car, new cars, demaged car, find car, car finder, motoradar'
        />
        <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
        <meta name='language' content='English' />
      </Head>
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
    </>
  );
};

export default ProfilePage;
