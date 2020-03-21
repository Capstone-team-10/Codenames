import React from "react";
import firebase, { db } from "../fireStore";

import "../css/navbar.css";

const Navbar = () => {
  return (
    <nav id="navbar" className="navbar nav-wrapper red darken-4">
      <button className="btn controls-btn waves-effect waves-dark teal darken-2">
        Controls
      </button>
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
        <button className="btn right waves-effect waves-dark teal darken-2">
          Login
        </button>
        <button className="btn right waves-effect waves-dark teal darken-2">
          User Info
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
