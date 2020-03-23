import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import PlayArea from "./PlayArea";

import "../../css/playerGameBoard.css";
import dealCards from "../../utils/dealer";

const PlayerGameBoard = () => {
  const spyMaster = true;
  const [deck, setDeck] = useState({ spy: [], spyMaster: [] });

  useEffect(() => {
    console.log("The deck is: ", deck);

    let cardsFromDealer = dealCards();
    setDeck(cardsFromDealer);
  }, []);

  return (
    <div className="gameBoard-container">
      {spyMaster ? (
        <>
          <PlayArea deck={deck.spyMaster} />
          <SideBar spyMaster={spyMaster} />
        </>
      ) : (
        <>
          <PlayArea deck={deck.spy} />
          <SideBar />
        </>
      )}
    </div>
  );
};

export default PlayerGameBoard;
