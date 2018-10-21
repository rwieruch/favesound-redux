import * as actionTypes from '../../constants/actionTypes';
import * as sortTypes from '../../constants/sortTypes';
import * as dateSortTypes from '../../constants/dateSortTypes';

const initialState = {
  sortType: sortTypes.NONE,
  dateSortType: dateSortTypes.NONE,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SORT_STREAM:
      return setSortStream(state, action.sortType);
    case actionTypes.DATE_SORT_STREAM:
      return setDateSortStream(state, action.dateSortType);
  }
  return state;
}

function setSortStream(state, sortType) {
  return { ...state, sortType };
}
function setDateSortStream(state, dateSortType) {
  return { ...state, dateSortType };
}
