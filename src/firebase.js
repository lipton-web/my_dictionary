// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIR_Azx7MANH2H4DXC_i-LipL_dJmUmRY",
  authDomain: "lipton-ebb0b.firebaseapp.com",
  projectId: "lipton-ebb0b",
  storageBucket: "lipton-ebb0b.appspot.com",
  messagingSenderId: "253454544852",
  appId: "1:253454544852:web:d61bef77327bca259d7041",
  measurementId: "G-5MF0TBCE38"
};

// Initialize Firebase
initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore();