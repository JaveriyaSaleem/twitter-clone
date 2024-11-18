import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore,collection, addDoc,doc, setDoc,updateDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged,sendPasswordResetEmail,GoogleAuthProvider,signInWithPopup,updateProfile } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyAZi9QOzSTGsNmNjsiGgEaXwNcDaUd3WE4",
  authDomain: "fir-signup-form.firebaseapp.com",
  projectId: "fir-signup-form",
  storageBucket: "fir-signup-form.firebasestorage.app",
  messagingSenderId: "6481384555",
  appId: "1:6481384555:web:c2fa04d60c3e535e114d2e"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged,sendPasswordResetEmail,GoogleAuthProvider,signInWithPopup,updateProfile,db,collection, addDoc,doc, setDoc,updateDoc
 }