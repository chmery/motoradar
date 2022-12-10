import { FirebaseError } from 'firebase/app';
import { updatePassword } from 'firebase/auth';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { auth } from '../../../firebase/firebase';
import { useUser } from '../../../hooks/useUser';
import { AuthType, useAuth } from '../../../store/AuthContext';
import { getAuthErrorMessage } from '../../../utils/getAuthErrorMessage';
import ErrorBox from '../../Auth/ErrorBox/ErrorBox';
import Button from '../../UI/Button/Button';
import styles from './ChangePassword.module.scss';

type Props = {
  handleChangePasswordOpen: () => void;
  setIsSuccessAlertOpen: Dispatch<SetStateAction<boolean>>;
  setSuccessText: Dispatch<SetStateAction<string>>;
};

const ChangePassword = ({
  handleChangePasswordOpen,
  setIsSuccessAlertOpen,
  setSuccessText,
}: Props) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isErrorOpen, setIsErrorOpen] = useState(false);

  const handleInputChange = (type: string, input: string) => {
    switch (type) {
      case 'password':
        setPassword(input);
        break;
      case 'confirmPassword':
        setConfirmPassword(input);
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

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      setIsErrorOpen(true);
      setIsLoading(false);
    }

    try {
      if (auth.currentUser) {
        await updatePassword(auth.currentUser, password);
        handleChangePasswordOpen();
        setSuccessText('Password successfuly changed!');
        setIsSuccessAlertOpen(true);
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
        <label htmlFor='password' className={styles.label} id='form'>
          New Password
        </label>
        <input
          type='password'
          className={styles.input}
          id='password'
          value={password}
          onChange={(e) => handleInputChange('password', e.target.value)}
        />
        <label htmlFor='confirm' className={styles.label} id='form'>
          Confirm Password
        </label>
        <input
          type='password'
          className={styles.input}
          id='confirm'
          value={confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
        />

        <Button
          text='Save'
          type='submit'
          isLoading={isLoading}
          disabled={isLoading || !password}
          active={password ? true : false}
        />
        <Button
          text='Cancel'
          type='button'
          onClick={handleChangePasswordOpen}
        />
      </form>
    </section>
  );
};

export default ChangePassword;
