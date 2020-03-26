import React, { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import { selectAgency, selectMaster } from "../../store/UserThunks";
import { StartGame } from "../../store/GameThunks";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const GameLobby = props => {
  const {
    allPlayers,
    gameId,
    StartGame,
    selectAgency,
    User,
    Games,
    selectMaster
  } = props;
  const [agency, setAgency] = useState("");
  const [isSpyMaster, setIsSpyMaster] = useState(false);

  const isFetching = Games !== undefined;
  const game = isFetching ? Games[gameId] : null;

  const [spyMasters, setSpyMasters] = useState({
    red: "",
    blue: ""
  });

  const { addToast } = useToasts();

  useEffect(() => {
    selectAgency(agency, gameId, game, User);
  }, [agency]);

  ///Determine if spyMaster role is available
  useEffect(() => {
    console.log("AllPlayers", allPlayers);
    const spyMasterSelected = allPlayers.reduce(
      (acc, player) => {
        if (player.spyMaster) {
          acc[player.team] = player.displayName;
        }
        return acc;
      },
      { red: "", blue: "" }
    );
    console.log("who are masters", spyMasterSelected);
    setSpyMasters(spyMasterSelected);
  }, [allPlayers]);

  //Choosing SpyMaster
  const spyMasterHandler = agency => {
    if (spyMasters[agency] === "") {
      setIsSpyMaster(true);
      selectAgencyHandler(agency);
      selectMaster(agency, gameId, game, User);
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

  ///Start the game
  const readyHandler = () => {
    console.log("ready to start clicked");
    StartGame(gameId);
  };

  ///Open Invite friend form
  const inviteHandler = () => {
    console.log("inviteHandler clicked");
  };

  return (
    <>
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
          onClick={inviteHandler}
          className="ready-btn btn  waves-effect waves-dark teal darken-4"
        >
          Invite Friend
        </button>
      </div>
      {/* {InviteFriendFormHere} */}
    </>
  );
};

const mapStateToProps = state => {
  return {
    Games: state.firestore.data.Games,
    User: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    StartGame: id => dispatch(StartGame(id)),
    selectAgency: (color, gameId, game, User) =>
      dispatch(selectAgency(color, gameId, game, User)),
    selectMaster: (color, gameId, game, User) =>
      dispatch(selectMaster(color, gameId, game, User))
  };
};

export default compose(
  firestoreConnect([
    {
      collection: "Games"
    }
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(GameLobby);
