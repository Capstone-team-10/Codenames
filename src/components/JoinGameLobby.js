import React, { Component } from 'react'
import {Link} from "react-router-dom"    /* Delete after demo Demonstration */
import "../css/JoinGameLobby.css";

export default class JoinGameLobby extends Component {
  constructor(){
    super()
    this.state ={
      games:[{id:1, title: "AAron's room"},{id:2, title: "Sunil's room"},{id:3, title: "Stas's room"},{id:4, title: "Poppy's room"}]
    }
  }
  render() {
    const {games} = this.state
    return (
      <div className="JoinGameLobby-container">
        <h2>Click a Game to Join!</h2>
        <div className="JoinGame-container">
          {games.length ? games.map(game=>(
          <button key={game.id} className="title-button">
            {/* Make as Link to Game Component */}
            {game.title}
          </button>)) : <h2> There are currently no open games to join</h2>}
        </div>
        <button className="title-button">
        {/* Delete after demo Demonstration */}
        <Link to="/GameOver" >
          Fake Room - Link to End Game screen
          </Link>
        </button>
      </div>
    )
  }
}
