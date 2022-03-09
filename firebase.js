// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps,getFirestore,getStorage } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWneWEyA41sohe6YTR-s5u4Dd_dcVqsSc",
  authDomain: "instagram-c421f.firebaseapp.com",
  projectId: "instagram-c421f",
  storageBucket: "instagram-c421f.appspot.com",
  messagingSenderId: "11153891788",
  appId: "1:11153891788:web:ddb2d59508205d2bfd3d69"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const storage = getStorage();

export { app , db , storage};