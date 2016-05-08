import * as actionTypes from '../../constants/actionTypes';

export function sortStream(sortType) {
  return {
    type: actionTypes.SORT_STREAM,
    sortType
  };
}
