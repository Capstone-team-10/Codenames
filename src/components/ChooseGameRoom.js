import React from 'react'
import { Link } from 'react-router-dom'
import "../css/ChooseGameRoom.css";
import "../css/Title.css";
import {newGame} from "../store/turns"
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

const ChooseGameRoom = (props)=> {
  const newGameRoom = () =>{
    props.newGame(props.history)
  }

  return (
     <div className="ChooseGame-container">
       <button className="title-button" onClick={newGameRoom}>
          New Game
        </button>
        <button className="title-button">
          <Link to="/JoinGame">
            Join Game
          </Link>
        </button>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    Games: state.firestore.ordered.Games,
    User: state.firebase.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    newGame: (history) => dispatch(newGame(history))
  }
}

export default compose(
  firestoreConnect([
    {
      collection: "Games"
    }
  ]),
  connect(mapStateToProps,mapDispatchToProps)
)(ChooseGameRoom)
