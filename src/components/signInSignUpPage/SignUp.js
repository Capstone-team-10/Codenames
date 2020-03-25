/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {connect} from "react-redux"
import {createProfile,googleProfile} from "../../store/user"
import { Redirect } from "react-router-dom"

const SignUp = (props) => {

  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formName, setFormName] = useState("");

  const submitHandler = evt => {
    evt.preventDefault();
    props.createProfile(formName,formEmail,formPassword)
    props.props.history.push("/userProfile")
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
    props.googleProfile()
    props.props.history.push("/userProfile")
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
            Login/Sign Up
          </button>
        </form>
        <button className="button" onClick={AuthWithGoogle}>Log in with Google</button>
      </div>
    );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: !state.firebase.auth.isEmpty,
    // isLoggedOut: state.firebase.auth.isEmpty
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createProfile: (name,email,password) => dispatch(createProfile(name,email,password)),
    googleProfile: () => dispatch(googleProfile())
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(SignUp)
