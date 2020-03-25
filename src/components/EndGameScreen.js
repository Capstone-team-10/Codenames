import React from 'react'
import {Link} from "react-router-dom"
import "../css/EndGameScreen.css";
const result = "redwin"

export default function EndGameScreen(/*result*/) {
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

  // const ReturntoChooseGame = (e) =>{
  //   e.preventDefault()
  //   ///Initiate New Game Room
  // }

  return (
    <div className={`EndGameScreen ${className}`}>
      <div className="EndScreen-message">{message}</div>
      <div className="EndScreen-buttons">
      <button className="title-button" onClick={SameGameRoom}>
        Replay with Same Teams
      </button>
      <button className="title-button">
        <Link to="/onSubmit">
        Replay with New Teams
        </Link>
      </button>
      </div>
    </div>
  )
}
