import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDnP1Y1Yl0QzVyvWJgxb3OrDKM_itFuiOA",
  authDomain: "chatnative-987d1.firebaseapp.com",
  projectId: "chatnative-987d1",
  storageBucket: "chatnative-987d1.appspot.com",
  messagingSenderId: "147277090009",
  appId: "1:147277090009:web:6ae054f03229e281c442c8",
  measurementId: "G-59NK4DXJLS",
};

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

export { db, auth };
