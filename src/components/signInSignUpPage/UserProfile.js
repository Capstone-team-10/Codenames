/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom"    /* Delete after demo Demonstration */
import ChooseGameRoom from "../ChooseGameRoom"

//testing firestoreConnect
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

const User = {
  name: "Poppy",
  Email: "test@test.com",
  Win: 70,
  Loss: 0
}

const UserProfile = () => {
  // const {User} = this.props
  // const firstUser = User[0]
  return (
    <div className="User">
      <div className="User-container">
        <p>
          Player Name: {User.name}
        </p>
        <p>
          Player Email:{User.email}
        </p>
        <p>
          Game Record: {User.Win} : {User.Loss}
        </p>
        <button>
          <Link to={`/profile/${User.name}`}>Edit Profile information</Link>
        </button>
      </div>
    </div>
  )
};

const mapStateToProps = (state) => {
  console.log("fire", state.firestore);
  return {
    User: state.firestore.ordered.users
  }
}

// export default connect(mapStateToProps)(UserProfile)

export default compose(
  firestoreConnect([
    { collection: "Users"
   }
  ]),
  connect(mapStateToProps)
)(UserProfile)


// export default compose(
//   firestoreConnect([
//     { collection: "Users",
//     doc:"1XJoOFMuUSUPLXLjoV1f"
//    }
//   ]),
//   connect(mapStateToProps)
// )(UserProfile)
//when this componenet first laods or whenever firestore data is changed, this will induce the firestore reducer (in index) to sync the store state with that collection, it will trigger the firestore reducer will update the state to that change
