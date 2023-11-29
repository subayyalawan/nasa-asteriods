import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBAC7Zeo2BRfw3Ro6WM-jqVstNI5hId-74",
  authDomain: "nasa-asteriods.firebaseapp.com",
  projectId: "nasa-asteriods",
  storageBucket: "nasa-asteriods.appspot.com",
  messagingSenderId: "893761375654",
  appId: "1:893761375654:web:dda0bef44037d5fbd6d367",
  measurementId: "G-JMM53KERP0"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();