// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Use your Firebase config from console!

const firebaseConfig = {
  apiKey: "AIzaSyAhSDpy3nPzcjRSia7x86MOhmqGqs2y-y0",
  authDomain: "smartmeter-vjratechnologies.firebaseapp.com",
  projectId: "smartmeter-vjratechnologies",
  storageBucket: "smartmeter-vjratechnologies.firebasestorage.app",
  messagingSenderId: "507139814790",
  appId: "1:507139814790:web:b6b16858bc043803f32807",
  measurementId: "G-QZB744RX5K"
};

const app = initializeApp(firebaseConfig);

// export the auth instance (use this everywhere)
export const auth = getAuth(app);

// Optionally set language, e.g. default device language
// auth.useDeviceLanguage();

export default app;
