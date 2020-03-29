import React, { useState, useEffect } from "react";
import PlayerCard from "./PlayerCard";
import EndGameScreen from "../EndGameScreen";

const PlayArea = ({
  deck,
  playersPick,
  setPickResult,
  spyMaster,
  gameId,
  teamColor,
  dealSpyAndSpymasterDecks,
  blueScore,
  GameResult,
  redScore,
  GameOver,
  currentTurn
}) => {
  // console.log("In PlayArea deck is: ", deck);
  console.log("Play Area ID", gameId);

  const [firstCard, setFirstCard] = useState(1);

  useEffect(() => {
    console.log("In PlayArea the deck is: ", deck);
    dealSpyAndSpymasterDecks();
    if (!deck.length) {
      setFirstCard(firstCard + 1);
    } else if (typeof firstCard === "number") {
      setFirstCard(deck[0].word);
    } else if (firstCard !== deck[0].word) {
      setFirstCard(deck[0].word);
    }
  }, [firstCard]);

  // useEffect(() => {
  //   console.log("In PlayArea the deck is: ", deck);
  //   dealSpyAndSpymasterDecks();
  // }, [firstCard]);

  // useEffect(() => {
  //   console.log("In playarea useeffect the deck is: ", deck);
  //   if (!deck.length) {
  //     setFirstCard("empty");
  //   } else {
  //     setFirstCard(deck[0].word);
  //   }
  // }, [deck]);

  return (
    <>
      {GameOver ? (
        <EndGameScreen gameId={gameId} GameResult={GameResult} />
      ) : (
        <div className="playArea-container">
          <div className="scoreContainer">
            <p>
              Blue Score: {blueScore} Red Score: {redScore}
            </p>
          </div>

          <div className="cards-wrapper">
            {deck.map((card, index) => (
              <PlayerCard
                teamColor={teamColor}
                card={card}
                image={card.image}
                index={index}
                key={card.word}
                playersPick={playersPick}
                setPickResult={setPickResult}
                spyMaster={spyMaster}
                currentTurn={currentTurn}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PlayArea;
