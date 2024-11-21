import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAvEZ2-48w1lkYOTfgJTUjynLJYjWF6Cx0",
  authDomain: "gamereview-3f7da.firebaseapp.com",
  projectId: "gamereview-3f7da",
  storageBucket: "gamereview-3f7da.firebasestorage.app",
  messagingSenderId: "633852134476",
  appId: "1:633852134476:web:62013641d74d260b9960e9",
  measurementId: "G-QGC66J833P",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
