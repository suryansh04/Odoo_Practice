import { Firestore } from 'firebase/firestore';
import { FirebaseStorage } from 'firebase/storage';
import { Auth } from 'firebase/auth';

declare module './firebase' {
  export const db: Firestore;
  export const storage: FirebaseStorage;
  export const auth: Auth;
}
