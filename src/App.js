//react imports
import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

//firestore imports
import firebase, { db } from "./fireStore";

//component imports
import Navbar from "./components/Navbar";
import SignInSignUp from "./components/signInSignUpPage/SignInSignUp";
import Title from "./components/Title";

//style import
import "./css/App.css";

function App() {
  // console.log("----", db.collection("user");
  return (
    <Router>
      <Navbar />
      <Route path="/auth" component={SignInSignUp} />
      <Switch>
        <Route exact path="/" component={Title}></Route>
      </Switch>
    </Router>
  );
}

export default App;
