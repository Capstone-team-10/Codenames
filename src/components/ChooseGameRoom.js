import React from 'react'
import { Link } from 'react-router-dom'
import "../css/ChooseGameRoom.css";
import "../css/Title.css";
import {newGame} from "../store/GameThunks"
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { useToasts } from "react-toast-notifications";

const ChooseGameRoom = (props)=> {
  const {addToast} = useToasts()

  const newGameRoom = async () =>{
    try {
      const err = await props.newGame(props.history,props.User)
      if(err !== undefined){
        addToast("Sorry, we can't create a new Game right now", {
          appearance: "warning",
          autoDismiss: true
        });
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
     <div className="ChooseGame-container">
       <button className="title-button" onClick={newGameRoom}>
          New Game
        </button>
        <Link to="/JoinGame">
          <button className="title-button">
            Join Game
          </button>
        </Link>
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
    newGame: (history,user) => dispatch(newGame(history,user))
  }
}

export default compose(
  firestoreConnect([
    {
      collection: "Game"
    }
  ]),
  connect(mapStateToProps,mapDispatchToProps)
)(ChooseGameRoom)
