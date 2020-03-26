//react imports
import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { connect } from 'react-redux';

//component imports
import Navbar from "./components/Navbar";
import SignInSignUp from "./components/signInSignUpPage/SignInSignUp";
import GameLogic from "./components/GameLogic";
import UserProfile from "./components/signInSignUpPage/UserProfile";
// import UpdateUser from "./components/signInSignUpPage/UpdateUser";
import Title from "./components/Title";
import JoinGameLobby from "./components/JoinGameLobby";
import ChooseGameRoom from "./components/ChooseGameRoom"; // Delete route once form is working
import EndGameScreen from "./components/EndGameScreen"; // Delete route once form is working
import history from "./history"
//style import
import "./css/App.css";

function App(props) {
  const { isLoggedIn, isLoggedOut } = props;
  return (
    <Router history={history}>
      <Navbar />
      <Switch>
      <Route exact path="/" component={Title} />
      {isLoggedIn && (
      <Switch>
        <Route path="/userProfile" component={UserProfile} />
        <Route path="/onSubmit" component={ChooseGameRoom} />
        <Route path="/JoinGame" component={JoinGameLobby} />
        <Route path="/GameOver" component={EndGameScreen} />
        {/* <Route path="/play" component={GameLogic}></Route> */}
        <Route path="/play/:id" component={GameLogic}></Route>
      </Switch>)}
      {isLoggedOut && (
        <Switch>
           <Route path="/auth/:enter" component={SignInSignUp} />
        </Switch>
      )}
        {/* <Route exact path="/profile/:name" component={UpdateUser} /> */}
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: !state.firebase.auth.isEmpty,
    isLoggedOut: state.firebase.auth.isEmpty
  }
}

export default connect(mapStateToProps)(App);
