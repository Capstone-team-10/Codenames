import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import { useToasts } from "react-toast-notifications";
import { leaveGame } from "../../store/GameThunks";
import { SendMessage } from "../../store/ChatThunk";

const SideBar = ({
  allPlayers,
  bannedWords,
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

  const isFetching = Games === undefined || Games[gameId] === undefined;
  const game = isFetching ? null : Games[gameId]; // individual game
  const isFetchingChat = isFetching || game.Chat === undefined;
  const chatLog = isFetchingChat ? [] : game.Chat;
  const currentTurn = isFetching ? "" : game.CurrentTurn;

  console.log("currentTurn is: ", currentTurn);

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

  const submitHint = () => {
    const hintElem = document.getElementById("hint");
    const hintNumberElem = document.getElementById("hintNumber");
    const bannedWord = bannedWords.indexOf(hintElem.value.toUpperCase()) > 0;
    const invalidChars = hintElem.value.split(/(\W|\d)/).length > 1;
    const tooLong = hintElem.value.length > 15;
    if (bannedWord || invalidChars || tooLong) {
      addToast(
        <>
          <p className="hint-error-toast-text">The hint entered:</p>
          {bannedWord ? (
            <p className="hint-error-toast-text hint-error">
              -{hintElem.value} is a word on the board
            </p>
          ) : null}
          {invalidChars ? (
            <p className="hint-error-toast-text hint-error">
              -Contains invalid chars, only letters without spaces are allowed
            </p>
          ) : null}
          {tooLong ? (
            <p className="hint-error-toast-text hint-error">
              -Is too long. Hints must be less than 15 chars
            </p>
          ) : null}
        </>,
        {
          appearance: "warning",
          autoDismiss: true
        }
      );
    } else {
      setHint(hintElem.value);
      setHintNumber(hintNumberElem.value);
      //Thunk call goes here
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

  const onEnterPress = e => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      if (e.target.id === "chatMsg") {
        submitChat();
      } else {
        submitHint();
      }
    }
  };

  const submitChat = async () => {
    let chatMsg = document.getElementById("chatMsg").value;
    if (spyMaster && spyMasterChatBan(chatMsg.split(" "))) {
      console.log("Banned word used");
    } else {
      try {
        await SendMessage(gameId, game, User, chatMsg);
      } catch (error) {
        return error.message;
      }
    }
    document.getElementById("chatMsg").value = "";
  };

  const endTurnHandler = () => {
    console.log("In side bar end turn button clicked!");
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
                  onKeyDown={onEnterPress}
                  type="text"
                  className="input"
                  name="hint"
                  id="hint"
                />
              </div>
              <div className="number-hint-wrapper">
                <label htmlFor="hintNumber">Number</label>
                <select
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
          <input
            className="input"
            type="text"
            id="chatMsg"
            onKeyDown={onEnterPress}
          />
        </div>
        <button
          className="submit-chat btn waves-effect waves-dark teal darken-4"
          onClick={submitChat}
        >
          Send Message
        </button>
      </div>
      {!spyMaster ? (
        <button
          className="end-turn-btn btn center waves-effect waves-dard yellow darken-3"
          onClick={endTurnHandler}
        >
          End Turn
        </button>
      ) : null}
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
    SendMessage: (id, game, user, message) =>
      dispatch(SendMessage(id, game, user, message))
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
