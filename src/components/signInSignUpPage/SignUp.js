/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {connect} from "react-redux"
import {createProfile,googleProfile} from "../../store/UserThunks"
import { useToasts } from "react-toast-notifications";

const SignUp = (props) => {


  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formName, setFormName] = useState("");

  const {addToast} = useToasts()

  const submitHandler = async evt => {
    try {
      evt.preventDefault();
      const err = await props.createProfile(formName,formEmail,formPassword)
      if(err === undefined) {
        props.history.push("/userProfile")
      }
      else{
        addToast(err, {
          appearance: "warning",
          autoDismiss: true
        });
      }
    } catch (error) {
      console.error(error)
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

  const AuthWithGoogle = async () =>{
    try {
      const err = await props.googleProfile()
      if(err === undefined) {
        props.history.push("/userProfile")
      }
      else{
        addToast(err, {
          appearance: "warning",
          autoDismiss: true
        });
      }
    } catch (error) {
      console.error(error)
    }
  }
    return (
      <div className="signUp-wrapper">
        <form id="signUp" onSubmit={submitHandler}>
          <div className="input-field">
            <label htmlFor="name">Display Name</label>
            <input type="text" id="name" onChange={onChangeHandler} required/>
          </div>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={onChangeHandler} required/>
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={onChangeHandler} required/>
          </div>
          <button type="submit" className="btn center ">
            Sign Up
          </button>
        </form>
        <button className="btn center  " onClick={AuthWithGoogle}>Sign up with Google</button>
      </div>
    );
};

const mapDispatchToProps = dispatch => {
  return {
    createProfile: (name,email,password) => dispatch(createProfile(name,email,password)),
    googleProfile: () => dispatch(googleProfile())
  }
}


export default connect(null,mapDispatchToProps)(SignUp)
