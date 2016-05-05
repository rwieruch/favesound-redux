import * as actionTypes from '../../constants/actionTypes';

const initialState = {
  session: null,
  user: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_SESSION:
      return setSession(state, action.session);
    case actionTypes.SET_USER:
      return setUser(state, action.user);
    case actionTypes.RESET_SESSION:
      return initialState;
  }
  return state;
}

function setSession(state, session) {
  return { ...state, session };
}

function setUser(state, user) {
  return { ...state, user };
}
