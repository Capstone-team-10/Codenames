import React, { useState, useEffect } from "react";
import { SideBar, PlayArea, GameLobby } from "./index";

import "../../css/playerGameBoard.css";

const PlayerGameBoard = ({
  allPlayers,
  chatLog,
  deck,
  displayName,
  gameStatus,
  spyMaster,
  teamColor,
  gameId,
  history,
}) => {
  return (
    <div className="gameBoard-container">
      {spyMaster ? (
        <>
          {gameStatus ? (
            <PlayArea deck={deck} />
          ) : (
            <GameLobby allPlayers={allPlayers} gameId={gameId} history={history}/>
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
            <PlayArea deck={deck} />
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
