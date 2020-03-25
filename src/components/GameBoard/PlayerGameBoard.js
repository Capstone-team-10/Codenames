import React, { useState, useEffect } from "react";
import { SideBar, PlayArea, GameLobby } from "./index";

import "../../css/playerGameBoard.css";

const PlayerGameBoard = ({
  allPlayers,
  chatLog,
  deck,
  displayName,
  gameStatus,
  playersPick,
  setPickResult,
  spyMaster,
  teamColor
}) => {
  return (
    <div className="gameBoard-container">
      {spyMaster ? (
        <>
          {gameStatus ? (
            <PlayArea deck={deck} spyMaster={spyMaster} />
          ) : (
            <GameLobby allPlayers={allPlayers} />
          )}
          <SideBar
            allPlayers={allPlayers}
            displayName={displayName}
            chatLog={chatLog}
            spyMaster={spyMaster}
            teamColor={teamColor}
          />
        </>
      ) : (
        <>
          {gameStatus ? (
            <PlayArea
              deck={deck}
              playersPick={playersPick}
              setPickResult={setPickResult}
              spyMaster={spyMaster}
            />
          ) : (
            <GameLobby allPlayers={allPlayers} />
          )}
          <SideBar
            allPlayers={allPlayers}
            displayName={displayName}
            chatLog={chatLog}
            spyMaster={spyMaster}
            teamColor={teamColor}
          />
        </>
      )}
    </div>
  );
};

export default PlayerGameBoard;
