import React, { useState } from "react";

const InviteFriendForm = ({ setInviteFriend }) => {
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
  const handleSubmit = evt => {
    evt.preventDefault();
    console.log(`Sending friend invite to ${friendName}`);

    setInviteFriend(false);
  };

  return (
    <div className="inviteFriend-wrapper">
      <div className="formWrapper">
        <form
          id="inviteFriend"
          className="inviteFriendForm"
          onSubmit={handleSubmit}
        >
          <p>Email a link to this games lobby to a friend</p>
          <div className="input-field">
            <label htmlFor="email">Friend's Email</label>
            <input type="email" id="email" onChange={onChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="friendName">Friend's Name</label>
            <input type="text" id="friendName" onChange={onChangeHandler} />
          </div>
        </form>
        <div className="invite-form-button-wrapper">
          <button
            className="invite-btn btn waves-effect waves-dark teal darken-4"
            onClick={handleSubmit}
          >
            Send
          </button>
          <button
            className="invite-btn btn waves-effect waves-dark teal darken-4"
            onClick={() => setInviteFriend(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteFriendForm;
