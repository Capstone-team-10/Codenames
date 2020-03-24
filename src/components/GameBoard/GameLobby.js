import React, { useState, useEffect } from "react";

const GameLobby = ({ allPlayers }) => {
  const [agency, setAgency] = useState("");

  const [spyMasters, setSpyMasters] = useState({
    red: false,
    blue: false
  });

  useEffect(() => {
    const spyMasterSelected = allPlayers.reduce(
      (acc, player) => {
        if (player.spyMaster) {
          acc[player.team] = true;
        }
        return acc;
      },
      { red: false, blue: false }
    );
    setSpyMasters(spyMasterSelected);
  }, [allPlayers]);

  const spyMasterAvailable = agency => {
    console.log(`${agency}-spyMaster-text`);
    if (!spyMasters[agency]) {
      document
        .getElementById(`${agency}-spyMaster-text`)
        .classList.toggle("spyMaster-default");
    }
  };

  const selectAgencyHandler = selectedAgency => {
    console.log(`Player chose the ${selectedAgency} agency`);
    setAgency(selectedAgency);
    spyMasterAvailable(selectedAgency);
  };

  return (
    <div className="gameLobby-container">
      <div className="team-select-wrapper">
        <div className="blue-team-wrapper">
          <div className="spyMaster-check">
            <p
              id="blue-spyMaster-text"
              className="blue-spyMaster-text spyMaster-default"
            >
              {`${spyMasters.blue ? "Be Spy Master?" : "Spy Master Chosen"}`}
            </p>
          </div>
          <img
            onClick={() => selectAgencyHandler("blue")}
            className="agent-image-blue"
            src={process.env.PUBLIC_URL + "/images/agent-blue-1.png"}
            alt="blue agent male"
          />
          <img
            onClick={() => selectAgencyHandler("blue")}
            className="agent-image-blue"
            src={process.env.PUBLIC_URL + "/images/agent-blue-2.png"}
            alt="blue agent female"
          />
        </div>
        <div className="red-team-wrapper">
          <div className="spyMaster-check">
            <p
              id="red-spyMaster-text"
              className="red-spyMaster-text spyMaster-default"
            >
              {`${spyMasters.red ? "Be Spy Master?" : "Spy Master Chosen"}`}
            </p>
          </div>
          <img
            onClick={() => selectAgencyHandler("red")}
            className="agent-image-red"
            src={process.env.PUBLIC_URL + "/images/agent-red-1.jpeg"}
            alt="red agent male"
          />
          <img
            onClick={() => selectAgencyHandler("red")}
            className="agent-image-red"
            src={process.env.PUBLIC_URL + "/images/agent-red-2.png"}
            alt="red agent female"
          />
        </div>
      </div>
    </div>
  );
};

export default GameLobby;
