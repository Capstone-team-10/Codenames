import React from "react";

const PlayerCard = ({ card, index, playersPick, setPickResult, spyMaster }) => {
  const handleClick = evt => {
    const pick = evt.currentTarget.id;
    console.log("The current card picked is: ", pick);
    if (!spyMaster) {
      //toggle for testing
      evt.currentTarget.classList.toggle("flip-card");
      //add for production
      // evt.currentTarget.classList.add("flip-card");
      const result = playersPick(pick, "red");
      console.log("The result is ", result);
      setPickResult(result);
    }
  };
  const { word, flipped } = card;
  return (
    <div className="cardContainer">
      <div className="card-inner" id={index} onClick={handleClick}>
        <div className="card-front">
          <p>{word}</p>
        </div>
        <div className={`card-back ${card.color}`}>
          <p>{word}</p>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
