import React from 'react'
import { Link } from 'react-router-dom'
import "../css/ChooseGameRoom.css";
import "../css/Title.css";

export default function ChooseGameRoom() {
  const newGameRoom = (e) =>{
    e.preventDefault()
    ///Initiate New Game Room
  }

  return (
     <div className="ChooseGame-container">
       <button className="title-button" onClick={newGameRoom}>
          New Game
        </button>
        <button className="title-button">
          <Link to="/lobby">
            Join Game
          </Link>
        </button>
    </div>
  )
}
