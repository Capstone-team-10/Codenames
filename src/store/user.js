///Initial State
const initialState = {
  profile: {},
  player:{}
};

///action
const GOT_PROFILE = "GOT_PROFILE";
const SET_PLAYER = "SET_PLAYER";

/// action creator
const gotProfile = profile => ({
  type: GOT_PROFILE,
  profile,
});

const setPlayer = (name, team,master) => ({
  type: SET_PLAYER,
  name, team, master,
});

/// Thunk
export const getProfile = () => async dispatch => {
  try {
    // db.collection("Users")
    // .where("Name", "==", "AAron")
    // .get()
    // .then(snapshot => {
    //   snapshot.docs.forEach(doc => {
    //     dispatch(gotProfile(doc.data()))
    //   });
    // })
    console.log(" Get Profile Thunk")
  } catch (error) {
    console.error(error);
  }
};

export const createProfile = (name,email,password) => async (dispatch, getState, {getFirestore}) => {
  try {
    console.log("In create Thunk")
    const firestore = getFirestore()
    firestore.collection("Users").add({
          name: name,
          email: email,
          password: password
        })
    dispatch(gotProfile({name,email,password}))
    console.log(" Dispatched Creat Thunk")
    }
  catch (error) {
    console.error(error);
  }
};

export const settingPlayer = (name,team,master,gamessessionid) => async dispatch => {
  try {
    // db.collection("Games")
    //   .doc(`${gamessessionid}`)
    //   .update({
    //     UsersInRoom: `${name}`:{
    //       displayName: name,
    //       Team: team,
    //       isSpyMaster: master
    //     },
    //   });
    // dispatch(setPlayer(name, team,master));
    console.log("SettingPlayer Thunk")
  }
  catch (error) {
    console.error(error);
  }
};


///Reducer

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_PROFILE:
      return { ...state, profile: action.profile };
    case SET_PLAYER:
      return {...state, player: {name:action.name, team:action.team, Spymaster:action.master}}
    default:
      return state;
  }
}
