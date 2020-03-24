/* eslint-disable no-unused-vars */
import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom"    /* Delete after demo Demonstration */
import ChooseGameRoom from "../ChooseGameRoom"

//testing firestoreConnect
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

 // const [currentUser, setCurrentUser] = useState({})
  // const [currentRecord, setCurrentRecord] = useState({})

  // useEffect(() => {
  //   setCurrentUser(props.AllUser[0])
  //   setCurrentRecord(props.SignInUser)

  // },[props.AllUser,props.SignInUser]);

const UserProfile = (props) => {

  const isFetching = !Array.isArray(props.AllUser)
  console.log("Fetch", isFetching)
  const authUser = isFetching ? null : props.SignInUser
  const currentUser = isFetching ? null : props.AllUser[0]

    return (
      <div>
        {isFetching ? (<div>Still Loading</div>) : (
        <div className="User">
      <div className="User-container">
        <p>
          Player Name: {authUser.displayName}
        </p>
        <p>
          Player Email:{authUser.email}
        </p>
        <p>
          Game Record: {currentUser.Win} : {currentUser.Loss}
        </p>
        <button>
          <Link to={`/profile/${authUser.displayName}`}>Edit Profile information</Link>
        </button>
      </div>
    </div>)}
      </div>
    )
  }

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
