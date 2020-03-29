import React from 'react'
import { connect } from "react-redux"
import { withRouter } from 'react-router'
import { leaveGame, ReplayGame } from "../store/GameThunks"
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { useToasts } from "react-toast-notifications";

import "../css/EndGameScreen.css";


const EndGameScreen = (props) => {
  const { addToast } = useToasts()
  const { GameResult, gameId, Games, User, ReplayGame, LeaveGame, history } = props

  const isFetching = Games !== undefined
  const game = isFetching ? Games[gameId] : null

  let className, message
  switch (GameResult) {
    case "bluewin":
      className = "bluewin"
      message = "Blue team has won the game"
      break;
    case "redwin":
      className = "redwin"
      message = "Red team has won the game"
      break;
    case "bluekilled":
      className = "bluekilled"
      message = "Blue team has been assassinated"
      break;
    case "redkilled":
      className = "redkilled"
      message = "Red team has been assassinated"
      break;
    default:
      className = ""
      message = "There was an error, Win-loss records will not be recorded"
  }

  const SameGameRoom = async (e) => {
    try {
      const err = await ReplayGame(gameId, game, User)
      if (err === undefined) {
        history.push(`/play/${gameId}`)
      }
      else {
        addToast("Sorry, we can't reload the Room", {
          appearance: "warning",
          autoDismiss: true
        });
      }
    } catch (error) {
      console.error(error)
    }
  }

  const NewGameRoom = async (e) => {
    try {
      const err = await LeaveGame(gameId, game, User)
      if (err === undefined) {
        history.push("/onSubmit")
      }
      else {
        addToast("Sorry, we having network errors", {
          appearance: "warning",
          autoDismiss: true
        });
      }
    } catch (error) {
      console.error(error)
    }
  }


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
  )
}

const mapStateToProps = (state) => {
  return {
    Games: state.firestore.data.Games,
    User: state.firebase.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    LeaveGame: (Gameid, game, user) => dispatch(leaveGame(Gameid, game, user)),
    ReplayGame: (Gameid, game, user) => dispatch(ReplayGame(Gameid, game, user))
  }
}

export default compose(
  firestoreConnect([
    {
      collection: "Games"
    }
  ]),
  connect(mapStateToProps, mapDispatchToProps))(withRouter(EndGameScreen))
