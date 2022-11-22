import { FirebaseError } from 'firebase/app';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import styles from './SignInForm.module.scss';
import ErrorBox from '../ErrorBox/ErrorBox';
import { AuthType, useAuth } from '../../../store/AuthContext';
import { getAuthErrorMessage } from '../../../utils/getAuthErrorMessage';
import Button from '../../UI/Button/Button';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuth() as AuthType;
  const router = useRouter();

  const handleInputChange = (type: string, input: string) => {
    switch (type) {
      case 'email':
        setEmail(input);
        break;
      case 'password':
        setPassword(input);
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

    if (!email && !password) return;

    try {
      await signIn(email, password);
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
        <Button
          text={'Sign In'}
          type={'submit'}
          isLoading={isLoading}
          active={email && password ? true : false}
          disabled={email && password && !isLoading ? false : true}
        />
      </form>
    </>
  );
};

export default SignInForm;
