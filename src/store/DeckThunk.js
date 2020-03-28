import { Endturn, GameOver } from "./GameThunks";
import { ChangeHintCount } from "./HintThunk";

/// Thunk
export const syncPlayerDecks = (deck, id) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    console.log("In Sync Deck Thunk ---> Deck", deck);
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
/// Maybe switch to set

// export const updateDeck = (cardid,id,outcome) => async (
//   dispatch,
//   getState,
//   { getFirebase, getFirestore }
// ) => {
//   try {
//     console.log("In Update Deck Thunk ---> card id", cardid)
//     // const firestore = getFirestore();
//     // await firestore
//     //   .collection("Games")
//     //   .doc(id)
//     //   .update({
//     //     CardsOnTable[id].flipped: true
//     //   });
//   } catch (error) {
//     return error.message
//   }
// };

export const changeCardsLeft = (card, id, game) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    console.log('----card', card, 'id', id, 'game', game);
    console.log("In change Blues Cards Left Thunk ---> ");
    const firestore = getFirestore();
    if (card === "red") {
      await firestore
        .collection("Games")
        .doc(id)
        .update({
          RedCardsLeft: game.RedCardsLeft--
        });
    } else {
      await firestore
        .collection("Games")
        .doc(id)
        .update({
          BlueCardsLeft: game.BlueCardsLeft--
        });
    }
    // switch(outcome){
    // //   case "good":
    // await firestore
    //   .collection("Games")
    //   .doc(id)
    //   .update({
    //     BlueCardsLeft: game.BlueCardsLeft--
    //   });
    //        ///dispatch(ChangeHint(id,game))
    //   break;
    //   case "bad":
    //     await firestore
    //   .collection("Games")
    //   .doc(id)
    //   .update({
    //     RedCardsLeft: game.RedsCardsLeft--
    //   });
    //     ///dispatch(End Turn Thunk(id,thunkString))
    //   break;
    // case "neutral":
    //    ///dispatch(End Turn Thunk(id,thunkString))
    //   break;
    // default:
    //   console.log("Default Change Blue Thunk")
    ///dispatch(Game Over Thunk(id,thunkString))
    // }
  } catch (error) {
    return error.message;
  }
};

export const changeRedCardsLeft = (id, outcome, game, thunkString) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    console.log("In change Red Cards Left Thunk ---> ");
    // const firestore = getFirestore();
    // switch(outcome){
    //   case "good":
    //     await firestore
    //   .collection("Games")
    //   .doc(id)
    //   .update({
    //     RedCardsLeft: game.RedCardsLeft--
    ///dispatch(ChangeHint(id,game))
    //   });
    //   break;
    //   case "bad":
    //     await firestore
    //   .collection("Games")
    //   .doc(id)
    //   .update({
    //     BluesCardsLeft: game.BluesCardsLeft--
    //   });
    //     ///dispatch(End Turn Thunk(id,thunkString)
    //   break;
    // case "neutral":
    //    ///dispatch(End Turn Thunk(id,thunkString)
    //   break;
    // default:
    //   console.log("Default Change Blue Thunk")
    //        ///dispatch(Game Over Thunk(id,thunkString))
    // }
  } catch (error) {
    return error.message;
  }
};
