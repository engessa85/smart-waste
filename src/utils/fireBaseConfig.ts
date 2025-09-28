// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnNbPtQpk0VZR2Ibof-LNnEM5_MV77c4s",
  authDomain: "smart-waste-55250.firebaseapp.com",
  databaseURL: "https://smart-waste-55250-default-rtdb.firebaseio.com",
  projectId: "smart-waste-55250",
  storageBucket: "smart-waste-55250.firebasestorage.app",
  messagingSenderId: "105212957631",
  appId: "1:105212957631:web:19a237013350028acbc70a",
  measurementId: "G-4MER3KD3PC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
