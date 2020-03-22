///Initial State
const initialState = {
  currentuser: {},
};

///action
const GOT_USER = "GOT_USER";

/// action creator
const gotUser = user => ({
  type: GOT_USER,
  user,
});

/// Thunk
export const getUser = () => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    // const {data} = await axios.get(`/api/orders/user/${id}`)
    // dispatch(gotUser(xxx))
  } catch (error) {
    console.error(error);
  }
};

// function incrementIfOdd() {
//   return (dispatch, getState,{getFirebase, getFirestore }) => {
//     const { counter } = getState();

//     if (counter % 2 === 0) {
//       return;
//     }

//     dispatch(increment());
//   };
// }

///Reducer

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_USER:
      return { ...state, currentuser: action.user };
    default:
      return state;
  }
}
