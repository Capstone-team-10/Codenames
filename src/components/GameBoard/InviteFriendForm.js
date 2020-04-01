import React, { useState } from "react";
import { withRouter } from "react-router";
import { inviteFriend } from "../../fireFunctionCalls";

const InviteFriendForm = ({ setInviteFriend, history }) => {
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
    } else if (evt.target.id === "senderName") {
      setSenderName(evt.target.value);
    } else if (evt.target.id === "message") {
      setMessage(evt.target.value);
    }
  };

  //handle form submission
  const handleSubmit = evt => {
    evt.preventDefault();
    inviteFriend({
      friendEmail,
      friendName,
      senderName,
      message,
      link: `https://codenames-3a350.firebaseapp.com/${history.location.pathname}`
    });
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
          <div className="input-field">
            <label htmlFor="senderName">Your Name</label>
            <input type="text" id="senderName" onChange={onChangeHandler} />
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

export default withRouter(InviteFriendForm);
