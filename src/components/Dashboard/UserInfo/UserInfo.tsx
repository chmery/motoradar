import Image from 'next/image';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { auth, storage } from '../../../firebase/firebase';
import { updateProfile } from 'firebase/auth';
import { useState } from 'react';

import styles from './UserInfo.module.scss';
import { AuthType, useAuth } from 'store/AuthContext';

import { FiUpload } from 'react-icons/fi';
import UploadLoader from 'components/UI/Loaders/UploadLoader/UploadLoader';

const UserInfo = () => {
  const { user } = useAuth() as AuthType;
  const [isLoading, setIsLoading] = useState(false);

  const changeAvatar = (image: FileList | null) => {
    const reader = new FileReader();
    if (image) {
      reader.readAsDataURL(image[0]);
    }

    reader.onload = async (readerEvent: ProgressEvent<FileReader>) => {
      setIsLoading(true);
      if (readerEvent.target?.result) {
        const imageRef = ref(storage, `profilePics/${user?.uid}`);

        await uploadString(
          imageRef,
          readerEvent.target.result as string,
          'data_url'
        ).then(async () => {
          const imageUrl = await getDownloadURL(imageRef);
          try {
            await updateProfile(auth.currentUser!, {
              photoURL: imageUrl,
            });
          } catch (error) {
            console.error(error);
          }
        });
      }

      setIsLoading(false);
    };
  };

  return (
    <div className={styles.container}>
      <div className={styles['image-container']}>
        {user && (
          <Image
            src={user.photoURL!}
            alt='profile picture'
            width={80}
            height={80}
            className={styles.image}
          />
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
