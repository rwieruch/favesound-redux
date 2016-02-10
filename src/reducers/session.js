import * as actionTypes from '../constants/actionTypes';

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
  }
  return state;
}

function setSession(state, session) {
  return  Object.assign({}, state, { session });
}

function setUser(state, user) {
  return  Object.assign({}, state, { user });
}