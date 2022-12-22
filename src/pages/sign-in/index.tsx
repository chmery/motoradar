import Head from 'next/head';
import Link from 'next/link';
import SignInForm from '../../components/Auth/SignInForm/SignInForm';
import Wrapper from '../../components/UI/Wrapper/Wrapper';
import styles from './index.module.scss';

const SignInPage = () => {
  return (
    <>
      <Head>
        <title>Motoradar - Sign-In</title>
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
          <h1 className={styles.header}>Sign In</h1>
          <SignInForm />
          <p>
            Don&apos;t have an account?{' '}
            <Link href='/sign-up' className={styles.link}>
              Sign Up
            </Link>
          </p>
        </div>
      </Wrapper>
    </>
  );
};

export default SignInPage;
