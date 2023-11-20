// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSv6LCLHfiFfkYxxukMCApMkmdc1edj_U",
  authDomain: "study-mate-connect.firebaseapp.com",
  projectId: "study-mate-connect",
  storageBucket: "study-mate-connect.appspot.com",
  messagingSenderId: "299313756010",
  appId: "1:299313756010:web:b8e58e78f8e7d5fddd1713",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
