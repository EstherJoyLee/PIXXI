// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
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
if (storage) {
  console.log("storage is storageenticated:", storage);
} else {
  console.error("storage is not authenticated");
}
export default app;
