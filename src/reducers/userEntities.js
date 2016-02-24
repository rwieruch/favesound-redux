import * as actionTypes from '../constants/actionTypes';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
  case actionTypes.MERGE_USER_ENTITIES:
    return mergeUsers(state, action.users);
  }
  return state;
}

function mergeUsers(state, users) {
  return Object.assign({}, state, users);
}
