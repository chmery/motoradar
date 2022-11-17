import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { FirebaseError } from 'firebase/app';

import { AuthType, useAuth } from 'store/AuthContext';
import { getAuthErrorMessage } from 'utils/getAuthErrorMessage';

import styles from './SignUpForm.module.scss';
import RadialLoader from 'components/UI/Loaders/RadialLoader/RadialLoader';
import ErrorBox from '../ErrorBox/ErrorBox';
import Button from 'components/UI/Button/Button';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

    if (!email && !password && !confirmPassword) return;

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      setIsErrorOpen(true);
      setIsLoading(false);
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
    setIsLoading(false);
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
        <Button
          text={'Sign Up'}
          type={'submit'}
          isLoading={isLoading}
          active={email && password && confirmPassword ? true : false}
          disabled={
            email && password && confirmPassword && !isLoading ? false : true
          }
        />
      </form>
    </>
  );
};

export default SignUpForm;
