export const joinGame = (id, game, user) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const copy = Object.assign({}, game.UsersInRoom);
    const firestore = getFirestore();
    if (copy[user.uid] === undefined) {
      await firestore
        .collection("Games")
        .doc(id)
        .set(
          {
            UsersInRoom: {
              ...game.UsersInRoom,
              [user.uid]: {
                DisplayName: user.displayName,
                Team: "",
                isSpyMaster: false
              }
            }
          },
          { merge: true }
        );
    }
  } catch (error) {
    return error.message;
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
    return error.message;
  }
};

export const StartGame = (id, CurrentTurn) => async (
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
          GameResult: "",
          CurrentTurn: CurrentTurn,
          CardPickedResult: "",
          CardsOnTable: []
        },
        { merge: true }
      );
  } catch (error) {
    return error.message;
  }
};

export const Endturn = (id, turnString) => async (
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
        CurrentTurn: turnString
      });
  } catch (error) {
    return error.message;
  }
};

// Add conditional, if you are spymaster and want to leave game, dispatch to EndGame Thunk
export const leaveGame = (id, game, user) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const firestore = getFirestore();

    let updatedGameRoom = await firestore.collection('Games').doc(id).get();
    console.log("Before object assign Copy", updatedGameRoom.data().UsersInRoom)
    const copy = Object.assign({}, updatedGameRoom.data().UsersInRoom);
    console.log("Users in the Game Before Delete", copy);
    delete copy[user.uid];
    console.log("Users in the Game After Delete", copy);

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
    return error;
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
    return error.message;
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
  } catch (error) {
    return error.message;
  }
};

export const Assassin = (id, team) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const result = team === "red" ? "redkilled" : "bluekilled";
  try {
    const firestore = getFirestore();
    await firestore
      .collection("Games")
      .doc(id)
      .set(
        {
          GameOver: true,
          GameResult: result
        },
        { merge: true }
      );
  } catch (error) {
    return error.message;
  }
};

export const victory = (id, team) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const result = team === "red" ? "redwin" : "bluewin";
  try {
    const firestore = getFirestore();
    await firestore
      .collection("Games")
      .doc(id)
      .set(
        {
          GameOver: true,
          GameResult: result
        },
        { merge: true }
      );
  } catch (error) {
    return error.message;
  }
};
