export const SetHintWordAndCount = (id, Word, Count) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    console.log("We are in the SetHintWordAndCount Thunk", id, Word, Count);
    const firestore = getFirestore();
    await firestore
      .collection("Games")
      .doc(id)
      .set(
        {
          HintCount: Count,
          HintWord: Word
        },
        { merge: true }
      );
  } catch (error) {
    return error.message;
  }
};

export const ChangeHintCount = (id, game) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    console.log("We are in the ChangeHintCount Thunk");
    const firestore = getFirestore();
    await firestore
      .collection("Games")
      .doc(id)
      .set(
        {
          HintCount: game.HintCount - 1
        },
        { merge: true }
      );
  } catch (error) {
    return error.message;
  }
};
