import React from "react";
import SideBar from "./SideBar";
import PlayArea from "./PlayArea";

import "../../css/playerGameBoard.css";

const PlayerGameBoard = ({ spyMaster, deck }) => {
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
