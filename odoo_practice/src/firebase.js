// Import Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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

// Export Firestore
export const db = getFirestore(app);
export const storage = getStorage(app);
