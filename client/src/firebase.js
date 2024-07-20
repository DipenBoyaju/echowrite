// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "echowrite-36a95.firebaseapp.com",
  projectId: "echowrite-36a95",
  storageBucket: "echowrite-36a95.appspot.com",
  messagingSenderId: "173903220041",
  appId: "1:173903220041:web:e98735f742b16259e8de98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app
