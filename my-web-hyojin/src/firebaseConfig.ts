// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxPD-fLIEfgm3y7Oavh6J2JBZRF19oh6s",
  authDomain: "my-web-80a0b.firebaseapp.com",
  projectId: "my-web-80a0b",
  storageBucket: "my-web-80a0b.firebasestorage.app",
  messagingSenderId: "961518039125",
  appId: "1:961518039125:web:68caa85b3070307ce024dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);