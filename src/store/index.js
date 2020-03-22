import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import {
  reduxFirestore,
  getFirestore,
  firestoreReducer
} from "redux-firestore";
import {
  reactReduxFirebase,
  getFirebase,
  firebaseReducer
} from "react-redux-firebase";
import firebase from "../fireStore/index.js";
import cards from "./cards";
import turns from "./turns";
import chat from "./chat";
import user from "./user";

const reducer = combineReducers({
  cards,
  turns,
  chat,
  user,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

const middleware = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware.withExtraArgument({ getFirebase, getFirestore }),
    createLogger({ collapsed: true })
  ),
  reduxFirestore(firebase)
);
const store = createStore(reducer, middleware);

export default store;
