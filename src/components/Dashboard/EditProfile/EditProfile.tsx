import { updateProfile } from 'firebase/auth';
import { auth, db } from '../../../firebase/firebase';
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import styles from './EditProfile.module.scss';
import Button from '../../UI/Button/Button';
import { AuthType, useAuth } from '../../../store/AuthContext';
import SuccessAlert from '../SuccessAlert/SuccessAlert';
import { FirebaseError } from 'firebase/app';
import { getAuthErrorMessage } from '../../../utils/getAuthErrorMessage';
import ErrorBox from '../../Auth/ErrorBox/ErrorBox';
import { useUser } from '../../../hooks/useUser';
import { doc, updateDoc } from 'firebase/firestore';

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
  const [location, setLocation] = useState(user?.location || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isErrorOpen, setIsErrorOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.displayName as string);
      setLocation(user.location as string);
      setPhoneNumber(user.phoneNumber as string);
    }
  }, [user]);

  const handleInputChange = (type: string, input: string) => {
    switch (type) {
      case 'username':
        setUsername(input);
        break;
      case 'location':
        setLocation(input);
        break;
      case 'phoneNumber':
        setPhoneNumber(input);
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

    if (
      !phoneNumber.match(
        /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
      ) &&
      phoneNumber
    ) {
      setError('Wrong phone number!');
      setIsErrorOpen(true);
      setIsLoading(false);
      return;
    }

    if (
      username === user?.displayName &&
      location === user?.location &&
      phoneNumber === user?.phoneNumber
    ) {
      setIsLoading(false);
      handleEditProfileOpen();
      return;
    }

    try {
      if (auth.currentUser && userData) {
        await updateProfile(auth.currentUser, {
          displayName: username,
        });

        const userRef = doc(db, 'users', userData.uid);
        await updateDoc(userRef, {
          displayName: username,
          location: location,
          phoneNumber: phoneNumber,
        });

        handleEditProfileOpen();
        setSuccessText('Profile info successfuly changed!');
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
          <label htmlFor='location' className={styles.label} id='form'>
            Location
          </label>
          <input
            type='text'
            className={styles.input}
            maxLength={25}
            id='location'
            value={location as string}
            onChange={(e) => handleInputChange('location', e.target.value)}
          />
          <label htmlFor='phoneNumber' className={styles.label} id='form'>
            Phone Number
          </label>
          <input
            type='text'
            className={styles.input}
            id='phoneNumber'
            value={phoneNumber}
            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
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
