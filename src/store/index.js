import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import {
  createFirestoreInstance,
  getFirestore,
  firestoreReducer,
  reduxFirestore
} from "redux-firestore";
import {
  getFirebase,
  firebaseReducer
} from "react-redux-firebase";
import firebase, {rrfConfig} from "../fireStore"
import firebaseConfig from "../fireStore/config";
import cards from "./cards";
import chat from "./chat";

const reducer = combineReducers({
  cards,
  chat,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

const middleware = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware.withExtraArgument({ getFirebase, getFirestore }),
    createLogger({ collapsed: true })
  ),reduxFirestore(firebase,firebaseConfig)
);
const store = createStore(reducer,middleware);

export const rrfProps = {
  firebase,
  config:rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}

export default store;
