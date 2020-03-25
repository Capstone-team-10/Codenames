import React, { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import {leaveGame} from "../../store/turns"
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

const GameLobby = (props) => {
  const {allPlayers,history, gameId,leaveGame,User,Games} = props
  const [agency, setAgency] = useState("");
  const [isSpyMaster, setIsSpyMaster] = useState(false);

  const isFetching = Games !== undefined
  const game = isFetching ? Games[gameId] : null

  const LeaveGame = () =>{
    leaveGame(gameId,game,User)
    history.push("/userProfile")
  }

  const [spyMasters, setSpyMasters] = useState({
    red: "",
    blue: ""
  });

  const { addToast } = useToasts();

  useEffect(() => {
    // <code here runs every time agency is changed>
  },[agency]);

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
//Choosing SpyMaster
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
/// Choosing Sides
  const selectAgencyHandler = selectedAgency => {
    console.log(`Player chose the ${selectedAgency} agency`);
    setAgency(selectedAgency);
  };

  const readyHandler = () => {
    console.log("ready to start clicked");
  };

  return (
    <div className="gameLobby-container">
      <p className="lobby-header-text">Choose your Side</p>
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
      <button
        onClick={readyHandler}
        className="ready-btn btn  waves-effect waves-dark teal darken-4"
      >
        ready to start
      </button>
      <button
        onClick={LeaveGame}
        className="ready-btn btn  waves-effect waves-dark teal darken-4"
      >
        Leave Game
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    Games: state.firestore.data.Games,
    User: state.firebase.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    leaveGame: (id,game,user) => dispatch(leaveGame(id,game,user))
  }
}

export default compose(
  firestoreConnect([
    {
      collection: "Games"
    }
  ]),
  connect(mapStateToProps,mapDispatchToProps)
)(GameLobby)
