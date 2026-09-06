// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8-KQfuSm6CyvRTHZlFc469pmjBJ-GlIU",
  authDomain: "vite-contuct.firebaseapp.com",
  projectId: "vite-contuct",
  storageBucket: "vite-contuct.firebasestorage.app",
  messagingSenderId: "1071836340987",
  appId: "1:1071836340987:web:b2ccf29d0e30994f9e465e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)