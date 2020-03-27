import React, { useState, useEffect } from "react";
import { SideBar, PlayArea, GameLobby } from "./index";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

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
  dealSpyAndSpymasterDecks,
  Games
}) => {
  const [bannedWords, setBannedWords] = useState([]);

  const isFetching = Games === undefined || Games[gameId] === undefined;

  const game = isFetching ? null : Games[gameId];
  const currentTurn = isFetching ? "" : game.CurrentTurn;
  console.log("currentTurn is: ", currentTurn);

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
              currentTurn={currentTurn}
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
            currentTurn={currentTurn}
            allPlayers={allPlayers}
            bannedWords={bannedWords}
            displayName={displayName}
            spyMaster={spyMaster}
            teamColor={teamColor}
            gameId={gameId}
            gameStatus={gameStatus}
            history={history}
          />
        </>
      ) : (
        <>
          {gameStatus ? (
            <PlayArea
              currentTurn={currentTurn}
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
            currentTurn={currentTurn}
            allPlayers={allPlayers}
            displayName={displayName}
            spyMaster={spyMaster}
            teamColor={teamColor}
            gameId={gameId}
            gameStatus={gameStatus}
            history={history}
          />
        </>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    Games: state.firestore.data.Games,
    User: state.firebase.auth
  };
};

export default compose(
  firestoreConnect([
    {
      collection: "Games"
    }
  ]),
  connect(mapStateToProps)
)(PlayerGameBoard);
