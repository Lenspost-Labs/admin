// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZtin5AMrBNvbWyR7ioj7LHeGm1BpIALg",
  authDomain: "pizza-fullstack.firebaseapp.com",
  projectId: "pizza-fullstack",
  storageBucket: "pizza-fullstack.appspot.com",
  messagingSenderId: "39379747021",
  appId: "1:39379747021:web:44d8aef17f1d1cd468e984",
  measurementId: "G-XG73VY0R48",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth();
