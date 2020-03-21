/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {Link} from "react-router-dom"    /* Delete after demo Demonstration */
import ChooseGameRoom from "../ChooseGameRoom"

const SignUp = () => {
  const initialInfo = {
    name: "",
    email: "",
    password: ""
  };

  const [formInfo, setFormInfo] = useState(initialInfo);

  const submitHandler = evt => {
    evt.preventDefault();
    console.log(evt);
      /// On submit go to <ChooseGameRoom />
  };

  const onChangeHandler = evt => {
    console.log(evt);
  };

  return (
    <div className="signUp-wrapper">
      <form id="signUp" className="container" onSubmit={submitHandler}>
        <div className="input-field">
          <label htmlFor="name">Display Name</label>
          <input type="text" onChange={onChangeHandler} />
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
        <Link to="/onSubmit" >    {/* Delete after demo Demonstration */}
          Sign Up
          </Link>
        </button>
      </form>
    </div>
  );
};

export default SignUp;
