import React from "react";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

const AuthForms = (props) => {
  const enter = props.enter
  return (
    <div className="auth-form-container">
      {enter === "login" ? <SignIn history ={props.history}/> : <SignUp history ={props.history}/>}
    </div>
  );
};

export default AuthForms;
