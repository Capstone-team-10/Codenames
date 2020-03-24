import React, { Component } from "react";
import { Link } from "react-router-dom"; /* Delete after demo Demonstration */
import "../css/JoinGameLobby.css";

//adding firestoreConnect
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'


const JoinGameLobby = (props) => {

  const isFetching = !Array.isArray(props.Games)
  const games = isFetching ? null : props.Games

  return (
    <div>
      {isFetching ? (<div>Still Loading</div>) : (
        <div className="JoinGameLobby-container">
          <h2>Click a Game to Join!</h2>
          <div className="JoinGame-container">
            {games.length ? (
              games.filter(game => !game.GameStarted).map(game => (
                <button key={game.id} className="title-button">
                  {/* Make as Link to Game Component */}
                  {game.id}
                </button>
              ))
            ) : (
                <h2> There are currently no open games to join</h2>
              )}
          </div>
          <button className="title-button">
            {/* Delete after demo Demonstration */}
            <Link to="/GameOver">Fake Room - Link to End Game screen</Link>
          </button>
        </div>
      )}
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    Games: state.firestore.ordered.Games
  }
}

export default compose(
  firestoreConnect([
    {
      collection: "Games"
    }
  ]),
  connect(mapStateToProps)
)(JoinGameLobby)
