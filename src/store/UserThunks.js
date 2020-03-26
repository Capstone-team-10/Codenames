import {google} from "../fireStore"

/// Thunk
// Signs user up
export const createProfile = (name,email,password) => async (dispatch, getState, {getFirebase, getFirestore}) => {
  try {
    const firebase = getFirebase()

    const {user} = await firebase.auth().createUserWithEmailAndPassword(email, password)

    await user.updateProfile({
        displayName:name
      })

      const firestore = getFirestore()
      await firestore.collection("Users").doc(user.uid).set({
        Win:0,
        Loss:0
      })
  }
    catch (error) {
    return error.message
  }
};

export const LoginProfile = (email,password) => async (dispatch, getState, {getFirebase, getFirestore}) => {
  try {
    const firebase = getFirebase()

    await firebase.auth().signInWithEmailAndPassword(email, password)
  }
    catch (error) {
    return error.message
  }
};

// Signs Google User
export const googleProfile = () => async (dispatch, getState, {getFirebase,getFirestore}) => {
  try {
    const firebase = getFirebase()
    const {user} = await firebase.auth().signInWithPopup(google)

    const firestore = getFirestore()
    await firestore.collection("Users").doc(user.uid).set({
      Win:2000,
      Loss:0
    })
    }
  catch (error) {
    console.error(error)
  }
};
/// Log Out User
export const logout = () => async (dispatch, getState, {getFirebase,getFirestore}) => {
  try {
    const firebase = getFirebase()
    await firebase.auth().signOut()
  }
  catch (error) {
    console.error(error);
  }
}

export const selectAgency = (color,gameId,game,User) => async (dispatch, getState, {getFirebase,getFirestore}) => {
  try {
      const user = game.UsersInRoom[User.uid]
      const firestore = getFirestore()
      if ( !user.isSpyMaster|| (user.isSpyMaster && (user.Team !== color))){
        console.log("Select Agency if Statement")
        await firestore.collection("Games").doc(gameId).update({
        UsersInRoom: {...game.UsersInRoom,
          [User.uid]:{
            DisplayName: User.displayName,
            Team: color,
            isSpyMaster: false
          }
        }
      })
    }
  }
  catch (error) {
    console.error(error);
  }
}

export const selectMaster = (color,gameId,game,User) => async (dispatch, getState, {getFirebase,getFirestore}) => {
  try {
    const firestore = getFirestore()
    await firestore.collection("Games").doc(gameId).update({
      UsersInRoom: {...game.UsersInRoom,
        [User.uid]:{
          DisplayName: User.displayName,
          Team: color,
          isSpyMaster: !User.isSpyMaster
        }
      }
    })
    }
  catch (error) {
    console.error(error);
  }
}
