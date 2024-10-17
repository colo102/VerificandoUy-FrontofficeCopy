import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWa1zk6nP-WHZOwl_LfcL3wzeS0Jifepc",
  authDomain: "verificandouypruebas.firebaseapp.com",
  projectId: "verificandouypruebas",
  storageBucket: "verificandouypruebas.appspot.com",
  messagingSenderId: "165601998441",
  appId: "1:165601998441:web:742ed3bfe236da161ed4f8",
  measurementId: "G-PYM080RKRH",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
let analytics;
isSupported().then((isSupported) => {
  if (isSupported) {
    analytics = getAnalytics();
  }
});
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
