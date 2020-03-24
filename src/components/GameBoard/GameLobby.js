import React, { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";

const GameLobby = ({ allPlayers }) => {
  const [agency, setAgency] = useState("");
  const [isSpyMaster, setIsSpyMaster] = useState(false);

  const [spyMasters, setSpyMasters] = useState({
    red: "",
    blue: ""
  });

  const { addToast } = useToasts();

  useEffect(() => {
    console.log(allPlayers);
    const spyMasterSelected = allPlayers.reduce(
      (acc, player) => {
        if (player.spyMaster) {
          acc[player.team] = player.displayName;
        }
        return acc;
      },
      { red: "", blue: "" }
    );
    console.log(spyMasterSelected);
    setSpyMasters(spyMasterSelected);
  }, [allPlayers]);

  const spyMasterHandler = agency => {
    if (spyMasters[agency] === "") {
      setIsSpyMaster(true);
      selectAgencyHandler(agency);
    } else {
      console.log(`${agency} Spy Master already chosen`);
      addToast(`${spyMasters.blue} is already ${agency}'s Spy Master`, {
        appearance: "warning",
        autoDismiss: true
      });
    }
  };

  const selectAgencyHandler = selectedAgency => {
    console.log(`Player chose the ${selectedAgency} agency`);
    setAgency(selectedAgency);
  };

  return (
    <div className="gameLobby-container">
      <div className="team-select-wrapper">
        <div className="blue-team-wrapper">
          <div
            onClick={() => spyMasterHandler("blue")}
            className="spyMaster-check-wrapper"
          >
            {spyMasters.blue === "" ? (
              <p className="blue-spyMaster-text"> Click to be Spy Master</p>
            ) : (
              <p className="blue-spyMaster-text blue-spyMaster-selected">{`Spy Master is ${spyMasters.blue}`}</p>
            )}
          </div>
          <img
            onClick={() => selectAgencyHandler("blue")}
            className="agent-image-blue"
            src={process.env.PUBLIC_URL + "/images/agent-blue-1.png"}
            alt="blue agent male"
          />
          <img
            onClick={() => selectAgencyHandler("blue")}
            className="agent-image-blue deep-cover-agent"
            src={process.env.PUBLIC_URL + "/images/agent-blue-2.png"}
            alt="blue agent female"
          />
        </div>
        <div className="red-team-wrapper">
          <div
            onClick={() => spyMasterHandler("red")}
            className="spyMaster-check-wrapper"
          >
            {spyMasters.red === "" ? (
              <p className="red-spyMaster-text"> Click to be Spy Master</p>
            ) : (
              <p className="red-spyMaster-text red-spyMaster-selected">{`Spy Master is ${spyMasters.red}`}</p>
            )}
          </div>
          <img
            onClick={() => selectAgencyHandler("red")}
            className="agent-image-red deep-cover-agent"
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
