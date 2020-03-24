import React from "react";

// import AuthForms from "./AuthForms";
import SignUp from "./SignUp";
import GameDescription from "./GameDescription";

import "../../css/signInSignUp.css";

const SignInSignUp = () => {
  return (
    <div className="sign-in-sign-up-container">
       <div className="auth-form-container">
      <SignUp />
      </div>
      <GameDescription />
    </div>
  );
};

export default SignInSignUp;
