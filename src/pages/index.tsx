import Head from 'next/head';
import Filter from '../components/Filter/Filter';
import RecentlyAdded from '../components/RecentlyAdded/RecentlyAdded';
import Wrapper from '../components/UI/Wrapper/Wrapper';
import styles from './index.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>Motoradar</title>
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
      <div className={styles.background}>
        <div className={styles.content}>
          <Wrapper>
            <div className={styles.filter}>
              <Filter />
            </div>
            <RecentlyAdded />
          </Wrapper>
        </div>
      </div>
    </>
  );
}
