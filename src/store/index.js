import { createStore, combineReducers, applyMiddleware,compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
// import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { reduxFirestore, getFirestore,firestoreReducer } from "redux-firestore";
import { reactReduxFirebase, getFirebase, firebaseReducer } from "react-redux-firebase";
import firebase from '../fireStore/index.js'
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
  firebase:firebaseReducer
});

const middleware = compose(
  applyMiddleware(
    thunkMiddleware.withExtraArgument({ getFirebase, getFirestore })),
    reactReduxFirebase(firebase),
    reduxFirestore(firebase)
  // createLogger({ collapsed: true })
);
const store = createStore(reducer, middleware);

export default store;
