import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  UserCredential,
} from 'firebase/auth';
import { auth, db } from '../firebase/firebase';
import { createContext, useContext, useEffect, useState } from 'react';
import { createRandomUsername } from '../utils/createRandomUsername';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

type Props = {
  children: React.ReactNode;
};

export type UserType = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};

export type AuthType = {
  userData: UserType | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signOut: () => void;
};

const AuthContext = createContext<AuthType | null>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      } else {
        setUser(null);
      }
    });
  }, []);

  const signUp = async (email: string, password: string) => {
    const userData = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(auth.currentUser!, {
      displayName: createRandomUsername(userData.user.email!),
      photoURL:
        'https://firebasestorage.googleapis.com/v0/b/motoradar-3dd45.appspot.com/o/profilePics%2Ftemporary.jpg?alt=media&token=f60ccd74-f6e4-42ca-add8-243e349fbb1b',
    });

    await setDoc(doc(db, 'users', userData.user.uid), {
      email: userData.user.email,
      photoURL: userData.user.photoURL,
      displayName: userData.user.displayName,
      phoneNumber: '',
      location: '',
    });
  };

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setUser(null);
    signOut(auth);
  };

  const value: AuthType = {
    userData: user,
    signUp: signUp,
    signIn: signIn,
    signOut: logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
