import Link from 'next/link';
import styles from './index.module.scss';
import SignUpForm from 'components/Auth/SignUpForm/SignUpForm';
import Wrapper from 'components/UI/Wrapper/Wrapper';

const SignUpPage = () => {
  return (
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
  );
};

export default SignUpPage;
