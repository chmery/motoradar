import { FormEvent, useState } from 'react';
import Link from 'next/link';

import styles from './index.module.scss';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleInputChange = (type: string, input: string) => {
    switch (type) {
      case 'email':
        setEmail(input);
        break;
      case 'password':
        setPassword(input);
        break;
      case 'confirm':
        setConfirmPassword(input);
        break;
      default:
        console.error('passed wrong type to handleInput function in sign-up');
        break;
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.header}>Sign Up</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor='email' className={styles.label}>
          E-mail
        </label>
        <input
          type='email'
          id='email'
          autoComplete='test@test.com'
          value={email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={styles.input}
        />
        <label htmlFor='password' className={styles.label}>
          Password
        </label>
        <input
          type='password'
          id='password'
          autoComplete='new-password'
          value={password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          className={styles.input}
        />
        <label htmlFor='confirm' className={styles.label}>
          Confirm password
        </label>
        <input
          type='password'
          id='confirm'
          autoComplete='new-password'
          value={confirmPassword}
          onChange={(e) => handleInputChange('confirm', e.target.value)}
          className={styles.input}
        />
        <button type='submit' className={styles.button}>
          Sign Up
        </button>
      </form>
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
