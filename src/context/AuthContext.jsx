import React, {createContext, useContext, useState, useEffect} from 'react';
import {auth} from '../firebase';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail} from 'firebase/auth';
import { collection, query, where, getDocs} from "firebase/firestore";
import { db } from '../firebase';

const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState()
    const [team, setTeam] = useState()
    const [loading, setLoading] = useState(true)
    const [teamLoading, setTeamLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }    

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    const getUserTeam = async() => {
        if (currentUser) {
            const {email} = currentUser
            const usersRef = collection(db, 'users')
            const q = query(usersRef, where('email', '==', email))
            const querySnapshot = await getDocs(q)
            const userDoc = querySnapshot.docs[0]
            const currentUserData = userDoc.data()
            setTeam(currentUserData.team)
            setTeamLoading(false)
        }
    }

    useEffect(() => {
        if (currentUser) {
            getUserTeam()
        }
    }, [currentUser])

    const value = {
        currentUser,
        team,
        signup,
        login,
        logout,
        resetPassword,
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)





