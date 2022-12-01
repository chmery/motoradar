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
 * @param uid user uid from firebase auth
 *
 * @returns user object
 */

export const useUser = (uid: string | undefined) => {
  const [user, setUser] = useState<UserType | undefined>(undefined);

  if (!uid) {
    return {
      email: 'loading...',
      displayName: 'loading...',
      photoURL: 'loading...',
      location: 'loading...',
      phoneNumber: 'loading...',
    };
  }

  useEffect(() => {
    return onSnapshot(
      doc(db, 'users', uid) as DocumentReference<UserType>,
      (doc) => {
        setUser(doc.data());
      }
    );
  }, []);

  return user;
};
