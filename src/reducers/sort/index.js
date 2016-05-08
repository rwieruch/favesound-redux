import * as actionTypes from '../../constants/actionTypes';
import * as sortTypes from '../../constants/sortTypes';

const initialState = {
  sortType: sortTypes.NONE,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SORT_STREAM:
      return setSortStream(state, action.sortType);
  }
  return state;
}

function setSortStream(state, sortType) {
  return { ...state, sortType };
}
