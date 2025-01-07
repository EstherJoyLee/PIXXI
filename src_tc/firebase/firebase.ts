// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  // apiKey: process.env.NEXT_PUBLIC_APP_KEY!,
  // authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN!,
  // projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  // storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET!,
  // messagingSenderId: process.env.NEXT_PUBLIC_MESSAGEING_SENDER_ID!,
  // appId: process.env.NEXT_PUBLIC_APP_ID!

  apiKey: "AIzaSyCmj9KH4bzjw7DhIO391c4p-a9rvz4fu3M",
  authDomain: "pixxi-31a00.firebaseapp.com",
  projectId: "pixxi-31a00",
  storageBucket: "pixxi-31a00.appspot.com",
  messagingSenderId: "656025943201",
  appId: "1:656025943201:web:00bdff4a76123bbe0484e0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
