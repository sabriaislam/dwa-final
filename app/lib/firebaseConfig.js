import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
    apiKey: "AIzaSyAr4rwuMZmHbExAxIdpl44kXFtsheI_8a4",
    authDomain: "final-project-a29d0.firebaseapp.com",
    projectId: "final-project-a29d0",
    storageBucket: "final-project-a29d0.firebasestorage.app",
    messagingSenderId: "599206501989",
    appId: "1:599206501989:web:aef33c15fefc4e8b82f08c"
};

Object.keys(firebaseConfig).forEach((key) => {
  const configValue = firebaseConfig[key] + "";
  if (configValue.charAt(0) === '"') {
    firebaseConfig[key] = configValue.substring(1, configValue.length - 1);
  }
});

export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(firebaseApp);

export const db = getFirestore(firebaseApp);
