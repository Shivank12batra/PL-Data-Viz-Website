import React, {createContext, useContext, useState, useEffect} from 'react';
import {auth} from '../firebase';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail} from 'firebase/auth';

const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

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

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)





