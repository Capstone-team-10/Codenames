import React from "react";

const PlayerCard = ({ card }) => {
  const handleClick = evt => {
    console.log(evt.currentTarget);
    //toggle for testing
    evt.currentTarget.classList.toggle("flip-card");
    //add for production
    // evt.currentTarget.classList.add("flip-card");
  };
  const { word, flipped } = card;
  return (
    <div className="cardContainer">
      <div className="card-inner" onClick={handleClick}>
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
