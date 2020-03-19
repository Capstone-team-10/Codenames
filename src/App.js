//react imports
import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

//component imports
import Navbar from "./components/Navbar";
import SignInSignUp from "./components/signInSignUpPage/SignInSignUp";
//style import
import "./css/App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Route path="/auth" component={SignInSignUp} />
      <Switch>{/* Add other routes here */}</Switch>
    </Router>
  );
}

export default App;
