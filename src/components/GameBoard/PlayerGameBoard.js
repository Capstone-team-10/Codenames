import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import PlayArea from "./PlayArea";

import "../../css/playerGameBoard.css";
import dealCards from "../../utils/dealer";

const PlayerGameBoard = () => {
  const spyMaster = true;
  const [deck, setDeck] = useState([]);

  useEffect(() => {
    console.log("The deck is: ", deck);
    setDeck(dealCards());
  }, []);

  return (
    <div className="gameBoard-container">
      {spyMaster ? (
        <>
          <PlayArea deck={deck} />
          <SideBar spyMaster={spyMaster} />
        </>
      ) : (
        <>
          <PlayArea deck={deck} />
          <SideBar />
        </>
      )}
    </div>
  );
};

export default PlayerGameBoard;
