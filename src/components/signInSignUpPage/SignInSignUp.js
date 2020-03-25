import React from "react";

// import AuthForms from "./AuthForms";
import AuthForms from "./AuthForms";
import GameDescription from "./GameDescription";

import "../../css/signInSignUp.css";

const SignInSignUp = (props) => {
  return (
    <div className="sign-in-sign-up-container">
       <div className="auth-form-container">
      <AuthForms history={props.history} enter={props.match.params.enter}/>
      </div>
      <GameDescription />
    </div>
  );
};

export default SignInSignUp;
