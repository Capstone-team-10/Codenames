import React, { useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import { isItYourTurn, getResultImage } from "../../utils";

const PlayerCard = ({
  card,
  index,
  playersPick,
  image,
  spyMaster,
  teamColor,
  currentTurn
}) => {
  const { addToast } = useToasts();

  const handleClick = evt => {
    if (!isItYourTurn(currentTurn, teamColor, spyMaster)) {
      addToast(`Wait for your turn!`, {
        appearance: "warning",
        autoDismiss: true
      });
      return;
    }
    const pick = evt.currentTarget.id;
    console.log("The current card picked is: ", pick);
    if (!spyMaster && !flipped) {
      playersPick(pick, teamColor);
      // const cardImgElem = document.getElementById(`${pick}img`);
      // cardImgElem.src = `${process.env.PUBLIC_URL}${result.image}`;
      // setPickResult(result.outcome);
      // evt.currentTarget.classList.toggle("flip-card");
      //add for production
      // const cardToFlipElem = document.getElementById(`${index}`);
      // cardToFlipElem.classList.add("flip-card");
      // console.log("The result is ", result);
    }
  };

  useEffect(() => {
    console.log("----card image is: ", image);
    if (card.flipped === true) {
      console.log("in useEffect updating card img and class");
      const cardImgElem = document.getElementById(`${index}img`);
      const cardToFlipElem = document.getElementById(`${index}`);
      cardImgElem.src = `${process.env.PUBLIC_URL}${card.image}`;
      cardToFlipElem.classList.add("flip-card");
    }
  }, [image]);

  const { word, flipped } = card;
  return (
    <div className="cardContainer">
      <div
        className="card-inner"
        id={index}
        onClick={spyMaster ? null : handleClick}
      >
        <div
          className={`card-front ${
            spyMaster ? `card-color-${card.color}` : ""
          }`}
        >
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
