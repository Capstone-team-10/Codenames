import { google } from "../fireStore";

/// Thunk
// Signs user up
export const createProfile = (name, email, password) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const firebase = getFirebase();

    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    // await user.updateProfile({
    //   displayName: name
    // });

    const firestore = getFirestore();
    await firestore
      .collection("Users")
      .doc(user.uid)
      .set({
        displayName: name,
        Win: 0,
        Loss: 0
      });
  } catch (error) {
    return error.message;
  }
};

export const LoginProfile = (email, password) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const firebase = getFirebase();

    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    return error.message;
  }
};

// Signs Google User
export const googleProfile = () => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const firebase = getFirebase();
    const { user } = await firebase.auth().signInWithPopup(google);
    const name = await firebase.auth().currentUser.displayName;

    const firestore = getFirestore();
    await firestore
      .collection("Users")
      .doc(user.uid)
      .set({
        displayName: name,
        Win: 0,
        Loss: 0
      });
  } catch (error) {
    return error.message;
  }
};
/// Log Out User
export const logout = () => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const firebase = getFirebase();
    await firebase.auth().signOut();
  } catch (error) {
    return error.message;
  }
};

export const selectAgency = (color, gameId, game, uid) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const user = game.UsersInRoom[uid];
    const firestore = getFirestore();
    if (user.Team === color || (user.isSpyMaster && user.Team !== color)) {
      await firestore
        .collection("Games")
        .doc(gameId)
        .set({
          UsersInRoom: {
            ...game.UsersInRoom,
            [uid]: {
              Team: color,
              isSpyMaster: false
            }
          }
        }, { merge: true });
    }
  } catch (error) {
    return error.message;
  }
};

export const selectMaster = (color, gameId, game, uid) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const firestore = getFirestore();
    await firestore
      .collection("Games")
      .doc(gameId)
      .set({
        UsersInRoom: {
          ...game.UsersInRoom,
          [uid]: {
            Team: color,
            isSpyMaster: true
          }
        }
      }, { merge: true });
  } catch (error) {
    return error.message;
  }
};

export const updateWinRecord = (userId, user) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const firestore = getFirestore();
    await firestore
      .collection("Users")
      .doc(userId)
      .set(
        {
          Win: user.Win + 1
        },
        { merge: true }
      );
  } catch (error) {
    return error.message;
  }
};

export const updateLossRecord = (userId, user) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const firestore = getFirestore();
    await firestore
      .collection("Users")
      .doc(userId)
      .set(
        {
          Loss: user.Loss + 1
        },
        { merge: true }
      );
  } catch (error) {
    return error.message;
  }
};
