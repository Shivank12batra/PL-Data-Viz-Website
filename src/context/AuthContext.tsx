import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  UserCredential,
} from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { TTopSixTeam } from "../types";

interface IAuthContext {
  currentUser: IUser | null;
  team: TTopSixTeam;
  signup: (props: IAuthProps) => Promise<UserCredential>;
  login: (props: IAuthProps) => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (props: IResetPasswordProps) => Promise<void>;
}

const AuthContext = createContext<IAuthContext | null>(null);

interface IAuthProviderProps {
  children: React.ReactNode;
}

export interface IUser {
  email: string;
  name: string;
  phone: string;
  team: TTopSixTeam;
}

interface IAuthProps {
  email: string;
  password: string;
}

interface IResetPasswordProps extends Pick<IAuthProps, "email"> {}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [team, setTeam] = useState<TTopSixTeam>("Arsenal");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user as unknown as IUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signup = ({ email, password }: IAuthProps) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = ({ email, password }: IAuthProps) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = ({ email }: IResetPasswordProps) => {
    return sendPasswordResetEmail(auth, email);
  };

  const getUserTeam = async () => {
    if (!currentUser) return;

    const { email } = currentUser;
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    const userDoc = querySnapshot.docs[0];
    const currentUserData = userDoc.data();
    setTeam(currentUserData.team);
  };

  useEffect(() => {
    if (currentUser) {
      getUserTeam();
    }
  }, [currentUser]);

  const value = {
    currentUser,
    team,
    signup,
    login,
    logout,
    resetPassword,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
