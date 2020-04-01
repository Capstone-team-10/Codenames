import React from "react";
import "../css/JoinGameLobby.css";

//adding firestoreConnect
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

import { joinGame } from "../store/GameThunks"
import { useToasts } from "react-toast-notifications";


const JoinGameLobby = (props) => {
  const { joingGame, Games, AllUser, uid } = props;

  const isFetchingUser = AllUser === undefined;
  const currentUser = isFetchingUser ? null : AllUser[uid];

  const { addToast } = useToasts()
  const isFetching = !Array.isArray(Games)
  const games = isFetching ? null : Games

  const enterGame = async (id, game) => {
    try {
      const err = await props.joinGame(id, game, currentUser, uid)
      if (err === undefined) {
        props.history.push(`/play/${id}`)
      }
      else {
        addToast("Sorry, there was a network error", {
          appearance: "warning",
          autoDismiss: true
        });
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      {isFetching ? (<div>Still Loading</div>) : (
        <div className="JoinGameLobby-container">
          <h2>Click a Game to Join!</h2>
          <div className="JoinGame-container">
            {games.length ? (
              games.filter(game => !game.GameStarted).map(game => (
                <button key={game.id} className="title-button" onClick={() => enterGame(game.id, game)}>
                  {game.id}
                </button>
              ))
            ) : (
                <h2> There are currently no open games to join</h2>
              )}
          </div>
        </div>
      )}
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    Games: state.firestore.ordered.Games,
    AllUser: state.firestore.data.Users,
    uid: state.firebase.auth.uid,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    joinGame: (id, game, user, uid) => dispatch(joinGame(id, game, user, uid))
  }
}

export default compose(
  firestoreConnect([
    {
      collection: "Games"
    }
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(JoinGameLobby)
