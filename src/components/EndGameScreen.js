import React from 'react'
import {connect} from "react-redux"
import { withRouter } from 'react-router'
import {deleteGame} from "../store/turns"

import "../css/EndGameScreen.css";
const result = "error"
const gameId = "w6w9HDVm8PzGETWA8Mr4"

const EndGameScreen =(props) => {
  console.log("End Prop", props)
  // const gameId = props.gameId

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

  const DeleteGameRoom = (e) =>{
    e.preventDefault()
    props.deleteGame(gameId)
    props.history.push("/onSubmit")
  }


  return (
    <div className={`EndGameScreen ${className}`}>
      <div className="EndScreen-message">{message}</div>
      <div className="EndScreen-buttons">
      <button className="title-button" onClick={SameGameRoom}>
        Replay with Same Players
      </button>
      <button className="title-button" onClick={DeleteGameRoom}>
        Replay with New Players
      </button>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    deleteGame: (Gameid) => dispatch(deleteGame(Gameid))
  }
}

export default connect(null,mapDispatchToProps)(withRouter(EndGameScreen))
