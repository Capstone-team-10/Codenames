import React from "react";
import { Link } from "react-router-dom";
//import {}

export default function ChooseGame() {
  const onClick = e => {
    // e.preventDefault()
    // NewGame()
  };

  return (
    <div className="choose-game-container">
      <h1 className="choose-game">Choose your game</h1>
      <button className="new-game-button" onClick={onClick}>
        <h2>NEW GAME</h2>
      </button>
      <button className="join-game-button">
        <Link to="/joingamelobby">JOIN GAME</Link>
      </button>
    </div>
  );
}
