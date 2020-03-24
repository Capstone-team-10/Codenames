/* eslint-disable no-unused-vars */
import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom"    /* Delete after demo Demonstration */
import ChooseGameRoom from "../ChooseGameRoom"

//testing firestoreConnect
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

const currentUser = {
  name: "Poppy",
  Email: "test@test.com",
  Win: 70,
  Loss: 0
}

const UserProfile = (props) => {
  // const [currentUser, setCurrentUser] = useState({})
  // const [currentRecord, setCurrentRecord] = useState({})

  // useEffect(() => {
  //   setCurrentUser(props.AllUser[0])
  //   setCurrentRecord(props.SignInUser)

  // },[props.AllUser,props.SignInUser]);
  // console.log("Props - AllUsers", props.AllUser)
  //   console.log("Props 2 - SignInUser", props.SignInUser)
  return (
    <div className="User">
      <div className="User-container">
        {currentUser.displayName &&  <p>
          Player Name: {currentUser.displayName}
        </p>}
        <p>
          Player Email:{currentUser.email}
        </p>
        <p>
          Game Record: {currentUser.Win} : {currentUser.Loss}
        </p>
        <button>
          <Link to={`/profile/${currentUser.uid}`}>Edit Profile information</Link>
        </button>
      </div>
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    AllUser: state.firestore.ordered.Users,
    SignInUser: state.firebase.auth
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
