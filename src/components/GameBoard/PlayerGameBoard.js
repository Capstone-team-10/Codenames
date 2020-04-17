import React, { useState, useEffect } from "react";
import { SideBar, PlayArea, GameLobby } from "./index";

import "../../css/playerGameBoard.css";

const PlayerGameBoard = ({
  allPlayers,
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
  blueScore,
  redScore,
  GameOver,
  GameResult,
  dealSpyAndSpymasterDecks,
  Games,
  GameMade,
  currentUser,
  uid
}) => {
  const [bannedWords, setBannedWords] = useState({});



  const isFetching = Games === undefined || Games[gameId] === undefined;

  const game = isFetching ? null : Games[gameId];
  const currentTurn = isFetching ? "" : game.CurrentTurn;
  // const chatLog = isFetching ? [] : game.Chat;
  const isFetchingChat = isFetching || game.Chat === undefined;
  const chatLog = isFetchingChat ? [] : game.Chat;

  useEffect(() => {
    const banned = {};
    deck.forEach(({ word, flipped }) => {
      if (!flipped) {
        banned[word] = word;
      }
    });
    setBannedWords(banned);
  }, [deck]);

  return (
    <div id="gameBoard-container" className="gameBoard-container">
          {gameStatus ? (
            <PlayArea
              Games={Games}
              gameId={gameId}
              GameOver={GameOver}
              GameResult={GameResult}
              spyMaster={spyMaster}
              hintWord={game.HintWord}
              hintCount={game.HintCount}
              teamColor={teamColor}
              blueScore={blueScore}
              redScore={redScore}
              currentTurn={currentTurn}
              uid={uid}
              deck={deck}
              dealSpyAndSpymasterDecks={dealSpyAndSpymasterDecks}
              playersPick={spyMaster ? null : playersPick}
              setPickResult={spyMaster ? null : setPickResult}
            />
          ) : (
              <GameLobby
                Games={Games}
                gameId={gameId}
                allPlayers={allPlayers}
                uid={uid}
                displayName={displayName}
                dealCards={dealCards}
              />
            )}
          <SideBar
            history={history}
            Games={Games}
            gameId={gameId}
            gameStatus={gameStatus}
            spyMaster={spyMaster}
            allPlayers={allPlayers}
            currentUser={currentUser}
            currentTurn={currentTurn}
            uid={uid}
            displayName={displayName}
            teamColor={teamColor}
            chatLog={chatLog}
            bannedWords={spyMaster ? bannedWords : null}
            GameMade={spyMaster ? null : GameMade}
          />
    </div>
  );
};

export default PlayerGameBoard;
