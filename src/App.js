//react imports
import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

//component imports
import Navbar from "./components/Navbar";
import SignInSignUp from "./components/signInSignUpPage/SignInSignUp";
import Title from "./components/Title";
import ChooseGameRoom from "./components/ChooseGameRoom" // Delete route once form is working
//style import
import "./css/App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/auth" component={SignInSignUp} />
        <Route path="/onSubmit" component={ChooseGameRoom}
        />
        <Route exact path="/" component={Title}
        />
      </Switch>
    </Router>
  );
}

export default App;
