import React from 'react'

export default function EndGame() {

  // switch(status){
  //   case blue_win:
  //     text = blue Wins
  //     img class = blue wins
  //     break;
  //   case red win:
  //     text = red Wins
  //     img class = red wins
  //     break;
  //   case blue killed:
  //     text = blue killed
  //     img class = blue killed
  //     break;
  //   case red killed:
  //     text = red killed
  //     img class = red killed
  //     break;
  //   default:
  //     text = No winner
  //     img class = title image
  // }


  return (
    // <div className={`endscreen ${img class}`}>
    // <button className="endgame-button" onClick={onclick}>
    <div className="endgame-screen">
      <div className="endgame-message"><h2>Text</h2></div>
      <button className="endgame-button">
      <h2>Play Again With Sames Teams?</h2>
      </button>
      <button className="endgame-button">
        <h2>Play Again With New Teams?</h2>
      </button>
    </div>
  )
}
