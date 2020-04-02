/* eslint-disable no-unused-vars */
import React from "react";

//testing firestoreConnect
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const UserProfile = props => {
  const { AllUser, uid } = props;

  const isFetching = AllUser === undefined;
  // const authUser = isFetching ? null : SignInUser;
  const currentUser = isFetching ? null : AllUser[uid];

  return (
    <div>
      {currentUser ? (
        <div className="User">
          <div className="User-container">
            <h1> Welcome,</h1>
            <h1>{currentUser.displayName}</h1>
            <h3> Below is your current information</h3>
            <p className="player-record-text">
              Player Name: {currentUser.displayName}
            </p>
            <p className="player-record-text">
              Game Record: {currentUser.Win} wins : {currentUser.Loss} losses
            </p>
          </div>
        </div>
      ) : (
        <div>Still Loading</div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    AllUser: state.firestore.data.Users,
    // SignInUser: state.firebase.auth,
    uid: state.firebase.auth.uid
  };
};

export default compose(
  firestoreConnect([
    {
      collection: "Users"
    }
  ]),
  connect(mapStateToProps)
)(UserProfile);
