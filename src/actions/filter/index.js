import * as actionTypes from '../../constants/actionTypes';

export function filterDuration(filterType) {
  return {
    type: actionTypes.FILTER_DURATION,
    filterType
  };
}

export function filterName(filterNameQuery) {
  return {
    type: actionTypes.FILTER_NAME,
    filterNameQuery
  };
}
