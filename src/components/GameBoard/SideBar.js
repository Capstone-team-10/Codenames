import React from "react";

const SideBar = ({ spyMaster }) => {
  const submitChat = text => {
    console.log(text);
  };

  const leaveHandler = evt => {
    console.log(evt);
  };

  const displayName = "displayName";
  const teamColor = "color";
  const hint = "bananas";
  let hintCount = 6;
  const chatLog = [
    {
      sender: "Bob",
      message: "Is red team ready to go?"
    },
    {
      sender: "Fred",
      message: "We're all ready."
    },
    {
      sender: "Alan",
      message: "You're ready to lose?"
    },
    {
      sender: "Charles",
      message: "That must be it blue team is winning this one."
    }
  ];
  const allPlayers = [
    {
      displayName: "Bob",
      team: "red",
      spyMaster: true
    },
    {
      displayName: "Fred",
      team: "red",
      spyMaster: false
    },
    {
      displayName: "George",
      team: "red",
      spyMaster: false
    },
    {
      displayName: "Alan",
      team: "blue",
      spyMaster: true
    },
    {
      displayName: "Charles",
      team: "blue",
      spyMaster: false
    },
    {
      displayName: "James",
      team: "blue",
      spyMaster: false
    }
  ];
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
            <p>{`Hint: ${hint}`}</p>
            <p>{`For: ${hintCount} cards `}</p>
            <label htmlFor="hint">One Word Hint</label>
            <input type="text" name="hint" />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h6>{`Hint: ${hint}`}</h6>
            <h6>{`For: ${hintCount} cards `}</h6>
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
        <div className="chat-wrapper">
          <input className="chat-input" type="text" />
        </div>
        <button
          className="submit-chat btn waves-effect waves-dark teal darken-2"
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
