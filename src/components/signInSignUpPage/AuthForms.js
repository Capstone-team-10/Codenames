import React from "react";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

const AuthForms = () => {
  let loggedIn = false;
  return (
    <div className="auth-form-container">
      {loggedIn ? <SignIn /> : <SignUp />}
    </div>
  );
};

export default AuthForms;
