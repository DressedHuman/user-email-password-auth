// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqIHYOpp7wacyn6X0EbtSwd-LUp2TqtDY",
  authDomain: "user-email-password-auth-5b78a.firebaseapp.com",
  projectId: "user-email-password-auth-5b78a",
  storageBucket: "user-email-password-auth-5b78a.appspot.com",
  messagingSenderId: "640784330702",
  appId: "1:640784330702:web:69a067057203e0011c059f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;