// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyB3-VcQV_cVaqz9uELmVnuPHxEJreQMGes",
  authDomain: "kanban-2be31.firebaseapp.com",
  projectId: "kanban-2be31",
  storageBucket: "kanban-2be31.firebasestorage.app",
  messagingSenderId: "393270993553",
  appId: "1:393270993553:web:8ea0d09e6dd44f57cc9530"
};

//const app = initializeApp(firebaseConfig);

export const app=initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const auth = getAuth(app);
export const fbFunctions = getFunctions(app);

if(process.env.NODE_ENV === 'development') {
    connectAuthEmulator(auth, 'http://localhost:9099');
    connectFirestoreEmulator(db, 'localhost', 8080);

    connectFunctionsEmulator(fbFunctions, 'localhost', 5001);
}