import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDMFpphQapy4GQ4pGPoRMWmq4rcJFlMFYA",
    authDomain: "wondersofomicron.firebaseapp.com",
    projectId: "wondersofomicron",
    storageBucket: "wondersofomicron.appspot.com",
    messagingSenderId: "479890006200",
    appId: "1:479890006200:web:81a5159df67399fb89944d",
    measurementId: "G-R6F1E4XDN3"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;