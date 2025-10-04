import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDuuSunyLpS8tjkY69ZSkrrC9CDdUbHPbo",
  authDomain: "cooktales-e0bf1.firebaseapp.com",
  projectId: "cooktales-e0bf1",
  storageBucket: "cooktales-e0bf1.appspot.com",
  messagingSenderId: "778495762161",
  appId: "1:778495762161:web:1575014b2e166e40715350",
  measurementId: "G-2JQ4VNVNNS"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);