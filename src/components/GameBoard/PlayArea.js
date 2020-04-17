import React, { useState, useEffect } from "react";
import PlayerCard from "./PlayerCard";
import EndGameScreen from "../EndGameScreen";
import Notification from "./Notification";
import { isItYourTurn, turnTranslation } from "../../utils";

const PlayArea = ({
  deck,
  playersPick,
  setPickResult,
  spyMaster,
  gameId,
  Games,
  teamColor,
  dealSpyAndSpymasterDecks,
  blueScore,
  GameResult,
  redScore,
  GameOver,
  currentTurn,
  hintWord,
  uid,
  hintCount
}) => {
  const [firstCard, setFirstCard] = useState(1);
  const [visibility, setVisibility] = useState(false);
  const [message, setMessage] = useState("The game has started");

  useEffect(() => {
    if (hintWord !== " ") {
      setMessage(`The hint is ${hintWord}`);
      setVisibility(true);
    }
  }, [hintWord]);

  useEffect(() => {
    if (hintCount === 0 && isItYourTurn(currentTurn, teamColor, spyMaster)) {
      setMessage("You've earned a free guess");
      setVisibility(true);
    }
  }, [hintCount]);

  useEffect(() => {
    if (isItYourTurn(currentTurn, teamColor, spyMaster)) {
      setMessage("It is your turn");
      setVisibility(true);
    } else {
      setMessage(turnTranslation(currentTurn));
      setVisibility(true);
    }
  }, [currentTurn]);

  useEffect(() => {
    dealSpyAndSpymasterDecks();
    if (!deck.length) {
      setFirstCard(firstCard + 1);
    } else if (typeof firstCard === "number") {
      setFirstCard(deck[0].word);
    } else if (firstCard !== deck[0].word) {
      setFirstCard(deck[0].word);
    }
  }, [firstCard]);

  return (
    <>
      {GameOver ? (
        <EndGameScreen gameId={gameId} GameResult={GameResult} uid={uid} />
      ) : (
        <div className="playArea-container">
          {visibility ? (
            <Notification message={message} setVisibility={setVisibility} />
          ) : null}
          <div className="scoreContainer">
            <p className="score-wrapper">
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
                // key={card.word}
                playersPick={playersPick}
                // setPickResult={setPickResult}
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
