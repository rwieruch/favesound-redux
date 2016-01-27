import {Map} from 'immutable';

export default function(state = Map(), action) {
  switch (action.type) {
  case 'SET_SESSION':
    return setSession(state, action.session);
  case 'SET_USER':
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