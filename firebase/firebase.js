import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your firebase Config
const firebaseConfig = {
  apiKey:,
  authDomain:,
  projectId: ,
  storageBucket: ,
  messagingSenderId:,
  appId: ,
  measurementId: ,
};

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

export { db, auth };
