import * as firebase from 'firebase';

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBVNUdmXPgwMAhJImbTK0f_46tAzQQ5HZc",
    authDomain: "rukun-5cdc9.firebaseapp.com",
    databaseURL: "https://rukun-5cdc9-default-rtdb.firebaseio.com",
    projectId: "rukun-5cdc9",
    storageBucket: "rukun-5cdc9.appspot.com",
    messagingSenderId: "725573402222",
    appId: "1:725573402222:web:6f5b488ba5f7ad0adb707f"
};

firebase.initializeApp(firebaseConfig);

export default firebase