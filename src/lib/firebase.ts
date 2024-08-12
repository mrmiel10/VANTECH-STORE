// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSnsMncX7zMEDqKtQRXot4mtJMj1iNSY8",
  authDomain: "e-commerce-vantech.firebaseapp.com",
  projectId: "e-commerce-vantech",
  storageBucket: "e-commerce-vantech.appspot.com",
  messagingSenderId: "553373509493",
  appId: "1:553373509493:web:6d1268101799534579553c"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp