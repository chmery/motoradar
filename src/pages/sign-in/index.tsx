import SignInForm from 'components/Auth/SignInForm/SignInForm';
import Link from 'next/link';
import styles from './index.module.scss';

const SignInPage = () => {
  return (
    <div className={styles.main}>
      <h1 className={styles.header}>Sign In</h1>
      <SignInForm />
      <p>
        Don't have an account?{' '}
        <Link href='/sign-up' className={styles.link}>
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SignInPage;
