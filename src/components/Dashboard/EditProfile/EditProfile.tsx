import { updateProfile } from 'firebase/auth';
import { auth } from '../../../firebase/firebase';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import styles from './EditProfile.module.scss';
import Button from '../../UI/Button/Button';
import { AuthType, useAuth } from '../../../store/AuthContext';
import SuccessAlert from '../SuccessAlert/SuccessAlert';
import { FirebaseError } from 'firebase/app';
import { getAuthErrorMessage } from '../../../utils/getAuthErrorMessage';
import ErrorBox from '../../Auth/ErrorBox/ErrorBox';
import { useUser } from '../../../hooks/useUser';

type Props = {
  handleEditProfileOpen: () => void;
  setIsSuccessAlertOpen: Dispatch<SetStateAction<boolean>>;
  setSuccessText: Dispatch<SetStateAction<string>>;
};

const EditProfile = ({
  handleEditProfileOpen,
  setIsSuccessAlertOpen,
  setSuccessText,
}: Props) => {
  const { userData } = useAuth() as AuthType;
  const user = useUser(userData?.uid);

  const [username, setUsername] = useState(user?.displayName || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isErrorOpen, setIsErrorOpen] = useState(false);

  const handleInputChange = (type: string, input: string) => {
    switch (type) {
      case 'username':
        setUsername(input);
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

    if (username === user?.displayName) {
      setIsLoading(false);
      handleEditProfileOpen();
      return;
    }

    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: username,
        });
        handleEditProfileOpen();
        setSuccessText('Username successfuly changed!');
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
    <>
      {isErrorOpen && (
        <ErrorBox text={error} closeErrorBox={handleErrorBoxClose} />
      )}
      <section>
        <h2 className={styles.header}>Personal Information</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor='username' className={styles.label} id='form'>
            Username
          </label>
          <input
            type='text'
            className={styles.input}
            maxLength={15}
            id='username'
            value={username as string}
            onChange={(e) => handleInputChange('username', e.target.value)}
          />

          <Button
            text='Save'
            type='submit'
            isLoading={isLoading}
            disabled={isLoading || !username}
            active={username ? true : false}
          />
          <Button text='Cancel' type='button' onClick={handleEditProfileOpen} />
        </form>
      </section>
    </>
  );
};

export default EditProfile;
