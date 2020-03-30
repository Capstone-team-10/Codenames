import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/UserThunks";
import { withRouter } from "react-router";
import { useToasts } from "react-toast-notifications";

import "../css/navbar.css";

const Navbar = props => {
  const { isLoggedIn } = props;

  const { addToast } = useToasts();

  const LoggingOut = async () => {
    try {
      const err = await props.logout();
      if (err === undefined) {
        props.history.push("/");
      } else {
        addToast("Sorry, failed at logging you out. Please try again", {
          appearance: "warning",
          autoDismiss: true
        });
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
  <>
    {isLoggedIn ? (
    <nav id="navbar" className="navbar nav-wrapper red darken-4">
       <Link to="/onSubmit">
      <button className="btn controls-btn waves-effect waves-dark teal darken-2">
       Go to Game Room
      </button>
      </Link>
      <div className="logo-container brand-logo teal darken-2 center">
        <h1 id="header-logo" className="header-logo hide-on-med-and-down">
            Codenames
        </h1>
        <h3
        id="header-logo"
        className="header-logo hide-on-large-only hide-on-small-only"
        >
            Codenames
        </h3>
        </div>
        <div className="btns-right-container">
          <button
            className="btn right waves-effect waves-dark teal darken-2"
            onClick={LoggingOut}
          >
            Log Out
          </button>
          <Link to="/userProfile">
          <button className="btn right waves-effect waves-dark teal darken-2">
            User Record
          </button>
          </Link>
        </div>
      </nav>
    ) : (
      <nav id="navbar" className="navbar nav-wrapper red darken-4">
      <div className="logo-container brand-logo teal darken-2 center">
        <h1 id="header-logo" className="header-logo hide-on-med-and-down">
          <Link to="/">
            Codenames
            </Link>
        </h1>
        <h3
        id="header-logo"
        className="header-logo hide-on-large-only hide-on-small-only"
        >
          <Link to="/">
            Codenames
            </Link>
        </h3>
        </div>
        <div className="btns-right-container">
        <Link to="/auth/register">
          <button className="btn right waves-effect waves-dark teal darken-2">
            Sign Up
          </button>
        </Link>
          <Link to="/auth/login">
            <button className="btn right waves-effect waves-dark teal darken-2">
              Login
            </button>
          </Link>
        </div>
        </nav>
    )}
    </>
    )
  }

const mapStateToProps = state => {
  return {
    isLoggedIn: !state.firebase.auth.isEmpty,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
