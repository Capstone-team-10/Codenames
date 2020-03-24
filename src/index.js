import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ToastProvider } from "react-toast-notifications";
import "./index.css";
import App from "./App";
import store from "./store";
import * as serviceWorker from "./serviceWorker";

//firestore imports
import firebase, { db } from "./fireStore";

ReactDOM.render(
  <Provider store={store}>
    <ToastProvider>
      <App />
    </ToastProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
