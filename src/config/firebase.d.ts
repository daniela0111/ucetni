import { Firestore } from "firebase/firestore";
import { FirebaseStorage } from "firebase/storage";

declare module '../src/config/firebase' {
  export const db: Firestore;
  export const storage: FirebaseStorage;
}