import React, {createContext, useContext, useState, useEffect} from 'react';
import {auth} from '../firebase';

const AuthContext = createContext(null)

export const UseAuth = () => useContext(AuthContext)

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
        console.log(unsubscribe)
        return unsubscribe
    }, [])

    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
    }


    const value = {
        currentUser,
        signup
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}





