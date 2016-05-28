import * as actionTypes from '../../constants/actionTypes';
import * as filterTypes from '../../constants/filterTypes';

const initialState = {
  durationFilterType: filterTypes.ALL,
  filterNameQuery: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FILTER_DURATION:
      return setDurationFilter(state, action.filterType);
    case actionTypes.FILTER_NAME:
      return setNameFilter(state, action.filterNameQuery);
  }
  return state;
}

function setDurationFilter(state, filterType) {
  return { ...state, durationFilterType: filterType };
}

function setNameFilter(state, filterNameQuery) {
  return { ...state, filterNameQuery };
}
