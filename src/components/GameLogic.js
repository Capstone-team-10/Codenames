import React, { useState, useEffect } from "react";
import PlayerGameBoard from "./GameBoard";

import { dealCards, getResultImage, turnTracker } from "../utils";

import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { syncPlayerDecks, changeCardsLeft } from "../store/DeckThunk";
import { Endturn, Assassin } from "../store/GameThunks"

const GameLogic = props => {
  const { Games, User, history, decksync, changeCardsLeft, Endturn, Assassin } = props;
  const Gameid = props.match.params.id;

  const isFetching = Games === undefined || Games[Gameid] === undefined;
  const displayName = User.displayName;

  const game = isFetching ? null : Games[Gameid];
  const blueScore = isFetching ? 0 : game.BlueCardsLeft
  const redScore = isFetching ? 0 : game.RedCardsLeft
  const GameOver = isFetching ? false : game.GameOver
  const GameResult = isFetching ? "" : game.GameResult

  const allPlayers = isFetching ? [] : Object.values(game.UsersInRoom);

  const gameStatus = isFetching ? null : game.GameStarted;
  const teamColor = isFetching ? null : game.UsersInRoom[User.uid]?.Team;
  const spyMaster = isFetching ? null : game.UsersInRoom[User.uid]?.isSpyMaster;

  const FirestoreDeck = isFetching ? [] : game.CardsOnTable;

  const [spyDeck, setSpyDeck] = useState([]);
  const [spyMasterDeck, setSpyMasterDeck] = useState([]);
  // const [dealFunction, setDealFunction] = useState();

  const cardPick = deck => {
    return (cardPicked, currentTeam) => {
      const rightCard = currentTeam;
      const wrongCard = currentTeam === "red" ? "blue" : "red";
      const neutralCard = "white";
      const fatalCard = "black";
      console.log("the deck is: ", deck);
      let outcome;
      switch (deck[cardPicked].color) {
        case rightCard:
          outcome = {
            outcome: "good",
            image: getResultImage(rightCard)
          };
          changeCardsLeft(rightCard, Gameid, game)
          break;
        case neutralCard:
          outcome = {
            outcome: "neutral",
            image: getResultImage(neutralCard)
          };
          Endturn(Gameid, turnTracker.nextTurn(game.CurrentTurn))
          break;

        case wrongCard:
          outcome = {
            outcome: "bad",
            image: getResultImage(wrongCard)
          };
          changeCardsLeft(wrongCard, Gameid, game)
          Endturn(Gameid, turnTracker.nextTurn(game.CurrentTurn))
          break;
        case fatalCard:
          outcome = {
            outcome: "fatal",
            image: getResultImage(fatalCard)
          };
          setTimeout(() => {
            Assassin(Gameid, currentTeam)
          }, 3000);
          break;
        default:
          console.error(
            `Invalid input cardPicked: ${cardPicked}, currentTeam: ${currentTeam}, deck: `,
            deck
          );
      }
      const deckCopy = [...deck];
      const cardCopy = Object.assign({}, deckCopy[cardPicked]);
      cardCopy.flipped = true;
      cardCopy.image = outcome.image;
      deckCopy[cardPicked] = cardCopy;
      decksync(deckCopy, Gameid);
      return outcome;
    };
  };

  const dealDeck = (deck, Gameid) => {
    return () => {
      decksync(deck, Gameid);
    };
  };

  useEffect(() => {
    console.log(
      "----Is this running after the deck is updated?",
      FirestoreDeck
    );
    dealSpyAndSpymasterDecks();
  }, [FirestoreDeck]);

  const dealSpyAndSpymasterDecks = (gameDeck = FirestoreDeck) => {
    // makeSpyAndSpyMasterDecks(FirestoreDeck);
    console.log("the gameDeck is: ", gameDeck);
    const deck = gameDeck ? gameDeck : [];
    console.log("the after is: ", deck);
    const spy = deck.map(({ word, flipped, image }) => ({
      word,
      flipped,
      image
    }));

    setSpyMasterDeck(deck);
    setSpyDeck(spy);
  };

  //consider moving functionality into dealSpyAndSpyMasterDecks
  // const makeSpyAndSpyMasterDecks = deck => {

  // };

  // useEffect(() => {
  //   setDealFunction(dealDeck(spyMasterDeck))
  // }, []);

  // useEffect(() => {
  //   let cardsFromDealer = dealCards();
  //   makeSpyAndSpyMasterDecks(cardsFromDealer);
  // }, []);

  return (
    <>
      {spyMaster ? (
        <PlayerGameBoard
          gameId={Gameid}
          history={history}
          allPlayers={allPlayers}
          deck={spyMasterDeck}
          displayName={displayName}
          gameStatus={gameStatus}
          spyMaster={spyMaster}
          teamColor={teamColor}
          blueScore={blueScore}
          redScore={redScore}
          GameOver={GameOver}
          GameResult={GameResult}
          dealCards={dealDeck(dealCards(), Gameid)}
          dealSpyAndSpymasterDecks={dealSpyAndSpymasterDecks}
        />
      ) : (
          <PlayerGameBoard
            gameId={Gameid}
            history={history}
            allPlayers={allPlayers}
            deck={spyDeck}
            displayName={displayName}
            gameStatus={gameStatus}
            playersPick={cardPick(spyMasterDeck)}
            spyMaster={spyMaster}
            teamColor={teamColor}
            blueScore={blueScore}
            redScore={redScore}
            GameOver={GameOver}
            GameResult={GameResult}
            dealCards={dealDeck(dealCards(), Gameid)}
            dealSpyAndSpymasterDecks={dealSpyAndSpymasterDecks}
          />
        )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    Games: state.firestore.data.Games,
    User: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    decksync: (deck, Gameid) => dispatch(syncPlayerDecks(deck, Gameid)),
    changeCardsLeft: (currentTeam, id, game) => dispatch(changeCardsLeft(currentTeam, id, game)),
    Endturn: (id, turnString) => dispatch(Endturn(id, turnString)),
    Assassin: (id, result) => dispatch(Assassin(id, result))
  };
};

export default compose(
  firestoreConnect([
    {
      collection: "Games"
    }
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(GameLogic);
