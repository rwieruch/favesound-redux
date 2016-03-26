import * as actionTypes from '../constants/actionTypes';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
  case actionTypes.MERGE_GENRE_ACTIVITIES:
    return mergeActivities(state, action.activities, action.genre);
  }
  return state;
}

function mergeActivities(state, list, genre) {
  const oldList = state[genre] || [];

  const newList = [
    ...oldList,
    ...list
  ];


  const obj = {};
  obj[genre] = newList;

  return Object.assign({}, state, obj);
}
