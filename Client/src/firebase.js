// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCWOPVQUpV2zA2z9y2fy1mTRZu-e0hVUjY",
    authDomain: "calcounter-5b61f.firebaseapp.com",
    projectId: "calcounter-5b61f",
    storageBucket: "calcounter-5b61f.appspot.com",
    messagingSenderId: "554048744355",
    appId: "1:554048744355:web:b4140061d9a857db278816",
    measurementId: "G-RBTNPT1ZEJ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const db = getFirestore(app);

export const provider = new GoogleAuthProvider()

