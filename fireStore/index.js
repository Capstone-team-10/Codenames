import config from "./config";
import firebase from "firebase";
import "firebase/firestore";

firebase.initializeApp(config);

export default firebase;
