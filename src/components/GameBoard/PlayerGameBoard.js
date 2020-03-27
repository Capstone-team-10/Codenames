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
  teamColor,
  gameId,
  history,
  dealCards,
  dealSpyAndSpymasterDecks
}) => {
  const [bannedWords, setBannedWords] = useState([]);

  useEffect(() => {
    const banned = [];
    deck.forEach(({ word, flipped }) => {
      if (!flipped) {
        banned.push(word);
      }
    });
    setBannedWords(banned);
    console.log("banned words are: ", banned);
  }, [deck]);

  return (
    <div className="gameBoard-container">
      {spyMaster ? (
        <>
          {gameStatus ? (
            <PlayArea
              deck={deck}
              spyMaster={spyMaster}
              gameId={gameId}
              dealSpyAndSpymasterDecks={dealSpyAndSpymasterDecks}
            />
          ) : (
            <GameLobby
              allPlayers={allPlayers}
              gameId={gameId}
              dealCards={dealCards}
            />
          )}
          <SideBar
            allPlayers={allPlayers}
            bannedWords={bannedWords}
            displayName={displayName}
            chatLog={chatLog}
            spyMaster={spyMaster}
            teamColor={teamColor}
            gameId={gameId}
            history={history}
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
              gameId={gameId}
              dealSpyAndSpymasterDecks={dealSpyAndSpymasterDecks}
            />
          ) : (
            <GameLobby
              allPlayers={allPlayers}
              gameId={gameId}
              dealCards={dealCards}
            />
          )}
          <SideBar
            allPlayers={allPlayers}
            displayName={displayName}
            chatLog={chatLog}
            spyMaster={spyMaster}
            teamColor={teamColor}
            gameId={gameId}
            history={history}
          />
        </>
      )}
    </div>
  );
};

export default PlayerGameBoard;
