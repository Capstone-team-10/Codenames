//react imports
import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

//firestore imports
import firebase, { db } from "./fireStore";

//component imports
import Navbar from "./components/Navbar";
import SignInSignUp from "./components/signInSignUpPage/SignInSignUp";
import GameLogic from "./components/GameLogic";
import UserProfile from "./components/signInSignUpPage/UserProfile";
import UpdateUser from "./components/signInSignUpPage/UpdateUser";
import Title from "./components/Title";
import JoinGameLobby from "./components/JoinGameLobby";
import ChooseGameRoom from "./components/ChooseGameRoom"; // Delete route once form is working
import EndGameScreen from "./components/EndGameScreen"; // Delete route once form is working
//style import
import "./css/App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/play" component={GameLogic}></Route>
        <Route path="/auth" component={SignInSignUp} />
        <Route path="/userProfile" component={UserProfile} />
        <Route path="/onSubmit" component={ChooseGameRoom} />
        <Route path="/JoinGame" component={JoinGameLobby} />
        <Route path="/GameOver" component={EndGameScreen} />
        <Route exact path="/profile/:name" component={UpdateUser} />
        <Route exact path="/" component={Title} />
      </Switch>
    </Router>
  );
}

export default App;
