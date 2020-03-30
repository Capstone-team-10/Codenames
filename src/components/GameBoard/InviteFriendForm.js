import React, { useState } from "react";

const InviteFriendForm = ({ setInviteFriend }) => {
  const [friendEmail, setFriendEmail] = useState("");
  const [friendName, setFriendName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");

  //form handler
  const onChangeHandler = evt => {
    if (evt.target.id === "email") {
      setFriendEmail(evt.target.value);
    } else if (evt.target.id === "friendName") {
      setFriendName(evt.target.value);
    } else if (evt.target.id === "message") {
      setMessage(evt.target.value === senderName);
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
          method="get"
          action="http://localhost:5001/codenames-3a350/us-central1/sendInvite"
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
          <div className="input-field">
            <label htmlFor="message">Message</label>
            <input type="text" id="message" onChange={onChangeHandler} />
          </div>
          <div className="invite-form-button-wrapper">
            <button
              className="invite-btn btn waves-effect waves-dark teal darken-4"
              type="submit"
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
        </form>
      </div>
    </div>
  );
};

export default InviteFriendForm;
