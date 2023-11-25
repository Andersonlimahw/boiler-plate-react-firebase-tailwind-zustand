// Ref:  https://firebase.google.com/docs/reference/js/database.md#database_package
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhQ7OF9QZMLfaeioCdU3xND5Hp77ANdWY",
  authDomain: "lemon-firebase-samples.firebaseapp.com",
  databaseURL: "https://lemon-firebase-samples-default-rtdb.firebaseio.com",
  projectId: "lemon-firebase-samples",
  storageBucket: "lemon-firebase-samples.appspot.com",
  messagingSenderId: "944120575676",
  appId: "1:944120575676:web:f0d77661d0be758b2342b9",
  measurementId: "G-4C7DDL9BLG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


// Auth:
export const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
export const auth = getAuth(app);
auth.languageCode = 'it';

// DB:
export const db = getFirestore(app);
export default db;
