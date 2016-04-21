import * as actionTypes from '../../constants/actionTypes';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
  case actionTypes.MERGE_COMMENTS:
    return mergeComments(state, action);
  }
  return state;
}

function mergeComments(state, action) {
  const { comments, trackId } = action;
  return { ...state, state[trackId]: { ....state[trackId], ...comments } };
}
