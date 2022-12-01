import Image from 'next/image';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { auth, db, storage } from '../../../firebase/firebase';
import { updateProfile } from 'firebase/auth';
import { useState } from 'react';

import styles from './UserInfo.module.scss';

import { FiUpload } from 'react-icons/fi';
import { AuthType, useAuth } from '../../../store/AuthContext';
import UploadLoader from '../../UI/Loaders/UploadLoader/UploadLoader';
import { useUser } from '../../../hooks/useUser';
import { doc, updateDoc } from 'firebase/firestore';

const UserInfo = () => {
  const { userData } = useAuth() as AuthType;
  const user = useUser(userData?.uid);

  const [isLoading, setIsLoading] = useState(false);

  const changeAvatar = (image: FileList | null) => {
    const reader = new FileReader();
    if (image) {
      reader.readAsDataURL(image[0]);
    }

    reader.onload = async (readerEvent: ProgressEvent<FileReader>) => {
      setIsLoading(true);
      if (readerEvent.target?.result && userData?.uid) {
        const imageStorageRef = ref(storage, `profilePics/${userData.uid}`);

        const imageRef = await uploadString(
          imageStorageRef,
          readerEvent.target.result as string,
          'data_url'
        );

        const imageUrl = await getDownloadURL(imageRef.ref);

        try {
          await updateProfile(auth.currentUser!, {
            photoURL: imageUrl,
          });

          const userRef = doc(db, 'users', userData.uid);

          await updateDoc(userRef, {
            photoURL: imageUrl,
          });
        } catch (error) {
          console.error(error);
        }
      }

      setIsLoading(false);
    };
  };

  return (
    <div className={styles.container}>
      <div className={styles['image-container']}>
        {user?.photoURL ? (
          <Image
            src={user.photoURL}
            alt='profile picture'
            width={80}
            height={80}
            priority
            className={styles.image}
          />
        ) : (
          <div className={styles['image-placeholder']}></div>
        )}
        <label htmlFor='input' className={styles.label}>
          <FiUpload />
        </label>
        <input
          type='file'
          id='input'
          accept='image/png, image/jpg, image/jpeg'
          onChange={(e) => changeAvatar(e.target.files)}
          className={styles.input}
        />
        {isLoading && <UploadLoader />}
      </div>
      <div>
        <h3 className={styles.name}>{user?.displayName}</h3>
        <p className={styles.email}>{user?.email}</p>
      </div>
    </div>
  );
};

export default UserInfo;
