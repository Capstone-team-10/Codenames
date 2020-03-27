// ///Initial State
// const initialState = {
//   Deck: [],
// };

// ///action
// const SETUP_DECK = "SETUP_DECK";
// const SELECT_CARD = "SELECT_CARD";
// /// action creator

// const setupDeck = deck => ({ type: SETUP_DECK, deck });
// const selectCard = (card) => ({
//   type: SELECT_CARD,
//   card
// });

/// Thunk
export const syncPlayerDecks = (deck,id) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    console.log("In Sync Deck Thunk ---> Deck", deck)
    const firestore = getFirestore();
    await firestore
      .collection("Games")
      .doc(id)
      .update({
        CardsOnTable: deck
      });
  } catch (error) {
    console.error(error)
    // return error.message
  }
};

///Reducer

// export default function(state = initialState, action) {
//   switch (action.type) {
//     case SETUP_DECK:
//       return{deck: action.deck}
//     case SELECT_CARD:
//       const newDeck = [...state.Deck]
//       newDeck.map(card=>{
//         if(card.word === action.card.word) return action.card
//         return card
//       })
//       return {deck: newDeck}
//     default:
//       return state;
//   }
// }
