import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { ResizableBox } from "react-resizable";

import { useToasts } from "react-toast-notifications";
import { leaveGame, Endturn } from "../../store/GameThunks";
import { SendMessage } from "../../store/ChatThunk";
import { SetHintWordAndCount } from "../../store/HintThunk";

import {
  displayCurrentPlayersTurn,
  isItYourTurn,
  turnTracker
} from "../../utils";

import "../../css/resizeable.css";

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
  LeaveGame,
  currentTurn,
  gameStatus,
  Sendhint,
  EndTurn
}) => {
  // const [hint, setHint] = useState("");
  // const [hintNumber, setHintNumber] = useState(1);
  // const [windowResized, setWindowResized] = useState(false);
  const [fixedHeight, setFixedHeight] = useState(45.7 + 71.3 + 33);

  const { addToast } = useToasts();

  useEffect(() => {
    const navbarHeight = document.getElementById("navbar").offsetHeight;
    const sideBarHeight = document.getElementById("sideBar").offsetHeight;
    const calculateFixedHeight = () => {
      const currentTurn = gameStatus ? 45.7 : 0;
      const hintHeight = spyMaster ? 141 : 92;
      const endTurnBtn = spyMaster ? 0 : 33;
      return Math.ceil(hintHeight + endTurnBtn + currentTurn + 71.3 + 33);
    };

    //fixed height
    setFixedHeight(calculateFixedHeight);
    // console.log("On load window height is: ", window.innerHeight);
    // console.log(
    //   `On load navbar height is: ${navbarHeight}, and the SideBar height is: ${sideBarHeight}. total height: ${navbarHeight +
    //     sideBarHeight}`
    // );
    window.onresize = resize;
  }, [gameStatus, spyMaster]);

  useEffect(() => {
    return () => {
      LeaveHandler();
    };
  }, []);

  const resize = () => {
    const navbarHeight = document.getElementById("navbar").offsetHeight;
    const sideBarHeight = document.getElementById("sideBar").offsetHeight;
    // console.log("On resize window height is: ", window.innerHeight);
    // console.log(
    //   `On load navbar height is: ${navbarHeight}, and the SideBar height is: ${sideBarHeight} total height: ${navbarHeight +
    //     sideBarHeight}`
    // );
    // console.log("fixed Height is: ", fixedHeight);
  };

  const isFetching = Games === undefined || Games[gameId] === undefined;
  const game = isFetching ? null : Games[gameId]; // individual game
  const isFetchingChat = isFetching || game.Chat === undefined;
  const chatLog = isFetchingChat ? [] : game.Chat;
  const getHint = isFetching ? "" : game.HintWord;
  const getHintCount = isFetching ? 0 : game.HintCount;

  const LeaveHandler = async () => {
    try {
      await LeaveGame(gameId, Games[gameId], User);
      history.push("/userProfile");
    } catch (error) {
      console.error(error);
    }
  };

  const submitHint = () => {
    if (!isItYourTurn(currentTurn, teamColor, spyMaster)) {
      addToast(`Wait for your turn!`, {
        appearance: "warning",
        autoDismiss: true
      });
      document.getElementById("hint").value = "";
      document.getElementById("hintNumber").value = "1";
      return;
    }
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
      // setHint(hintElem.value);
      // setHintNumber(hintNumberElem.value);
      Sendhint(gameId, hintElem.value, hintNumberElem.value);
      let turnString = turnTracker.nextTurn(currentTurn);
      EndTurn(gameId, turnString);
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
    } else {
      try {
        if (chatMsg !== "") {
          await SendMessage(gameId, game, User, chatMsg);
        }
      } catch (error) {
        return error.message;
      }
    }
    document.getElementById("chatMsg").value = "";
  };

  const endTurnHandler = () => {
    console.log("currentTurn is ", currentTurn);
    console.log("teamColor is ", teamColor);
    if (!isItYourTurn(currentTurn, teamColor, spyMaster)) {
      addToast(`Wait for your turn!`, {
        appearance: "warning",
        autoDismiss: true
      });
      return;
    }
    let turnString = turnTracker.nextTurn(currentTurn);
    EndTurn(gameId, turnString);
  };

  return (
    <div id="sideBar" className="sideBar-wrapper wrapper right">
      {gameStatus ? (
        <div
          id="turnInfo"
          className={`current-turn-info-container add-glow-${currentTurn}`}
        >
          <p className="current-turn-text">{`${displayCurrentPlayersTurn(
            currentTurn
          )}'s turn`}</p>
        </div>
      ) : null}
      <div id="playerInfo" className="playerInfo-container container">
        <p className="players-text-header">Your info:</p>
        <p className={`players-text add-color-${teamColor}`}>
          {`Agent ${displayName}`}
        </p>
        <p className={`players-text add-color-${teamColor}`}>
          {spyMaster
            ? `${teamColor.slice(0, 1).toUpperCase()}${teamColor.slice(
                1
              )} Spy Master`
            : `With the ${teamColor} spy agency`}
        </p>
      </div>
      <ResizableBox
        handleSize={[10, 10]}
        resizeHandles={["s"]}
        height={80}
        width={225}
        minConstraints={[225, 50]}
        maxConstraints={[225, 750]}
        axis={"y"}
        className="allPlayersInfo-container"
      >
        {allPlayers.map(({ DisplayName, Team, isSpyMaster }, index) => {
          return (
            <p
              className={`players-text add-color-${Team}`}
              key={`${index}`}
            >{`${isSpyMaster ? "SM: " : "S: "}${DisplayName}`}</p>
          );
        })}
      </ResizableBox>
      <div className="hint-container">
        {spyMaster ? (
          <>
            <div className="spyMaster-hint-text-wrapper">
              <p className="spyMaster-hint-text">{`Hint: ${getHint}`}</p>
              <p className="spyMaster-hint-text">{`For: ${getHintCount} cards `}</p>
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
          </>
        ) : (
          <>
            <h6>{`Hint: ${getHint}`}</h6>
            <h6>{`For: ${getHintCount} cards `}</h6>
          </>
        )}
      </div>
      <ResizableBox
        handleSize={[10, 10]}
        resizeHandles={["s"]}
        height={175}
        width={225}
        minConstraints={[225, 130]}
        maxConstraints={[225, 750]}
        axis={"y"}
        className="chat-container"
      >
        <div className="log-wrapper">
          {chatLog.map(({ sender, message }, index) => {
            return (
              <React.Fragment key={`${sender}${index}`}>
                <p className="messageSender">{sender}:</p>
                <div className={`message-wrapper`}>
                  <p className="message-text">{message}</p>
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
      </ResizableBox>
      {!spyMaster ? (
        <button
          className="end-turn-btn btn center waves-effect waves-dard yellow darken-3"
          onClick={endTurnHandler}
        >
          End Turn
        </button>
      ) : null}
      <button
        id="leaveGameBtn"
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
      dispatch(SendMessage(id, game, user, message)),
    Sendhint: (id, word, count) =>
      dispatch(SetHintWordAndCount(id, word, count)),
    EndTurn: (id, turnString) => dispatch(Endturn(id, turnString))
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
