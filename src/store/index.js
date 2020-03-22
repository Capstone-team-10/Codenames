import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import firebaseConfig from "../fireStore/config";
// import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import {
  reduxFirestore,
  getFirestore,
  firestoreReducer,
} from "redux-firestore";
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
});
const middleware = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware.withExtraArgument({ getFirebase, getFirestore })
  ),
  reduxFirestore(firebaseConfig),
  reactReduxFirebase(firebaseConfig),
  createLogger({ collapsed: true })
);
const store = createStore(reducer, middleware);

export default store;
