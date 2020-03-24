import React, { useState } from "react";

const SideBar = ({
  allPlayers,
  chatLog,
  displayName,
  spyMaster,
  teamColor
}) => {
  const [hint, setHint] = useState("");
  const [hintNumber, setHintNumber] = useState(1);

  const changeHandler = evt => {
    console.log(evt.target.value);
    if (evt.target.id === "hint") {
      setHint(evt.target.value.split(/(\W|\d)/)[0].toUpperCase());
    } else {
      setHintNumber(evt.target.value);
    }
  };

  const submitHint = () => {};

  const submitChat = text => {
    console.log(text);
  };

  const leaveHandler = evt => {
    console.log(evt);
  };

  return (
    <div className="sideBar-wrapper wrapper right">
      <div className="playerInfo-container container">
        <p className="players-text">{`You are agent: ${displayName}`}</p>
        <p className="players-text">{`With the ${teamColor} spy agency`}</p>
      </div>
      <div className="allPlayersInfo-container">
        {allPlayers.map(({ displayName, team, spyMaster }, index) => {
          return (
            <p className="players-text" key={`${index}`}>{`${team} ${
              spyMaster ? "spy master: " : "spy: "
            }${displayName}`}</p>
          );
        })}
      </div>
      <div className="hint-container">
        {spyMaster ? (
          <React.Fragment>
            <div className="spyMaster-hint-text-wrapper">
              <p className="spyMaster-hint-text">{`Hint: ${hint}`}</p>
              <p className="spyMaster-hint-text">{`For: ${hintNumber} cards `}</p>
            </div>
            <div className="input-wrapper">
              <div className="word-hint-wrapper">
                <label htmlFor="hint">One Word Hint</label>
                <input
                  onChange={changeHandler}
                  type="text"
                  className="input"
                  name="hint"
                  id="hint"
                />
              </div>
              <div className="number-hint-wrapper">
                <label htmlFor="hintNumber">Number</label>
                <select
                  onChange={changeHandler}
                  name="hintNumber"
                  className="hintNumber"
                  id="hintNumber"
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                </select>
              </div>
            </div>
            <button
              className="submit-hint-btn btn center waves-effect waves-dark teal darken-4"
              onClick={submitHint}
            >
              Submit Hint
            </button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h6>{`Hint: ${hint}`}</h6>
            <h6>{`For: ${hintNumber} cards `}</h6>
          </React.Fragment>
        )}
      </div>
      <div className="chat-container">
        <div className="log-wrapper">
          {chatLog.map(({ sender, message }, index) => {
            return (
              <React.Fragment key={`${sender}${index}`}>
                <p className="messageSender">{sender}</p>
                <div className="message-wrapper">
                  <p>{message}</p>
                </div>
              </React.Fragment>
            );
          })}
        </div>
        <div className="input-wrapper">
          <input className="input" type="text" />
        </div>
        <button
          className="submit-chat btn waves-effect waves-dark teal darken-4"
          onClick={submitChat}
        >
          Send Message
        </button>
      </div>
      <button
        className="leave-game-btn btn center waves-effect waves-dark red darken-4"
        onClick={leaveHandler}
      >
        Leave Game
      </button>
    </div>
  );
};

export default SideBar;
