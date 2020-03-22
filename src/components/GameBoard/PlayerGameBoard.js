import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import PlayArea from "./PlayArea";

import "../../css/playerGameBoard.css";
import dealCards from "../../utils/dealer";

const PlayerGameBoard = () => {
  const spyMaster = false;
  const [deck, setDeck] = useState({ spy: [], spyMaster: [] });

  useEffect(() => {
    console.log("The deck is: ", deck);

    let cardsFromDealer = dealCards();
    //look into replacing setTimeout with promises
    setTimeout(() => {
      setDeck(cardsFromDealer);
    }, 250);
  }, []);

  return (
    <div className="gameBoard-container">
      {spyMaster ? (
        <React.Fragment>
          <PlayArea deck={deck.spyMaster} />
          <SideBar spyMaster={spyMaster} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <PlayArea deck={deck.spy} />
          <SideBar />
        </React.Fragment>
      )}
    </div>
  );
};

export default PlayerGameBoard;
