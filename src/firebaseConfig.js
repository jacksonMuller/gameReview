import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyAvEZ2-48w1lkYOTfgJTUjynLJYjWF6Cx0",
  authDomain: "gamereview-3f7da.firebaseapp.com",
  projectId: "gamereview-3f7da",
  storageBucket: "gamereview-3f7da.firebasestorage.app",
  messagingSenderId: "633852134476",
  appId: "1:633852134476:web:62013641d74d260b9960e9",
  measurementId: "G-QGC66J833P",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Authentication
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);
