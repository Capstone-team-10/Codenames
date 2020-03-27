import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import { useToasts } from "react-toast-notifications";
import { leaveGame, SendMessage } from "../../store/GameThunks";

const SideBar = ({
  allPlayers,
  bannedWords,
  // chatLog,
  displayName,
  spyMaster,
  teamColor,
  history,
  gameId,
  Games,
  User,
  SendMessage,
  LeaveGame
}) => {
  console.log("All Players - Siderbar", allPlayers);
  const [hint, setHint] = useState("");
  const [hintNumber, setHintNumber] = useState(1);

  const { addToast } = useToasts();

  useEffect(() => {
    return () => {
      LeaveHandler();
    };
  }, []);

  const isFetching = (Games === undefined || Games[gameId] === undefined)
  const game = isFetching ? null : Games[gameId] // individual game
  const isFetchingChat = (isFetching) || (game.Chat === undefined)
  const chatLog = isFetchingChat ? [] : game.Chat;

  // const isFetching = Games !== undefined;
  // const game = isFetching ? Games[gameId] : null;

  const LeaveHandler = async () => {
    try {
      await LeaveGame(gameId, game, User);
      history.push("/userProfile");
      // if(err === undefined){
      //   history.push("/userProfile");
      // }
      // else{
      //   addToast("Sorry, we couldn't exit you from this game. Try again", {
      //     appearance: "warning",
      //     autoDismiss: true
      //   });
      // }
    } catch (error) {
      console.error(error);
    }
  };

  const changeHandler = evt => {
    console.log(evt.target.value);
    if (evt.target.id === "hint") {
      setHint(evt.target.value.split(/(\W|\d)/)[0].toUpperCase());
    } else {
      setHintNumber(evt.target.value);
    }
  };

  const submitHint = () => {
    if (bannedWords.indexOf(hint) > 0) {
      addToast(
        `The word ${hint} is on the board and cannot be used as a hint!`,
        {
          appearance: "warning",
          autoDismiss: true
        }
      );
      setHint("");
    } else {
    }
    document.getElementById("hint").value = "";
    document.getElementById("hintNumber").value = "1";
  };

  //Consider moving function out to utils folder
  const spyMasterChatBan = message => {
    for (let i = 0; i < message.length; i++) {
      if (bannedWords.indexOf(message[i].toUpperCase()) > 0) {
        addToast(
          `The word ${message[i]} is on the board and you cannot send it in chat!`,
          {
            appearance: "warning",
            autoDismiss: true
          }
        );
        return true;
      }
    }
    return false;
  };

  const submitChat = async () => {
    let chatMsg = document.getElementById("chatMsg").value;
    if (spyMaster && spyMasterChatBan(chatMsg.split(" "))) {
      console.log("Banned word used");
    } else {
      await SendMessage(gameId, game, User, chatMsg)
      console.log("Submit chat message");
      console.log('gameId---', gameId, 'game---', game, 'User----', User, 'chatMsg----', chatMsg)
      console.log('user display name', User.displayName)
    }
    document.getElementById("chatMsg").value = "";
  };

  return (
    <div className="sideBar-wrapper wrapper right">
      <div className="playerInfo-container container">
        <p className="players-text">{`You are agent: ${displayName}`}</p>
        <p className="players-text">{`With the ${teamColor} spy agency`}</p>
      </div>
      <div className="allPlayersInfo-container">
        {allPlayers.map(({ DisplayName, Team, isSpyMaster }, index) => {
          return (
            <p className="players-text" key={`${index}`}>{`${Team} ${
              isSpyMaster ? "spy master: " : "spy: "
              }${DisplayName}`}</p>
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
          <input className="input" type="text" id="chatMsg" />
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
        onClick={LeaveHandler}
      >
        Leave Game
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    Games: state.firestore.data.Games,
    User: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    LeaveGame: (id, game, user) => dispatch(leaveGame(id, game, user)),
    SendMessage: (id, game, user, message) => dispatch(SendMessage(id, game, user, message))
  };
};

export default compose(
  firestoreConnect([
    {
      collection: "Games"
    }
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(SideBar);
