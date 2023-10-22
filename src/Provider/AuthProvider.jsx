import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"
import React from 'react';
import app from "../Firebase/firebase.config";

//auth context
export const AuthContext = createContext(null);
const auth = getAuth(app)

// google provider
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    // creating user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            console.log('current user', currentUser)
            // get and set token
            // if (currentUser) {
            //     axios.post('https://server-liard-one.vercel.app/jwt-token', {
            //         email: currentUser.email,
            //     })
            //         .then(data => {
            //             // set access token when user log in or register
            //             localStorage.setItem('access-token', data.data.token)
            //             setLoading(false)
            //         })
            // } else {
            //     // remove access token when user log out
            //     localStorage.removeItem('access-token')
            // }
            setLoading(false)
        })
        return () => {
            return unsubscribe()
        }
    }, [])
    const authInfo = {
        user,
        loading,
        setLoading,
        createUser,
        signIn,
        signInWithGoogle,
        logOut,
        updateUserProfile,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;