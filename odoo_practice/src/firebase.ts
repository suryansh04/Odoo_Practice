// Import Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your Firebase config from console
const firebaseConfig = {
  apiKey: "AIzaSyCx2vh0q9y2VDc-q0mgVSNJJnlwf1P-ovI",
  authDomain: "fir-8f951.firebaseapp.com",
  projectId: "fir-8f951",
  storageBucket: "fir-8f951.firebasestorage.app",
  messagingSenderId: "961956144937",
  appId: "1:961956144937:web:72b5ba0628c6f6ffa27938",
  measurementId: "G-NC3D7NR7G8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Export the services
export { db, storage, auth };
