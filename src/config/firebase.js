// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyDup_1PuUFSLm4ZHPLgUJVuDCGEudBVhWk",
authDomain: "naseucetni-database.firebaseapp.com",
projectId: "naseucetni-database",
storageBucket: "naseucetni-database.firebasestorage.app",
messagingSenderId: "33185754458",
appId: "1:33185754458:web:125a2adeb95cab7afe9763",
measurementId: "G-VS19N5MB79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore()