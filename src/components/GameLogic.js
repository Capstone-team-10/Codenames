import React, { useState, useEffect } from "react";
import PlayerGameBoard from "./GameBoard";

//import utils
import { dealCards, dummyData, turnTracker } from "../utils";

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

  const [spyDeck, setSpyDeck] = useState([]);
  const [spyMasterDeck, setSpyMasterDeck] = useState([]);
  const [pickResult, setPickResult] = useState();

  const cardPick = deck => {
    return (cardPicked, currentTeam) => {
      const rightCard = currentTeam;
      const wrongCard = currentTeam === "red" ? "blue" : "red";
      const neutralCard = "white";
      const fatalCard = "black";
      switch (deck[cardPicked].color) {
        case rightCard:
          setPickResult("good");
          return "good";
        case neutralCard:
          setPickResult("neutral");
          return "neutral";
        case wrongCard:
          setPickResult("bad");
          return "bad";
        case fatalCard:
          setPickResult("fatal");
          return "fatal";
        default:
          console.error(
            `Invalid input cardPicked: ${cardPicked}, currentTeam: ${currentTeam}, deck: `,
            deck
          );
      }
    };
  };

  const makeSpyAndSpyMasterDecks = deck => {
    const spy = deck.map(({ word, flipped }) => ({ word, flipped }));

    setSpyMasterDeck(deck);
    setSpyDeck(spy);
  };

  useEffect(() => {
    console.log("pickResult is: ", pickResult);
  }, [pickResult]);

  useEffect(() => {
    let cardsFromDealer = dealCards();
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
          setPickResult={setPickResult}
          playersPick={cardPick(spyMasterDeck)}
          spyMaster={spyMaster}
          teamColor={teamColor}
        />
      )}
    </>
  );
};

export default GameLogic;
