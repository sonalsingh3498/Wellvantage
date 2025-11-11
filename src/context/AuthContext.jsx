// src/context/AuthContext.js

import React, { createContext, useState, useContext, useEffect } from "react";
// Import the necessary functions and your auth object
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; // Assuming '../firebase' exports the auth object

// 1️⃣ Create the context
const AuthContext = createContext();

// 2️⃣ Provider component
export const AuthProvider = ({ children }) => {
    // Initialize user to null (or false) and add a loading state
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true); 

    // 🔑 THE KEY TO PERSISTENCE 🔑
    useEffect(() => {
        // Subscribe to Firebase Auth state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("Firebase Auth State Changed:", currentUser ? currentUser.uid : 'Logged out');
            
            // This function runs on component mount AND whenever the auth state changes (login/logout)
            setUser(currentUser); 
            setLoading(false); // Auth check is complete
        });

        // Cleanup the listener when the component unmounts
        return unsubscribe;
    }, []);

    // Optional: helper function to log out (using Firebase signOut)
    // You must also import 'signOut' from your firebase config and call it here
    const logout = async () => {
        await signOut(auth); // Assuming signOut is imported from firebase
        setUser(null);
    };

    const value = {
        user,
        setUser,
        logout,
        loading // Expose loading state
    };

    // Only render the application once the authentication check is complete
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// 3️⃣ Custom hook to consume context easily
export const useAuth = () => useContext(AuthContext);