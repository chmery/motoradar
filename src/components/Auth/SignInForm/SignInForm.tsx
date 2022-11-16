import { FirebaseError } from 'firebase/app';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { AuthType, useAuth } from 'store/AuthContext';
import { getAuthErrorMessage } from 'utils/getAuthErrorMessage';
import styles from './SignInForm.module.scss';
import RadialLoader from 'components/UI/Loaders/RadialLoader/RadialLoader';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth() as AuthType;
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

    if (!email && !password) return;

    try {
      await signIn(email, password);
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
      {error && <span className={styles.error}>{error}</span>}
      <button
        type='submit'
        className={`${styles.button} ${email && password ? styles.active : ''}`}
        disabled={email && password && !loading ? false : true}
      >
        {loading ? <RadialLoader /> : 'Sign In'}
      </button>
    </form>
  );
};

export default SignInForm;
