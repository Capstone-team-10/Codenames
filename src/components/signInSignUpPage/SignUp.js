/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {connect} from "react-redux"
import {createOrLoginProfile,googleProfile} from "../../store/user"
import { Redirect } from "react-router-dom"

const SignUp = (props) => {

  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formName, setFormName] = useState("");

  const submitHandler = async evt => {
    try {
      evt.preventDefault();
      const err = await props.createProfile(formName,formEmail,formPassword)
      if(err === undefined) {
        props.props.history.push("/userProfile")
      }
      else{
        console.log("In singup TRY ",err)
      }
    } catch (error) {
      console.error("In Singup Err", error)
    }
  };

  const onChangeHandler = evt => {

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
    createProfile: (name,email,password) => dispatch(createOrLoginProfile(name,email,password)),
    googleProfile: () => dispatch(googleProfile())
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(SignUp)
