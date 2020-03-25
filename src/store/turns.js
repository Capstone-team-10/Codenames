
/// Thunk
export const joinGame = (id,game,user) => async (dispatch, getState, {getFirebase,getFirestore}) => {
  try {
    console.log("Users In room", game.UsersInRoom)
    const firestore = getFirestore()
    await firestore.collection("Games").doc(id).update({
      UsersInRoom: {...game.UsersInRoom,
        [user.uid]:{
          DisplayName:user.displayName,
          Team: "",
          isSpyMaster: false
        }
      }
    })
  }
  catch (error) {
    console.error(error)
  }
};

export const newGame = (history,user) => async (dispatch, getState, {getFirebase,getFirestore}) => {
  try {
    const firestore = getFirestore()
    const {id} = await firestore.collection("Games").add({
     GameStarted: false,
     UsersInRoom: {
      [user.uid]:{
        DisplayName:user.displayName,
        Team: "",
        isSpyMaster: false
      }
    }
   })
   history.push(`/play/${id}`)

  }
  catch (error) {
    console.error(error)
  }
};

export const leaveGame = (id,game,user) => async (dispatch, getState, {getFirebase,getFirestore}) => {
  try {
    console.log("Users In room before", game.UsersInRoom)
    console.log("Specific User", game.UsersInRoom[user.uid])
    console.log(typeof user.uid)
    //  const firestore = getFirestore()
    //  const firebase = getFirebase()

  }
  catch (error) {
    console.error(error)
  }
};
