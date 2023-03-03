// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDv-Gvlsuc8fUyYgTY0wImPqmcCJ_R66xE",
  authDomain: "travelyahir.firebaseapp.com",
  projectId: "travelyahir",
  storageBucket: "travelyahir.appspot.com",
  messagingSenderId: "827585115045",
  appId: "1:827585115045:web:e0b41393aec4da6760ee4c"
};

// Initialize Firebase
export const initFirebase = initializeApp(firebaseConfig);