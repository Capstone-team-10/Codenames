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
    if (!spyMaster && !flipped) {
      playersPick(pick, teamColor);
    }
  };

  useEffect(() => {
    if (card.flipped === true) {
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
