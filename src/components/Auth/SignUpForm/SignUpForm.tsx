import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { FirebaseError } from 'firebase/app';

import { AuthType, useAuth } from 'store/AuthContext';
import { getAuthErrorMessage } from 'utils/getAuthErrorMessage';

import styles from './SignUpForm.module.scss';
import RadialLoader from 'components/UI/Loaders/RadialLoader/RadialLoader';
import ErrorBox from '../ErrorBox/ErrorBox';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth() as AuthType;
  const router = useRouter();

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
        console.error(
          'passed wrong type to handleInputChange function in sign-up'
        );
        break;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email && !password && !confirmPassword) return;

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      setIsErrorOpen(true);
      setLoading(false);
      return;
    }

    try {
      await signUp(email, password);
      router.push('/');
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(getAuthErrorMessage(error.code));
        setIsErrorOpen(true);
      }
    }
    setLoading(false);
  };

  const handleErrorBoxClose = () => {
    setIsErrorOpen(false);
  };

  return (
    <>
      {isErrorOpen && (
        <ErrorBox text={error} closeErrorBox={handleErrorBoxClose} />
      )}
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
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
        <button
          type='submit'
          className={`${styles.button} ${
            email && password && confirmPassword ? styles.active : ''
          }`}
          disabled={
            email && password && confirmPassword && !loading ? false : true
          }
        >
          {loading ? <RadialLoader /> : 'Sign Up'}
        </button>
      </form>
    </>
  );
};

export default SignUpForm;
