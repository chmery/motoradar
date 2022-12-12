import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth, db } from '../firebase/firebase';
import { createContext, useContext, useEffect, useState } from 'react';
import { createRandomUsername } from '../utils/createRandomUsername';
import { doc, setDoc } from 'firebase/firestore';
import Cookies from 'js-cookie';
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
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthType | null>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserType | null>(null);

  const router = useRouter();

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
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

  useEffect(() => {
    const interval = setInterval(() => {
      const uidCookie = Cookies.get('uid');
      if (!uidCookie && auth.currentUser) {
        logOut();
      }
    }, 1000);

    return () => clearInterval(interval);
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
      saved: [],
    });

    const inOneHour = new Date(new Date().getTime() + 240 * 60 * 1000);
    Cookies.set('uid', userData.user.uid, { expires: inOneHour });
  };

  const signIn = async (email: string, password: string) => {
    const userData = await signInWithEmailAndPassword(auth, email, password);

    const inOneHour = new Date(new Date().getTime() + 240 * 60 * 1000);
    Cookies.set('uid', userData.user.uid, { expires: inOneHour });
  };

  const logOut = () => {
    Cookies.remove('uid');
    setUser(null);
    signOut(auth);
    router.push('/');
  };

  const value: AuthType = {
    userData: user,
    signUp: signUp,
    signIn: signIn,
    signOut: logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
