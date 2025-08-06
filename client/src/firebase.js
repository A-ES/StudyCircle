// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCTQY75NAnUoEppoxED8FbfppMcX8-w26A",
  authDomain: "studycircle-f49ce.firebaseapp.com",
  projectId: "studycircle-f49ce",
  storageBucket: "studycircle-f49ce.firebasestorage.app",
  messagingSenderId: "781497459977",
  appId: "1:781497459977:web:506baa35496eed4a805fd8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
