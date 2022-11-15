import { FormEvent, useState } from 'react';
import Link from 'next/link';

import styles from './index.module.scss';
import { AuthType, useAuth } from 'store/AuthContext';
import { useRouter } from 'next/router';
import { FirebaseError } from 'firebase/app';
import { getAuthErrorMessage } from 'utils/getAuthErrorMessage';
import SignUpForm from 'components/Auth/SignUpForm/SignUpForm';

const SignUpPage = () => {
  return (
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
  );
};

export default SignUpPage;
