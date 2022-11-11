import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth'
import { auth } from '../firebase/firebase'
import { createContext, useContext, useEffect, useState } from 'react'

type Props = {
  children: React.ReactNode
}

type UserType = {
  uid: string
  email: string | null
}

export type AuthType = {
  user: UserType | null
  signUp: (email: string, password: string) => Promise<UserCredential>
  signIn: (email: string, password: string) => Promise<UserCredential>
  signOut: () => void
}

const AuthContext = createContext<AuthType | null>(null)

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserType | null>(null)

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
        })
      } else {
        setUser(null)
      }
    })
  })

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logOut = () => {
    setUser(null)
    signOut(auth)
  }

  const value: AuthType = {
    user: user,
    signUp: signUp,
    signIn: signIn,
    signOut: logOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
