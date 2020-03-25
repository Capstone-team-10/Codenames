import React from "react";

import { getResultImage } from "../../utils";

const PlayerCard = ({ card, index, playersPick, setPickResult, spyMaster }) => {
  const handleClick = evt => {
    const pick = evt.currentTarget.id;
    console.log("The current card picked is: ", pick);
    if (!spyMaster && !flipped) {
      const result = playersPick(pick, "red");
      const cardImgElem = document.getElementById(`${pick}img`);
      cardImgElem.src = `${process.env.PUBLIC_URL}${result.image}`;
      setPickResult(result.outcome);
      evt.currentTarget.classList.toggle("flip-card");
      //add for production
      // evt.currentTarget.classList.add("flip-card");
      console.log("The result is ", result);
    }
  };
  const { word, flipped } = card;
  return (
    <div className="cardContainer">
      <div className="card-inner" id={index} onClick={handleClick}>
        <div className="card-front">
          <p>{word}</p>
        </div>
        <img
          id={`${index}img`}
          src=""
          alt="pick result"
          className="card-back"
        />
      </div>
    </div>
  );
};

export default PlayerCard;
