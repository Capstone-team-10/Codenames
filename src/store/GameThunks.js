export const joinGame = (id, game, user) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  console.log(`id: ${id}, game: ${game}`);
  try {
    const copy = Object.assign({}, game.UsersInRoom);
    const firestore = getFirestore();
    console.log("User In Game", copy[user.uid]);
    if (copy[user.uid] === undefined) {
      await firestore
        .collection("Games")
        .doc(id)
        .set({
          UsersInRoom: {
            ...game.UsersInRoom,
            [user.uid]: {
              DisplayName: user.displayName,
              Team: "",
              isSpyMaster: false
            }
          }
        });
    }
  } catch (error) {
    return error.message
  }
};

export const newGame = (history, user) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const firestore = getFirestore();
    const { id } = await firestore.collection("Games").add({
      Chat: [],
      GameStarted: false,
      UsersInRoom: {
        [user.uid]: {
          DisplayName: user.displayName,
          Team: "",
          isSpyMaster: false
        }
      }
    });
    history.push(`/play/${id}`);
  } catch (error) {
    return error.message
  }
};

export const StartGame = id => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const firestore = getFirestore();
    await firestore
      .collection("Games")
      .doc(id)
      .set(
        {
          GameStarted: true,
          GameOver: false,
          BlueCardsLeft: 9,
          RedCardsLeft: 9,
          HintCount: 0,
          HintWord: "",
          CurrentTurn: "",
          CardPickedResult: "",
          CardsOnTable: [],
          Chat: []
        },
        { merge: true }
      );
  } catch (error) {
    return error.message
  }
};

// Add conditional, if you are spymaster and want to leave game, dispatch to EndGame Thunk
export const leaveGame = (id, game, user) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const copy = Object.assign({}, game.UsersInRoom);
    delete copy[user.uid];

    const firestore = getFirestore();
    await firestore
      .collection("Games")
      .doc(id)
      .update({
        UsersInRoom: { ...copy }
      });
    if (Object.keys(copy).length === 0) {
      dispatch(deleteGame(id));
    }
  } catch (error) {
    return error
  }
};

export const deleteGame = id => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const firestore = getFirestore();
    await firestore
      .collection("Games")
      .doc(id)
      .delete();
  } catch (error) {
    return error.message
  }
};

export const ReplayGame = (id, game, user) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const firestore = getFirestore();
    await firestore
      .collection("Games")
      .doc(id)
      .update({
        GameOver: false,
        GameStarted: false
      });
    // dispatch(joinGame(id,game,user))
  } catch (error) {
    return error.message
  }
};

export const GameOver = (id, result) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const firestore = getFirestore();
    await firestore
      .collection("Games")
      .doc(id)
      .set({
        GameOver: true,
        GameResult: result
      });
  } catch (error) {
    return error.message
  }
};

export const SendMessage = (id, game, user, message) => async (dispatch, getState, { getFirebase, getFirestore }) => {
  try {
    const firestore = getFirestore()
    await firestore.collection("Games").doc(id).set({
      Chat: [
        ...game.Chat,
        {
          'sender': [user.displayName],
          'message': message
        }
      ]
    },
      { merge: true }
    )
  } catch (error) {
    return error.message
  }
};

