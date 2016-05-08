import * as actionTypes from '../../constants/actionTypes';
import * as filterTypes from '../../constants/filterTypes';

const initialState = {
  durationFilter: filterTypes.ALL,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FILTER_DURATION:
      return setDurationFilter(state, action.filterType);
  }
  return state;
}

function setDurationFilter(state, filterType) {
  return { ...state, durationFilter: filterType };
}
