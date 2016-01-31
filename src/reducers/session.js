import {Map} from 'immutable';
import * as actionTypes from '../constants/actionTypes';

const initialState = Map({
  session: null,
  user: null
});

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
  return state.set('session', session);
}

function setUser(state, user) {
  return state.set('user', user);
}