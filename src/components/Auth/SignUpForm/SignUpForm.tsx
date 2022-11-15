import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { FirebaseError } from 'firebase/app';

import { AuthType, useAuth } from 'store/AuthContext';
import { getAuthErrorMessage } from 'utils/getAuthErrorMessage';

import styles from './SignUpForm.module.scss';
import RadialLoader from 'components/Loaders/RadialLoader/RadialLoader';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth() as AuthType;
  const router = useRouter();

  const handleInputChange = (type: string, input: string) => {
    setError('');

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
      return;
    }

    try {
      await signUp(email, password);
      router.push('/');
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(getAuthErrorMessage(error.code));
      }
    }
    setLoading(false);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <label
        htmlFor='email'
        className={`${styles.label} ${error ? styles.labelError : ''}`}
      >
        E-mail
      </label>
      <input
        type='email'
        id='email'
        autoComplete='test@test.com'
        value={email}
        onChange={(e) => handleInputChange('email', e.target.value)}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
      />
      <label
        htmlFor='password'
        className={`${styles.label} ${error ? styles.labelError : ''}`}
      >
        Password
      </label>
      <input
        type='password'
        id='password'
        autoComplete='new-password'
        value={password}
        onChange={(e) => handleInputChange('password', e.target.value)}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
      />
      <label
        htmlFor='confirm'
        className={`${styles.label} ${error ? styles.labelError : ''}`}
      >
        Confirm password
      </label>
      <input
        type='password'
        id='confirm'
        autoComplete='new-password'
        value={confirmPassword}
        onChange={(e) => handleInputChange('confirm', e.target.value)}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
      />
      {error && <span className={styles.error}>{error}</span>}
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
  );
};

export default SignUpForm;
