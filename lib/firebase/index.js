// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAirHeC3xcONBzHfUKPJQQv_1bV0A5aanw",
  authDomain: "weightlosstracker-dfb04.firebaseapp.com",
  projectId: "weightlosstracker-dfb04",
  storageBucket: "weightlosstracker-dfb04.appspot.com",
  messagingSenderId: "466412031513",
  appId: "1:466412031513:web:c55554ea9cd18d0ecd6488",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
