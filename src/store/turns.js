import { db } from "../fireStore";

///Initial State
const initialState = {
  currentTeam: "",
  hint: "",
  hintCount: 0,
  GameOver: false,
};

///action
const START_GAME = "START_GAME";
const END_GAME = "END_GAME";
const END_TURN = "END_TURN";
const SET_HINT = "SET_HINT";

//  if User.teamColor =/= selectedCard.color || hintCount == 0 Then endTurn Thunk
/// action creator
export const endTurn = () => ({ type: END_TURN });
export const endGame = () => ({ type: END_GAME });
// Who goes First Logic
//   Math Random if 0 then blue if 1 then red
export const startGame = first => ({ type: START_GAME, first });
export const setHint = (hint, count) => ({ type: SET_HINT, hint, count });

/// Thunk
export const settingHint = (
  hintWord,
  hintcount,
  gamesessionid
) => async dispatch => {
  try {
    // In the DB change hintword = "" hintcount = 0
    db.collection("Games")
      .doc(`${gamesessionid}`)
      .update({
        HintWord: hintWord,
        HintCount: hintcount,
      });

    dispatch(setHint(hintWord, hintcount));
  } catch (error) {
    console.error(error);
  }
};

///Reducer

export default function(state = initialState, action) {
  switch (action.type) {
    case END_TURN:
      return {
        ...state,
        currentTeam: state.currentTeam === "red" ? "blue" : "red",
      };
    case START_GAME:
      return { ...state, currentTeam: action.first };
    case END_GAME:
      return { ...state, GameOver: true };
    case SET_HINT:
      return { ...state, hint: action.hint, hintCount: action.count };
    default:
      return state;
  }
}
