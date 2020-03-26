import React, { useState } from "react";
import { useImperativeHandle } from "react";

const InviteFriendForm = () => {
  const [friendEmail, setFriendEmail] = useState("");
  const [friendName, setFriendName] = useState("");

  //form handler
  const onChangeHandler = evt => {
    if (evt.target.id === "email") {
      setFriendEmail(evt.target.value);
    } else {
      setFriendName(evt.target.value);
    }
  };

  //handle form submission
  const handleSubmit = () => {
    console.log(`Sending friend invite to ${friendName}`);
  };

  return (
    <div className="inviteFriend-wrapper">
      <form id="inviteFriend" onSubmit={handleSubmit}>
        <div className="input-field">
          <label htmlFor="email">Friend's Email</label>
          <input type="email" id="email" onChange={onChangeHandler} />
        </div>
        <div className="input-field">
          <label htmlFor="friendName">Friend's Name</label>
          <input type="text" id="friendName" onChange={onChangeHandler} />
        </div>
      </form>
    </div>
  );
};

export default InviteFriendForm;
