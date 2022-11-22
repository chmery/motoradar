import Button from 'components/UI/Button/Button';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../../firebase/firebase';
import { FormEvent, useState } from 'react';
import { AuthType, useAuth } from 'store/AuthContext';
import styles from './EditProfile.module.scss';

type Props = {
  handleEditProfileOpen: () => void;
};

const EditProfile = ({ handleEditProfileOpen }: Props) => {
  const { user } = useAuth() as AuthType;

  const [username, setUsername] = useState(user?.displayName || '');
  const [isLoading, setIsLoading] = useState(false);

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

    await updateProfile(auth.currentUser!, {
      displayName: username,
    });

    setIsLoading(false);
    handleEditProfileOpen();
  };

  return (
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
          active
          isLoading={isLoading}
          disabled={isLoading}
        />
      </form>
      <Button text='Cancel' type='button' onClick={handleEditProfileOpen} />
    </section>
  );
};

export default EditProfile;
