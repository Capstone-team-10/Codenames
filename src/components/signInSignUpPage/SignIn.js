/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {Link} from "react-router-dom"    /* Delete after demo Demonstration */
import ChooseGameRoom from "../ChooseGameRoom"
import firebase, {auth,google} from "../../fireStore"

const SignIn = () => {
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");

  const submitHandler = evt => {
    evt.preventDefault();
    console.log(evt);
    /// On submit go to <ChooseGameRoom />
  };

  const onChangeHandler = evt => {
    if (evt.target.id === "email") {
      setFormEmail(evt.target.value);
    } else {
      setFormPassword(evt.target.value);
    }
  };

  const AuthWithGoogle = () =>{
    console.log("Log with google")
    auth.signInWithPopup(google)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => this.setState({user}))

    return ()=>{
      unsubscribe && unsubscribe()
    }
  },[])

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
        <Link to="/onSubmit" >    {/* Delete after demo Demonstration */}
          Login
          </Link>
        </button>
      </form>
      <button className="button" onClick={AuthWithGoogle}>Log in with Google</button>
    </div>
  );
};

export default SignIn;
