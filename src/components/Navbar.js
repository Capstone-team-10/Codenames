import React from "react";
import { Link } from "react-router-dom";
import firebase, { db } from "../fireStore";

import "../css/navbar.css";

const Navbar = () => {
  let loggedIn = false;
  return (
    <nav id="navbar" className="navbar nav-wrapper red darken-4">
      <button className="btn controls-btn waves-effect waves-dark teal darken-2">
        Controls
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
        <button className="btn right waves-effect waves-dark teal darken-2">
          <Link to="/auth">Register/Login</Link>
        </button>

        {/* If not logged in do NOT show user Profile */}
        {loggedIn ? (
          <button className="btn right waves-effect waves-dark teal darken-2">
            <Link to="/userProfile">User Info</Link>
          </button>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
};

export default Navbar;
