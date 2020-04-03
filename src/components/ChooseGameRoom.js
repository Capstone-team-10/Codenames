import React from "react";
import "../css/ChooseGameRoom.css";
import "../css/Title.css";
import { newGame } from "../store/GameThunks";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { useToasts } from "react-toast-notifications";

const ChooseGameRoom = props => {
  const { history, AllUser, uid, newGame } = props;
  const { addToast } = useToasts();

  const isFetching = AllUser === undefined;
  const currentUser = isFetching ? null : AllUser[uid];

  const handleJoinGame = () => {
    history.push("/JoinGame");
  };

  const newGameRoom = async () => {
    try {
      const err = await newGame(history, currentUser, uid);
      if (err !== undefined) {
        addToast("Sorry, we can't create a new Game right now", {
          appearance: "warning",
          autoDismiss: true
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="ChooseGame-container">
      <button className="title-button waves-effect" onClick={newGameRoom}>
        New Game
      </button>
      <button onClick={handleJoinGame} className="title-button waves-effect">
        Join Game
      </button>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    AllUser: state.firestore.data.Users,
    uid: state.firebase.auth.uid
  };
};

const mapDispatchToProps = dispatch => {
  return {
    newGame: (history, user, uid) => dispatch(newGame(history, user, uid))
  };
};

export default compose(
  firestoreConnect([
    {
      collection: "Users"
    }
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(ChooseGameRoom);
