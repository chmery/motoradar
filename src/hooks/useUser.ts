import {
  doc,
  DocumentReference,
  DocumentSnapshot,
  onSnapshot,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';

type UserType = {
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  location: string | null;
  phoneNumber: number | null;
};

/**
 * Hook to retrive user information from firebase database
 *
 * @param uid user uid you want to retrive information about
 *
 * @returns user object
 */

export const useUser = (uid: string | undefined) => {
  const [user, setUser] = useState<UserType | undefined>(undefined);

  useEffect(() => {
    if (!uid) {
      setUser({
        email: 'loading...',
        displayName: 'loading...',
        photoURL:
          'https://firebasestorage.googleapis.com/v0/b/motoradar-3dd45.appspot.com/o/profilePics%2Ftemporary.jpg?alt=media&token=f60ccd74-f6e4-42ca-add8-243e349fbb1b',
        location: 'loading...',
        phoneNumber: 100000000,
      });
    } else {
      return onSnapshot(
        doc(db, 'users', uid) as DocumentReference<UserType>,
        (doc) => {
          setUser(doc.data());
        }
      );
    }
  }, [uid]);

  return user;
};
