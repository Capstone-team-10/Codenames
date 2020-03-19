import React, { useState } from "react";

const SignIn = () => {
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");

  const submitHandler = evt => {
    evt.preventDefault();
    console.log(evt);
  };

  const onChangeHandler = evt => {
    if (evt.target.id === "email") {
      setFormEmail(evt.target.value);
    } else {
      setFormPassword(evt.target.value);
    }
  };

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
    </div>
  );
};

export default SignIn;
