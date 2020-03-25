import {google} from "../fireStore"

/// Thunk
// Signs user up
export const createOrLoginProfile = (name,email,password) => async (dispatch, getState, {getFirebase, getFirestore}) => {
  try {
    const firebase = getFirebase()
    const providers = await firebase.auth().fetchSignInMethodsForEmail(email)
    // create user
    if(providers.length === 0){
        const {user} = await firebase.auth().createUserWithEmailAndPassword(email, password)
        await user.updateProfile({
        displayName:name
      })

      const firestore = getFirestore()
      firestore.collection("Users").doc(user.uid).set({
        Win:0,
        Loss:0
      })
    }
    // sign user in
    else{
      firebase.auth().signInWithEmailAndPassword(email, password)
    }
  }
    catch (error) {
    console.error(error);
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
        await firestore.collection("Games").doc(gameId).set({
        UsersInRoom: {...game.UsersInRoom,
          [User.uid]:{
            Team: color,
            isSpyMaster: false
          }
        }
      },{merge: true})
    }
  }
  catch (error) {
    console.error(error);
  }
}

export const selectMaster = (color,gameId,game,User) => async (dispatch, getState, {getFirebase,getFirestore}) => {
  try {
    const firestore = getFirestore()
    await firestore.collection("Games").doc(gameId).set({
      UsersInRoom: {...game.UsersInRoom,
        [User.uid]:{
          isSpyMaster: true
        }
      }
    },{merge: true})
    }
  catch (error) {
    console.error(error);
  }
}
