
/// Thunk
// Create a replay Thunk that just changes Game OVer status back to false
// Redirect from title page to Userprofile if loggedin

//Create Start Thunk Game
export const joinGame = (id,game,user) => async (dispatch, getState, {getFirebase,getFirestore}) => {
  try {
    const firestore = getFirestore()
    await firestore.collection("Games").doc(id).set({
      UsersInRoom: {...game.UsersInRoom,
        [user.uid]:{
          DisplayName:user.displayName,
          Team: "",
          isSpyMaster: false
        }
      }
    },{merge: true})
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


// Add conditional, if you are spymaster and want to leave game, dispatch to EndGame Thunk
export const leaveGame = (id,game,user) => async (dispatch, getState, {getFirebase,getFirestore}) => {
  try {
    console.log("Users In room before", game.UsersInRoom)
    const copy = Object.assign({},game.UsersInRoom);
    delete copy[user.uid]

     const firestore = getFirestore()
    await firestore.collection("Games").doc(id).update({
      UsersInRoom: {...copy
        }
      })
      if (Object.keys(copy).length === 0){
        dispatch(deleteGame(id))
      }
  }
  catch (error) {
    console.error(error)
  }
};

export const deleteGame = (id) => async (dispatch, getState, {getFirebase,getFirestore}) => {
  try {
    const firestore = getFirestore()
    await firestore.collection("Games").doc(id).delete()
  }
  catch (error) {
    console.error(error)
  }
};

export const ReplayGame = (id,game,user) => async (dispatch, getState, {getFirebase,getFirestore}) => {
  try {
    const firestore = getFirestore()
    await firestore.collection("Games").doc(id).set({
      GameOver: false
    })
    dispatch(joinGame(id,game,user))
  }
  catch (error) {
    console.error(error)
  }
};

export const GameOver = (id,result) => async (dispatch, getState, {getFirebase,getFirestore}) => {
  try {
    const firestore = getFirestore()
    await firestore.collection("Games").doc(id).set({
      GameOver: true,
      GameResult: result
    })
  }
  catch (error) {
    console.error(error)
  }
};

export const StartGame = (id) => async (dispatch, getState, {getFirebase,getFirestore}) => {
  try {
    const firestore = getFirestore()
    await firestore.collection("Games").doc(id).set({
      GameStarted: true,
      BlueCardsLeft:9,
      RedCardsLeft:9,
      HintCount:0,
      HintWord:"",
      CurrentTurn: "",
      CardPickedResult:"",
      CardsOnTable: [],
      Chat:[]
    },{merge: true})
  }
  catch (error) {
    console.error(error)
  }
};

