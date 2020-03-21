import React from "react";

const GameCard = ({ word, flipped }) => {
  return (
    <div key={word}>
      <p>{word}</p>
      <p>{flipped}</p>
    </div>
  );
};

export default GameCard;
