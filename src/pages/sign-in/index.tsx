import SignInForm from 'components/Auth/SignInForm/SignInForm';
import Wrapper from 'components/UI/Wrapper/Wrapper';
import Link from 'next/link';
import styles from './index.module.scss';

const SignInPage = () => {
  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default SignInPage;
