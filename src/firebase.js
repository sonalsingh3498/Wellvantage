import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "react-auth-d780e.firebaseapp.com",
  projectId: "react-auth-d780e",
  storageBucket: "react-auth-d780e.firebasestorage.app",
  messagingSenderId: "836783150995",
  appId: "1:836783150995:web:2f21c72e4ce6ecb5bb3a66",
  measurementId: "G-FCLLYW0BYT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup, signOut };
