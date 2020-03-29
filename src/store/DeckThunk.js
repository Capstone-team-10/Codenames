/// Thunk
export const syncPlayerDecks = (deck, id) => async (
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
        CardsOnTable: deck
      });
  } catch (error) {
    return error.message;
  }
};

export const changeCardsLeft = (card, id, game) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const firestore = getFirestore();
    if (card === "red") {
      await firestore
        .collection("Games")
        .doc(id)
        .update({
          RedCardsLeft: game.RedCardsLeft - 1
        });
    } else {
      await firestore
        .collection("Games")
        .doc(id)
        .update({
          BlueCardsLeft: game.BlueCardsLeft - 1
        });
    }
  } catch (error) {
    console.error(error);
    return error.message;
  }
};
