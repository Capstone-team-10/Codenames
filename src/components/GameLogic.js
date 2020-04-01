import React, { useState, useEffect } from "react";
import PlayerGameBoard from "./GameBoard";

import { dealCards, getResultImage, turnTracker } from "../utils";

import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { syncPlayerDecks, changeCardsLeft } from "../store/DeckThunk";
import { updateWinRecord, updateLossRecord } from "../store/UserThunks";
import { Endturn, Assassin, victory } from "../store/GameThunks";
import { ChangeHintCount } from "../store/HintThunk";

const GameLogic = props => {
  const {
    Games,
    Users,
    history,
    decksync,
    changeCardsLeft,
    ChangeHintCount,
    Endturn,
    Assassin,
    UpdateWin,
    UpdateLoss,
    victory,
    uid
  } = props;
  const Gameid = props.match.params.id;

  const isFetchingUser = Users === undefined;
  const currentUser = isFetchingUser ? null : Users[uid];

  const isFetching = Games === undefined || Games[Gameid] === undefined;
  const displayName = currentUser.displayName;

  const game = isFetching ? null : Games[Gameid];
  const blueScore = isFetching ? 0 : game.BlueCardsLeft;
  const redScore = isFetching ? 0 : game.RedCardsLeft;
  const GameOver = isFetching ? false : game.GameOver;
  const GameResult = isFetching ? "" : game.GameResult;
  const GameMade = isFetching ? false : game.GuessMade;
  let hintCount = isFetching ? 0 : game.HintCount;

  const allPlayers = isFetching ? [] : Object.values(game.UsersInRoom);
  const allPlayersIds = isFetching ? [] : Object.keys(game.UsersInRoom);
  const gameStatus = isFetching ? null : game.GameStarted;
  const teamColor = isFetching ? null : game.UsersInRoom[uid]?.Team;
  const spyMaster = isFetching ? null : game.UsersInRoom[uid]?.isSpyMaster;

  const FirestoreDeck = isFetching ? [] : game.CardsOnTable;

  const [spyDeck, setSpyDeck] = useState([]);
  const [spyMasterDeck, setSpyMasterDeck] = useState([]);

  const cardPick = deck => {
    return (cardPicked, currentTeam) => {
      const rightCard = currentTeam;
      const wrongCard = currentTeam === "red" ? "blue" : "red";
      const neutralCard = "white";
      const fatalCard = "black";
      let outcome;
      switch (deck[cardPicked].color) {
        case rightCard:
          outcome = {
            outcome: "good",
            image: getResultImage(rightCard)
          };
          if ((blueScore === 1 & currentTeam) || (redScore === 1 & currentTeam)) {
            updateWinLossRecord(rightCard);
            setTimeout(() => {
              victory(Gameid, rightCard);
            }, 3000);
            flipCard(deck, cardPicked, outcome);
            return;
          }
          changeCardsLeft(rightCard, Gameid, game);
          ChangeHintCount(Gameid, game);
          flipCard(deck, cardPicked, outcome);
          if (hintCount === 0) {
            Endturn(Gameid, turnTracker.nextTurn(game.CurrentTurn));
          }
          break;
        case neutralCard:
          outcome = {
            outcome: "neutral",
            image: getResultImage(neutralCard)
          };
          Endturn(Gameid, turnTracker.nextTurn(game.CurrentTurn));
          flipCard(deck, cardPicked, outcome);
          break;
        case wrongCard:
          outcome = {
            outcome: "bad",
            image: getResultImage(wrongCard)
          };
          if (blueScore === 1 || redScore === 1) {
            updateWinLossRecord(wrongCard);
            setTimeout(() => {
              victory(Gameid, wrongCard);
            }, 3000);
            flipCard(deck, cardPicked, outcome);
            return;
          }
          changeCardsLeft(wrongCard, Gameid, game);
          Endturn(Gameid, turnTracker.nextTurn(game.CurrentTurn));
          flipCard(deck, cardPicked, outcome);
          break;
        case fatalCard:
          outcome = {
            outcome: "fatal",
            image: getResultImage(fatalCard)
          };
          updateWinLossRecord(wrongCard);
          setTimeout(() => {
            Assassin(Gameid, currentTeam);
          }, 3000);
          flipCard(deck, cardPicked, outcome);
          break;
        default:
          console.error(
            `Invalid input cardPicked: ${cardPicked}, currentTeam: ${currentTeam}, deck: `,
            deck
          );
      }
      return outcome;
    };
  };

  const updateWinLossRecord = winner => {
    for (let i = 0; i < allPlayersIds.length; i++) {
      if (game.UsersInRoom[allPlayersIds[i]].Team === winner) {
        UpdateWin(allPlayersIds[i], Users);
      } else {
        UpdateLoss(allPlayersIds[i], Users);
      }
    }
  };

  const flipCard = (deck, cardPicked, outcome) => {
    const deckCopy = [...deck];
    const cardCopy = Object.assign({}, deckCopy[cardPicked]);
    cardCopy.flipped = true;
    cardCopy.image = outcome.image;
    deckCopy[cardPicked] = cardCopy;
    decksync(deckCopy, Gameid);
  };

  const dealDeck = (deck, Gameid) => {
    return () => {
      decksync(deck, Gameid);
    };
  };

  useEffect(() => {
    dealSpyAndSpymasterDecks();
  }, [FirestoreDeck]);

  const dealSpyAndSpymasterDecks = (gameDeck = FirestoreDeck) => {
    const deck = gameDeck ? gameDeck : [];
    const spy = deck.map(({ word, flipped, image }) => ({
      word,
      flipped,
      image
    }));

    setSpyMasterDeck(deck);
    setSpyDeck(spy);
  };

  return (
    <>
      {spyMaster ? (
        <PlayerGameBoard
          gameId={Gameid}
          Games={Games}
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
          GameMade={GameMade}
          dealCards={dealDeck(dealCards(), Gameid)}
          dealSpyAndSpymasterDecks={dealSpyAndSpymasterDecks}
        />
      ) : (
          <PlayerGameBoard
            gameId={Gameid}
            Games={Games}
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
            GameMade={GameMade}
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
    // User: state.firebase.auth,
    Users: state.firestore.data.Users,
    uid: state.firebase.auth.uid
  };
};

const mapDispatchToProps = dispatch => {
  return {
    decksync: (deck, Gameid) => dispatch(syncPlayerDecks(deck, Gameid)),
    changeCardsLeft: (currentTeam, id, game) =>
      dispatch(changeCardsLeft(currentTeam, id, game)),
    Endturn: (id, turnString) => dispatch(Endturn(id, turnString)),
    Assassin: (id, result) => dispatch(Assassin(id, result)),
    ChangeHintCount: (id, game) => dispatch(ChangeHintCount(id, game)),
    victory: (id, team) => dispatch(victory(id, team)),
    UpdateWin: (uid, user) => dispatch(updateWinRecord(uid, user)),
    UpdateLoss: (uid, user) => dispatch(updateLossRecord(uid, user))
  };
};

export default compose(
  firestoreConnect((props) => {
    // console.log('props in firestoreconnect-----', props)
    // console.log('props.matchparamsid in firestoreconnect-----', props.match.params.id)
    return ([
      {
        collection: "Games",
        doc: `${props.match.params.id}`
      },
      {
        collection: "Users"
      }
    ])
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(GameLogic);
