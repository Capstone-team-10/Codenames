import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { leaveGame, ReplayGame } from "../store/GameThunks";
import { updateWinRecord, updateLossRecord } from "../store/UserThunks";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { useToasts } from "react-toast-notifications";

import "../css/EndGameScreen.css";

const EndGameScreen = props => {
  const { addToast } = useToasts();
  const {
    GameResult,
    gameId,
    Games,
    User,
    ReplayGame,
    LeaveGame,
    history,
    Users,
    UpdateWin,
    UpdateLoss
  } = props;

  const isFetching = Games !== undefined;
  const game = isFetching ? Games[gameId] : null;

  console.log(
    "Specific Users Record in the EndScreen ------>",
    Users[User.uid]
  );
  console.log("Name of Specific User in the EndScreen", User.displayName);
  console.log(
    "Team of Specific User in the EndScreen",
    game.UsersInRoom[User.uid].Team
  );

  const [className, setClassName] = useState("");
  const [message, setMessage] = useState(
    "There was an error, Win-loss records will not be recorded"
  );

  useEffect(() => {
    return () => {
      console.log("Running the switch case");
      switch (GameResult) {
        case "bluewin":
          setClassName("bluewin");
          setMessage("Blue team has won the game");
          if (game.UsersInRoom[User.uid].Team === "blue") {
            UpdateWin(User.uid, Users);
          } else {
            UpdateLoss(User.uid, Users);
          }
          break;
        case "redwin":
          setClassName("redwin");
          setMessage("Red team has won the game");
          if (game.UsersInRoom[User.uid].Team === "red") {
            UpdateWin(User.uid, Users);
          } else {
            UpdateLoss(User.uid, Users);
          }
          break;
        case "bluekilled":
          setClassName("bluekilled");
          setMessage("Blue team has been assassinated");
          if (game.UsersInRoom[User.uid].Team === "red") {
            UpdateWin(User.uid, Users);
          } else {
            UpdateLoss(User.uid, Users);
          }
          break;
        case "redkilled":
          setClassName("redkilled");
          setMessage("Red team has been assassinated");
          if (game.UsersInRoom[User.uid].Team === "blue") {
            UpdateWin(User.uid);
          } else {
            UpdateLoss(User.uid);
          }
          break;
        default:
          setClassName("");
          setMessage(
            "There was an error, Win-loss records will not be recorded"
          );
      }
    };
  }, []);

  const SameGameRoom = async e => {
    try {
      const err = await ReplayGame(gameId, game, User);
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
      const err = await LeaveGame(gameId, game, User);
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

const mapStateToProps = state => {
  return {
    Games: state.firestore.data.Games,
    User: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    LeaveGame: (Gameid, game, user) => dispatch(leaveGame(Gameid, game, user)),
    ReplayGame: (Gameid, game, user) =>
      dispatch(ReplayGame(Gameid, game, user)),
    UpdateWin: (uid, user) => dispatch(updateWinRecord(uid, user)),
    UpdateLoss: (uid, user) => dispatch(updateLossRecord(uid, user))
  };
};

export default compose(
  firestoreConnect([
    {
      collection: "Games"
    }
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(withRouter(EndGameScreen));
