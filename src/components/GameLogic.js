import React, { useState, useEffect } from "react";
import PlayerGameBoard from "./GameBoard/PlayerGameBoard";

import dealCards from "../utils/dealer";

const GameLogic = () => {
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

  const spyMaster = true;
  return (
    <>
      {spyMaster ? (
        <PlayerGameBoard spyMaster={spyMaster} deck={spyMasterDeck} />
      ) : (
        <PlayerGameBoard spyMaster={spyMaster} deck={spyDeck} />
      )}
    </>
  );
};

export default GameLogic;
