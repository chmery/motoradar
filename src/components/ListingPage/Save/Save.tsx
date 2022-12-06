import { useEffect, useRef, useState } from 'react';
import styles from './Save.module.scss';

import { HiOutlineHeart } from 'react-icons/hi';
import { IconContext } from 'react-icons';
import {
  arrayRemove,
  arrayUnion,
  doc,
  DocumentReference,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { AuthType, useAuth } from '../../../store/AuthContext';
import { UserType } from '../../../hooks/useUser';

type Props = {
  listingId: string;
};

const Save = ({ listingId }: Props) => {
  const [isSaved, setIsSaved] = useState(false);
  const docRef = useRef<DocumentReference<UserType> | null>(null);

  const { userData } = useAuth() as AuthType;

  useEffect(() => {
    if (userData) {
      docRef.current = doc(
        db,
        'users',
        userData.uid
      ) as DocumentReference<UserType>;
    }
  }, [userData]);

  const handleSave = async () => {
    if (isSaved) {
      setIsSaved(false);

      if (docRef.current) {
        await updateDoc(docRef.current, {
          saved: arrayRemove(listingId),
        });
      }

      return;
    }

    if (docRef.current) {
      setIsSaved(true);
      await updateDoc(docRef.current, {
        saved: arrayUnion(listingId),
      });
    }

    return;
  };

  return (
    <IconContext.Provider value={{ className: styles.save }}>
      <HiOutlineHeart
        fill={`${isSaved ? '#41adfb' : '#fff'}`}
        stroke={`${isSaved ? '#41adfb' : 'currentColor'}`}
        onClick={handleSave}
      />
    </IconContext.Provider>
  );
};

export default Save;
