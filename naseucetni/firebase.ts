// src/config/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDup_1PuUFSLm4ZHPLgUJVuDCGEudBVhWk",
  authDomain: "naseucetni-database.firebaseapp.com",
  projectId: "naseucetni-database",
  storageBucket: "naseucetni-database.appspot.com",
  messagingSenderId: "33185754458",
  appId: "1:33185754458:web:125a2adeb95cab7afe9763",
  measurementId: "G-VS19N5MB79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
