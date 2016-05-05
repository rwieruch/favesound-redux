import * as actionTypes from '../../constants/actionTypes';

const initialState = {
  comments: {},
  openComments: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.OPEN_COMMENTS:
      return openComments(state, action);
    case actionTypes.MERGE_COMMENTS:
      return mergeComments(state, action);
  }
  return state;
}

function openComments(state, action) {
  const { trackId } = action;
  return {
    ...state, openComments: { ...state.openComments || [], [trackId]: !state.openComments[trackId] }
  };
}

function mergeComments(state, action) {
  const { comments, trackId } = action;
  return {
    ...state,
    comments: { ...state.comments || [], [trackId]: [...state.comments[trackId] || [], ...comments] }
  };
}
