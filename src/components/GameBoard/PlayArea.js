import React, { useEffect } from "react";
import PlayerCard from "./PlayerCard";

const PlayArea = ({ deck, playersPick, setPickResult, spyMaster }) => {
  // console.log("In PlayArea deck is: ", deck);
  useEffect(() => {
    console.log("In PlayArea the deck is: ", deck);
  });
  return (
    <div className="playArea-container">
      <div className="cards-wrapper">
        {deck.map((card, index) => (
          <PlayerCard
            card={card}
            key={card.word}
            index={index}
            playersPick={playersPick}
            setPickResult={setPickResult}
            spyMaster={spyMaster}
          />
        ))}
      </div>
    </div>
  );
};

export default PlayArea;
