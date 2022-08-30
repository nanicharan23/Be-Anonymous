// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDewYhZ6okqeAiIaNPSEpwOTzPv5ASimqA",
  authDomain: "beanonymous-331a6.firebaseapp.com",
  projectId: "beanonymous-331a6",
  storageBucket: "beanonymous-331a6.appspot.com",
  messagingSenderId: "622298748920",
  appId: "1:622298748920:web:ac095d23f4d5b0bed6680d",
  measurementId: "G-GMBJVC68RH"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db; 