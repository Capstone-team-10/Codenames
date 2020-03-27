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
