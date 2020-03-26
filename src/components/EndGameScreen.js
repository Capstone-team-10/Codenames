import React from 'react'
import {connect} from "react-redux"
import { withRouter } from 'react-router'
import {leaveGame} from "../store/GameThunks"
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

import "../css/EndGameScreen.css";
const result = "error"
const gameId = "7ubJsrY9KPjY2DSdXPV4"

const EndGameScreen =(props) => {
  console.log("End Prop", props)
  // const gameId = props.gameId

  const isFetching = props.Games !== undefined
  const game = isFetching ? props.Games[gameId] : null

  let className, message
  switch(result){
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

  const SameGameRoom = (e) =>{
    e.preventDefault()
    ///Initiate Same Game Room
  }

  const NewGameRoom = (e) =>{
    e.preventDefault()
    props.LeaveGame(gameId,game,props.User)
    props.history.push("/onSubmit")
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
    LeaveGame: (Gameid,game,user) => dispatch(leaveGame(Gameid,game,user))
  }
}

export default compose(
  firestoreConnect([
    {
      collection: "Games"
    }
  ]),
  connect(mapStateToProps,mapDispatchToProps))(withRouter(EndGameScreen))
