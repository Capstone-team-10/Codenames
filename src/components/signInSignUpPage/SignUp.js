/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {createProfile} from "../../store/user"
import firebase, {auth,google} from "../../fireStore"
// import { Redirect } from "react-router-dom"
// import ChooseGameRoom from "../ChooseGameRoom"

const SignUp = (props) => {
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formName, setFormName] = useState("");

  const submitHandler = evt => {
    evt.preventDefault();
    console.log("Our STate", formName,formEmail,formPassword)
    props.createProfile(formName,formEmail,formPassword)
      /// On submit go to <ChooseGameRoom />
  };

  const onChangeHandler = evt => {
    console.log(props.createProfile)

    if (evt.target.id === "email") {
      setFormEmail(evt.target.value);
    }
    else if(evt.target.id ==="name"){
      setFormName(evt.target.value)
    }
    else {
      setFormPassword(evt.target.value);
    }
  };

  const AuthWithGoogle = () =>{
    console.log("Log with google")
    auth.signInWithPopup(google)
  }

  return (
    <div className="signUp-wrapper">
      <form id="signUp" className="container" onSubmit={submitHandler}>
        <div className="input-field">
          <label htmlFor="name">Display Name</label>
          <input type="text" id="name" onChange={onChangeHandler} />
        </div>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={onChangeHandler} />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={onChangeHandler} />
        </div>
        <button type="submit" className="btn center">
          Sign Up
        </button>
      </form>
      <button className="button" onClick={AuthWithGoogle}>Log in with Google</button>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    createProfile: (name,email,password) => dispatch(createProfile(name,email,password))
  }
}


export default connect(null,mapDispatchToProps)(SignUp)
