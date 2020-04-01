import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { leaveGame, ReplayGame } from "../store/GameThunks";
import { useToasts } from "react-toast-notifications";

import "../css/EndGameScreen.css";

const EndGameScreen = props => {
  const { addToast } = useToasts();
  const {
    GameResult,
    gameId,
    uid,
    ReplayGame,
    LeaveGame,
    history
  } = props;

  // const isFetching = Games !== undefined;
  // const game = isFetching ? Games[gameId] : null;

  const [className, setClassName] = useState("");
  const [message, setMessage] = useState(
    "There was an error, Win-loss records will not be recorded"
  );

  useEffect(() => {
    switch (GameResult) {
      case "bluewin":
        setClassName("bluewin");
        setMessage("Blue team has won the game");
        break;
      case "redwin":
        setClassName("redwin");
        setMessage("Red team has won the game");
        break;
      case "bluekilled":
        setClassName("bluekilled");
        setMessage("Blue team has been assassinated");
        break;
      case "redkilled":
        setClassName("redkilled");
        setMessage("Red team has been assassinated");
        break;
      default:
        setClassName("");
        setMessage("There was an error, Win-loss records will not be recorded");
    }
  }, []);

  const SameGameRoom = async e => {
    try {
      const err = await ReplayGame(gameId);
      if (err === undefined) {
        history.push(`/play/${gameId}`);
      } else {
        addToast("Sorry, we can't reload the Room", {
          appearance: "warning",
          autoDismiss: true
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const NewGameRoom = async e => {
    try {
      const err = await LeaveGame(gameId, uid);
      if (err === undefined) {
        history.push("/onSubmit");
      } else {
        addToast("Sorry, we having network errors", {
          appearance: "warning",
          autoDismiss: true
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`EndGameScreen ${className}`}>
      <div className="EndScreen-message">{message}</div>
      <div className="EndScreen-buttons">
        <button className="title-button" onClick={SameGameRoom}>
          Replay with Same Players
        </button>
        <button className="title-button" onClick={NewGameRoom}>
          Replay with New Players
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    LeaveGame: (Gameid, uid) => dispatch(leaveGame(Gameid, uid)),
    ReplayGame: (Gameid) => dispatch(ReplayGame(Gameid))
  };
};

export default connect(null, mapDispatchToProps)(withRouter(EndGameScreen));
