import { FirebaseError } from 'firebase/app';
import { updateEmail } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { auth, db } from '../../../firebase/firebase';
import { useUser } from '../../../hooks/useUser';
import { AuthType, useAuth } from '../../../store/AuthContext';
import { getAuthErrorMessage } from '../../../utils/getAuthErrorMessage';
import ErrorBox from '../../Auth/ErrorBox/ErrorBox';
import Button from '../../UI/Button/Button';
import styles from './ChangeEmail.module.scss';

type Props = {
  handleChangeEmailOpen: () => void;
  setIsSuccessAlertOpen: Dispatch<SetStateAction<boolean>>;
  setSuccessText: Dispatch<SetStateAction<string>>;
};

const ChangeEmail = ({
  handleChangeEmailOpen,
  setIsSuccessAlertOpen,
  setSuccessText,
}: Props) => {
  const { userData } = useAuth() as AuthType;
  const user = useUser(userData?.uid);

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
      if (auth.currentUser && userData) {
        await updateEmail(auth.currentUser, email);

        const userRef = doc(db, 'users', userData.uid);
        await updateDoc(userRef, {
          email: email,
        });

        setSuccessText('E-mail successfuly changed!');
        setIsSuccessAlertOpen(true);
        handleChangeEmailOpen();
      }
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
