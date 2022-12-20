import Link from 'next/link';
import styles from './index.module.scss';
import SignUpForm from '../../components/Auth/SignUpForm/SignUpForm';
import Wrapper from '../../components/UI/Wrapper/Wrapper';
import Head from 'next/head';

const SignUpPage = () => {
  return (
    <>
      <Head>
        <title>Motoradar - Sign-Up</title>
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
          <h1 className={styles.header}>Sign Up</h1>
          <SignUpForm />
          <p>
            Already have an account?{' '}
            <Link href='/sign-in' className={styles.link}>
              Sign In
            </Link>
          </p>
        </div>
      </Wrapper>
    </>
  );
};

export default SignUpPage;
