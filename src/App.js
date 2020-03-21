//react imports
import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

//component imports
import Navbar from "./components/Navbar";
import SignInSignUp from "./components/signInSignUpPage/SignInSignUp";
import Title from "./components/Title";
import JoinGameLobby from "./components/JoinGameLobby";
import ChooseGameRoom from "./components/ChooseGameRoom" // Delete route once form is working
import EndGameScreen from "./components/EndGameScreen" // Delete route once form is working
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
        <Route path="/JoinGame" component={JoinGameLobby}
        />
        <Route path="/GameOver" component={EndGameScreen}
        />
        <Route exact path="/" component={Title}
        />
      </Switch>
    </Router>
  );
}

export default App;
