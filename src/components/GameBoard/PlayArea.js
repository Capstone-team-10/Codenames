import React, { useEffect } from "react";
import PlayerCard from "./PlayerCard";
import EndGameScreen from "../EndGameScreen";
let GameOver = false;

const PlayArea = ({
  deck,
  playersPick,
  setPickResult,
  spyMaster,
  gameId,
  dealSpyAndSpymasterDecks
}) => {
  // console.log("In PlayArea deck is: ", deck);
  console.log("Play Area ID", gameId);

  useEffect(() => {
    console.log("In PlayArea the deck is: ", deck);
    dealSpyAndSpymasterDecks();
  });
  return (
    <>
      {GameOver ? (
        <EndGameScreen gameId={gameId} />
      ) : (
        <div className="playArea-container">
          <div className="cards-wrapper">
            {deck.map((card, index) => (
              <PlayerCard
                card={card}
                index={index}
                key={card.word}
                playersPick={playersPick}
                setPickResult={setPickResult}
                spyMaster={spyMaster}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PlayArea;
