//react imports
import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

//component imports
import Navbar from "./components/Navbar";
import SignInSignUp from "./components/signInSignUpPage/SignInSignUp";
import PlayerGameBoard from "./components/GameBoard/PlayerGameBoard";
import Title from "./components/Title";

//style import
import "./css/App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Route path="/auth" component={SignInSignUp} />
      <Switch>
        <Route exact path="/" component={Title}></Route>
        <Route path="/play" component={PlayerGameBoard}></Route>
      </Switch>
    </Router>
  );
}

export default App;
