import { db } from "../fireStore";

///Initial State
const initialState = {
  chat: [],
};

///action
const SEND_MESSAGE = "SEND_MESSAGE";

/// action creator
export const sendMessage = (sender, message) => ({
  type: SEND_MESSAGE,
  sender,
  message,
});

/// Thunk

export const sentMessage = (
  sender,
  message,
  gamessessionid
) => async dispatch => {
  try {
    db.collection("Games")
      .doc(`${gamessessionid}`)
      .update({
        chat: [...initialState.chat, { message: message, Sender: sender }],
      });

    dispatch(sendMessage(sender, message));
  } catch {}
};

///Reducer

export default function(state = initialState, action) {
  switch (action.type) {
    case SEND_MESSAGE:
      while (state.chat.length > 100) {
        state.chat.shift();
      }
      return {
        chat: [
          ...state.chat,
          { sender: action.sender, message: action.message },
        ],
      };
    default:
      return state;
  }
}
