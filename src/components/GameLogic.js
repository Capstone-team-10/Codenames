import React, { useState, useEffect } from "react";
import PlayerGameBoard from "./GameBoard";

import { dealCards, dummyData, turnTracker } from "../utils";

import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
// import dummyData from "../utils/dummyData";

const GameLogic = (props) => {
  //Dummy data start)
  const history = props.history
  const id = props.match.params.id
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
          gameId = {id}
          history = {history}
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

const mapStateToProps = (state) => {
  return {
    Game: state.firestore.data.Games,
    User: state.firebase.auth,
  }
}

export default compose(
  firestoreConnect([
    {
      collection: "Games"
    }
  ]),
  connect(mapStateToProps)
)(GameLogic)
