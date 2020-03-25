import React from "react";
import { Link,Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import {logout} from "../store/user"
import { withRouter } from 'react-router'

import "../css/navbar.css";

const Navbar = (props) => {
  console.log("NAVVV", props)
  const { isLoggedOut,isLoggedIn } = props;
  const LoggingOut = () =>{
    props.logout()
    props.history.push("/")
  }
  // if(isLoggedOut){
  //   return <Redirect to="/"/>
  // }
  // else{
    return (
      <nav id="navbar" className="navbar nav-wrapper red darken-4">
        <button className="btn controls-btn waves-effect waves-dark teal darken-2">
          <Link to="/onSubmit">
          Go to Game Room
          </Link>
        </button>
        <div className="logo-container brand-logo teal darken-2 center">
          <h1 id="header-logo" className="header-logo hide-on-med-and-down">
            <Link to="/">Codenames</Link>
          </h1>
          <h3
            id="header-logo"
            className="header-logo hide-on-large-only hide-on-small-only"
          >
            <Link to="/">Codenames</Link>
          </h3>
        </div>
        <div className="btns-right-container">

          {isLoggedIn ? ( <button className="btn right waves-effect waves-dark teal darken-2" onClick={LoggingOut}>
            Log Out
          </button>) : (
            <>
            <button className="btn right waves-effect waves-dark teal darken-2">
            <Link to="/auth/register">Register</Link>
          </button>
          <button className="btn right waves-effect waves-dark teal darken-2">
          <Link to="/auth/login">Login</Link>
        </button>
        </>
          )}
          {isLoggedIn && (
            <button className="btn right waves-effect waves-dark teal darken-2">
              <Link to="/userProfile">User Record</Link>
            </button>)}
        </div>
      </nav>
    );
  // }
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: !state.firebase.auth.isEmpty,
    isLoggedOut: state.firebase.auth.isEmpty,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Navbar))
