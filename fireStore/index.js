import firebase from "firebase/app";
// const admin = require("firebase-admin");
// const functions = require('firebase-functions');

// admin.initializeApp(functions.config().firebase);

// let db = admin.firestore();

// var admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://codenames-3a350.firebaseio.com"
// });

// Initialize Firebase
const config = {
  apiKey: process.env.FIRESTORE_API_KEY,
  authDomain: "codenames-3a350.firebaseapp.com",
  databaseURL: "https://codenames-3a350.firebaseio.com",
  projectID: "codenames-3a350"
  // storageBucket:
  // messagingSenderId:
};
firebase.initializeApp(config);
