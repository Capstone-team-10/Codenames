// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

// import firebase from "firebase";
import firebaseConfig from "./config";
// import "firebase/firestore";

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

export default firebase;
