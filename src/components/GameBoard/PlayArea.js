import React, { useEffect } from "react";
import GameCard from "./GameCard";

const PlayArea = ({ deck }) => {
  // console.log("In PlayArea deck is: ", deck);
  useEffect(() => {
    console.log("In PlayArea the deck is: ", deck);
  });
  return (
    <div className="playArea-container">
      <div className="cards-wrapper">
        {deck.map(card => (
          <GameCard card={card} key={card.word} />
        ))}
      </div>
    </div>
  );
};

export default PlayArea;
