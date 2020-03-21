import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import PlayArea from "./PlayArea";

import "../../css/playerGameBoard.css";
import dealCards from "../../utils/dealer";

const PlayerGameBoard = () => {
  const [deck, setDeck] = useState([]);

  useEffect(() => {
    console.log("The deck is: ", deck);

    let cardsFromDealer = dealCards();
    //look into replacing setTimeout with promises
    setTimeout(() => {
      setDeck(cardsFromDealer);
    }, 250);
  }, []);

  return (
    <div>
      <PlayArea deck={deck} />
      <SideBar />
    </div>
  );
};

export default PlayerGameBoard;
