import React, { useState, useEffect } from "react";
import PlayerGameBoard from "./GameBoard";

import { dealCards, dummyData, turnTracker } from "../utils";
// import dummyData from "../utils/dummyData";

const GameLogic = () => {
  //Dummy data start
  const {
    allPlayers,
    chatLog,
    displayName,
    gameStatus,
    spyMaster,
    teamColor
  } = dummyData;
  //End dummy data

  const [deck, setDeck] = useState([]);
  const [spyDeck, setSpyDeck] = useState([]);
  const [spyMasterDeck, setSpyMasterDeck] = useState([]);

  const makeSpyAndSpyMasterDecks = deck => {
    const spy = deck.map(({ word, flipped }) => ({ word, flipped }));

    setSpyMasterDeck(deck);
    setSpyDeck(spy);
  };

  useEffect(() => {
    console.log("The deck is: ", deck);
    let cardsFromDealer = dealCards();
    setDeck(cardsFromDealer);
    makeSpyAndSpyMasterDecks(cardsFromDealer);
  }, []);

  return (
    <>
      {spyMaster ? (
        <PlayerGameBoard
          allPlayers={allPlayers}
          chatLog={chatLog}
          deck={spyMasterDeck}
          displayName={displayName}
          gameStatus={gameStatus}
          spyMaster={spyMaster}
          teamColor={teamColor}
        />
      ) : (
        <PlayerGameBoard
          allPlayers={allPlayers}
          chatLog={chatLog}
          deck={spyDeck}
          displayName={displayName}
          gameStatus={gameStatus}
          spyMaster={spyMaster}
          teamColor={teamColor}
        />
      )}
    </>
  );
};

export default GameLogic;
