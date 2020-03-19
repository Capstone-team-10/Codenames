import React, { useState } from "react";

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
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
