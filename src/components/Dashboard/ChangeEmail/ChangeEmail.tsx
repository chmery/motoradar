import { FirebaseError } from 'firebase/app';
import { updateEmail } from 'firebase/auth';
import { FormEvent, useState } from 'react';
import { auth } from '../../../firebase/firebase';
import { AuthType, useAuth } from '../../../store/AuthContext';
import { getAuthErrorMessage } from '../../../utils/getAuthErrorMessage';
import ErrorBox from '../../Auth/ErrorBox/ErrorBox';
import Button from '../../UI/Button/Button';
import styles from './ChangeEmail.module.scss';

type Props = {
  handleChangeEmailOpen: () => void;
};

const ChangeEmail = ({ handleChangeEmailOpen }: Props) => {
  const { user } = useAuth() as AuthType;

  const [email, setEmail] = useState(user?.email || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isErrorOpen, setIsErrorOpen] = useState(false);

  const emailRgx = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  const handleInputChange = (type: string, input: string) => {
    switch (type) {
      case 'email':
        setEmail(input);
        break;
      default:
        console.error(
          'passed wrong type to handleInputChange function in EditProfile'
        );
        break;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (email === user?.email) {
      handleChangeEmailOpen();
      setIsLoading(false);
      return;
    }

    try {
      if (auth.currentUser) {
        await updateEmail(auth.currentUser, email);
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(getAuthErrorMessage(error.code));
        setIsErrorOpen(true);
      }
    }

    setIsLoading(false);
    handleChangeEmailOpen();
  };

  const handleErrorBoxClose = () => {
    setIsErrorOpen(false);
  };

  return (
    <section>
      {isErrorOpen && (
        <ErrorBox text={error} closeErrorBox={handleErrorBoxClose} />
      )}
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor='email' className={styles.label} id='form'>
          New e-mail
        </label>
        <input
          type='email'
          className={styles.input}
          id='email'
          value={email as string}
          onChange={(e) => handleInputChange('email', e.target.value)}
        />

        <Button
          text='Save'
          type='submit'
          isLoading={isLoading}
          disabled={isLoading || !email.match(emailRgx)}
          active={email.match(emailRgx) ? true : false}
        />
        <Button text='Cancel' type='button' onClick={handleChangeEmailOpen} />
      </form>
    </section>
  );
};

export default ChangeEmail;
