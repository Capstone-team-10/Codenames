/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {connect} from "react-redux"
import {LoginProfile,googleProfile} from "../../store/UserThunks"
import { useToasts } from "react-toast-notifications";


const SignIn = (props) => {
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");

  const {addToast} = useToasts()

  const submitHandler = async evt => {
    try {
      evt.preventDefault();
      const err = await props.loginProfile(formEmail,formPassword)
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
    } else {
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
    <div className="login-wrapper">
      <form id="login" onSubmit={submitHandler}>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={onChangeHandler} />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={onChangeHandler} />
        </div>
        <button type="submit" className="btn center">
          Login
        </button>
      </form>
      <button className="btn center " onClick={AuthWithGoogle}>Log in with Google</button>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    loginProfile: (email,password) => dispatch(LoginProfile(email,password)),
    googleProfile: () => dispatch(googleProfile())
  }
}


export default connect(null,mapDispatchToProps)(SignIn)
