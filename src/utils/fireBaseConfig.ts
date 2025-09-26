// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBnAd2d_oUxkC03QTVDbq9pBKxeAes3f3c",
  authDomain: "smart-home-3aabc.firebaseapp.com",
  databaseURL: "https://smart-home-3aabc-default-rtdb.firebaseio.com",
  projectId: "smart-home-3aabc",
  storageBucket: "smart-home-3aabc.firebasestorage.app",
  messagingSenderId: "253771181943",
  appId: "1:253771181943:web:c1452e253f52a5ff873b72",
  measurementId: "G-8L70B5ERRF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
