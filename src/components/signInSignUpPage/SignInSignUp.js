import React from "react";

import AuthForms from "./AuthForms";
import GameDescription from "./GameDescription";

import "../../css/signInSignUp.css";

const SignInSignUp = () => {
  return (
    <div className="sign-in-sign-up-container">
      <AuthForms />
      <GameDescription />
    </div>
  );
};

export default SignInSignUp;
