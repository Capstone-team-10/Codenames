///Initial State
const initialState = {
  cards: [],
};

///action
const SELECT_CARD = "SELECT_CARD";
const REVEAL_CARD = "REVEAL_CARD";
/// action creator

// const setUpCards = cards => ({ type: SETUP_CARDS, cards });
// const selectCard = (cardIndex, cardColor) => ({
//   type: SELECT_CARD,
//   index: cardIndex,
//   color: cardColor,
// });

/// Thunk

///Reducer

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

// const cards = (state = initialState.cards, action) => {
//   if (action.type === START_GAME) return action.cards;

//   if (action.type === REVEAL_CARD) {
//     const newCards = [...state];
//     const { index, color } = action;
//     const card = state[index];
//     newCards[index] = { ...card, color, flipped: true };
//     return newCards;
//   }

//   return state;
// };
