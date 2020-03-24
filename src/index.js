import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import firebase, { rrfConfig } from "./fireStore";
import { createFirestoreInstance } from 'redux-firestore'
import "./index.css";
import App from "./App";
import store from "./store";
import * as serviceWorker from "./serviceWorker";

const rrfProps = {
  firebase,
  config:rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
